// CBIT MCA Academic Structure & Realistic Cohort Dataset - R25 Regulation
// Chaitanya Bharathi Institute of Technology (Autonomous), Hyderabad
// Department of Computer Applications (MCA) - R25 Autonomous Syllabus
// All Courses Start with 25MCC & All Authentic CBIT MCA Faculty (Sirs and Mams)

import { ALL_COURSES, CBIT_SEMESTERS } from './mcaAllCourses';
import { MCA_SENIORS_STUDENTS } from './mcaSeniorsData';

export const CBIT_INFO = {
  collegeName: "Chaitanya Bharathi Institute of Technology (Autonomous)",
  subHeader: "Affiliated to Osmania University | Accredited by NBA & NAAC (A++)",
  location: "Kokapet (V), Gandipet, Hyderabad, Telangana - 500075",
  department: "Department of Computer Applications (MCA)",
  academicYear: "MCA 2024 Senior Batch",
  currentSemester: "Semester IV (Completed · 90 Credits)",
  cohortName: "CBIT MCA 2024 Senior Batch",
  rollPrefix: "1601-24-862",
  regulation: "R-25 Autonomous Syllabus",
  cieSchemeDescription: "R25 Scheme: Mid Average (20M) + 3 Slip Tests (5M each = 15M) + Assignment Average (10M) = 45M Total CIE",
  coeHeader: "CONTROLLER OF EXAMINATIONS - CONTINUOUS INTERNAL EVALUATION (CIE) REPORT (MCA 2024 BATCH)"
};

// All Authentic CBIT MCA Faculty Members (Sirs and Mams)
export const CBIT_MCA_FACULTY = [
  {
    id: "fac_indira",
    name: "Dr. B. Indira",
    title: "Mam",
    designation: "Associate Professor & Head of the Department (HoD)",
    email: "b.indira@cbit.ac.in",
    password: "cbit@mca2025",
    specialization: "Data Structures, Algorithms & Machine Learning",
    assignedCourses: ["25MCC101", "25MCC111"],
    role: "faculty"
  },
  {
    id: "fac_gnr_prasad",
    name: "Dr. G. N. R. Prasad",
    title: "Sir",
    designation: "Assistant Professor & Public Relations Officer (PRO)",
    email: "gnrprasad_mca@cbit.ac.in",
    password: "cbit@mca2025",
    specialization: "Advanced Database Management Systems & Data Science",
    assignedCourses: ["25MCC103", "25MCC113"],
    role: "faculty"
  },
  {
    id: "fac_ramchander",
    name: "Dr. M. Ramchander",
    title: "Sir",
    designation: "Assistant Professor",
    email: "mramchander_mca@cbit.ac.in",
    password: "cbit@mca2025",
    specialization: "Cloud Computing, DevOps & Virtualization",
    assignedCourses: ["25MCC105", "25MCC113"],
    role: "faculty"
  },
  {
    id: "fac_krishna_prasad",
    name: "Sri P. Krishna Prasad",
    title: "Sir",
    designation: "Assistant Professor",
    email: "pkrishnaprasad_mca@cbit.ac.in",
    password: "cbit@mca2025",
    specialization: "Software Engineering, Agile Methodologies & Project Management",
    assignedCourses: ["25MCC104", "25MCC115"],
    role: "faculty"
  },
  {
    id: "fac_srinivas_kumar",
    name: "Sri B. Srinivas S. P. Kumar",
    title: "Sir",
    designation: "Assistant Professor",
    email: "srinivaskumar_mca@cbit.ac.in",
    password: "cbit@mca2025",
    specialization: "Full Stack Web Development & Microservices Architecture",
    assignedCourses: ["25MCC102", "25MCC112"],
    role: "faculty"
  },
  {
    id: "fac_rambabu",
    name: "Mr. Rambabu Potabattula",
    title: "Sir",
    designation: "Assistant Professor",
    email: "rambabu_mca@cbit.ac.in",
    password: "cbit@mca2025",
    specialization: "Mobile Application Development & Cyber Security",
    assignedCourses: ["25MCC107", "25MCC108"],
    role: "faculty"
  },
  {
    id: "fac_jayaram",
    name: "Dr. D. Jayaram",
    title: "Sir",
    designation: "Assistant Professor",
    email: "djayaram_mca@cbit.ac.in",
    password: "cbit@mca2025",
    specialization: "Distributed Systems & Machine Learning Algorithms",
    assignedCourses: ["25MCC106", "25MCC114"],
    role: "faculty"
  },
  {
    id: "fac_kavitha",
    name: "Smt. G. Kavitha",
    title: "Mam",
    designation: "Assistant Professor",
    email: "gkavitha_mca@cbit.ac.in",
    password: "cbit@mca2025",
    specialization: "Big Data Analytics & Python Deep Learning",
    assignedCourses: ["25MCC109", "25MCC114"],
    role: "faculty"
  },
  {
    id: "fac_suresh",
    name: "Dr. P. Suresh",
    title: "Sir",
    designation: "Associate Professor",
    email: "psuresh_mca@cbit.ac.in",
    password: "cbit@mca2025",
    specialization: "Natural Language Processing & Generative AI",
    assignedCourses: ["25MCC110", "25MCC115"],
    role: "faculty"
  },
  {
    id: "fac_sravanthi",
    name: "Smt. T. Sravanthi",
    title: "Mam",
    designation: "Assistant Professor",
    email: "tsravanthi_mca@cbit.ac.in",
    password: "cbit@mca2025",
    specialization: "Web Technologies & Database Administration",
    assignedCourses: ["25MCC102", "25MCC112"],
    role: "faculty"
  }
];

export const DEMO_USERS = {
  faculty: CBIT_MCA_FACULTY,
  students: [
    {
      id: "std_01",
      rollNo: "1601-24-862-001",
      email: "160124862001@cbit.org.in",
      password: "cbit@mca2025",
      name: "K. Venkata Sai (Oracle India · ₹16 LPA)",
      role: "student"
    },
    {
      id: "std_02",
      rollNo: "1601-24-862-002",
      email: "160124862002@cbit.org.in",
      password: "cbit@mca2025",
      name: "P. Harika Reddy (ServiceNow · ₹14.5 LPA)",
      role: "student"
    },
    {
      id: "std_03",
      rollNo: "1601-24-862-003",
      email: "160124862003@cbit.org.in",
      password: "cbit@mca2025",
      name: "Ch. Sai Teja (Salesforce · ₹12 LPA)",
      role: "student"
    },
    {
      id: "std_31",
      rollNo: "1601-24-862-031",
      email: "160124862031@cbit.org.in",
      password: "cbit@mca2025",
      name: "K. Ananya (Google Cloud AI · ₹24 LPA)",
      role: "student"
    }
  ]
};

export const BLOOMS_LEVELS = [
  { code: "L1", name: "Remembering", color: "bg-blue-100 text-blue-800 border-blue-300" },
  { code: "L2", name: "Understanding", color: "bg-teal-100 text-teal-800 border-teal-300" },
  { code: "L3", name: "Applying", color: "bg-emerald-100 text-emerald-800 border-emerald-300" },
  { code: "L4", name: "Analyzing", color: "bg-amber-100 text-amber-800 border-amber-300" },
  { code: "L5", name: "Evaluating", color: "bg-orange-100 text-orange-800 border-orange-300" },
  { code: "L6", name: "Creating", color: "bg-purple-100 text-purple-800 border-purple-300" }
];

export const COURSE_OUTCOMES = [
  { id: "CO1", description: "Analyze fundamental algorithmic structures, computational complexities, and abstract data types." },
  { id: "CO2", description: "Design efficient data models and implement non-linear hierarchical structures (Trees, Graphs)." },
  { id: "CO3", description: "Apply advanced algorithmic strategies including Dynamic Programming, Greedy approaches, and Backtracking." },
  { id: "CO4", description: "Evaluate problem solving techniques using amortized analysis and randomized algorithms." },
  { id: "CO5", description: "Formulate end-to-end software solutions adhering to clean architectural design and software engineering standards." }
];

export const PROGRAM_OUTCOMES = [
  { id: "PO1", name: "Computational Knowledge" },
  { id: "PO2", name: "Problem Analysis" },
  { id: "PO3", name: "Design / Development of Solutions" },
  { id: "PO4", name: "Conduct Investigations of Complex Computing Problems" },
  { id: "PO5", name: "Modern Tool Usage (Git, Cloud, Docker)" },
  { id: "PO6", name: "Professional Ethics & Security" },
  { id: "PO7", name: "Life-long Learning & Employability" }
];

// Complete Autonomous R25 Courses Across All 4 Semesters (29 Courses)
export { ALL_COURSES, CBIT_SEMESTERS };
export const COURSES = ALL_COURSES;


// Authentic CBIT MCA 2024 Senior Batch Scholars (1601-24-862-001 through 060)
export const MCA_STUDENTS = MCA_SENIORS_STUDENTS;

// Helper to calculate R25 CIE:
// Mid Average (20) + Slip Tests (15: 3 x 5M) + Assignment Average (10: (A1 + A2) / 2) = 45 Max CIE
export function calculateR25Cie(mid1Total, mid2Total, slip1, slip2, slip3, assign1, assign2) {
  const m1 = Number(mid1Total) || 0;
  const m2 = Number(mid2Total) || 0;
  const midAvg = Number(((m1 + m2) / 2).toFixed(1)); // max 20

  const s1 = Number(slip1) || 0; // max 5
  const s2 = Number(slip2) || 0; // max 5
  const s3 = Number(slip3) || 0; // max 5
  const slipTotal = s1 + s2 + s3; // max 15

  const a1 = Number(assign1) || 0; // max 10
  const a2 = Number(assign2) || 0; // max 10
  const assignAvg = Number(((a1 + a2) / 2).toFixed(1)); // max 10

  const finalCie = Math.round(midAvg + slipTotal + assignAvg); // max 45
  const maxCie = 45;
  const status = finalCie >= 18 ? "Pass" : "Remedial Needed";

  return {
    midAvg,
    slipTotal,
    assignAvg,
    finalCie,
    maxCie,
    status
  };
}

// Generate realistic initial marks compliant with R25 Syllabus for ALL 25MCC Courses
export function generateInitialMarks() {
  const marks = {};

  COURSES.forEach(course => {
    marks[course.code] = {};
    MCA_STUDENTS.forEach(student => {
      const cgpaRatio = (student.cgpa - 5.5) / 4.5; // 0.1 to 1.0

      if (course.type === "Theory") {
        const q1_m1 = Math.min(4, Math.max(1, Math.round(cgpaRatio * 3.8 + (Math.sin(student.cgpa * 2) * 0.4))));
        const q2_m1 = Math.min(4, Math.max(1, Math.round(cgpaRatio * 3.7 + (Math.cos(student.cgpa * 3) * 0.4))));
        const q3_m1 = Math.min(4, Math.max(1, Math.round(cgpaRatio * 3.9 + (Math.sin(student.cgpa * 5) * 0.3))));
        const q4_m1 = Math.min(4, Math.max(1, Math.round(cgpaRatio * 3.6 + (Math.cos(student.cgpa * 2) * 0.5))));
        const q5_m1 = Math.min(4, Math.max(1, Math.round(cgpaRatio * 3.7 + (Math.sin(student.cgpa * 4) * 0.4))));
        const mid1Total = q1_m1 + q2_m1 + q3_m1 + q4_m1 + q5_m1;

        const q1_m2 = Math.min(4, Math.max(1, Math.round(cgpaRatio * 3.9 + (Math.cos(student.cgpa * 1.5) * 0.3))));
        const q2_m2 = Math.min(4, Math.max(1, Math.round(cgpaRatio * 3.8 + (Math.sin(student.cgpa * 2.5) * 0.4))));
        const q3_m2 = Math.min(4, Math.max(1, Math.round(cgpaRatio * 3.7 + (Math.cos(student.cgpa * 4) * 0.4))));
        const q4_m2 = Math.min(4, Math.max(1, Math.round(cgpaRatio * 3.6 + (Math.sin(student.cgpa * 1.8) * 0.4))));
        const q5_m2 = Math.min(4, Math.max(1, Math.round(cgpaRatio * 3.8 + (Math.cos(student.cgpa * 3.2) * 0.3))));
        const mid2Total = q1_m2 + q2_m2 + q3_m2 + q4_m2 + q5_m2;

        const slipTest1 = Math.min(5, Math.max(1, Math.round(cgpaRatio * 4.8 + 0.2)));
        const slipTest2 = Math.min(5, Math.max(1, Math.round(cgpaRatio * 4.6 + (Math.cos(student.cgpa * 2) * 0.4))));
        const slipTest3 = Math.min(5, Math.max(1, Math.round(cgpaRatio * 4.9 + (Math.sin(student.cgpa * 3) * 0.3))));

        const assignment1 = Math.min(10, Math.max(3, Math.round(cgpaRatio * 9.4 + 0.6)));
        const assignment2 = Math.min(10, Math.max(4, Math.round(cgpaRatio * 9.6 + 0.4)));

        const r25 = calculateR25Cie(
          mid1Total,
          mid2Total,
          slipTest1,
          slipTest2,
          slipTest3,
          assignment1,
          assignment2
        );

        marks[course.code][student.rollNo] = {
          mid1: {
            Q1: q1_m1, Q2: q2_m1, Q3: q3_m1, Q4: q4_m1, Q5: q5_m1,
            total: mid1Total
          },
          mid2: {
            Q1: q1_m2, Q2: q2_m2, Q3: q3_m2, Q4: q4_m2, Q5: q5_m2,
            total: mid2Total
          },
          midAverage: r25.midAvg,
          slipTests: {
            slip1: slipTest1,
            slip2: slipTest2,
            slip3: slipTest3,
            total: r25.slipTotal
          },
          assignments: {
            assign1: assignment1,
            assign2: assignment2,
            average: r25.assignAvg
          },
          finalCie: r25.finalCie,
          maxCie: r25.maxCie,
          attendancePercentage: student.attendance,
          status: r25.status,
          evaluatedAt: "2026-11-20T10:30:00.000Z"
        };
      } else {
        // CBIT Autonomous Practical Evaluation Scheme:
        // Lab Internal 1 (20 Marks Total): Writeup (5M) + Execution (10M) + Viva (5M)
        // Lab Internal 2 (20 Marks Total): Writeup (5M) + Execution (10M) + Viva (5M)
        // Lab Internals Average = (Lab1 + Lab2) / 2 = 20 Marks Max
        // Day-to-Day Continuous Observation & Record = 30 Marks Max
        // Total Lab CIE = Lab Internals Average (20M) + Day-to-Day (30M) = 50 Marks Max
        const lab1_w = Math.min(5, Math.max(2, Math.round(cgpaRatio * 4.6 + 0.3)));
        const lab1_e = Math.min(10, Math.max(4, Math.round(cgpaRatio * 9.2 + 0.5)));
        const lab1_v = Math.min(5, Math.max(2, Math.round(cgpaRatio * 4.7 + 0.2)));
        const lab1_tot = lab1_w + lab1_e + lab1_v; // out of 20

        const lab2_w = Math.min(5, Math.max(2, Math.round(cgpaRatio * 4.8 + 0.2)));
        const lab2_e = Math.min(10, Math.max(4, Math.round(cgpaRatio * 9.4 + 0.4)));
        const lab2_v = Math.min(5, Math.max(2, Math.round(cgpaRatio * 4.6 + 0.3)));
        const lab2_tot = lab2_w + lab2_e + lab2_v; // out of 20

        const labInternalAvg = Number(((lab1_tot + lab2_tot) / 2).toFixed(1));
        const dayToDay = Math.min(30, Math.max(14, Math.round(cgpaRatio * 28 + 2)));
        const finalLabCie = Math.round(labInternalAvg + dayToDay);

        const code_correctness = Math.min(30, Math.max(12, Math.round(cgpaRatio * 28 + 2)));
        const code_quality = Math.min(25, Math.max(10, Math.round(cgpaRatio * 24 + 1)));
        const viva_voce = Math.min(25, Math.max(10, Math.round(cgpaRatio * 23 + 2)));
        const record_doc = Math.min(20, Math.max(10, Math.round(cgpaRatio * 19 + 1)));

        marks[course.code][student.rollNo] = {
          labInternal1: {
            writeup: lab1_w,
            execution: lab1_e,
            viva: lab1_v,
            total: lab1_tot // 20M Max
          },
          labInternal2: {
            writeup: lab2_w,
            execution: lab2_e,
            viva: lab2_v,
            total: lab2_tot // 20M Max
          },
          labInternalAverage: labInternalAvg, // 20M Max
          dayToDayRecord: dayToDay,           // 30M Max
          rubricScores: {
            code_correctness,
            code_quality,
            viva_voce,
            record_doc
          },
          finalCie: finalLabCie, // 50M Max
          maxCie: 50,
          gitRepoUrl: `https://github.com/${student.github}/cbit-mca-lab-2025`,
          gitCommitCount: Math.round(cgpaRatio * 45 + 10),
          status: finalLabCie >= 25 ? "Pass" : "Remedial Needed",
          evaluatedAt: "2026-11-20T14:15:00.000Z"
        };
      }
    });
  });

  return marks;
}

// Calculate semester SGPA for a student based on courses and marks across all sems
export function calculateSemesterSgpa(rollNo, semId = 'sem_1', marksData = {}, coursesList = ALL_COURSES) {
  const semCourses = semId === 'all' 
    ? coursesList 
    : coursesList.filter(c => c.semesterId === semId);

  let totalGradePoints = 0;
  let totalCredits = 0;

  semCourses.forEach(course => {
    const mark = marksData?.[course.code]?.[rollNo];
    const cie = mark?.finalCie ?? (course.type === 'Theory' ? 38 : 45);
    const maxCie = course.type === 'Theory' ? 45 : 50;
    const percentage = (cie / maxCie) * 100;

    let gp = 0;
    if (percentage >= 90) gp = 10;
    else if (percentage >= 80) gp = 9;
    else if (percentage >= 70) gp = 8;
    else if (percentage >= 60) gp = 7;
    else if (percentage >= 50) gp = 6;
    else if (percentage >= 40) gp = 5;
    else gp = 0;

    const cr = course.credits || 3;
    totalGradePoints += gp * cr;
    totalCredits += cr;
  });

  const sgpa = totalCredits > 0 ? Number((totalGradePoints / totalCredits).toFixed(2)) : 8.5;
  return {
    sgpa,
    totalCredits,
    coursesCount: semCourses.length
  };
}
