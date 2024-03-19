const connectedCheck = require('../middleware/connected');
const { failEmbed } = require('../utils/embedsResponses');
const { Events, ModalSubmitInteraction } = require("discord.js");

module.exports.data = {
    name : Events.InteractionCreate
}

/**
 * 
 * @param {ModalSubmitInteraction} interaction 
 * @returns 
 */
module.exports.run = async (interaction) => {
    if (!interaction.isModalSubmit()) return;

	let command = await interaction.client.modals.get(interaction.customId);

    if (!command) {
		console.error(`No command matching ${interaction.customId} was found.`);
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
		let userInfo, data
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
			
			if(command.middleware.messageProtocoleFooter){
				data = interaction.message.embeds[0].data.footer.text.split(', ')
			}
		}

		return await command.run(interaction, userInfo, data);
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