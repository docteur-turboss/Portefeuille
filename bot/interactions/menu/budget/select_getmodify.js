const { ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { allResponseCat } = require("../../../utils/responseCommandRun");
const { TypeCategoryArray } = require("../../../models/ModuleTypeModel");
const { read } = require('../../../models/api/category');
module.exports.data = {
    name : "menu_select_budget_getmodify"
}

module.exports.run = async (interaction, responRes, UserParams, result) => {
    let res = result.filter(e => e.id == responRes.values[0])
    let data = res[0]
    
    let dateData = new Date(data.date)
    let dateCheck = new Date()
    
    let cat = await read({id: data.category_id}, {Cookie : UserParams.cookie, token: UserParams.token})
    cat = cat.data[0]

    let arrDat = dateData.toLocaleDateString("fr-FR", {
        dateStyle:"long"
    }).split(" ")

    let DateResponse = dateCheck.getFullYear()+dateCheck.getMonth() == dateData.getFullYear()+dateData.getMonth()? "Le mois actuel" : arrDat[1]+" "+arrDat[2]

    let embedAction = new EmbedBuilder()
    .setTitle('Description')
    .setDescription('Voici les informations de votre budget')
    .setColor('DarkGreen')
    .addFields({name : "ID", value : `\`\`\`${data.id}\`\`\``})
    .addFields({name : "Catégorie du budget", value : `\`\`\`${cat.name}\`\`\``})
    .addFields({name : "Type de catégorie", value : `\`\`\`${TypeCategoryArray[cat.type - 1].name}\`\`\``})
    .addFields({name : "Récupère les restes des mois précédents", value : `\`\`\`${data.rollover == 1 ? "Oui" : "Non"}\`\`\``})
    .addFields({name : "Montant", value : `\`\`\`${data.montant}\`\`\``})
    .addFields({name: "Date effective du budget", value : `\`\`\`${DateResponse}\`\`\``})
    .setTimestamp()

    let btnModify = new ButtonBuilder()
    .setCustomId("button_modif_budget_getmodify")
    .setStyle(ButtonStyle.Primary)
    .setEmoji('🔧')
    .setLabel("Modifier")

    let btnDelete = new ButtonBuilder()
    .setCustomId("button_delete_budget_getmodify")
    .setStyle(ButtonStyle.Danger)
    .setEmoji('🗑')
    .setLabel('Supprimer')

    let action = new ActionRowBuilder()
    .addComponents(btnModify, btnDelete)

    return allResponseCat(interaction, responRes, UserParams, data, embedAction, [action], false, true)
}