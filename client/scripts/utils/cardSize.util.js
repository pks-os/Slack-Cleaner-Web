export function calculateColumnsNumber(windowSize: number) {

  let numberOfColumns;

  if (windowSize < 475) {
    numberOfColumns = 12;
  }

  if (windowSize > 475 && windowSize <= 704) {
    numberOfColumns = 6;
  }

  if (windowSize > 704 && windowSize <= 1528) {
    numberOfColumns = 3;
  }

  if (windowSize > 1528 && windowSize <= 1920) {
    numberOfColumns = 2;
  }

  if (windowSize > 1920 && windowSize <= 2200) {
    numberOfColumns = 2;
  }

  if (windowSize > 2200) {
    numberOfColumns = 1;
  }

  return numberOfColumns;
}
