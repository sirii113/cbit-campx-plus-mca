// Official CBIT Autonomous MCA Regulations & Syllabus Catalog across all years
// Institution: Chaitanya Bharathi Institute of Technology (Autonomous), Hyderabad
// Department: Department of Computer Applications (MCA)
// Verified Regulations: R-25 (2025-26 Onwards), R-23 (2023-24 & 2024-25), R-20 (2020-21 to 2022-23), R-16 (2016-17 to 2019-20)

export const MCA_REGULATIONS = [
  {
    id: "R-25",
    name: "Autonomous R-25 Regulation",
    shortName: "R-25",
    duration: "2-Year MCA Program (4 Semesters)",
    academicBatch: "2025-26 Onwards",
    prefix: "25MCC",
    cieScheme: {
      theory: "Continuous Internal Evaluation (CIE): 40 Marks + Semester End Examination (SEE): 60 Marks (3 Hours)",
      lab: "Continuous Internal Evaluation (CIE): 50 Marks + Semester End Examination (SEE): 50 Marks",
      totalCredits: 90
    },
    semesters: [
      {
        semId: "sem_1",
        year: "1st Year",
        semester: "Semester I",
        totalCredits: 22.5,
        courses: [
          { code: "25MCC101", title: "Data Structures Using C++", type: "Theory", credits: 4 },
          { code: "25MCC102", title: "Computer Architecture", type: "Theory", credits: 4 },
          { code: "25MCC103", title: "Object-Oriented Programming using Java", type: "Theory", credits: 4 },
          { code: "25MCC104", title: "Data Structures Using C++ Lab", type: "Practical", credits: 1.5 },
          { code: "25MCC105", title: "Object-Oriented Programming using Java Lab", type: "Practical", credits: 1.5 },
          { code: "25MTC101", title: "Probability and Statistics for Data Science", type: "Theory", credits: 4 },
          { code: "25MBC101", title: "Accounting and Financial Management", type: "Theory", credits: 2 },
          { code: "25EGC101", title: "Soft Skills & Technical Communication Lab", type: "Practical", credits: 1.5 }
        ]
      },
      {
        semId: "sem_2",
        year: "1st Year",
        semester: "Semester II",
        totalCredits: 23.5,
        courses: [
          { code: "25MCC106", title: "Database Management Systems", type: "Theory", credits: 4 },
          { code: "25MCC107", title: "Operating Systems & Linux Programming", type: "Theory", credits: 4 },
          { code: "25MCC108", title: "Design and Analysis of Algorithms", type: "Theory", credits: 4 },
          { code: "25MCC109", title: "Computer Networks & Security", type: "Theory", credits: 3 },
          { code: "25MCC110", title: "Web Technologies & Full-Stack Development", type: "Theory", credits: 3 },
          { code: "25MCC111", title: "Database Management Systems Lab", type: "Practical", credits: 1.5 },
          { code: "25MCC112", title: "Web Technologies & Full-Stack Lab", type: "Practical", credits: 1.5 },
          { code: "25MCC113", title: "Operating Systems & Algorithms Lab", type: "Practical", credits: 1.5 },
          { code: "25MCC114", title: "Mini Project & Technical Seminar", type: "Project", credits: 1 }
        ]
      },
      {
        semId: "sem_3",
        year: "2nd Year",
        semester: "Semester III",
        totalCredits: 22,
        courses: [
          { code: "25MCC201", title: "Machine Learning & Artificial Intelligence", type: "Theory", credits: 4 },
          { code: "25MCC202", title: "Software Engineering & Agile Methodologies", type: "Theory", credits: 3 },
          { code: "25MCC203", title: "Cloud Computing & DevOps", type: "Theory", credits: 3 },
          { code: "25MCE201", title: "Professional Elective I: Big Data Analytics", type: "Theory", credits: 3 },
          { code: "25MCE202", title: "Professional Elective II: Cyber Security & Cryptography", type: "Theory", credits: 3 },
          { code: "25MCC211", title: "Machine Learning & AI Laboratory", type: "Practical", credits: 2 },
          { code: "25MCC212", title: "Cloud Computing & DevOps Laboratory", type: "Practical", credits: 2 },
          { code: "25MCC213", title: "Capstone Project Phase-I", type: "Project", credits: 2 }
        ]
      },
      {
        semId: "sem_4",
        year: "2nd Year",
        semester: "Semester IV",
        totalCredits: 22,
        courses: [
          { code: "25MCE203", title: "Professional Elective III: Deep Learning & NLP", type: "Theory", credits: 3 },
          { code: "25MOE201", title: "Open Elective: Tech Entrepreneurship & IPR", type: "Theory", credits: 3 },
          { code: "25MCC214", title: "Major Project Dissertation & Defense", type: "Project", credits: 14 },
          { code: "25MCC215", title: "Comprehensive Technical Viva-Voce", type: "Evaluation", credits: 2 }
        ]
      }
    ]
  },
  {
    id: "R-23",
    name: "Autonomous R-23 Regulation",
    shortName: "R-23",
    duration: "2-Year MCA Program (4 Semesters)",
    academicBatch: "2023-24 & 2024-25",
    prefix: "23MCC",
    cieScheme: {
      theory: "Continuous Internal Evaluation (CIE): 40 Marks + Semester End Examination (SEE): 60 Marks (3 Hours)",
      lab: "Continuous Internal Evaluation (CIE): 50 Marks + Semester End Examination (SEE): 50 Marks",
      totalCredits: 88
    },
    semesters: [
      {
        semId: "sem_1",
        year: "1st Year",
        semester: "Semester I",
        totalCredits: 22,
        courses: [
          { code: "23MCC101", title: "Data Structures", type: "Theory", credits: 4 },
          { code: "23MCC102", title: "Computer Architecture", type: "Theory", credits: 4 },
          { code: "23MCC103", title: "Object-Oriented Programming using Java", type: "Theory", credits: 4 },
          { code: "23MTC101", title: "Mathematical & Statistical Foundations", type: "Theory", credits: 4 },
          { code: "23MCC104", title: "Database Management Systems", type: "Theory", credits: 3 },
          { code: "23MCC111", title: "Data Structures Laboratory", type: "Practical", credits: 1.5 },
          { code: "23MCC112", title: "Java Programming Laboratory", type: "Practical", credits: 1.5 }
        ]
      },
      {
        semId: "sem_2",
        year: "1st Year",
        semester: "Semester II",
        totalCredits: 22,
        courses: [
          { code: "23MCC105", title: "Operating Systems", type: "Theory", credits: 4 },
          { code: "23MCC106", title: "Design and Analysis of Algorithms", type: "Theory", credits: 4 },
          { code: "23MCC107", title: "Computer Networks", type: "Theory", credits: 3 },
          { code: "23MCC108", title: "Web Technologies & Full-Stack", type: "Theory", credits: 3 },
          { code: "23MCC109", title: "Software Engineering", type: "Theory", credits: 3 },
          { code: "23MCC113", title: "DBMS Laboratory", type: "Practical", credits: 1.5 },
          { code: "23MCC114", title: "Web Technologies Laboratory", type: "Practical", credits: 1.5 },
          { code: "23MCC115", title: "Mini Project", type: "Project", credits: 2 }
        ]
      },
      {
        semId: "sem_3",
        year: "2nd Year",
        semester: "Semester III",
        totalCredits: 22,
        courses: [
          { code: "23MCC201", title: "Artificial Intelligence & Machine Learning", type: "Theory", credits: 4 },
          { code: "23MCC202", title: "Cloud Computing & Microservices", type: "Theory", credits: 3 },
          { code: "23MCE201", title: "Professional Elective I: Data Science & Analytics", type: "Theory", credits: 3 },
          { code: "23MCE202", title: "Professional Elective II: Information Security", type: "Theory", credits: 3 },
          { code: "23MOE201", title: "Open Elective: Internet of Things", type: "Theory", credits: 3 },
          { code: "23MCC211", title: "AI & Machine Learning Laboratory", type: "Practical", credits: 2 },
          { code: "23MCC212", title: "Cloud Computing Laboratory", type: "Practical", credits: 2 },
          { code: "23MCC213", title: "Project Seminar & Phase-I", type: "Project", credits: 2 }
        ]
      },
      {
        semId: "sem_4",
        year: "2nd Year",
        semester: "Semester IV",
        totalCredits: 22,
        courses: [
          { code: "23MCE203", title: "Professional Elective III: Deep Learning", type: "Theory", credits: 3 },
          { code: "23MCE204", title: "Professional Elective IV: Blockchain Technologies", type: "Theory", credits: 3 },
          { code: "23MCC214", title: "Major Project Dissertation & Viva-Voce", type: "Project", credits: 16 }
        ]
      }
    ]
  },
  {
    id: "R-20",
    name: "Autonomous R-20 Regulation (AICTE 2-Year Model)",
    shortName: "R-20",
    duration: "2-Year MCA Program (4 Semesters)",
    academicBatch: "2020-21 to 2022-23",
    prefix: "20MCC",
    cieScheme: {
      theory: "Continuous Internal Evaluation (CIE): 40 Marks + Semester End Examination (SEE): 60 Marks (3 Hours)",
      lab: "Continuous Internal Evaluation (CIE): 50 Marks + Semester End Examination (SEE): 50 Marks",
      totalCredits: 86
    },
    semesters: [
      {
        semId: "sem_1",
        year: "1st Year",
        semester: "Semester I",
        totalCredits: 22,
        courses: [
          { code: "20MCC101", title: "Computer Programming using 'C'", type: "Theory", credits: 4 },
          { code: "20MCC102", title: "Computer Organization and Architecture", type: "Theory", credits: 4 },
          { code: "20MCC103", title: "Software Engineering", type: "Theory", credits: 4 },
          { code: "20MTC101", title: "Discrete Mathematics", type: "Theory", credits: 4 },
          { code: "20MBC101", title: "Accounting and Financial Management", type: "Theory", credits: 3 },
          { code: "20MCC111", title: "C Programming Laboratory", type: "Practical", credits: 1.5 },
          { code: "20MCC112", title: "IT & Unix Shell Laboratory", type: "Practical", credits: 1.5 }
        ]
      },
      {
        semId: "sem_2",
        year: "1st Year",
        semester: "Semester II",
        totalCredits: 22,
        courses: [
          { code: "20MCC104", title: "Data Structures & Algorithms", type: "Theory", credits: 4 },
          { code: "20MCC105", title: "Database Management Systems", type: "Theory", credits: 4 },
          { code: "20MCC106", title: "Operating Systems", type: "Theory", credits: 3 },
          { code: "20MCC107", title: "Object-Oriented Programming using Java", type: "Theory", credits: 4 },
          { code: "20MCC108", title: "Computer Networks", type: "Theory", credits: 3 },
          { code: "20MCC113", title: "Data Structures & Java Lab", type: "Practical", credits: 2 },
          { code: "20MCC114", title: "DBMS Laboratory", type: "Practical", credits: 2 }
        ]
      },
      {
        semId: "sem_3",
        year: "2nd Year",
        semester: "Semester III",
        totalCredits: 21,
        courses: [
          { code: "20MCC201", title: "Web Technologies", type: "Theory", credits: 3 },
          { code: "20MCC202", title: "Machine Learning", type: "Theory", credits: 4 },
          { code: "20MCE201", title: "Elective I: Cloud Computing", type: "Theory", credits: 3 },
          { code: "20MCE202", title: "Elective II: Big Data Analytics", type: "Theory", credits: 3 },
          { code: "20MCE203", title: "Elective III: Cyber Security", type: "Theory", credits: 3 },
          { code: "20MCC211", title: "Web Technologies & ML Lab", type: "Practical", credits: 3 },
          { code: "20MCC212", title: "Mini Project", type: "Project", credits: 2 }
        ]
      },
      {
        semId: "sem_4",
        year: "2nd Year",
        semester: "Semester IV",
        totalCredits: 21,
        courses: [
          { code: "20MCE204", title: "Elective IV: Deep Learning & IoT", type: "Theory", credits: 3 },
          { code: "20MOE201", title: "Open Elective: Python & Data Science", type: "Theory", credits: 3 },
          { code: "20MCC214", title: "Major Project Dissertation & Viva", type: "Project", credits: 15 }
        ]
      }
    ]
  },
  {
    id: "R-16",
    name: "Autonomous R-16 Regulation (Legacy 3-Year CBCS)",
    shortName: "R-16",
    duration: "3-Year MCA Program (6 Semesters)",
    academicBatch: "2016-17 to 2019-20",
    prefix: "16MCC",
    cieScheme: {
      theory: "Continuous Internal Evaluation (CIE): 30 Marks + Semester End Examination (SEE): 70 Marks",
      lab: "Internal Practical (25M) + End Practical Exam (50M)",
      totalCredits: 132
    },
    semesters: [
      {
        semId: "sem_1",
        year: "1st Year",
        semester: "Semester I",
        totalCredits: 22,
        courses: [
          { code: "16MCC101", title: "Computer Programming with C", type: "Theory", credits: 4 },
          { code: "16MCC102", title: "Discrete Mathematics", type: "Theory", credits: 4 },
          { code: "16MCC103", title: "Computer Organization", type: "Theory", credits: 4 },
          { code: "16MCC111", title: "C Programming Lab", type: "Practical", credits: 2 }
        ]
      },
      {
        semId: "sem_2",
        year: "1st Year",
        semester: "Semester II",
        totalCredits: 22,
        courses: [
          { code: "16MCC104", title: "Data Structures using C++", type: "Theory", credits: 4 },
          { code: "16MCC105", title: "Operating Systems", type: "Theory", credits: 4 },
          { code: "16MCC106", title: "Database Management Systems", type: "Theory", credits: 4 },
          { code: "16MCC112", title: "Data Structures & DBMS Lab", type: "Practical", credits: 2 }
        ]
      },
      {
        semId: "sem_3",
        year: "2nd Year",
        semester: "Semester III",
        totalCredits: 22,
        courses: [
          { code: "16MCC201", title: "Object-Oriented Programming with Java", type: "Theory", credits: 4 },
          { code: "16MCC202", title: "Design & Analysis of Algorithms", type: "Theory", credits: 4 },
          { code: "16MCC203", title: "Software Engineering", type: "Theory", credits: 4 },
          { code: "16MCC211", title: "Java & Algorithms Lab", type: "Practical", credits: 2 }
        ]
      },
      {
        semId: "sem_4",
        year: "2nd Year",
        semester: "Semester IV",
        totalCredits: 22,
        courses: [
          { code: "16MCC204", title: "Computer Networks", type: "Theory", credits: 4 },
          { code: "16MCC205", title: "Web Programming", type: "Theory", credits: 4 },
          { code: "16MCC206", title: "Data Warehousing & Data Mining", type: "Theory", credits: 4 },
          { code: "16MCC212", title: "Web Programming Lab", type: "Practical", credits: 2 }
        ]
      },
      {
        semId: "sem_5",
        year: "3rd Year",
        semester: "Semester V",
        totalCredits: 22,
        courses: [
          { code: "16MCC301", title: "Cloud Computing & Big Data", type: "Theory", credits: 4 },
          { code: "16MCC302", title: "Information Security", type: "Theory", credits: 4 },
          { code: "16MCC311", title: "Mini Project & Seminar", type: "Project", credits: 4 }
        ]
      },
      {
        semId: "sem_6",
        year: "3rd Year",
        semester: "Semester VI",
        totalCredits: 22,
        courses: [
          { code: "16MCC312", title: "Major Project Work & Viva-Voce", type: "Project", credits: 22 }
        ]
      }
    ]
  }
];
