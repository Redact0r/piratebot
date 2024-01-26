class Marbles {
  constructor() {}
  determineGameChannel(channelName, msg) {
    const validScore = this.isValidScore(msg.content, channelName);

    if (!validScore) return;

    if (channelName == "guess-the-game") {
      this.scoreGuessTheGame(channelName, msg);
    } else if (channelName == "octordle") {
      this.scoreOctordle(channelName, msg);
    } else if (channelName == "wordle") {
      this.scoreWordle(channelName, msg);
    }
  }
  isValidScore(msgBody, gameName) {
    let valid = false;
    if (gameName == "guess-the-game") {
      if (msgBody.includes("#GuessTheGame #") && msgBody.includes("🎮")) {
        valid = true;
      }
    }
    if (gameName == "octordle") {
      if (msgBody.includes("Daily Octordle #") && msgBody.includes("Score:")) {
        valid = true;
      }
    }
    if (gameName == "wordle") {
      if (msgBody.includes("Wordle") && msgBody.includes("/6")) {
        valid = true;
      }
    }
    return valid;
  }

  buildScoreObj(gameName, msg, score, gameNum) {
    let scoreObj = {};
    scoreObj.msgId = msg.id;
    scoreObj.userId = msg.author.id;
    scoreObj.username = msg.author.username;
    scoreObj.game = gameName;
    scoreObj.gameNum = gameNum;
    scoreObj.score = score;

    return scoreObj;
  }
  scoreGuessTheGame(gameName, msg) {
    const msgToScore = msg.content;
    const regexForScore = /🟥|🟨|🟩|⬜/g;
    const regexForGameNum = /[0-9]/g;
    const strToScore = msgToScore.match(regexForScore);
    const gameNum = parseInt(msgToScore.match(regexForGameNum).join(""));

    let score = 0;

    for (let i = 0; i < strToScore.length; i++) {
      let greenIdxScores = [12, 10, 8, 6, 4, 2];
      if (strToScore[i] == "🟨") {
        score += 0.25;
      } else if (strToScore[i] == "🟩") {
        score += greenIdxScores[i];
      }
    }

    const scoreObj = this.buildScoreObj(gameName, msg, score, gameNum);
    console.log(scoreObj);
  }
  scoreOctordle(gameName, msg) {
    const msgToScore = msg.content;
    const regexForScore = /Score: \d+/g;
    const regexForGameNum = /Daily Octordle #\d+/g;
    const strToScore = msgToScore
      .match(regexForScore)[0]
      .match(/[0-9]/g)
      .join("");
    const gameNumStr = msgToScore
      .match(regexForGameNum)[0]
      .match(/[0-9]/g)
      .join("");
    const score = parseInt(strToScore);
    const gameNum = parseInt(gameNumStr);

    const scoreObj = this.buildScoreObj(gameName, msg, score, gameNum);
    console.log(scoreObj);
  }
  scoreWordle(gameName, msg) {
    const msgToScore = msg.content;
    const regexForScore = /[1-6]\/[1-6]/g;
    const regexForGameNum = /\d{3,}\s/g;
    const strToScore = msgToScore.match(regexForScore);
    const gameNumStr = msgToScore.match(regexForGameNum)[0];
    const score = strToScore ? parseInt(strToScore[0]) : 0;
    const gameNum = parseInt(gameNumStr);

    const scoreObj = this.buildScoreObj(gameName, msg, score, gameNum);
    console.log(scoreObj);
  }
}

module.exports = {
  Marbles,
};

// determineWinner(gameType, scoresArr) {}
// giveMarble(user, game, gameNumber) {}
// takeMarble(user, game, gameNumber) {}
// addMarbleEmoji(user, msg) {}
// removeMarbleEmoji(user, msg) {}
