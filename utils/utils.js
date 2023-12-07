const checkForBannedWords = (msgContent, wordListArr) => {
  for (let i = 0; i < wordListArr.length; i++) {
    if (msgContent.includes(wordListArr[i])) {
      return true;
    }
  }
};

const getRandomEntryFromArray = (array, arrayLength) => {
  return array[Math.floor(Math.random() * arrayLength)];
};

module.exports = {
  checkForBannedWords,
  getRandomEntryFromArray,
};
