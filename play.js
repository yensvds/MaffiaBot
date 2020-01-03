const ytdl = require("ytdl-core");
 
module.exports.run = async (bot, message, args) => {
 
    if (!message.member.voiceChannel) return message.channel.send("Conecteer met een spraak kanaal a.u.b.");
 
    if (message.guild.me.voiceChannel) return message.channel.send("Sorry, de bot is al geconecteerd met een spraak kanaal.");
 
    if (!args[0]) return message.channel.send("Sorry, gelieven een url op te geven.");
 
    var validate = await ytdl.validateURL(args[0]);
 
    if (!validate) return message.channel.send("Sorry, Gelieve een **juiste** url op te geven.");
 
    var info = await ytdl.getInfo(args[0]);
 
    const streamOptions = { seek: 0, volume: 1 };
 
    let voiceConnection = message.member.voiceChannel.join()
        .then(voiceConnection => {
            const stream = ytdl(args[0], { filter: 'audioonly' });
            const streamDispatcher = voiceConnection.playStream(stream, streamOptions);
        })
        .catch(console.error);
 
    message.channel.send(`Nu aan het spelen ${info.title}`);
 
}
 
module.exports.help = {
    name: "play",
    description: "Speel muziek af. Jeet."
}