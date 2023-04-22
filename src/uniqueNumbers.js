
export const generateUniqueNumbers = function* () {
  let index = 0;
  while (true) {
    yield index++;
  }
}