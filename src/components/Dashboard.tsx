import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Student, School } from '../types';
import { studentsService, schoolService } from '../services/firebase';
import StudentList from './StudentList';
import StudentForm from './StudentForm';
import CertificateViewer from './CertificateViewer';
import SchoolSettings from './SchoolSettings';
import { 
  Users, 
  UserPlus, 
  LogOut, 
  Settings,
  GraduationCap 
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { teacher, logout } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [school, setSchool] = useState<School | null>(null);
  const [activeView, setActiveView] = useState<'list' | 'add' | 'edit' | 'certificate' | 'settings'>('list');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [studentsData, schoolData] = await Promise.all([
        studentsService.getAll(),
        schoolService.get()
      ]);
      setStudents(studentsData);
      setSchool(schoolData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddStudent = async (studentData: Omit<Student, '_id'>) => {
    try {
      const newStudent = await studentsService.create(studentData);
      setStudents([...students, newStudent]);
      setActiveView('list');
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleEditStudent = async (id: string, studentData: Partial<Student>) => {
    try {
      const updatedStudent = await studentsService.update(id, studentData);
      setStudents(students.map(s => s._id === id ? updatedStudent : s));
      setActiveView('list');
      setSelectedStudent(null);
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const handleDeleteStudent = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await studentsService.delete(id);
        setStudents(students.filter(s => s._id !== id));
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  const handleViewCertificate = (student: Student) => {
    setSelectedStudent(student);
    setActiveView('certificate');
  };

  const handleEditClick = (student: Student) => {
    setSelectedStudent(student);
    setActiveView('edit');
  };

  const handleSchoolUpdate = async (schoolData: School) => {
    try {
      const updatedSchool = await schoolService.update(schoolData);
      setSchool(updatedSchool);
      setActiveView('list');
    } catch (error) {
      console.error('Error updating school:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <GraduationCap className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
                <p className="text-sm text-gray-600">Welcome back, {teacher?.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setActiveView('settings')}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeView === 'settings'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </button>
              
              <button
                onClick={logout}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg font-medium transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Action Buttons */}
        {activeView !== 'certificate' && activeView !== 'settings' && (
          <div className="mb-8 flex flex-wrap gap-4">
            <button
              onClick={() => setActiveView('list')}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                activeView === 'list'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              <Users className="w-5 h-5 mr-2" />
              View Students ({students.length})
            </button>
            
            <button
              onClick={() => {
                setActiveView('add');
                setSelectedStudent(null);
              }}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                activeView === 'add'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Add Student
            </button>
          </div>
        )}

        {/* Content Area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {activeView === 'list' && (
            <StudentList
              students={students}
              onEdit={handleEditClick}
              onDelete={handleDeleteStudent}
              onViewCertificate={handleViewCertificate}
            />
          )}
          
          {activeView === 'add' && (
            <StudentForm
              onSubmit={handleAddStudent}
              onCancel={() => setActiveView('list')}
            />
          )}
          
          {activeView === 'edit' && selectedStudent && (
            <StudentForm
              student={selectedStudent}
              onSubmit={(data) => handleEditStudent(selectedStudent._id!, data)}
              onCancel={() => {
                setActiveView('list');
                setSelectedStudent(null);
              }}
            />
          )}
          
          {activeView === 'certificate' && selectedStudent && school && (
            <CertificateViewer
              student={selectedStudent}
              school={school}
              onBack={() => setActiveView('list')}
            />
          )}
          
          {activeView === 'settings' && school && (
            <SchoolSettings
              school={school}
              onSave={handleSchoolUpdate}
              onCancel={() => setActiveView('list')}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;