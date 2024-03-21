const { ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { colorResponseEmbed, DescResponseEmbed, TitleResponseEmbed, emojiBtn } = require("../../../models/ResponseModel");
const { TypeCategoryArray } = require("../../../models/ModuleTypeModel");
const { failResponse } = require("../../../utils/returnFail");
const category = require('../../../models/api/category');
const budget = require('../../../models/api/budget');
const moment = require('moment');

module.exports.data = {
    name : "menu_select_budget_getmodify"
}

module.exports.middleware = {
    connected : true,
}

module.exports.run = async (interaction, UserParams) => {
    try{
        console.log(interaction.values[0])
        let result = await budget.read({id : interaction.values[0]}, UserParams)
        if(await failResponse(result, interaction) === 1){
            return
        }

        resTabFil = result.data[0]

        let cat = await category.read({id : resTabFil.category_id}, UserParams)
        if(await failResponse(cat, interaction) === 1){
            return
        }
        cat = cat.data[0]

        let date
        if(moment(resTabFil.date).isSame(new Date(), 'month')){
            date = "Le mois actuel"
        }else{
            let mom = moment(resTabFil.date).locale('fr')
            let tmp = mom.fromNow() + ""
            date = tmp[0].toUpperCase() + tmp.slice(1)
        }

        let embedAction = new EmbedBuilder()
        .setDescription(DescResponseEmbed.budget.description)
        .setTitle(TitleResponseEmbed.description)
        .setFooter({text : `ID: ${resTabFil.id}`})
        .setColor(colorResponseEmbed.description)
        .addFields({name : "ID", value : `\`\`\`${resTabFil.id}\`\`\``})
        .addFields({name : "Catégorie du budget", value : `\`\`\`${cat.name}\`\`\``})
        .addFields({name : "ID de la catégorie", value : `\`\`\`${resTabFil.category_id}\`\`\``})
        .addFields({name : "Type de catégorie", value : `\`\`\`${TypeCategoryArray[cat.type - 1].name}\`\`\``})
        .addFields({name : "Récupère les restes des mois précédents", value : `\`\`\`${resTabFil.rollover == 1 ? "Oui" : "Non"}\`\`\``})
        .addFields({name : "Montant", value : `\`\`\`${resTabFil.montant}\`\`\``})
        .addFields({name: "Date effective du budget", value : `\`\`\`${date}\`\`\``})
        .setTimestamp()

        let btnModify = new ButtonBuilder()
        .setCustomId("button_modif_budget_getmodify")
        .setLabel(TitleResponseEmbed.modifyBtn)
        .setStyle(ButtonStyle.Primary)
        .setEmoji(emojiBtn.modify)

        let btnDelete = new ButtonBuilder()
        .setCustomId("button_delete_budget_getmodify")
        .setLabel(TitleResponseEmbed.deleteBtn)
        .setStyle(ButtonStyle.Danger)
        .setEmoji(emojiBtn.delete)

        let action = new ActionRowBuilder()
        .addComponents(btnModify, btnDelete)

        return await interaction.update({
            embeds : [embedAction],
            components : [action],
            ephemeral : true
        })
    }catch(e){
        console.log(e)
    }
}
