const connectedCheck = require('../middleware/connected');
const { failEmbed } = require('../utils/embedsResponses');
const { Events } = require("discord.js");

module.exports.data = {
    name : Events.InteractionCreate
}

module.exports.run = async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

	let command = await interaction.client.commands.get(interaction.commandName);
	if(interaction.options._subcommand !== null){
		command = await command.get(interaction.options.getSubcommand())
	}

    if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		interaction.reply({
            ephemeral : true,
            embeds : [
                failEmbed("NOT FOUND", "Aucune commande trouvé", 404)
            ]
        })

        return setTimeout(() => {
			interaction.deleteReply()
		}, 5000);
	}

	try {
		let userInfo
		if(command.middleware){
			if(command.middleware.connected){
				userInfo = await connectedCheck(interaction)
				if(userInfo === false){
					await interaction.reply({
                        ephemeral: true, 
                        embeds : [
						    failEmbed("NOT FOUND", "Vous n'êtes pas connecté ou vous n'avez pas de compte", "404")
                        ]
                    })

                    return setTimeout(() => {
                        interaction.deleteReply()
                    }, 5000);
				}
			}
		}
		return await command.run(interaction, userInfo);
	} catch (error) {
		console.log(error)
		if (interaction.replied || interaction.deferred) {
			await interaction.editReply({ embeds:[failEmbed()], ephemeral: true, components: [] });
		} else {
			await interaction.reply({ embeds:[failEmbed()], ephemeral: true, components: [] });
		}

        return setTimeout(() => {
			interaction.deleteReply()
		}, 5000);
    }
}