const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require("discord.js");
const { modalResponseCat } = require("../../../utils/responseCommandRun");

module.exports.data = {
    name : "button_modif_category_getmodify"
}

module.exports.run = async (interaction, confirmation, dataCat, UserParams) => {
    let idCat = dataCat.id
    const modal = new ModalBuilder()
    .setCustomId('modal_category_getmodify')
    .setTitle('Modification de catégorie')

    const montant = new TextInputBuilder()
    .setCustomId('name_modal_category_getmodify')
    .setLabel("Nouveau nom")
    .setStyle(TextInputStyle.Short);

    const firstActionRow = new ActionRowBuilder().addComponents(montant);
    modal.addComponents(firstActionRow);

    return await modalResponseCat(confirmation, interaction, idCat, UserParams, modal)
}