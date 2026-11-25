// Analytical & Mathematical Engines for CBIT MCA Performance Ecosystem

// 1. OBE & Bloom's Taxonomy Attainment Engine
export function calculateObeAttainment(course, marksData, students) {
  if (!course || course.type === "Practical" || !marksData || !marksData[course.code]) {
    return { coAttainment: [], bloomAttainment: [], overallAttainmentLevel: 3, percentagePassed: 92 };
  }

  const courseMarks = marksData[course.code];
  const totalStudents = students.length;
  if (totalStudents === 0) return { coAttainment: [], bloomAttainment: [], overallAttainmentLevel: 3, percentagePassed: 100 };

  // Map questions from Mid1 and Mid2
  const allQuestions = [
    ...(course.examQuestions?.mid1?.map(q => ({ ...q, exam: "Mid 1" })) || []),
    ...(course.examQuestions?.mid2?.map(q => ({ ...q, exam: "Mid 2" })) || [])
  ];

  // Outcome buckets
  const coBuckets = {
    CO1: { targetStudents: 0, totalAttempts: 0, title: "Algorithmic Fundamentals" },
    CO2: { targetStudents: 0, totalAttempts: 0, title: "Non-Linear Data Structures" },
    CO3: { targetStudents: 0, totalAttempts: 0, title: "Advanced Problem Solving" },
    CO4: { targetStudents: 0, totalAttempts: 0, title: "Complex Systems Analysis" },
    CO5: { targetStudents: 0, totalAttempts: 0, title: "System Synthesis & Design" }
  };

  const bloomBuckets = {
    L1: { attained: 0, total: 0, label: "L1 Remember" },
    L2: { attained: 0, total: 0, label: "L2 Understand" },
    L3: { attained: 0, total: 0, label: "L3 Apply" },
    L4: { attained: 0, total: 0, label: "L4 Analyze" },
    L5: { attained: 0, total: 0, label: "L5 Evaluate" },
    L6: { attained: 0, total: 0, label: "L6 Create" }
  };

  let totalPassStudents = 0;

  students.forEach(student => {
    const sMark = courseMarks[student.rollNo];
    if (!sMark) return;

    if (sMark.finalCie >= 12) totalPassStudents++;

    // Evaluate Mid 1 questions
    course.examQuestions?.mid1?.forEach(q => {
      const qScore = sMark.mid1?.[q.qNo] || 0;
      const isTargetMet = (qScore / q.maxMarks) >= 0.6; // 60% mark benchmark
      if (coBuckets[q.co]) {
        coBuckets[q.co].totalAttempts++;
        if (isTargetMet) coBuckets[q.co].targetStudents++;
      }
      if (bloomBuckets[q.bloom]) {
        bloomBuckets[q.bloom].total++;
        if (isTargetMet) bloomBuckets[q.bloom].attained++;
      }
    });

    // Evaluate Mid 2 questions
    course.examQuestions?.mid2?.forEach(q => {
      const qScore = sMark.mid2?.[q.qNo] || 0;
      const isTargetMet = (qScore / q.maxMarks) >= 0.6;
      if (coBuckets[q.co]) {
        coBuckets[q.co].totalAttempts++;
        if (isTargetMet) coBuckets[q.co].targetStudents++;
      }
      if (bloomBuckets[q.bloom]) {
        bloomBuckets[q.bloom].total++;
        if (isTargetMet) bloomBuckets[q.bloom].attained++;
      }
    });
  });

  const coAttainment = Object.keys(coBuckets).map(coKey => {
    const bucket = coBuckets[coKey];
    const percentage = bucket.totalAttempts > 0 
      ? Math.round((bucket.targetStudents / bucket.totalAttempts) * 100) 
      : 80;
    
    // NBA Attainment Level Rubric
    let level = 1;
    if (percentage >= 70) level = 3;
    else if (percentage >= 60) level = 2;

    return {
      co: coKey,
      title: bucket.title,
      attainmentPercentage: percentage,
      level: level,
      targetThreshold: course.targetAttainmentThreshold || 60,
      status: percentage >= (course.targetAttainmentThreshold || 60) ? "Attained" : "Review Needed"
    };
  });

  const bloomAttainment = Object.keys(bloomBuckets).map(bloomKey => {
    const bucket = bloomBuckets[bloomKey];
    const pct = bucket.total > 0 ? Math.round((bucket.attained / bucket.total) * 100) : 75;
    return {
      bloom: bloomKey,
      label: bucket.label,
      percentage: pct
    };
  });

  const avgAttainmentPct = Math.round(coAttainment.reduce((acc, c) => acc + c.attainmentPercentage, 0) / (coAttainment.length || 1));
  let overallLevel = 1;
  if (avgAttainmentPct >= 70) overallLevel = 3;
  else if (avgAttainmentPct >= 60) overallLevel = 2;

  const percentagePassed = Math.round((totalPassStudents / totalStudents) * 100);

  return {
    coAttainment,
    bloomAttainment,
    overallAttainmentLevel: overallLevel,
    avgAttainmentPct,
    percentagePassed
  };
}

// 2. Early Warning System (EWS) & Risk Prediction Engine
export function computeStudentRisk(student, marksData, courseCode) {
  const attendance = student.attendance;
  const sMark = marksData?.[courseCode]?.[student.rollNo];
  
  let cieScore = sMark?.finalCie || 20;
  let maxCie = sMark?.maxCie || 30;
  let ciePercentage = Math.round((cieScore / maxCie) * 100);

  let mid1Total = sMark?.mid1?.total || 14;
  let mid2Total = sMark?.mid2?.total || 15;
  let midDrop = mid1Total - mid2Total; // Drop > 4 is concerning

  let riskScore = 0; // 0 - 100 (Higher = more risk)
  let riskReasons = [];

  // Attendance risk (CBIT rules: <75% condonation/detention, <65% strictly detained)
  if (attendance < 65) {
    riskScore += 45;
    riskReasons.push("Critical Attendance Deficit (<65% - Detention Danger)");
  } else if (attendance < 75) {
    riskScore += 30;
    riskReasons.push("Attendance in Condonation Zone (<75%)");
  }

  // CIE Performance risk
  if (ciePercentage < 40) {
    riskScore += 40;
    riskReasons.push("Failing CIE Benchmark (<40% Internal Marks)");
  } else if (ciePercentage < 55) {
    riskScore += 20;
    riskReasons.push("Marginal CIE Pass Margin (Risk of Backlog in SEE)");
  }

  // Negative performance trend
  if (midDrop >= 4) {
    riskScore += 15;
    riskReasons.push(`Steep Drop in Mid-2 (-${midDrop} marks vs Mid-1)`);
  }

  let tier = "Safe";
  let badgeColor = "bg-emerald-50 text-emerald-700 border-emerald-200";
  let recommendedAction = "Regular Mentoring & Academic Monitoring";

  if (riskScore >= 60) {
    tier = "Critical Risk";
    badgeColor = "bg-rose-50 text-rose-700 border-rose-200 animate-pulse";
    recommendedAction = "Mandatory Parent-Faculty Meet & Intensive Remedial Classes";
  } else if (riskScore >= 35) {
    riskScore = Math.min(riskScore, 59);
    tier = "Moderate Risk";
    badgeColor = "bg-amber-50 text-amber-700 border-amber-200";
    recommendedAction = "Peer Tutoring & Assignment Retest Guidance";
  } else {
    riskScore = Math.max(5, riskScore);
  }

  return {
    riskScore,
    tier,
    badgeColor,
    riskReasons,
    recommendedAction,
    attendance,
    ciePercentage
  };
}

// 3. MCA Placement Readiness Score (PR-Score 0-100)
export function computePlacementReadiness(student, labMarks) {
  // 1. Academic Weight (30%): CGPA out of 10 scaled to 30
  const academicScore = Math.min(30, (student.cgpa / 10) * 30);

  // 2. Problem Solving & DSA (25%): LeetCode problem count scaled
  // 400+ problems = full 25 points
  const dsaScore = Math.min(25, (student.leetcode / 450) * 25);

  // 3. Practical Lab Engineering (25%): Practical lab performance
  const labCie = labMarks?.finalCie || 42;
  const practicalScore = (labCie / 50) * 25;

  // 4. Git & Modern Tool Usage (20%): Commits and project portfolio
  const gitCommits = labMarks?.gitCommitCount || 35;
  const gitScore = Math.min(20, (gitCommits / 40) * 20);

  const totalPrScore = Math.round(academicScore + dsaScore + practicalScore + gitScore);

  let targetCohort = "Core Product & Tech Services";
  let statusBadge = "bg-blue-100 text-blue-800";

  if (totalPrScore >= 85) {
    targetCohort = "Tier-1 Tech Product (₹12+ LPA Target)";
    statusBadge = "bg-purple-100 text-purple-800 border-purple-300 font-semibold";
  } else if (totalPrScore >= 70) {
    targetCohort = "Product & FinTech (₹8-12 LPA Target)";
    statusBadge = "bg-emerald-100 text-emerald-800 border-emerald-300";
  } else if (totalPrScore >= 55) {
    targetCohort = "Technology Services & IT Consulting (₹5-8 LPA)";
    statusBadge = "bg-blue-100 text-blue-800 border-blue-300";
  } else {
    targetCohort = "Requires Foundation Coding Bootcamps";
    statusBadge = "bg-amber-100 text-amber-800 border-amber-300";
  }

  return {
    totalPrScore,
    academicScore: Math.round(academicScore),
    dsaScore: Math.round(dsaScore),
    practicalScore: Math.round(practicalScore),
    gitScore: Math.round(gitScore),
    targetCohort,
    statusBadge
  };
}

// 4. Target CGPA Simulator for MCA Students (What-If Analysis)
export function simulateTargetRequirements(currentCgpa, targetCgpa, completedCredits = 24, currentSemCredits = 20) {
  const currentTotalGradePoints = currentCgpa * completedCredits;
  const targetTotalGradePoints = targetCgpa * (completedCredits + currentSemCredits);
  const requiredSemGradePoints = targetTotalGradePoints - currentTotalGradePoints;
  const requiredSgpa = Number((requiredSemGradePoints / currentSemCredits).toFixed(2));

  let feasibility = "Achievable";
  let advice = `Aim for SGPA of ${requiredSgpa} this semester.`;
  let requiredAverageScore = 75;

  if (requiredSgpa > 10.0) {
    feasibility = "Mathematically Impossible in One Semester";
    advice = `Target CGPA ${targetCgpa} requires SGPA ${requiredSgpa} (> 10.0). Consider spreading your target across Semester III and IV.`;
  } else if (requiredSgpa >= 9.0) {
    feasibility = "Challenging (Requires Distinction in all subjects)";
    advice = `Requires score >= 85% in all SEE theory papers and 28+/30 in continuous internal assessments.`;
    requiredAverageScore = 88;
  } else if (requiredSgpa >= 8.0) {
    feasibility = "High Probability with Consistent Focus";
    advice = `Maintain minimum 24/30 in CIE and target 50+/70 in Semester End Examinations.`;
    requiredAverageScore = 80;
  } else {
    feasibility = "Easily Within Reach";
    advice = `Keep consistent attendance above 85% and complete all lab assignments on schedule.`;
    requiredAverageScore = 70;
  }

  return {
    requiredSgpa: Math.min(10, Math.max(0, requiredSgpa)),
    feasibility,
    advice,
    requiredAverageScore
  };
}
