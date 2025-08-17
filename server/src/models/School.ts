import mongoose from 'mongoose';

const schoolSchema = new mongoose.Schema({
  logoUrl: {
    type: String,
    default: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1',
  },
  diseCode: {
    type: String,
    required: true,
  },
  schoolName: {
    type: String,
    required: true,
  },
  establishedYear: {
    type: Number,
    required: true,
  },
  circle: {
    type: String,
    required: true,
  },
  village: {
    type: String,
    required: true,
  },
  postOffice: {
    type: String,
    required: true,
  },
  policeStation: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model('School', schoolSchema);