const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, EmbedBuilder } = require("discord.js");
const { modalResponseCat } = require("../../../utils/responseCommandRun");
const { read } = require("../../../models/api/category");
const { DescResponseEmbed, colorResponseEmbed, TitleResponseEmbed } = require("../../../models/ResponseModel");

module.exports.data = {
    name : "menu_select_budget_create"
}

module.exports.middleware = {
    connected : true
}

module.exports.run = async (interaction, UserParams) => {
    try{
        let result = await read({id : interaction.values[0]}, UserParams)
        let idCat = result.data[0].id
    
        const modal = new ModalBuilder()
        .setCustomId('modal_budget_create')
        .setTitle(`Création de budget`)
    
        const montant = new TextInputBuilder()
        .setCustomId('montant_modal_budget_create')
        .setLabel("montant")
        .setPlaceholder("")
        .setValue("10")
        .setStyle(TextInputStyle.Short);
    
        const firstActionRow = new ActionRowBuilder().addComponents(montant);
        modal.addComponents(firstActionRow);
    
        await interaction.showModal(modal);
        await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                .setFooter({text : `IdCat: ${idCat}`})
                .setDescription(DescResponseEmbed.category.select)
                .setColor(colorResponseEmbed.selectMenu)
                .setTitle(TitleResponseEmbed.selectMenu)
                .setTimestamp()
            ], 
            components : [],
            ephemeral : true,
        })
    }catch(e){
        console.log(e)
    }
}