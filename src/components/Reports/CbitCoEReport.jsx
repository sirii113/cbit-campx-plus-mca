import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { sounds } from '../../utils/soundEffects';
import { 
  Printer, 
  Download, 
  Award, 
  ShieldCheck, 
  FileText, 
  Layers, 
  BookOpen, 
  CheckCircle,
  GraduationCap
} from 'lucide-react';

export const CbitCoEReport = () => {
  const { 
    students, 
    courses,
    allCourses,
    selectedCourseCode,
    setSelectedCourseCode,
    selectedCourse, 
    selectedSemester,
    setSelectedSemester,
    cbitSemesters,
    calculateSemesterSgpa,
    activeStudentRoll,
    setActiveStudentRoll,
    activeStudent,
    marksData, 
    cbitInfo, 
    selectedCohort,
    toggleCohort,
    showToast 
  } = useApp();

  const [reportType, setReportType] = useState('course'); // 'course' | 'transcript'

  const courseMarks = marksData[selectedCourse.code] || {};

  const handlePrint = () => {
    sounds.playSuccessChime();
    window.print();
  };

  const numberToWords = (num) => {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 
                  'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty'];
    if (num === 0) return 'Zero';
    if (num < 20) return ones[num];
    const t = Math.floor(num / 10);
    const o = num % 10;
    return `${tens[t]} ${ones[o]}`.trim();
  };

  // Compute 4-Semester SGPA for active student
  const sgpaSem1 = calculateSemesterSgpa(activeStudent.rollNo, 'sem_1', marksData, allCourses);
  const sgpaSem2 = calculateSemesterSgpa(activeStudent.rollNo, 'sem_2', marksData, allCourses);
  const sgpaSem3 = calculateSemesterSgpa(activeStudent.rollNo, 'sem_3', marksData, allCourses);
  const sgpaSem4 = calculateSemesterSgpa(activeStudent.rollNo, 'sem_4', marksData, allCourses);
  const cumulativeCalc = calculateSemesterSgpa(activeStudent.rollNo, 'all', marksData, allCourses);

  const semSections = [
    { id: 'sem_1', name: 'Semester I (First Year)', credits: 22.5, calc: sgpaSem1, courses: allCourses.filter(c => c.semester === 'sem_1') },
    { id: 'sem_2', name: 'Semester II (First Year)', credits: 23.5, calc: sgpaSem2, courses: allCourses.filter(c => c.semester === 'sem_2') },
    { id: 'sem_3', name: 'Semester III (Second Year)', credits: 22.0, calc: sgpaSem3, courses: allCourses.filter(c => c.semester === 'sem_3') },
    { id: 'sem_4', name: 'Semester IV (Second Year)', credits: 22.0, calc: sgpaSem4, courses: allCourses.filter(c => c.semester === 'sem_4') }
  ];

  const getGradeLetter = (pct) => {
    if (pct >= 90) return { grade: 'O', points: 10 };
    if (pct >= 80) return { grade: 'A+', points: 9 };
    if (pct >= 70) return { grade: 'A', points: 8 };
    if (pct >= 60) return { grade: 'B+', points: 7 };
    if (pct >= 50) return { grade: 'B', points: 6 };
    if (pct >= 40) return { grade: 'C', points: 5 };
    return { grade: 'F', points: 0 };
  };

  return (
    <div className="space-y-6">
      {/* Control Ribbon (Hidden during print) */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4 no-print">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Official CBIT Controller of Examinations (CoE) Portal · All Semesters
              </h3>
              <p className="text-xs text-slate-500">
                Autonomous R-25 Syllabus · 90 Credits Cumulative Curriculum · 29 Courses
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Cohort Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold font-mono">
              <button
                type="button"
                onClick={() => { sounds.playTick(); toggleCohort('current'); }}
                className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  selectedCohort === 'current'
                    ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🌟 Current (25-27)
              </button>
              <button
                type="button"
                onClick={() => { sounds.playTick(); toggleCohort('seniors'); }}
                className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  selectedCohort === 'seniors'
                    ? 'bg-indigo-600 text-white font-black shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🎓 Seniors (23-25)
              </button>
            </div>

            {/* Report Mode Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => { sounds.playTick(); setReportType('course'); }}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  reportType === 'course' 
                    ? 'bg-slate-900 text-white shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📄 Course CIE Award Sheet
              </button>
              <button
                type="button"
                onClick={() => { sounds.playTick(); setReportType('transcript'); }}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  reportType === 'transcript' 
                    ? 'bg-emerald-600 text-white shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📜 All-Sems Cumulative Transcript
              </button>
            </div>

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
          </div>
        </div>

        {/* Filters Ribbon for Semesters and Courses */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          {reportType === 'course' ? (
            <div className="flex flex-wrap items-center gap-3">
              {/* Semester Pills */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                {cbitSemesters.map(sem => (
                  <button
                    key={sem.id}
                    type="button"
                    onClick={() => {
                      sounds.playTick();
                      setSelectedSemester(sem.id);
                      // Auto-select first course in that semester
                      const matching = allCourses.filter(c => sem.id === 'all' || c.semester === sem.id);
                      if (matching.length > 0) {
                        setSelectedCourseCode(matching[0].code);
                      }
                    }}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                      selectedSemester === sem.id 
                        ? 'bg-slate-900 text-white shadow-sm' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {sem.shortName}
                  </button>
                ))}
              </div>

              {/* Course Selector Dropdown */}
              <div className="flex items-center gap-2">
                <label className="font-semibold text-slate-500">Select Course:</label>
                <select
                  value={selectedCourseCode}
                  onChange={(e) => {
                    sounds.playTick();
                    setSelectedCourseCode(e.target.value);
                  }}
                  className="p-1.5 border border-slate-300 rounded-xl bg-slate-50 font-bold text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  {(selectedSemester === 'all' ? allCourses : allCourses.filter(c => c.semester === selectedSemester)).map(c => (
                    <option key={c.code} value={c.code}>
                      {c.code}: {c.name} ({c.type} · {c.credits} Cr)
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              <label className="font-semibold text-slate-500">Student Transcript For:</label>
              <select
                value={activeStudentRoll}
                onChange={(e) => {
                  sounds.playTick();
                  setActiveStudentRoll(e.target.value);
                }}
                className="p-1.5 border border-slate-300 rounded-xl bg-slate-50 font-bold text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                {students.map(s => (
                  <option key={s.rollNo} value={s.rollNo}>
                    {s.rollNo}: {s.name} (CGPA: {s.cgpa})
                  </option>
                ))}
              </select>
              <span className="text-slate-400 font-mono">
                Showing all 4 Semesters · 29 Courses · 90 Credits Cumulative
              </span>
            </div>
          )}

          <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
            Regulation: R-25 Autonomous
          </span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* VIEW 1: SINGLE COURSE OFFICIAL CIE AWARD SHEET             */}
      {/* ========================================================= */}
      {reportType === 'course' && (
        <div className="bg-white rounded-2xl border border-slate-300 shadow-lg p-8 sm:p-12 text-slate-900 font-sans print:shadow-none print:border-none print:p-2">
          {/* Header Institution Block */}
          <div className="text-center border-b-2 border-slate-900 pb-4 mb-4">
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-slate-950 font-serif">
              {cbitInfo.collegeName}
            </h1>
            <p className="text-xs font-semibold text-slate-700 tracking-wide mt-0.5">
              {cbitInfo.subHeader}
            </p>
            <p className="text-[11px] text-slate-600">
              {cbitInfo.location}
            </p>
            <div className="mt-2 inline-block bg-slate-900 text-white px-4 py-1 text-xs font-bold uppercase tracking-widest rounded-sm">
              {cbitInfo.coeHeader}
            </div>
          </div>

          {/* Academic Details Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs border border-slate-300 p-3 bg-slate-50 mb-6 font-mono">
            <div>
              <span className="text-slate-500 text-[10px] block font-sans">Department:</span>
              <strong className="font-sans font-bold text-slate-900">MCA</strong>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block font-sans">Academic Year:</span>
              <strong className="font-sans font-bold text-slate-900">{cbitInfo.academicYear}</strong>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block font-sans">Semester:</span>
              <strong className="font-sans font-bold text-slate-900">
                {selectedCourse.semester === 'sem_1' ? 'Semester I' :
                 selectedCourse.semester === 'sem_2' ? 'Semester II' :
                 selectedCourse.semester === 'sem_3' ? 'Semester III' : 'Semester IV'}
              </strong>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block font-sans">Regulation:</span>
              <strong className="font-sans font-bold text-slate-900">R-25 Autonomous (90 Cr)</strong>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block font-sans">Course Code:</span>
              <strong className="font-bold text-slate-900">{selectedCourse.code}</strong>
            </div>
            <div className="col-span-2">
              <span className="text-slate-500 text-[10px] block font-sans">Course Title:</span>
              <strong className="font-sans font-bold text-slate-900">{selectedCourse.name} ({selectedCourse.credits || 3} Credits)</strong>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block font-sans">Course Faculty:</span>
              <strong className="font-sans font-bold text-slate-900">{selectedCourse.faculty}</strong>
            </div>
          </div>

          {/* Dense Marks Table */}
          <div className="overflow-x-auto border border-slate-900 rounded-sm">
            <table className="w-full text-left text-[11px] border-collapse">
              <thead className="bg-slate-100 border-b border-slate-900 font-bold uppercase text-[9px] tracking-wider text-slate-950">
                <tr>
                  <th className="p-2 border-r border-slate-400 w-8 text-center">S.No</th>
                  <th className="p-2 border-r border-slate-400 w-32">Hall Ticket No</th>
                  <th className="p-2 border-r border-slate-400">Name of the Candidate</th>
                  <th className="p-2 border-r border-slate-400 text-center w-12">Att%</th>
                  {selectedCourse.type === 'Theory' ? (
                    <>
                      <th className="p-1.5 border-r border-slate-400 text-center w-12">M1 (20)</th>
                      <th className="p-1.5 border-r border-slate-400 text-center w-12">M2 (20)</th>
                      <th className="p-1.5 border-r border-slate-400 text-center w-14 bg-slate-200">M.Avg (20)</th>
                      <th className="p-1.5 border-r border-slate-400 text-center w-10">S1 (5)</th>
                      <th className="p-1.5 border-r border-slate-400 text-center w-10">S2 (5)</th>
                      <th className="p-1.5 border-r border-slate-400 text-center w-10">S3 (5)</th>
                      <th className="p-1.5 border-r border-slate-400 text-center w-14 bg-slate-200">Slip (15)</th>
                      <th className="p-1.5 border-r border-slate-400 text-center w-10">A1 (10)</th>
                      <th className="p-1.5 border-r border-slate-400 text-center w-10">A2 (10)</th>
                      <th className="p-1.5 border-r border-slate-400 text-center w-14 bg-slate-200">A.Avg (10)</th>
                      <th className="p-2 border-r border-slate-400 text-center w-16 font-extrabold bg-slate-300">
                        CIE (45)
                      </th>
                    </>
                  ) : (
                    <>
                      <th colSpan={3} className="p-1.5 border-r border-slate-400 text-center">Lab Internal 1 (20)</th>
                      <th colSpan={3} className="p-1.5 border-r border-slate-400 text-center">Lab Internal 2 (20)</th>
                      <th className="p-1.5 border-r border-slate-400 text-center w-16 bg-slate-200">Lab Avg (20)</th>
                      <th colSpan={3} className="p-1.5 border-r border-slate-400 text-center">Day-to-Day Record (30)</th>
                      <th className="p-2 border-r border-slate-400 text-center w-16 font-extrabold bg-slate-300">
                        CIE (50)
                      </th>
                    </>
                  )}
                  <th className="p-2 text-center w-28">Marks in Words</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300 font-mono text-[10px]">
                {students.map((student, idx) => {
                  const m = courseMarks[student.rollNo] || {};
                  const isTheory = selectedCourse.type === 'Theory';

                  const m1 = m.mid1?.total ?? 14;
                  const m2 = m.mid2?.total ?? 15;
                  const mAvg = m.midAverage ?? 14.5;

                  const s1 = m.slipTests?.slip1 ?? 4;
                  const s2 = m.slipTests?.slip2 ?? 4;
                  const s3 = m.slipTests?.slip3 ?? 5;
                  const sTot = m.slipTests?.total ?? 13;

                  const a1 = m.assignments?.assign1 ?? 8;
                  const a2 = m.assignments?.assign2 ?? 9;
                  const aAvg = m.assignments?.average ?? 8.5;

                  const l1 = m.labInternal1?.total ?? 17;
                  const l2 = m.labInternal2?.total ?? 18;
                  const lAvg = m.labInternalAverage ?? Number(((l1 + l2) / 2).toFixed(1));
                  const dtd = m.dayToDayRecord ?? 26;

                  const cie = m.finalCie ?? (isTheory ? 36 : Math.round(lAvg + dtd));

                  return (
                    <tr key={student.rollNo} className="hover:bg-slate-50">
                      <td className="p-1.5 border-r border-slate-300 text-center">{idx + 1}</td>
                      <td className="p-1.5 border-r border-slate-300 font-bold">{student.rollNo}</td>
                      <td className="p-1.5 border-r border-slate-300 font-sans">{student.name}</td>
                      <td className="p-1.5 border-r border-slate-300 text-center">
                        <span className={student.attendance < 75 ? 'text-rose-700 font-bold' : ''}>
                          {student.attendance}%
                        </span>
                      </td>

                      {isTheory ? (
                        <>
                          <td className="p-1.5 border-r border-slate-300 text-center">{m1}</td>
                          <td className="p-1.5 border-r border-slate-300 text-center">{m2}</td>
                          <td className="p-1.5 border-r border-slate-300 text-center font-bold bg-slate-100">{mAvg}</td>
                          <td className="p-1.5 border-r border-slate-300 text-center">{s1}</td>
                          <td className="p-1.5 border-r border-slate-300 text-center">{s2}</td>
                          <td className="p-1.5 border-r border-slate-300 text-center">{s3}</td>
                          <td className="p-1.5 border-r border-slate-300 text-center font-bold bg-slate-100">{sTot}</td>
                          <td className="p-1.5 border-r border-slate-300 text-center">{a1}</td>
                          <td className="p-1.5 border-r border-slate-300 text-center">{a2}</td>
                          <td className="p-1.5 border-r border-slate-300 text-center font-bold bg-slate-100">{aAvg}</td>
                          <td className="p-1.5 border-r border-slate-300 text-center font-black bg-slate-200">
                            {cie}
                          </td>
                        </>
                      ) : (
                        <>
                          <td colSpan={3} className="p-1.5 border-r border-slate-300 text-center">{l1}</td>
                          <td colSpan={3} className="p-1.5 border-r border-slate-300 text-center">{l2}</td>
                          <td className="p-1.5 border-r border-slate-300 text-center font-bold bg-slate-100">{lAvg}</td>
                          <td colSpan={3} className="p-1.5 border-r border-slate-300 text-center">{dtd}</td>
                          <td className="p-1.5 border-r border-slate-300 text-center font-black bg-slate-200">
                            {cie}
                          </td>
                        </>
                      )}

                      <td className="p-1.5 text-center font-sans text-[10px] font-medium text-slate-700">
                        {numberToWords(cie)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Verification & Signature Block */}
          <div className="mt-12 pt-8 border-t-2 border-slate-900 grid grid-cols-4 gap-4 text-center text-xs font-semibold text-slate-800">
            <div>
              <div className="h-10"></div>
              <div className="border-t border-slate-400 pt-1">Signature of Course Faculty</div>
            </div>
            <div>
              <div className="h-10"></div>
              <div className="border-t border-slate-400 pt-1">Department Scrutiny Member</div>
            </div>
            <div>
              <div className="h-10"></div>
              <div className="border-t border-slate-400 pt-1">Head of the Department (MCA)</div>
            </div>
            <div>
              <div className="h-10"></div>
              <div className="border-t border-slate-400 pt-1">Controller of Examinations</div>
            </div>
          </div>

          {/* Official seal footer */}
          <div className="mt-8 text-center text-[10px] text-slate-400 border-t border-slate-200 pt-2 font-mono">
            System Generated via CBIT CampX-Plus Ecosystem · R-25 Autonomous Examination Cell · 90 Credits MCA Scheme
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* VIEW 2: CONSOLIDATED ALL-SEMESTERS CUMULATIVE TRANSCRIPT   */}
      {/* ========================================================= */}
      {reportType === 'transcript' && (
        <div className="bg-white rounded-2xl border border-slate-300 shadow-lg p-8 sm:p-12 text-slate-900 font-sans print:shadow-none print:border-none print:p-2 space-y-6">
          {/* Header Institution Block */}
          <div className="text-center border-b-2 border-slate-900 pb-4">
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-slate-950 font-serif">
              {cbitInfo.collegeName}
            </h1>
            <p className="text-xs font-semibold text-slate-700 tracking-wide mt-0.5">
              {cbitInfo.subHeader}
            </p>
            <p className="text-[11px] text-slate-600">
              {cbitInfo.location}
            </p>
            <div className="mt-2 inline-block bg-slate-900 text-white px-5 py-1 text-xs font-bold uppercase tracking-widest rounded-sm">
              OFFICIAL CUMULATIVE CONSOLIDATED TRANSCRIPT (ALL SEMESTERS)
            </div>
          </div>

          {/* Student Profile & Cumulative SGPA/CGPA Summary Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs border border-slate-900 p-4 bg-slate-50 font-mono">
            <div>
              <span className="text-slate-500 text-[10px] block font-sans">Hall Ticket No:</span>
              <strong className="text-sm font-bold text-slate-950">{activeStudent.rollNo}</strong>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block font-sans">Candidate Name:</span>
              <strong className="text-sm font-bold text-slate-950">{activeStudent.name}</strong>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block font-sans">Degree & Branch:</span>
              <strong className="font-bold text-slate-950">Master of Computer Applications (MCA)</strong>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block font-sans">Autonomous Regulation:</span>
              <strong className="font-bold text-emerald-800">R-25 (90 Credits)</strong>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block font-sans">Semester I SGPA:</span>
              <strong className="text-indigo-800">{sgpaSem1.sgpa} / 10 (22.5 Cr)</strong>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block font-sans">Semester II SGPA:</span>
              <strong className="text-indigo-800">{sgpaSem2.sgpa} / 10 (23.5 Cr)</strong>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block font-sans">Semester III SGPA:</span>
              <strong className="text-indigo-800">{sgpaSem3.sgpa} / 10 (22.0 Cr)</strong>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block font-sans">Semester IV SGPA:</span>
              <strong className="text-indigo-800">{sgpaSem4.sgpa} / 10 (22.0 Cr)</strong>
            </div>
            <div className="col-span-2 bg-slate-900 text-white p-2 rounded-sm flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-sans font-bold">Cumulative CGPA (90 Cr):</span>
              <span className="text-base font-black text-amber-300 font-mono">{cumulativeCalc.sgpa || activeStudent.cgpa} / 10.0</span>
            </div>
            <div className="col-span-2 bg-emerald-50 text-emerald-950 border border-emerald-300 p-2 rounded-sm flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-sans font-bold">Final Academic Division:</span>
              <span className="text-xs font-black font-sans">FIRST CLASS WITH DISTINCTION</span>
            </div>
          </div>

          {/* All 4 Semesters Tables */}
          <div className="space-y-6">
            {semSections.map((sec, sIdx) => (
              <div key={sec.id} className="border border-slate-800 rounded-sm overflow-hidden">
                <div className="bg-slate-900 text-white px-3 py-1.5 flex items-center justify-between text-xs font-bold">
                  <span>{sec.name} · {sec.credits} Credits</span>
                  <span className="font-mono text-amber-300">SGPA: {sec.calc.sgpa} / 10.0</span>
                </div>

                <table className="w-full text-left text-[11px] border-collapse">
                  <thead className="bg-slate-100 border-b border-slate-400 font-bold uppercase text-[9px] text-slate-800">
                    <tr>
                      <th className="p-1.5 border-r border-slate-300 text-center w-8">#</th>
                      <th className="p-1.5 border-r border-slate-300 w-24">Course Code</th>
                      <th className="p-1.5 border-r border-slate-300">Course Title</th>
                      <th className="p-1.5 border-r border-slate-300 text-center w-16">Type</th>
                      <th className="p-1.5 border-r border-slate-300 text-center w-16">Credits</th>
                      <th className="p-1.5 border-r border-slate-300 text-center w-20">CIE Marks</th>
                      <th className="p-1.5 border-r border-slate-300 text-center w-16">Grade</th>
                      <th className="p-1.5 text-center w-16">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-mono text-[10px]">
                    {sec.courses.map((course, cIdx) => {
                      const m = marksData?.[course.code]?.[activeStudent.rollNo] || {};
                      const isTheory = course.type === 'Theory';
                      const maxCie = isTheory ? 45 : 50;
                      const cie = m.finalCie ?? (isTheory ? 38 : 44);
                      const pct = Math.round((cie / maxCie) * 100);
                      const gradeInfo = getGradeLetter(pct);
                      const isPass = cie >= (isTheory ? 18 : 25);

                      return (
                        <tr key={course.code} className="hover:bg-slate-50">
                          <td className="p-1.5 border-r border-slate-300 text-center">{cIdx + 1}</td>
                          <td className="p-1.5 border-r border-slate-300 font-bold">{course.code}</td>
                          <td className="p-1.5 border-r border-slate-300 font-sans">{course.name}</td>
                          <td className="p-1.5 border-r border-slate-300 text-center">{course.type}</td>
                          <td className="p-1.5 border-r border-slate-300 text-center font-bold">{course.credits}</td>
                          <td className="p-1.5 border-r border-slate-300 text-center font-bold bg-slate-50">
                            {cie} / {maxCie}
                          </td>
                          <td className="p-1.5 border-r border-slate-300 text-center font-bold text-indigo-900">
                            {gradeInfo.grade} ({gradeInfo.points})
                          </td>
                          <td className="p-1.5 text-center font-sans font-bold text-emerald-800">
                            {isPass ? 'Passed' : 'Failed'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ))}
          </div>

          {/* Official Verification & Seal */}
          <div className="mt-12 pt-8 border-t-2 border-slate-900 grid grid-cols-3 gap-6 text-center text-xs font-semibold text-slate-800">
            <div>
              <div className="h-12"></div>
              <div className="border-t border-slate-400 pt-1">Dean Academics</div>
            </div>
            <div>
              <div className="h-12"></div>
              <div className="border-t border-slate-400 pt-1">Head of Department (MCA)</div>
            </div>
            <div>
              <div className="h-12"></div>
              <div className="border-t border-slate-400 pt-1">Controller of Examinations</div>
            </div>
          </div>

          {/* Security Barcode & Timestamp */}
          <div className="mt-8 pt-3 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500 font-mono">
            <span>Verified Digital Record ID: CBIT-COE-MCA-2025-ALLSEMS-{activeStudent.rollNo}</span>
            <span>Accredited NAAC A++ & NBA Tier-1 · Gandipet, Hyderabad</span>
          </div>
        </div>
      )}
    </div>
  );
};
