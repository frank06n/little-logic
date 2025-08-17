import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User
} from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  query,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { Student, School, Teacher } from '../types';

// Auth Services
export const authService = {
  register: async (name: string, email: string, password: string): Promise<Teacher> => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    
    const teacher: Teacher = {
      _id: userCredential.user.uid,
      name,
      email,
      password: '' // Don't store password
    };
    
    // Store teacher data in Firestore
    await setDoc(doc(db, 'teachers', userCredential.user.uid), {
      name,
      email,
      createdAt: Timestamp.now()
    });
    
    return teacher;
  },

  login: async (email: string, password: string): Promise<Teacher> => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    return {
      _id: user.uid,
      name: user.displayName || '',
      email: user.email || '',
      password: ''
    };
  },

  logout: async (): Promise<void> => {
    await signOut(auth);
  },

  getCurrentUser: (): User | null => {
    return auth.currentUser;
  }
};

// Students Services
export const studentsService = {
  getAll: async (): Promise<Student[]> => {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const q = query(
      collection(db, `teachers/${user.uid}/students`),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      _id: doc.id,
      ...doc.data()
    } as Student));
  },

  getById: async (id: string): Promise<Student> => {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const docRef = doc(db, `teachers/${user.uid}/students`, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      throw new Error('Student not found');
    }
    
    return { _id: docSnap.id, ...docSnap.data() } as Student;
  },

  create: async (student: Omit<Student, '_id'>): Promise<Student> => {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const docRef = await addDoc(collection(db, `teachers/${user.uid}/students`), {
      ...student,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    
    return { _id: docRef.id, ...student };
  },

  update: async (id: string, student: Partial<Student>): Promise<Student> => {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const docRef = doc(db, `teachers/${user.uid}/students`, id);
    await updateDoc(docRef, {
      ...student,
      updatedAt: Timestamp.now()
    });
    
    const updatedDoc = await getDoc(docRef);
    return { _id: updatedDoc.id, ...updatedDoc.data() } as Student;
  },

  delete: async (id: string): Promise<void> => {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const docRef = doc(db, `teachers/${user.uid}/students`, id);
    await deleteDoc(docRef);
  }
};

// School Services
export const schoolService = {
  get: async (): Promise<School> => {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const docRef = doc(db, `teachers/${user.uid}/school`, 'settings');
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      // Create default school settings
      const defaultSchool: School = {
        logoUrl: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1',
        diseCode: '12345678',
        schoolName: 'Sample High School',
        establishedYear: 1990,
        circle: 'East Circle',
        village: 'Sample Village',
        postOffice: 'Sample Post Office',
        policeStation: 'Sample Police Station',
        district: 'Sample District',
        pin: '123456',
        place: 'Sample Place',
      };
      
      await setDoc(docRef, {
        ...defaultSchool,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      
      return defaultSchool;
    }
    
    return docSnap.data() as School;
  },

  update: async (school: School): Promise<School> => {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const docRef = doc(db, `teachers/${user.uid}/school`, 'settings');
    await setDoc(docRef, {
      ...school,
      updatedAt: Timestamp.now()
    }, { merge: true });
    
    return school;
  }
};