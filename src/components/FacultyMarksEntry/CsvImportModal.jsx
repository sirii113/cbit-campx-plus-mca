import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { sounds } from '../../utils/soundEffects';
import * as XLSX from 'xlsx';
import { 
  UploadCloud, 
  FileSpreadsheet, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  Download,
  Layers,
  FileCheck,
  Check
} from 'lucide-react';

export const CsvImportModal = ({ isOpen, onClose, examType }) => {
  const { selectedCourseCode, bulkUpdateMarks, showToast, students } = useApp();
  const [activeInputTab, setActiveInputTab] = useState('file'); // 'file' | 'paste'
  const [pasteData, setPasteData] = useState('');
  const [previewRows, setPreviewRows] = useState([]);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  // Process rows from either Excel JSON or CSV lines
  const processJsonRows = (jsonRows) => {
    setError(null);
    if (!jsonRows || jsonRows.length === 0) {
      setError('No data found in the spreadsheet.');
      setPreviewRows([]);
      return;
    }

    try {
      const parsed = [];
      jsonRows.forEach(row => {
        // Find roll number key in row (case-insensitive)
        const keys = Object.keys(row);
        const rollKey = keys.find(k => {
          const l = k.toLowerCase();
          return l.includes('roll') || l.includes('htno') || l.includes('hall') || l.includes('ticket') || l.includes('id');
        });

        if (!rollKey) return;
        const rawRoll = String(row[rollKey] || '').trim();
        if (!rawRoll) return;

        const cleanRoll = rawRoll.replace(/[^0-9A-Za-z-]/g, '');

        // Extract marks columns
        const findVal = (patterns, defaultVal = 0) => {
          for (const p of patterns) {
            const foundKey = keys.find(k => k.toLowerCase() === p || k.toLowerCase().includes(p));
            if (foundKey && row[foundKey] !== undefined && row[foundKey] !== '') {
              return Number(row[foundKey]);
            }
          }
          return defaultVal;
        };

        const q1 = findVal(['q1', 'slip1', 'assign1', 'lab1', 'mark', 'marks'], 4);
        const q2 = findVal(['q2', 'slip2', 'assign2', 'lab2'], 4);
        const q3 = findVal(['q3', 'slip3'], 4);
        const q4 = findVal(['q4'], 4);
        const q5 = findVal(['q5'], 4);
        const marks = findVal(['total', 'marks', 'score', 'lab1', 'lab2', 'daytoday', 'cie'], 18);

        const match = students.find(s => 
          s.rollNo === cleanRoll || 
          s.rollNo.replace(/-/g, '') === cleanRoll.replace(/-/g, '')
        );

        parsed.push({
          rollNo: cleanRoll,
          Q1: q1,
          Q2: q2,
          Q3: q3,
          Q4: q4,
          Q5: q5,
          marks: marks,
          slip1: q1,
          slip2: q2,
          slip3: q3,
          assign1: q1,
          assign2: q2,
          lab1: marks,
          lab2: marks,
          dayToDay: marks,
          isValid: !!match,
          studentName: match ? match.name : 'Unknown Roll Number'
        });
      });

      if (parsed.length === 0) {
        throw new Error('Could not identify student roll numbers in spreadsheet. Please ensure there is a "RollNo" or "HTNO" column.');
      }

      setPreviewRows(parsed);
      sounds.playSuccessChime();
    } catch (err) {
      setError(err.message);
      setPreviewRows([]);
    }
  };

  // Handle Excel (.xlsx, .xls) and CSV file uploads
  const handleFileUpload = (e) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = (evt) => {
      try {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet, { defval: '' });
        processJsonRows(json);
      } catch (err) {
        setError('Failed to parse spreadsheet file: ' + err.message);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  // Handle raw text/CSV copy-paste
  const handlePasteParse = (rawText) => {
    setError(null);
    if (!rawText.trim()) {
      setPreviewRows([]);
      return;
    }

    try {
      const workbook = XLSX.read(rawText, { type: 'string' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet, { defval: '' });
      processJsonRows(json);
    } catch (err) {
      setError('Failed to parse pasted text: ' + err.message);
    }
  };

  // Download official CBIT Excel / CSV Template
  const handleDownloadTemplate = (format = 'xlsx') => {
    sounds.playTick();
    const isLab = examType?.includes('lab') || examType?.includes('day');
    
    let templateData = [];
    if (isLab) {
      templateData = students.slice(0, 10).map(s => ({
        RollNo: s.rollNo,
        StudentName: s.name,
        LabInternal1_20M: 18,
        LabInternal2_20M: 19,
        DayToDay_30M: 27
      }));
    } else {
      templateData = students.slice(0, 10).map(s => ({
        RollNo: s.rollNo,
        StudentName: s.name,
        Mid1_Q1: 4,
        Mid1_Q2: 4,
        Mid1_Q3: 3,
        Mid1_Q4: 4,
        Mid1_Q5: 4,
        Total_20M: 19
      }));
    }

    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "CBIT_R25_Marks_Template");

    if (format === 'xlsx') {
      XLSX.writeFile(wb, `CBIT_MCA_${selectedCourseCode}_${examType}_Template.xlsx`);
    } else {
      XLSX.writeFile(wb, `CBIT_MCA_${selectedCourseCode}_${examType}_Template.csv`);
    }

    showToast(`Downloaded official ${format.toUpperCase()} template!`, 'success');
  };

  const handleApplyImport = () => {
    if (previewRows.length === 0) return;
    const validRows = previewRows.filter(r => r.isValid);
    if (validRows.length === 0) {
      sounds.playAlertTone();
      setError('No matching CBIT MCA roll numbers found in the uploaded file.');
      return;
    }

    bulkUpdateMarks(selectedCourseCode, examType, validRows);
    sounds.playSuccessChime();
    onClose();
  };

  const validCount = previewRows.filter(r => r.isValid).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh] text-slate-900">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white p-5 flex items-center justify-between border-b border-indigo-950">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-400/20">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-lg leading-tight">Excel (.xlsx) & CSV Marks Importer</h3>
                <span className="text-[10px] bg-emerald-400 text-slate-950 font-black px-2 py-0.5 rounded-full uppercase">
                  R-25 Engine
                </span>
              </div>
              <p className="text-xs text-indigo-200 mt-0.5">
                Target: <strong className="text-amber-300 font-mono">{selectedCourseCode}</strong> · Exam: <strong className="text-white uppercase font-mono">{examType}</strong>
              </p>
            </div>
          </div>

          <button onClick={onClose} className="text-white/70 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Mode Selector & Template Downloads */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex bg-slate-200/80 p-0.5 rounded-xl border border-slate-300">
            <button
              onClick={() => { sounds.playTick(); setActiveInputTab('file'); }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                activeInputTab === 'file' ? 'bg-white text-indigo-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              <UploadCloud className="w-3.5 h-3.5 text-indigo-600" />
              <span>Upload File (.xlsx / .csv)</span>
            </button>

            <button
              onClick={() => { sounds.playTick(); setActiveInputTab('paste'); }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                activeInputTab === 'paste' ? 'bg-white text-indigo-900 shadow-sm' : 'text-slate-600'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-indigo-600" />
              <span>Copy-Paste Table</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-slate-500">Official Templates:</span>
            <button
              onClick={() => handleDownloadTemplate('xlsx')}
              className="flex items-center gap-1 px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-lg text-[11px] font-bold transition-colors cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>Excel (.xlsx)</span>
            </button>
            <button
              onClick={() => handleDownloadTemplate('csv')}
              className="flex items-center gap-1 px-2.5 py-1 bg-blue-50 hover:bg-blue-100 border border-blue-300 text-blue-800 rounded-lg text-[11px] font-bold transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-blue-600" />
              <span>CSV (.csv)</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* TAB 1: File Upload (.xlsx, .xls, .csv) */}
          {activeInputTab === 'file' && (
            <div className="space-y-3">
              <input 
                type="file" 
                ref={fileInputRef}
                accept=".xlsx, .xls, .csv" 
                onChange={handleFileUpload} 
                className="hidden" 
              />

              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-indigo-300 hover:border-indigo-600 rounded-2xl p-6 text-center cursor-pointer bg-indigo-50/40 hover:bg-indigo-50/70 transition-all group"
              >
                <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-100 group-hover:bg-indigo-200 text-indigo-600 flex items-center justify-center mb-2 transition-colors">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm text-slate-800">
                  {fileName ? `Selected: ${fileName}` : 'Click to Upload Excel (.xlsx, .xls) or CSV (.csv) file'}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Supports sheets exported from Google Sheets, Microsoft Excel, CampX, or custom marks sheets.
                </p>
                <span className="inline-block mt-3 px-3 py-1 bg-indigo-600 text-white rounded-lg text-xs font-bold shadow-md shadow-indigo-600/20">
                  {fileName ? 'Change File' : 'Browse Computer'}
                </span>
              </div>
            </div>
          )}

          {/* TAB 2: Text / Copy-Paste */}
          {activeInputTab === 'paste' && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                Paste Spreadsheet Data (Excel Columns or CSV Lines):
              </label>
              <textarea
                rows={5}
                value={pasteData}
                onChange={(e) => {
                  setPasteData(e.target.value);
                  handlePasteParse(e.target.value);
                }}
                placeholder={`RollNo\tQ1\tQ2\tTotal\n1601-25-862-001\t4\t4\t18\n1601-25-862-002\t4\t4\t19`}
                className="w-full p-3 font-mono text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50"
              />
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-300 text-xs text-rose-800 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Parsed Preview Table */}
          {previewRows.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-700">
                  Parsed Records ({previewRows.length} total):
                </span>
                <span className="font-mono text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                  ✓ {validCount} valid CBIT MCA students matched
                </span>
              </div>

              <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-100 text-slate-700 font-bold sticky top-0 border-b border-slate-200">
                    <tr>
                      <th className="p-2 border-r">Status</th>
                      <th className="p-2 border-r">Roll Number</th>
                      <th className="p-2 border-r">Candidate Name</th>
                      <th className="p-2 text-center">Parsed Marks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {previewRows.map((row, idx) => (
                      <tr key={idx} className={row.isValid ? 'hover:bg-slate-50' : 'bg-rose-50/60'}>
                        <td className="p-2 border-r text-center">
                          {row.isValid ? (
                            <span className="text-emerald-600 font-bold text-[11px]">✓ Ready</span>
                          ) : (
                            <span className="text-rose-600 font-bold text-[11px]">✗ Not in Cohort</span>
                          )}
                        </td>
                        <td className="p-2 border-r font-bold text-slate-800">{row.rollNo}</td>
                        <td className="p-2 border-r font-sans text-slate-700">{row.studentName}</td>
                        <td className="p-2 text-center font-bold text-indigo-600">
                          {row.marks || row.Q1 || 0} Marks
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">
            {validCount > 0 ? `${validCount} students ready to update in R-25 Engine` : 'Select or paste a file above'}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              disabled={validCount === 0}
              onClick={handleApplyImport}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                validCount > 0
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-indigo-600/20 cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>Apply & Batch-Update ({validCount})</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};