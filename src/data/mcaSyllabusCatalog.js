// Comprehensive CBIT Autonomous MCA Regulations & Syllabus Catalog across all years
// Institution: Chaitanya Bharathi Institute of Technology (Autonomous), Hyderabad
// Department: Department of Computer Applications (MCA)
// Regulations Covered: R-25 (Current Autonomous), R-22, R-20, R-16

export const MCA_REGULATIONS = [
  {
    id: "R-25",
    name: "Autonomous R-25 Regulation",
    shortName: "R-25",
    duration: "2-Year MCA Program (4 Semesters)",
    academicBatch: "2025-26 Onwards",
    prefix: "25MCC",
    cieScheme: {
      theory: "Mid Average (20M) + 3 Slip Tests (15M) + Assignment Average (10M) = 45M Total CIE (SEE: 55M)",
      lab: "Lab Mid 1 (20M) & Lab Mid 2 (20M) Avg = 20M + Day-to-Day Observation & Record (30M) = 50M Total CIE (SEE: 50M)",
      totalCredits: 90
    },
    semesters: [
      {
        semId: "sem_1",
        year: "1st Year",
        semester: "Semester I",
        totalCredits: 22.5,
        courses: [
          { code: "25MCC101", title: "Mathematical Foundations of Computer Applications", type: "Theory", credits: 3 },
          { code: "25MCC102", title: "Data Structures and Algorithms with Python", type: "Theory", credits: 3 },
          { code: "25MCC103", title: "Advanced Database Management Systems", type: "Theory", credits: 3 },
          { code: "25MCC104", title: "Computer Organization and Architecture", type: "Theory", credits: 3 },
          { code: "25MCC105", title: "Software Engineering & Agile Methodologies", type: "Theory", credits: 3 },
          { code: "25MCC111", title: "Data Structures & Algorithms Laboratory", type: "Practical", credits: 1.5 },
          { code: "25MCC112", title: "Advanced DBMS Laboratory", type: "Practical", credits: 1.5 },
          { code: "25MCC113", title: "Python Programming Laboratory", type: "Practical", credits: 1.5 }
        ]
      },
      {
        semId: "sem_2",
        year: "1st Year",
        semester: "Semester II",
        totalCredits: 23.5,
        courses: [
          { code: "25MCC106", title: "Full Stack Web Development (MERN & Next.js)", type: "Theory", credits: 3 },
          { code: "25MCC107", title: "Machine Learning & Intelligent Systems", type: "Theory", credits: 3 },
          { code: "25MCC108", title: "Cloud Computing & Containerization (Docker/K8s)", type: "Theory", credits: 3 },
          { code: "25MCC109", title: "Mobile Application Development (Flutter & Android)", type: "Theory", credits: 3 },
          { code: "25MCC110", title: "Cyber Security & Cryptographic Protocols", type: "Theory", credits: 3 },
          { code: "25MCC114", title: "Full Stack Web Development Laboratory", type: "Practical", credits: 1.5 },
          { code: "25MCC115", title: "Machine Learning & AI Laboratory", type: "Practical", credits: 1.5 },
          { code: "25MCC116", title: "Mobile Application Development Laboratory", type: "Practical", credits: 1.5 },
          { code: "25MCC117", title: "Mini Project & Technical Seminar", type: "Project", credits: 2 }
        ]
      },
      {
        semId: "sem_3",
        year: "2nd Year",
        semester: "Semester III",
        totalCredits: 22,
        courses: [
          { code: "25MCC201", title: "Big Data Analytics with Apache Spark", type: "Theory", credits: 3 },
          { code: "25MCC202", title: "Natural Language Processing & Generative AI", type: "Theory", credits: 3 },
          { code: "25MCC203", title: "DevOps CI/CD & Site Reliability Engineering", type: "Theory", credits: 3 },
          { code: "25MCC204", title: "Professional Elective I: Blockchain & Distributed Ledgers", type: "Theory", credits: 3 },
          { code: "25MCC205", title: "Professional Elective II: Internet of Things (IoT)", type: "Theory", credits: 3 },
          { code: "25MCC211", title: "Big Data & GenAI Laboratory", type: "Practical", credits: 1.5 },
          { code: "25MCC212", title: "DevOps & Cloud Orchestration Laboratory", type: "Practical", credits: 1.5 },
          { code: "25MCC213", title: "Industrial Internship / Capstone Phase-I", type: "Project", credits: 2 }
        ]
      },
      {
        semId: "sem_4",
        year: "2nd Year",
        semester: "Semester IV",
        totalCredits: 22,
        courses: [
          { code: "25MCC206", title: "Open Elective: Tech Entrepreneurship & Intellectual Property", type: "Theory", credits: 3 },
          { code: "25MCC207", title: "Professional Elective III: Deep Learning & Computer Vision", type: "Theory", credits: 3 },
          { code: "25MCC214", title: "Major Project Dissertation & Defense", type: "Project", credits: 14 },
          { code: "25MCC215", title: "Comprehensive Technical Viva-Voce", type: "Evaluation", credits: 2 }
        ]
      }
    ]
  },
  {
    id: "R-22",
    name: "Autonomous R-22 Regulation",
    shortName: "R-22",
    duration: "2-Year MCA Program (4 Semesters)",
    academicBatch: "2022-23 to 2024-25",
    prefix: "22MCC",
    cieScheme: {
      theory: "Internal Mid 1 (20M) & Mid 2 (20M) Avg = 20M + Assignments/Quizzes (10M) = 30M Total CIE (SEE: 70M)",
      lab: "Internal Lab Exam (20M) + Continuous Evaluation & Record (30M) = 50M Total CIE (SEE: 50M)",
      totalCredits: 88
    },
    semesters: [
      {
        semId: "sem_1",
        year: "1st Year",
        semester: "Semester I",
        totalCredits: 22,
        courses: [
          { code: "22MCC101", title: "Discrete Mathematics & Graph Theory", type: "Theory", credits: 3 },
          { code: "22MCC102", title: "Advanced Data Structures using C++", type: "Theory", credits: 3 },
          { code: "22MCC103", title: "Operating Systems & System Programming", type: "Theory", credits: 3 },
          { code: "22MCC104", title: "Relational Database Management Systems", type: "Theory", credits: 3 },
          { code: "22MCC105", title: "Object Oriented Programming through Java", type: "Theory", credits: 3 },
          { code: "22MCC111", title: "Data Structures Laboratory", type: "Practical", credits: 1.5 },
          { code: "22MCC112", title: "RDBMS Laboratory", type: "Practical", credits: 1.5 },
          { code: "22MCC113", title: "Java Programming Laboratory", type: "Practical", credits: 1.5 }
        ]
      },
      {
        semId: "sem_2",
        year: "1st Year",
        semester: "Semester II",
        totalCredits: 22,
        courses: [
          { code: "22MCC106", title: "Design and Analysis of Algorithms", type: "Theory", credits: 3 },
          { code: "22MCC107", title: "Web Technologies & JavaScript Frameworks", type: "Theory", credits: 3 },
          { code: "22MCC108", title: "Data Science & Python Programming", type: "Theory", credits: 3 },
          { code: "22MCC109", title: "Computer Networks & Network Security", type: "Theory", credits: 3 },
          { code: "22MCC110", title: "Artificial Intelligence Foundations", type: "Theory", credits: 3 },
          { code: "22MCC114", title: "Algorithms Laboratory", type: "Practical", credits: 1.5 },
          { code: "22MCC115", title: "Web Technologies Laboratory", type: "Practical", credits: 1.5 },
          { code: "22MCC116", title: "Data Science with Python Laboratory", type: "Practical", credits: 1.5 }
        ]
      },
      {
        semId: "sem_3",
        year: "2nd Year",
        semester: "Semester III",
        totalCredits: 22,
        courses: [
          { code: "22MCC201", title: "Machine Learning Concepts & Applications", type: "Theory", credits: 3 },
          { code: "22MCC202", title: "Cloud Computing Principles", type: "Theory", credits: 3 },
          { code: "22MCC203", title: "Mobile Application Development with Android", type: "Theory", credits: 3 },
          { code: "22MCC204", title: "Elective I: Information Security & Digital Forensics", type: "Theory", credits: 3 },
          { code: "22MCC211", title: "Machine Learning Laboratory", type: "Practical", credits: 1.5 },
          { code: "22MCC212", title: "Mobile App Development Laboratory", type: "Practical", credits: 1.5 },
          { code: "22MCC213", title: "Technical Seminar & Mini Project", type: "Project", credits: 2 }
        ]
      },
      {
        semId: "sem_4",
        year: "2nd Year",
        semester: "Semester IV",
        totalCredits: 22,
        courses: [
          { code: "22MCC205", title: "Elective II: Deep Learning & Neural Networks", type: "Theory", credits: 3 },
          { code: "22MCC214", title: "Major Project Work & Dissertation", type: "Project", credits: 16 },
          { code: "22MCC215", title: "Comprehensive Viva Voce", type: "Evaluation", credits: 3 }
        ]
      }
    ]
  },
  {
    id: "R-20",
    name: "Autonomous R-20 Regulation",
    shortName: "R-20",
    duration: "2-Year MCA Transition Program (4 Semesters)",
    academicBatch: "2020-21 & 2021-22",
    prefix: "20MCC",
    cieScheme: {
      theory: "Two Mid Examinations (20M) + Continuous Assignments (10M) = 30M CIE (SEE: 70M)",
      lab: "Internal Lab Assessment (25M) + Day-to-Day Work (25M) = 50M CIE (SEE: 50M)",
      totalCredits: 86
    },
    semesters: [
      {
        semId: "sem_1",
        year: "1st Year",
        semester: "Semester I",
        totalCredits: 21,
        courses: [
          { code: "20MCC101", title: "Probability, Statistics and Queuing Theory", type: "Theory", credits: 3 },
          { code: "20MCC102", title: "Data Structures with C", type: "Theory", credits: 3 },
          { code: "20MCC103", title: "Database Systems Architecture", type: "Theory", credits: 3 },
          { code: "20MCC104", title: "Java Programming & OOP", type: "Theory", credits: 3 },
          { code: "20MCC111", title: "Data Structures Lab", type: "Practical", credits: 1.5 },
          { code: "20MCC112", title: "DBMS Lab", type: "Practical", credits: 1.5 },
          { code: "20MCC113", title: "Java Lab", type: "Practical", credits: 1.5 }
        ]
      },
      {
        semId: "sem_2",
        year: "1st Year",
        semester: "Semester II",
        totalCredits: 21,
        courses: [
          { code: "20MCC105", title: "Operating Systems Fundamentals", type: "Theory", credits: 3 },
          { code: "20MCC106", title: "Design & Analysis of Algorithms", type: "Theory", credits: 3 },
          { code: "20MCC107", title: "Web Programming (HTML5/CSS3/PHP)", type: "Theory", credits: 3 },
          { code: "20MCC108", title: "Python for Scientific Computing", type: "Theory", credits: 3 },
          { code: "20MCC114", title: "Algorithms Lab", type: "Practical", credits: 1.5 },
          { code: "20MCC115", title: "Web Programming Lab", type: "Practical", credits: 1.5 },
          { code: "20MCC116", title: "Python Lab", type: "Practical", credits: 1.5 }
        ]
      },
      {
        semId: "sem_3",
        year: "2nd Year",
        semester: "Semester III",
        totalCredits: 22,
        courses: [
          { code: "20MCC201", title: "Software Engineering Principles", type: "Theory", credits: 3 },
          { code: "20MCC202", title: "Computer Networks & Protocols", type: "Theory", credits: 3 },
          { code: "20MCC203", title: "Data Mining & Data Warehousing", type: "Theory", credits: 3 },
          { code: "20MCC211", title: "Data Mining Lab", type: "Practical", credits: 1.5 },
          { code: "20MCC212", title: "Software Testing Lab", type: "Practical", credits: 1.5 },
          { code: "20MCC213", title: "Mini Project & Seminar", type: "Project", credits: 2 }
        ]
      },
      {
        semId: "sem_4",
        year: "2nd Year",
        semester: "Semester IV",
        totalCredits: 22,
        courses: [
          { code: "20MCC204", title: "Distributed Systems & Cloud Computing", type: "Theory", credits: 3 },
          { code: "20MCC214", title: "Project Work & Viva", type: "Project", credits: 15 },
          { code: "20MCC215", title: "Comprehensive Examination", type: "Evaluation", credits: 2 }
        ]
      }
    ]
  },
  {
    id: "R-16",
    name: "Autonomous R-16 Regulation",
    shortName: "R-16",
    duration: "3-Year MCA Program (6 Semesters)",
    academicBatch: "2016-17 to 2019-20",
    prefix: "16MCC",
    cieScheme: {
      theory: "Mid Exams (20M) + Continuous Sessional Marks (10M) = 30M CIE (SEE: 70M)",
      lab: "Internal Lab Exam (25M) + Lab Record (25M) = 50M CIE (SEE: 50M)",
      totalCredits: 132
    },
    semesters: [
      {
        semId: "sem_1",
        year: "1st Year",
        semester: "Semester I",
        totalCredits: 22,
        courses: [
          { code: "16MCC101", title: "Problem Solving and Computer Programming (C)", type: "Theory", credits: 3 },
          { code: "16MCC102", title: "Discrete Structures", type: "Theory", credits: 3 },
          { code: "16MCC103", title: "Digital Logic and Computer Organization", type: "Theory", credits: 3 },
          { code: "16MCC111", title: "Programming Lab in C", type: "Practical", credits: 2 }
        ]
      },
      {
        semId: "sem_2",
        year: "1st Year",
        semester: "Semester II",
        totalCredits: 22,
        courses: [
          { code: "16MCC104", title: "Data Structures through C++", type: "Theory", credits: 3 },
          { code: "16MCC105", title: "Operations Research", type: "Theory", credits: 3 },
          { code: "16MCC106", title: "Object Oriented Programming through Java", type: "Theory", credits: 3 },
          { code: "16MCC112", title: "Data Structures & Java Lab", type: "Practical", credits: 2 }
        ]
      },
      {
        semId: "sem_3",
        year: "2nd Year",
        semester: "Semester III",
        totalCredits: 22,
        courses: [
          { code: "16MCC201", title: "Database Management Systems", type: "Theory", credits: 3 },
          { code: "16MCC202", title: "Computer Networks", type: "Theory", credits: 3 },
          { code: "16MCC203", title: "Operating Systems", type: "Theory", credits: 3 },
          { code: "16MCC211", title: "DBMS & OS Lab", type: "Practical", credits: 2 }
        ]
      },
      {
        semId: "sem_4",
        year: "2nd Year",
        semester: "Semester IV",
        totalCredits: 22,
        courses: [
          { code: "16MCC204", title: "Web Programming", type: "Theory", credits: 3 },
          { code: "16MCC205", title: "Software Engineering", type: "Theory", credits: 3 },
          { code: "16MCC206", title: "Data Mining Techniques", type: "Theory", credits: 3 },
          { code: "16MCC212", title: "Web Programming Lab", type: "Practical", credits: 2 }
        ]
      },
      {
        semId: "sem_5",
        year: "3rd Year",
        semester: "Semester V",
        totalCredits: 22,
        courses: [
          { code: "16MCC301", title: "Information Security", type: "Theory", credits: 3 },
          { code: "16MCC302", title: "Cloud Computing", type: "Theory", credits: 3 },
          { code: "16MCC303", title: "Mobile Computing", type: "Theory", credits: 3 },
          { code: "16MCC311", title: "Advanced Computing Lab", type: "Practical", credits: 2 }
        ]
      },
      {
        semId: "sem_6",
        year: "3rd Year",
        semester: "Semester VI",
        totalCredits: 22,
        courses: [
          { code: "16MCC312", title: "Major Project Dissertation", type: "Project", credits: 18 },
          { code: "16MCC313", title: "Comprehensive Viva Voce", type: "Evaluation", credits: 4 }
        ]
      }
    ]
  }
];
