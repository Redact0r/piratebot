const emojis = require("../sources/emojis");
const marbleColors = emojis.marbleColors;

const checkForBannedWords = (msgContent, wordListArr) => {
  const msgToLowerCase = msgContent.toLowerCase();
  for (let i = 0; i < wordListArr.length; i++) {
    if (msgToLowerCase.includes(wordListArr[i])) {
      return true;
    }
  }
};

const getRandomEntryFromArray = (array, arrayLength) => {
  return array[Math.floor(Math.random() * arrayLength)];
};

const getMarbleEmojiFromColor = (color) => {
  if (typeof color !== "string") {
    return console.error(
      "ERROR: typeof 'color' passed into function getMarbleEmojiFromColor() must be 'string'"
    );
  }
  const possibleColors = marbleColors.flatMap((c) => c.color);

  const marble = marbleColors.find((marble) => marble.color == color);
  if (!marble) {
    console.error(
      `ERROR: Color not found. Valid colors are ${possibleColors.join(", ")}`
    );
    return "error";
  }
  return marble.emoji;
};

const getSelectMessagesFromChannel = (channel, searchWords) => {};

const getScoreMessageFromUser = (game, user, searchWords) => {};

const getAllMessagesByGameNum = (game, number) => {};

module.exports = {
  checkForBannedWords,
  getRandomEntryFromArray,
  getMarbleEmojiFromColor,
  getSelectMessagesFromChannel,
  getScoreMessageFromUser,
  getAllMessagesByGameNum,
};
