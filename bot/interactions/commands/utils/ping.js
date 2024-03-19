const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const { colorResponseEmbed } = require("../../../models/ResponseModel")

module.exports.data = new SlashCommandBuilder()
.setName("ping")
.setDescription("Replies with Pong!")

module.exports.run = async (interaction) => {
    let embedsResponse = new EmbedBuilder()
    .setColor(colorResponseEmbed.info)
	.setTitle('Pong 🤖')
	.addFields(
		{ value: `🏓Latency response is ${Date.now() - interaction.createdTimestamp}ms.`, name: 'Latency', inline: true },
		{ value: `API Latency is ${Math.round(interaction.client.ws.ping)}ms`, name: 'API Latency', inline: true },
	)
	.setTimestamp()

    return await interaction.reply({embeds : [embedsResponse]})
}