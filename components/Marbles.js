class Marbles {
  constructor(gameChannelNamesList) {
    this.gameChannelNamesList = gameChannelNamesList;
  }
  checkGameChannel(channelName) {
    let check = 0;
    let currentGame = "not a game channel";

    for (let i = 0; i < this.gameChannelNamesList; i++) {
      if (channelName == this.gameChannelNamesList[i]) {
        check = 1;
        currentGame = this.gameChannelNamesList[i];
        break;
      }
    }

    if (!check) return;

    if (check) return currentGame;
  }

  parseScore(msg, gameName) {}
  determineWinner(gameType, scoresArr) {}
  giveMarble(user, game, gameNumber) {}
  takeMarble(user, game, gameNumber) {}
  addMarbleEmoji(user, msg) {}
  removeMarbleEmoji(user, msg) {}
}

module.exports = {
  Marbles,
};
