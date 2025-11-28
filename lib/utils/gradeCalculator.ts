export function marksToPoint(marks: number): number {
  if (marks >= 80) return 4.0;
  if (marks >= 75) return 3.75;
  if (marks >= 70) return 3.5;
  if (marks >= 65) return 3.25;
  if (marks >= 60) return 3.0;
  if (marks >= 55) return 2.75;
  if (marks >= 50) return 2.5;
  if (marks >= 45) return 2.25;
  if (marks >= 40) return 2.0;
  return 0.0;
}

export function calculateCGPA(
  subjects: { marks: number; credits: number }[]
): number {
  let totalPoints = 0;
  let totalCredits = 0;

  for (const s of subjects) {
    const gpa = marksToPoint(s.marks);
    totalPoints += gpa * s.credits;
    totalCredits += s.credits;
  }

  return Number((totalPoints / totalCredits).toFixed(2));
}

// export function calculateGradeFromPercentage(percentage: number): string {
//   if (percentage >= 80) return "A+";
//   if (percentage >= 75) return "A";
//   if (percentage >= 70) return "A-";
//   if (percentage >= 65) return "B+";
//   if (percentage >= 60) return "B";
//   if (percentage >= 55) return "B-";
//   if (percentage >= 50) return "C+";
//   if (percentage >= 45) return "C";
//   if (percentage >= 40) return "D";
//   return "F";
// }

// export function gradeToPoint(grade: string): number {
//   const map: Record<string, number> = {
//     "A+": 4.0,
//     A: 3.75,
//     "A-": 3.5,
//     "B+": 3.25,
//     B: 3.0,
//     "B-": 2.75,
//     "C+": 2.5,
//     C: 2.25,
//     D: 2.0,
//     F: 0.0,
//   };
//   return map[grade] ?? 0.0;
// }

// export function totalMarksByCredit(credit: number): number {
//   if (credit === 4) return 200;
//   if (credit === 3) return 150;
//   if (credit === 2) return 100;
//   return 100;
// }

// export function calculateCGPA(
//   subjects: { marks: number; credits: number }[]
// ): number {
//   let totalPoints = 0;
//   let totalCredits = 0;

//   for (const subject of subjects) {
//     const totalMarks = totalMarksByCredit(subject.credits);
//     const percentage = (subject.marks / totalMarks) * 100;

//     const grade = calculateGradeFromPercentage(percentage);
//     const gpa = gradeToPoint(grade);

//     totalPoints += gpa * subject.credits;
//     totalCredits += subject.credits;
//   }

//   if (totalCredits === 0) return 0;

//   return Number((totalPoints / totalCredits).toFixed(2));
// }
