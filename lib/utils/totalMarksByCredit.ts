export function totalMarksByCredit(credit: number): number {
  if (credit === 4) return 200;
  if (credit === 3) return 150;
  if (credit === 2) return 100;
  return 100;
}
