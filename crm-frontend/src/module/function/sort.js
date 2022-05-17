export function sortArray(array, key, symbol) {
  return symbol === '>'
    ? array.sort((a, b) => (a[key] > b[key] ? 1 : -1))
    : array.sort((a, b) => (a[key] < b[key] ? 1 : -1));
}
