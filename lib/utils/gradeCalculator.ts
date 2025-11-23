export function calculateGrade(marks: number): string {
  if (marks >= 80) return "A+"
  if (marks >= 75) return "A"
  if (marks >= 70) return "A-"
  if (marks >= 65) return "B+"
  if (marks >= 60) return "B"
  if (marks >= 55) return "B-"
  if (marks >= 50) return "C+"
  if (marks >= 45) return "C"
  if (marks >= 40) return "D"
  return "F"
}

export function calculateCGPA(marks: number[]): number {
  if (marks.length === 0) return 0
  const average = marks.reduce((a, b) => a + b, 0) / marks.length
  return Math.round((average / 100) * 4 * 100) / 100 // Convert to 4.0 scale
}
