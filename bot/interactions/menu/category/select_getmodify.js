const { ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { allResponseCat } = require("../../../utils/responseCommandRun");
const { TypeCategoryArray } = require("../../../models/ModuleTypeModel");

module.exports.data = {
    name : "menu_select_category_getmodify"
}

module.exports.run = async (interaction, responRes, UserParams, result) => {
    let readcategory
    let data = result.data
    const i = data.findIndex(e => e.id == responRes.values[0]);
    if (i > -1) {
        readcategory = data[i]
    }

    let embedDescription = new EmbedBuilder()
    .setTitle('Description')
    .setDescription('Voici les détails de votre catégorie')
    .setColor('DarkGreen')
    .addFields({name : "ID", value : `\`\`\`${readcategory.id}\`\`\``})
    .addFields({name : "Nom", value : `\`\`\`${readcategory.name}\`\`\``})
    .addFields({name : "Type", value : `\`\`\`${TypeCategoryArray[readcategory.type - 1].name}\`\`\``})
    .setTimestamp()

    let btnModify = new ButtonBuilder()
    .setCustomId("button_modif_category_getmodify")
    .setStyle(ButtonStyle.Primary)
    .setEmoji('🔧')
    .setLabel("Modifier")

    let btnDelete = new ButtonBuilder()
    .setCustomId("button_delete_category_getmodify")
    .setStyle(ButtonStyle.Danger)
    .setEmoji('🗑')
    .setLabel('Supprimer')

    let action = new ActionRowBuilder()
    .addComponents(btnModify, btnDelete)

    return await allResponseCat(interaction, responRes, readcategory, UserParams, embedDescription, [action], false, true)
}