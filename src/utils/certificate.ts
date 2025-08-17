import { CertificateData } from '../types';

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
        /* Algerian (only regular provided) */

        @font-face {
            font-family: "Algerian";
            src: url("/fonts/algerian.ttf") format("truetype");
            font-weight: 400;
            font-style: normal;
        }

        /* Calibri Regular */
        @font-face {
            font-family: "Calibri";
            src: url("/fonts/calibri-regular.ttf") format("truetype");
            font-weight: 400;
            font-style: normal;
        }

        /* Calibri Italic */
        @font-face {
            font-family: "Calibri";
            src: url("/fonts/calibri-italic.ttf") format("truetype");
            font-weight: 400;
            font-style: italic;
        }

        /* Calibri Bold */
        @font-face {
            font-family: "Calibri";
            src: url("/fonts/calibri-bold.ttf") format("truetype");
            font-weight: 700;
            font-style: normal;
        }

        /* Calibri Bold Italic */
        @font-face {
            font-family: "Calibri";
            src: url("/fonts/calibri-bold-italic.ttf") format("truetype");
            font-weight: 700;
            font-style: italic;
        }

        /* Cambria (only one provided → treat as regular) */
        @font-face {
            font-family: "Cambria";
            src: url("/fonts/cambria.ttf") format("truetype");
            font-weight: 400;
            font-style: normal;
        }

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