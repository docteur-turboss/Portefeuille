let fs = require("fs")
let path = require("path")
const { REST, Routes } = require('discord.js');
require("dotenv").config({path : '.env'});

let commands = [];
let logue = [];
const foldersPath = path.join(__dirname, "../interactions/commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if(file.indexOf('router') !== -1){
            commands.push(command.data.toJSON())
            logue.push({
                description : command.data.toJSON().description,
                name : command.data.toJSON().name,
            })
        }else{
            if (!('data' in command && 'run' in command)) {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "run" property.`);
                break;
            }

            commands.push(command.data.toJSON());
            logue.push({
                description : command.data.toJSON().description,
                name : command.data.toJSON().name,
            })
        }
    }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.BOT_TOKEN);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);
		console.table(logue);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationCommands(process.env.CLIENTID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();