const { Client, GatewayIntentBits, Events, Collection } = require ("discord.js");
const loaderComm = require('./utils/commands.loader');
const path = require("path");
const fs = require('fs');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = loaderComm(new Collection(), "commands");
client.buttons = loaderComm(new Collection(), "button");
client.modals = loaderComm(new Collection(), "modals");
client.menu = loaderComm(new Collection(), "menu");

const eventsPath = path.join(__dirname, 'events');
let eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for(const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if(event.data.once){
		client.once(event.data.name, (...args) => event.run(...args));
	}else{
		client.on(event.data.name, (...args) => event.run(...args));
	}
}

client.login(process.env.BOT_TOKEN)