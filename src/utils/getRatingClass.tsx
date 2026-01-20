export const getRatingClass = (rating: number): string => {
  if (rating < 5) {
    return "rating--bad";
  }
  if (rating < 7) {
    return "rating--average";
  }
  if (rating < 8.5) {
    return "rating--good";
  }
  return "rating--excellent";
};
