const checkPresence = require("../utils/checkPresence");
const { Events } = require("discord.js");

module.exports.data = {
    name : Events.ClientReady,
	once : true
}

module.exports.run = (client) => {
	console.log('Bot fragment ready')
	setInterval(() => {
		client.user.setPresence(checkPresence());
	}, 60 * 1000);
}