const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require("discord.js");
const { modalResponseCat } = require("../../../utils/responseCommandRun");

module.exports.data = {
    name : "button_modif_compte_getmodify"
}

module.exports.run = async (interaction, confirmation, dataCat, UserParams) => {
    let idCat = dataCat.id
    const modal = new ModalBuilder()
    .setCustomId('modal_compte_getmodify')
    .setTitle('Modification de wallet')

    const montant = new TextInputBuilder()
    .setCustomId('name_modal_compte_getmodify')
    .setLabel("Nouvelle valeur")
    .setStyle(TextInputStyle.Short);

    const firstActionRow = new ActionRowBuilder().addComponents(montant);
    modal.addComponents(firstActionRow);

    return await modalResponseCat(confirmation, interaction, idCat, UserParams, modal)
}