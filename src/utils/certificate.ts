import { CertificateData } from '../types';

// export function generateCertificate(data: CertificateData): string {
//   const formatDate = (date: Date) => {
//     return date.toLocaleDateString('en-IN', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric'
//     });
//   };

//   return `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>Student Certificate</title>
//       <style>
//         @page {
//           size: A4;
//           margin: 0;
//         }

//         body {
//           margin: 0;
//           padding: 40px;
//           font-family: 'Times New Roman', serif;
//           line-height: 1.6;
//           background: white;
//           color: #000;
//         }

//         .certificate {
//           max-width: 100%;
//           margin: 0 auto;
//           border: 8px solid #1e40af;
//           padding: 30px;
//           background: linear-gradient(45deg, #f8fafc 0%, #e2e8f0 100%);
//           box-shadow: inset 0 0 20px rgba(30, 64, 175, 0.1);
//         }

//         .header {
//           text-align: center;
//           margin-bottom: 30px;
//           border-bottom: 3px solid #1e40af;
//           padding-bottom: 20px;
//         }

//         .logo {
//           width: 80px;
//           height: 80px;
//           margin: 0 auto 15px;
//           border-radius: 50%;
//           object-fit: cover;
//           border: 3px solid #1e40af;
//         }

//         .school-name {
//           font-size: 28px;
//           font-weight: bold;
//           color: #1e40af;
//           margin: 10px 0;
//         }

//         .school-details {
//           font-size: 14px;
//           color: #374151;
//           margin: 5px 0;
//         }

//         .certificate-title {
//           font-size: 32px;
//           font-weight: bold;
//           text-align: center;
//           color: #dc2626;
//           margin: 30px 0;
//           text-transform: uppercase;
//           letter-spacing: 2px;
//           text-decoration: underline;
//         }

//         .content {
//           font-size: 16px;
//           line-height: 2;
//           text-align: justify;
//           margin: 30px 0;
//         }

//         .student-name {
//           font-weight: bold;
//           color: #1e40af;
//           text-decoration: underline;
//           text-transform: uppercase;
//         }

//         .details-grid {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 15px;
//           margin: 30px 0;
//           font-size: 14px;
//         }

//         .detail-row {
//           display: flex;
//           justify-content: space-between;
//           border-bottom: 1px dotted #6b7280;
//           padding: 5px 0;
//         }

//         .footer {
//           display: flex;
//           justify-content: space-between;
//           align-items: end;
//           margin-top: 50px;
//           padding-top: 30px;
//           border-top: 2px solid #1e40af;
//         }

//         .signature-section {
//           text-align: center;
//         }

//         .signature-line {
//           width: 200px;
//           border-bottom: 2px solid #000;
//           margin: 40px auto 10px;
//         }

//         .date-place {
//           font-size: 14px;
//           color: #374151;
//         }

//         @media print {
//           body { -webkit-print-color-adjust: exact; }
//         }
//       </style>
//     </head>
//     <body>
//       <div class="certificate">
//         <div class="header">
//           <img src="${data.logoUrl}" alt="School Logo" class="logo">
//           <div class="school-name">${data.schoolName}</div>
//           <div class="school-details">Established: ${data.establishedYear} | DISE Code: ${data.diseCode}</div>
//           <div class="school-details">${data.village}, ${data.postOffice}, ${data.policeStation}</div>
//           <div class="school-details">${data.district} - ${data.pin} | Circle: ${data.circle}</div>
//         </div>

//         <div class="certificate-title">School Leaving Certificate</div>

//         <div class="content">
//           This is to certify that <span class="student-name">${data.studentName}</span>, 
//           ${data.gender === 'male' ? 'son' : 'daughter'} of <strong>${data.fatherName}</strong>, 
//           was admitted to this school on <strong>${formatDate(data.admissionDate)}</strong> 
//           in class <strong>${data.admissionClass}</strong> and studied up to class <strong>${data.currentClass}</strong>.
//         </div>

//         <div class="details-grid">
//           <div class="detail-row">
//             <span><strong>Serial No:</strong></span>
//             <span>${data.serialNo}</span>
//           </div>
//           <div class="detail-row">
//             <span><strong>Date of Birth:</strong></span>
//             <span>${formatDate(data.dob)}</span>
//           </div>
//           <div class="detail-row">
//             <span><strong>Conduct:</strong></span>
//             <span>${data.conduct}</span>
//           </div>
//           <div class="detail-row">
//             <span><strong>Character:</strong></span>
//             <span>${data.character}</span>
//           </div>
//           ${data.leavingDate ? `
//           <div class="detail-row">
//             <span><strong>Date of Leaving:</strong></span>
//             <span>${formatDate(data.leavingDate)}</span>
//           </div>
//           ` : ''}
//         </div>

//         <div class="footer">
//           <div class="date-place">
//             <div><strong>Place:</strong> ${data.place}</div>
//             <div><strong>Date:</strong> ${formatDate(data.issueDate)}</div>
//           </div>

//           <div class="signature-section">
//             <div class="signature-line"></div>
//             <div>${data.headSignatureText}</div>
//           </div>
//         </div>
//       </div>
//     </body>
//     </html>
//   `;
// }



// Format dd/mm/yyyy
function formatDate(date: Date): string {
    const d = date.getDate().toString().padStart(2, "0");
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
}

// Convert number to words for date (21 -> Twenty first)
function numberToOrdinalWords(n: number): string {
    const ordinals: { [key: number]: string } = {
        1: "First", 2: "Second", 3: "Third", 4: "Fourth", 5: "Fifth",
        6: "Sixth", 7: "Seventh", 8: "Eighth", 9: "Ninth", 10: "Tenth",
        11: "Eleventh", 12: "Twelfth", 13: "Thirteenth", 14: "Fourteenth",
        15: "Fifteenth", 16: "Sixteenth", 17: "Seventeenth", 18: "Eighteenth", 19: "Nineteenth",
        20: "Twentieth", 21: "Twenty first", 22: "Twenty second", 23: "Twenty third", 24: "Twenty fourth",
        25: "Twenty fifth", 26: "Twenty sixth", 27: "Twenty seventh", 28: "Twenty eighth", 29: "Twenty ninth",
        30: "Thirtieth", 31: "Thirty first"
    };
    return ordinals[n] || n.toString();
}

// Month names
const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// Helper to convert numbers to words (0–9999)
function numberToWords(num: number): string {
    const ones = [
        "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
        "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
        "Sixteen", "Seventeen", "Eighteen", "Nineteen"
    ];
    const tens = [
        "", "", "Twenty", "Thirty", "Forty", "Fifty",
        "Sixty", "Seventy", "Eighty", "Ninety"
    ];

    if (num < 20) return ones[num];
    if (num < 100) {
        return tens[Math.floor(num / 10)] + (num % 10 ? " " + ones[num % 10] : "");
    }
    if (num < 1000) {
        return ones[Math.floor(num / 100)] + " Hundred" +
            (num % 100 ? " " + numberToWords(num % 100) : "");
    }
    if (num < 10000) {
        return ones[Math.floor(num / 1000)] + " Thousand" +
            (num % 1000 ? " " + numberToWords(num % 1000) : "");
    }
    return num.toString();
}

// Full-fledged year to words
function yearToWords(year: number): string {
    return numberToWords(year);
}


function dobToText(dob: Date): string {
    const day = numberToOrdinalWords(dob.getDate());
    const month = months[dob.getMonth()];
    const year = yearToWords(dob.getFullYear());
    return `${day} day of ${month}, ${year}`;
}

function generateCertificateStructure(data: CertificateData): string {
    const admissionDateStr = formatDate(data.admissionDate);
    const issueDateStr = formatDate(data.issueDate);
    const dobStr = formatDate(data.dob);
    const dobText = dobToText(data.dob);

    const leavingDateStr = data.leavingDate ? formatDate(data.leavingDate) : "Not Applicable";
    const classLine = data.leavingDate
        ? `was passed in class <b>${data.currentClass}</b>`
        : `is reading in class <b>${data.currentClass}</b>`;

    // Pronouns
    const pronouns = data.gender === "male"
        ? { he: "He", him: "him", his: "his" }
        : { he: "She", him: "her", his: "her" };

    return `
<main>
  <div class="logo-container">
    <img src="${data.logoUrl}" />
  </div>
  <section>
    <div class="header">
      <span>DISE CODE : ${data.diseCode}</span>
      <span>SL. NO. : ${data.serialNo}</span>
    </div>
    <div class="school">
      ${data.schoolName}
    </div>
    <div class="established">
      Estd. : ${data.establishedYear}
    </div>
    <div class="circle">
      (Under ${data.circle})
    </div>
    <div class="address">
      VILL : ${data.village}, P.O.+P.S. : ${data.policeStation}, DIST. : ${data.district}, PIN : ${data.pin}
    </div>
    <div class="subtitle">
      TO WHOM IT MAY CONCERN
    </div>
    <div class="content">
      <div>
        <span class="fw">This</span> is to certify that <b>${data.studentName}</b>
        Son of <b>${data.fatherName}</b> Vill : ${data.village}, P.O. &amp;
        P.S : ${data.policeStation}, Dist. : ${data.district}. ${pronouns.he} was admitted in this school on
        <b>${admissionDateStr}</b> in class <b>${data.admissionClass}</b>. ${pronouns.he} ${classLine}.
        According to the admission register ${pronouns.his}
        date of birth is <b>${dobText} ( ${dobStr} )</b>
      </div>
      <div>
        <span class="fw">${pronouns.his.charAt(0).toUpperCase() + pronouns.his.slice(1)}</span> conduct at school is ${data.conduct}. So far as I know
        ${pronouns.he.toLowerCase()} bears a ${data.character}.
      </div>
      <div>
        <span class="fw">I</span> wish ${pronouns.him} every success in life.
      </div>
    </div>
    <div class="dated">
      <div>${data.place}</div>
      <div>Dated : ${issueDateStr}</div>
    </div>
    <div class="date">
      <div>Date of Admission : ${admissionDateStr}</div>
      <div>Date of Leaving : ${leavingDateStr}</div>
    </div>
    <div class="signature">
      ${data.headSignatureText}
    </div>
  </section>
</main>
  `;
}

export function generateCertificate(data: CertificateData): string {
    const structure = generateCertificateStructure(data);
    return `
<html>

<head>
    <style>
        html {
            font-size: __FONTSIZE__;
        }

        body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
        }

        .main-container {
            height: 100vh;
            aspect-ratio: 210/297;
            display: flex;
            background-color: white;
            z-index: -2;
        }

        main {
            flex: 1;
            display: flex;
            padding: 1rem;

        }

        section {
            display: flex;
            flex-direction: column;
            padding: 1rem 0.5rem;
            border: double 4px #1F3863;
            font-family: 'Cambria';
            font-style: italic;
            font-size: 1.2rem;
        }

        .logo-container {
            position: absolute;
            height: 100vh;
            aspect-ratio: 210/297;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        img {
            width: 100%;
            aspect-ratio: 1;
            opacity: 0.2;
            z-index: -1;
        }

        .header {
            display: flex;
            justify-content: space-between;
            font-family: 'Calibri';
            font-style: normal;
            font-weight: bold;
        }

        .school {
            font-family: 'Algerian';
            font-style: normal;
            align-self: center;
            color: #001F5F;
            font-size: 2.2rem;
            margin: 0.5rem 0;
        }

        .established {
            background-color: #006FC0;
            color: white;
            font-weight: bold;
            font-style: normal;
            align-self: center;
            padding: 0.4rem 0.8rem;
            border-radius: 0.6rem;
            border: solid 2px black;
        }

        .circle {
            font-family: 'Times New Roman';
            font-style: normal;
            align-self: center;
            font-size: 1.2rem;
            padding: 0.4rem 0;
        }

        .address {
            font-style: normal;
            align-self: center;
            background-color: #001F5F;
            color: white;
            padding: 0.3rem 0.6rem;
            border-radius: 0.2rem;
            border: solid 2px #315C8D;
            font-size: 1rem;
        }

        .subtitle {
            font-style: normal;
            align-self: center;
            padding: 0.3rem 0.6rem;
            border-radius: 0.2rem;
            border: solid 2px #315C8D;
            background-color: #E7E6E6;
            box-shadow: #888 1px 1px 4px;
            margin: 0.4rem 0;
        }

        .content {
            padding: 1rem 0;
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            line-height: 1.5rem;
        }

        .dated {

            display: flex;
            flex-direction: column;
            gap: 0.8rem;
            margin-bottom: 1rem;
        }

        .date {
            color: #001F5F;
            font-weight: bold;

            display: flex;
            flex-direction: column;
            gap: 0.8rem;
            margin-bottom: 1rem;
        }

        .signature {
            text-align: right;
            margin-top: 1rem;
            margin-bottom: 2rem;
        }

        .fw {
            margin-left: 4rem;
        }
    </style>
</head>

<body>
    <div class="main-container">
        ${structure}
    </div>
</body>

</html>`;
}