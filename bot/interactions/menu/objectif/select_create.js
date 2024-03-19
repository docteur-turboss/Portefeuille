const { EmbedBuilder, ButtonStyle, ButtonBuilder, ActionRowBuilder } = require("discord.js")
const { colorResponseEmbed } = require("../../../models/ResponseModel")

module.exports.data = {
    name : "menu_select_create_objectif"
}

module.exports.run = async (interaction, resPonRes, UserParams, result, _, inputData) => {
    let newInput = { compte_id : resPonRes.values[0], ...inputData}
    try{
        let EmbedAction = new EmbedBuilder()
        .setTimestamp()
        .setTitle('Choisir')
        .setColor(colorResponseEmbed.choice)
        .setDescription("Voulez vous utiliser les fonds non utilisé de votre compte pour l'objectif ?")

        let btnactionRow = new ActionRowBuilder()
        .addComponents(new ButtonBuilder()
        .setCustomId('touchMN_objectif_create_true')
        .setEmoji('✅')
        .setStyle(ButtonStyle.Success))
        .addComponents(new ButtonBuilder()
        .setCustomId('touchMN_objectif_create_false')
        .setEmoji("⛔")
        .setStyle(ButtonStyle.Danger))

        let resp = await resPonRes.update({
            embeds : [EmbedAction],
            components: [btnactionRow],
            ephemeral : true
        })

        const collectorFilter = i => i.user.id === resPonRes.user.id;
        const confirmation = await resp.awaitMessageComponent({ filter: collectorFilter, time: 1000 * 60 * 3 });

        let command;
        if(confirmation.isButton() == true){
            command = interaction.client.buttons.get(confirmation.customId)
        }else{
            throw new Error()
        }

        if (!command) {
            console.error(`No command matching ${confirmation.customId} was found.`);
            confirmation.update({embeds : [failEmbed("NOT FOUND", "Aucune commande trouvé", 404)], components: []});
            throw true
        }
        return await command.run(interaction, confirmation, UserParams, newInput)
    }catch(err){
        if(err != true){
            if(err.message !== "Collector received no interactions before ending with reason: time "){
                interaction.deleteReply()
            }else{
                console.log(err)
                await interaction.editReply({
                    embeds:[failEmbed()],
                    components: []
                })
                setTimeout(() => {
                    interaction.deleteReply()
                }, 10000);
            }
        }else{
            interaction.deleteReply()
        }
    }
}