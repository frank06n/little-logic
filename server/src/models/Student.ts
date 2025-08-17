import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
    trim: true,
  },
  fatherName: {
    type: String,
    required: true,
    trim: true,
  },
  admissionDate: {
    type: String,
    required: true,
  },
  admissionClass: {
    type: String,
    required: true,
  },
  currentClass: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  conduct: {
    type: String,
    enum: ['Excellent', 'Good', 'Fair', 'Satisfactory'],
    default: 'Good',
  },
  character: {
    type: String,
    enum: ['Excellent', 'Good', 'Fair', 'Satisfactory'],
    default: 'Good',
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  serialNo: {
    type: String,
    required: true,
    unique: true,
  },
  leavingDate: {
    type: String,
    default: null,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Student', studentSchema);