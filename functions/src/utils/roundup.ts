
const roundupBy = (amount: number, roundTo: number): number => {
  return roundTo - (amount % roundTo);
}