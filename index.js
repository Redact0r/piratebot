require("dotenv").config();
const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");
const bot = new Client({
  partials: [
    Partials.User,
    Partials.Reaction,
    Partials.Message,
    Partials.Channel,
    Partials.GuildMember,
  ],
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});
bot.commands = new Collection();
const botCommands = require("./commands/");
const utils = require("./utils/utils.js");
const sources = require("./sources/index.js");

Object.keys(botCommands).map((key) => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

const TOKEN = process.env.TOKEN;
const TEST_MODE = process.env.TEST_MODE;
const TESTER_ID = process.env.TESTER_ID;

bot
  .login(TOKEN)
  .catch((err) => console.log("Couldn't login. Wrong token?" + "\n" + err));

bot.on("ready", () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on("messageCreate", async (msg) => {
  if (TEST_MODE && msg.author.id !== TESTER_ID) return;

  const bannedWords = process.env.BANNED_WORDS.split(", ");

  if (msg.author.bot) {
    return;
  }

  const bannedWordCheck = utils.checkForBannedWords(msg.content, bannedWords);

  let args;
  let command;
  let users;

  if (msg.content.includes("apple")) {
    msg.react("🍏");
  }

  if (bannedWordCheck) {
    const possibleReplies = sources.replies.bannedWords;
    const reply = utils.getRandomEntryFromArray(
      possibleReplies,
      possibleReplies.length
    );

    msg.delete();
    msg.channel.send(reply);
  }

  if (msg.content.startsWith("!")) {
    args = msg.content.split(" ");
    command = args[0].toLowerCase().toString();
    users = bot.users;
  }

  if (args === undefined) {
    args = msg.content;
    command = args.toLowerCase().replace(/\s/g, "").toString();
  }

  if (!bot.commands.has(command)) {
    return;
  }

  try {
    bot.commands.get(command).execute(msg, args, bot);
  } catch (error) {
    console.error(error);
    msg.reply("Tell the Cap'n me peg leg is shattered!");
  }
});
