const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {
  message.channel.send(`Test başarılı, bot çalışıyor. Ping: **${client.ws.ping}ms**`)
}
module.exports.config = {
  name: "test",
  description: "",
  usage: "!test",
  aliases: ["ping"],
};