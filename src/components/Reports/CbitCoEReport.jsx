import React from 'react';
import { useApp } from '../../context/AppContext';
import { Printer, Download, Award, ShieldCheck } from 'lucide-react';

export const CbitCoEReport = () => {
  const { students, selectedCourse, marksData, cbitInfo, showToast } = useApp();
  const courseMarks = marksData[selectedCourse.code] || {};

  const handlePrint = () => {
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

  return (
    <div className="space-y-6">
      {/* Control Ribbon (Hidden during print) */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
        <div className="flex items-center gap-2.5">
          <Award className="w-5 h-5 text-emerald-600" />
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Official CBIT Controller of Examinations (CoE) CIE Marksheet
            </h3>
            <p className="text-xs text-slate-500">Autonomous R-25 Syllabus · Mid Average (20M) + Slip Tests (15M) + Assignment Avg (10M)</p>
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save as PDF</span>
        </button>
      </div>

      {/* Official Print-Ready Marksheet Document */}
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
            <strong className="font-sans font-bold text-slate-900">{cbitInfo.currentSemester}</strong>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block font-sans">Regulation:</span>
            <strong className="font-sans font-bold text-slate-900">{cbitInfo.regulation}</strong>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block font-sans">Course Code:</span>
            <strong className="font-bold text-slate-900">{selectedCourse.code}</strong>
          </div>
          <div className="col-span-2">
            <span className="text-slate-500 text-[10px] block font-sans">Course Title:</span>
            <strong className="font-sans font-bold text-slate-900">{selectedCourse.name}</strong>
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
          System Generated via CBIT CampX-Plus Ecosystem · R-25 Syllabus Autonomous Examination Cell
        </div>
      </div>
    </div>
  );
};
