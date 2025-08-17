import React, { useState, useRef, useMemo } from 'react';
import { Student, School, CertificateData } from '../types';
import { generateCertificate } from '../utils/certificate';
import { ArrowLeft, Printer, ZoomIn, ZoomOut } from 'lucide-react';

interface CertificateViewerProps {
  student: Student;
  school: School;
  onBack: () => void;
}

const CertificateViewer: React.FC<CertificateViewerProps> = ({ student, school, onBack }) => {
  const [scale, setScale] = useState(1);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const certificateData: CertificateData = {
    logoUrl: school.logoUrl,
    diseCode: school.diseCode,
    serialNo: student.serialNo,
    schoolName: school.schoolName,
    establishedYear: school.establishedYear,
    circle: school.circle,
    village: school.village,
    postOffice: school.postOffice,
    policeStation: school.policeStation,
    district: school.district,
    pin: school.pin,
    studentName: student.studentName,
    fatherName: student.fatherName,
    admissionDate: new Date(student.admissionDate),
    admissionClass: student.admissionClass,
    currentClass: student.currentClass,
    dob: new Date(student.dob),
    conduct: student.conduct,
    character: student.character,
    place: school.place,
    issueDate: new Date(),
    leavingDate: student.leavingDate ? new Date(student.leavingDate) : null,
    headSignatureText: "Signature of Head Teacher",
    gender: student.gender,
  };

  const certificateHTML = useMemo(() => generateCertificate(certificateData), [certificateData]);
  const scaledCertificateHTML = useMemo(() => certificateHTML.replace(/__FONTSIZE__/g, `${scale * 100}%`), [certificateHTML, scale]);

  const handlePrint = () => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.print();
    }
  };

  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScale(parseFloat(e.target.value));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg font-medium transition-colors mr-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Certificate - {student.studentName}
                </h1>
                <p className="text-sm text-gray-600">Serial No: {student.serialNo}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Scale Slider */}
              <div className="flex items-center space-x-2">
                <ZoomOut className="w-4 h-4 text-gray-500" />
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.025"
                  value={scale}
                  onChange={handleScaleChange}
                  className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <ZoomIn className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-600 w-12">
                  {Math.round(scale * 100)}%
                </span>
              </div>

              <button
                onClick={handlePrint}
                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
              >
                <Printer className="w-4 h-4 mr-2" />
                Print
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Viewer */}
      <div className="flex items-center justify-center min-h-screen p-8 print:p-0 print:min-h-0">
        <div
          className="bg-white shadow-2xl print:shadow-none transition-transform duration-200"
        //   style={{
        //     transform: `scale(${scale})`,
        //     transformOrigin: 'center top',
        //   }}
        >
          <iframe
            ref={iframeRef}
            srcDoc={scaledCertificateHTML}
            className="border-0 print:border-0"
            style={{
              width: '220mm',
              height: '307mm', // A4 dimensions
            //   aspectRatio: '210/297',
            }}
            title="Certificate Preview"
          />
        </div>
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #3B82F6;
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #3B82F6;
          cursor: pointer;
          border: none;
        }

        @media print {
          body * {
            visibility: hidden;
          }
          iframe, iframe * {
            visibility: visible;
          }
        }
      `}</style>
    </div>
  );
};

export default CertificateViewer;