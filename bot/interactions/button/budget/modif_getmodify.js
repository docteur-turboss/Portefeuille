const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require("discord.js");
const { modalResponseCat } = require("../../../utils/responseCommandRun");

module.exports.data = {
    name : "button_modif_budget_getmodify"
}

module.exports.run = async (interaction, confirmation, UserParams, dataCat) => {
    const modal = new ModalBuilder()
    .setCustomId('modal_budget_getmodify')
    .setTitle('Modification de budget')

    const montant = new TextInputBuilder()
    .setCustomId('montant_modal_budget_getmodify')
    .setLabel("Nouveau montant")
    .setStyle(TextInputStyle.Short);

    const firstActionRow = new ActionRowBuilder().addComponents(montant);
    modal.addComponents(firstActionRow);

    return await modalResponseCat(confirmation, interaction, dataCat.id, UserParams, modal)
}