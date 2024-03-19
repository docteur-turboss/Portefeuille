const { ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { allResponseCat } = require("../../../utils/responseCommandRun");
const { TypeCompteArray } = require("../../../models/ModuleTypeModel");

module.exports.data = {
    name : "menu_select_compte_getmodify"
}

module.exports.run = async (interaction, responRes, UserParams, result) => {
    let readwallet
    let data = result.data
    const i = data.findIndex(e => e.id == responRes.values[0]);
    if (i > -1) {
        readwallet = data[i]
    }

    let embedDescription = new EmbedBuilder()
    .setTitle('Description')
    .setDescription('Voici les détails de votre wallet')
    .setColor('DarkGreen')
    .addFields({name : "ID", value : `\`\`\`${readwallet.id}\`\`\``})
    .addFields({name : "Somme", value : `\`\`\`${readwallet.montant}\`\`\``})
    .addFields({name : "Type", value : `\`\`\`${TypeCompteArray[readwallet.type - 1].name}\`\`\``})
    .setTimestamp()

    let btnModify = new ButtonBuilder()
    .setCustomId("button_modif_compte_getmodify")
    .setStyle(ButtonStyle.Primary)
    .setEmoji('🔧')
    .setLabel("Modifier")

    let btnDelete = new ButtonBuilder()
    .setCustomId("button_delete_compte_getmodify")
    .setStyle(ButtonStyle.Danger)
    .setEmoji('🗑')
    .setLabel('Supprimer')

    let action = new ActionRowBuilder()
    .addComponents(btnModify, btnDelete)

    return await allResponseCat(interaction, responRes, readwallet, UserParams, embedDescription, [action], false, true)
}