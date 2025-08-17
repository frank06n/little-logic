export type Gender = "male" | "female";

export type CertificateData = {
  logoUrl: string;
  diseCode: string;
  serialNo: string;
  schoolName: string;
  establishedYear: number;
  circle: string;
  village: string;
  postOffice: string;
  policeStation: string;
  district: string;
  pin: string;
  studentName: string;
  fatherName: string;
  admissionDate: Date;
  admissionClass: string;
  currentClass: string;
  dob: Date;
  conduct: string;
  character: string;
  place: string;
  issueDate: Date;
  leavingDate: Date | null;
  headSignatureText: string;
  gender: Gender;
};

export interface Student {
  _id?: string;
  studentName: string;
  fatherName: string;
  admissionDate: string;
  admissionClass: string;
  currentClass: string;
  dob: string;
  conduct: string;
  character: string;
  gender: Gender;
  serialNo: string;
  leavingDate?: string | null;
}

export interface School {
  logoUrl: string;
  diseCode: string;
  schoolName: string;
  establishedYear: number;
  circle: string;
  village: string;
  postOffice: string;
  policeStation: string;
  district: string;
  pin: string;
  place: string;
}

export interface Teacher {
  _id?: string;
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  teacher: Omit<Teacher, 'password'>;
}