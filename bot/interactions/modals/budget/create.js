const { colorResponseEmbed, TitleResponseEmbed, DescResponseEmbed, emojiBtn } = require("../../../models/ResponseModel");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");

module.exports.data = {
    name : "modal_budget_create"
}

module.exports.run = async (interaction) => {
    try{
        let montant = interaction.fields.getTextInputValue('montant_modal_budget_create');
        let idCat = interaction.message.embeds[0].data.footer.text.split(': ')[1]
    
        let btnactionRow = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('rollover_budget_create_true')
            .setStyle(ButtonStyle.Success)
            .setEmoji(emojiBtn.yes)
        )
        .addComponents(
            new ButtonBuilder()
            .setCustomId('rollover_budget_create_false')
            .setStyle(ButtonStyle.Danger)
            .setEmoji(emojiBtn.no)
        )
    
        let embedAction = new EmbedBuilder()
        .setDescription(DescResponseEmbed.budget.rolloverChoice)
        .setTitle(TitleResponseEmbed.choiceBtn)
        .setFooter({text : `idCat: ${idCat}, montant: ${montant}`})
        .setColor(colorResponseEmbed.choiceBtn)
        .setTimestamp()
        
        await interaction.update({
            embeds : [embedAction],
            components: [btnactionRow],
            ephemeral : true
        })
    }catch(e){
        console.log(e)
    }
}