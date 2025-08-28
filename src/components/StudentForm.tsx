import React, { useState } from 'react';
import { Student, Gender } from '../types';
import { Save, X } from 'lucide-react';

interface StudentFormProps {
  student?: Student;
  onSubmit: (student: Omit<Student, '_id'>) => void;
  onCancel: () => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ student, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    studentName: student?.studentName || '',
    fatherName: student?.fatherName || '',
    admissionDate: student?.admissionDate || '',
    admissionClass: student?.admissionClass || '',
    currentClass: student?.currentClass || '',
    dob: student?.dob || '',
    conduct: student?.conduct || 'Good',
    character: student?.character || 'Good',
    gender: student?.gender || 'male' as Gender,
    serialNo: student?.serialNo || '',
    leavingDate: student?.leavingDate || null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {student ? 'Edit Student' : 'Add New Student'}
        </h2>
        <p className="text-gray-600 mt-1">
          {student ? 'Update student information' : 'Enter student details to add to the system'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-2">
              Student Name
            </label>
            <input
              type="text"
              id="studentName"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter student's full name"
            />
          </div>

          <div>
            <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700 mb-2">
              Father's Name
            </label>
            <input
              type="text"
              id="fatherName"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter father's name"
            />
          </div>

          <div>
            <label htmlFor="serialNo" className="block text-sm font-medium text-gray-700 mb-2">
              Serial Number
            </label>
            <input
              type="text"
              id="serialNo"
              name="serialNo"
              value={formData.serialNo}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter serial number"
            />
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="admissionDate" className="block text-sm font-medium text-gray-700 mb-2">
              Admission Date
            </label>
            <input
              type="date"
              id="admissionDate"
              name="admissionDate"
              value={formData.admissionDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="admissionClass" className="block text-sm font-medium text-gray-700 mb-2">
              Admission Class
            </label>
            <input
              type="text"
              id="admissionClass"
              name="admissionClass"
              value={formData.admissionClass}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 1st, 2nd, 3rd"
            />
          </div>

          <div>
            <label htmlFor="currentClass" className="block text-sm font-medium text-gray-700 mb-2">
              Current Class
            </label>
            <input
              type="text"
              id="currentClass"
              name="currentClass"
              value={formData.currentClass}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 5th, 10th"
            />
          </div>

          <div>
            <label htmlFor="leavingDate" className="block text-sm font-medium text-gray-700 mb-2">
              Leaving Date (Optional)
            </label>
            <input
              type="date"
              id="leavingDate"
              name="leavingDate"
              value={formData.leavingDate || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
          >
            <Save className="w-4 h-4 mr-2" />
            {student ? 'Update Student' : 'Add Student'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;