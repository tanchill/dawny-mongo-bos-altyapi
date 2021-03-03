const Discord = require("discord.js");
const db = require('quick.db')
const moment = require('moment')
const ms = require('ms')
const mongoose = require("mongoose");
module.exports.run = async (client, message, args) => {  
    if(!client.config.bot.developers.includes(message.author.id)) return
    try {
        let codein = args.join(" ");
        if (codein.includes('token')) return message.channel.send(new Discord.MessageEmbed().setImage('https://i.hizliresim.com/5jVbgp.gif')); // kısmen token engel
        let code = eval(codein);

        if (codein.length < 1) return message.reply(`deneyebilmek için bir kod girmelisin!`)

        if (typeof code !== 'string')
            code = require('util').inspect(code, { depth: 0 });
        let embed = new Discord.MessageEmbed()
            .setColor(message.member.displayHexColor)
            //.addField('» Kod', `\`\`\`js\n${codein}\`\`\``)
            .setDescription(`\`\`\`js\n${code}\n\`\`\``)
        message.channel.send(embed)
    } catch(e) {
        let embed2 = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .addField('Hata', "\`\`\`js\n"+e+"\n\`\`\`")
        message.channel.send(embed2);
    }
}
module.exports.config = {
    name: "eval",
    description: "-",
    usage: "eval kod",
    aliases: ["ev","kod","code"],
  };