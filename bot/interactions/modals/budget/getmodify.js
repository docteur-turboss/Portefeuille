const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");
const { failEmbed } = require("../../../utils/embedsResponses");
const { colorResponseEmbed } = require("../../../models/ResponseModel");

module.exports.data = {
    name : "modal_budget_getmodify"
}

module.exports.run = async (interaction, responRes, idCat, UserParams) => {
    try{
        let montant = responRes.fields.getTextInputValue('montant_modal_budget_getmodify');

        let btnactionRow = new ActionRowBuilder()
            .addComponents(new ButtonBuilder()
            .setCustomId('rollover_budget_modify_true')
            .setEmoji('✅')
            .setStyle(ButtonStyle.Success))
            .addComponents(new ButtonBuilder()
            .setCustomId('rollover_budget_modify_false')
            .setEmoji("⛔")
            .setStyle(ButtonStyle.Danger))

        let resp = await responRes.update({
            embeds : [
                new EmbedBuilder()
                .setTitle("Choisir")
                .setDescription("Voulez vous cumuler les restes des mois précédents")
                .setColor(colorResponseEmbed.choice)
            ], components : [btnactionRow]
        })
        
        const collectorFilter = i => i.user.id === interaction.user.id;
        const confirmation = await resp.awaitMessageComponent({ filter: collectorFilter, time: 1000 * 60 * 3 });

        let command;
        if(confirmation.isButton() == true){
            command = interaction.client.buttons.get(confirmation.customId)
        }else{
            throw new Error()
        }

        if (!command) {
            console.error(`No command matching ${confirmation.customId} was found.`);
            return confirmation.update({embeds : [failEmbed("NOT FOUND", "Aucune commande trouvé", 404)], components: []});
        }
        return await command.run(interaction, confirmation, UserParams, idCat, montant)
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