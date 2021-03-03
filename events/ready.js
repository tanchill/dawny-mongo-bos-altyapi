module.exports = (client) =>  {
  /*
LISTENING - Dinliyor
WATCHING - İzliyor
PLAYING - Oynuyor

idle - Boşta
dnd - Rahatsız Etmeyin
online - Çevrimiçi
invisible - Çevrimdışı
*/

  setInterval( () => {
    client.user.setActivity(client.config.bot.status[Math.floor(Math.random() * client.config.bot.status.length)] , {type: "LISTENING"})  
  }, 1000 * 5) // Her 5 saniyede oynuyor değişecek
  client.user.setStatus('idle') 
  console.log("Dawny Bot hazır!");


  let kanal = client.channels.cache.get(client.config.channels.botVoiceChannel);
  if(kanal){
    kanal.join()
  }
};

module.exports.config = {
  name: "ready"
};

