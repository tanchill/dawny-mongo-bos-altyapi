module.exports = async (message) => {
  if (message.author.bot || !message.guild || !message.content) return;
  let client = message.client;
  let prefix = client.config.bot.prefixes.find(p => message.content.toLowerCase().startsWith(p));
  if (!prefix) return;
  let args = message.content.split(" ").slice(1);
  let command = message.content.split(" ")[0].slice(prefix.length);
  let cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
  if (cmd) {
       cmd.run(client, message, args);
  };
};

module.exports.config = {
  name: "message"
};
  