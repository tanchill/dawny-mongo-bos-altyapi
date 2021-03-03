const { Client, Collection, MessageEmbed } = require("discord.js");
const client = new Client({ fetchAllMembers: true });
const fs = require("fs");
const config = client.config = require("./config.json");
const moment = require("moment");
require("moment-duration-format");
require("moment-timezone");
moment.locale("tr");
const mongoose = require("mongoose");
mongoose.connect(config.bot.mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(x => console.log("MongoDB bağlantısı kuruldu!")).catch(err => console.error(err));
mongoose.connection.on('error', (err) => {
  console.log(`[Mongoose Error]: ${err}`);
});

Array.prototype.clear = function() {
  let newArray = [];
  for (let i of this) {
   if (!newArray.includes(i) && i !== "" && i !== " ") newArray.push(i);
  };
  return newArray;
};

Date.prototype.toTurkishFormat = function() {
  return moment.tz(this, "Europe/Istanbul").format('LLL');
};
const events = fs.readdirSync("./events");
for (let event of events) {
  if (!event.endsWith(".js")) continue;
  let prop = require(`./events/${event}`);
  if (!prop.config) continue;
  if (prop.config.name !== "ready") {
    client.on(prop.config.name, prop);
  } else {
    client.on(prop.config.name, () => prop(client));
  };
  console.log(`[Event]: ${event} yüklendi!`);
};
client.commands = new Collection();
client.aliases = new Collection();
const categoriess = fs.readdirSync("./commands/");
for(let category of categoriess){
  let commands = fs.readdirSync(`./commands/${category}/`)
  for(let command of commands){
    if(!command.endsWith('.js')) continue;
    let prop = require(`./commands/${category}/${command}`);  
    prop.config.aliases.clear().forEach(aliase => {
      client.aliases.set(aliase, prop.config.name);
    });
    client.commands.set(prop.config.name, prop);
    console.log(`[${category}] Kategorisinden [${prop.config.name}] komutu yüklendi.`);

  }
}

client.login(config.bot.token).catch(err =>{ console.log('Bot tokenine bağlanma sırasında bir sıkıntı yaşandı.')})

client.models = {
  "test": "./models/example" // const Database = require(client.models.test)
}