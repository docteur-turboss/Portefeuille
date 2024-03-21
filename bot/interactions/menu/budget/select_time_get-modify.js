const { EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require("discord.js");
const { colorResponseEmbed, DescResponseEmbed, TitleResponseEmbed, emojiBtn } = require("../../../models/ResponseModel");
const { TypeCategoryArray } = require("../../../models/ModuleTypeModel");
const { failResponse } = require("../../../utils/returnFail");
const category = require("../../../models/api/category");
const budget = require('../../../models/api/budget');
const moment = require('moment');

module.exports.data = {
    name : "date_filter_budget_getmodify"
}

module.exports.middleware = {
    connected : true,
}

module.exports.run = async (interaction, UserParams) => {
    try{
        let result = await budget.read({user_id : UserParams.id}, UserParams)
        if(await failResponse(result, interaction) === 1){
            return
        }

        let resTabFil = await result.data.filter(elem => {
            let tmp =  new Date(elem.date)
            let mois = tmp.getMonth() + 1
            let annee = tmp.getFullYear()

            return (`${mois}/${annee}` === interaction.values[0])? 1 : 0;
        })

        if(resTabFil[1] == undefined){
            resTabFil = resTabFil[0]

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
        }
        
        let dataCategory = []

        for(elem of resTabFil){
            let tmp = await category.read({id : elem.category_id}, UserParams)
            if(await failResponse(result, interaction) === 1){
                return
            }

            dataCategory.push({...tmp.data[0], id_budget : elem.id})
        }

        let embedAction = new EmbedBuilder()
        .setFooter({text : `Page 0, ${interaction.values[0]}`})
        .setDescription(DescResponseEmbed.category.select)
        .setColor(colorResponseEmbed.selectMenu)
        .setTitle(TitleResponseEmbed.selectMenu)
        .setTimestamp()
        
        let selectMenu = new StringSelectMenuBuilder()
        .setCustomId("menu_select_budget_getmodify")
        .setPlaceholder(DescResponseEmbed.category.select)

        for (let i=0; i < dataCategory.length && i < 10; i++) {
            let id = dataCategory[i].id
            let type = dataCategory[i].type
            let name = dataCategory[i].name
            let id_budget = dataCategory[i].id_budget

            selectMenu.addOptions(
                new StringSelectMenuOptionBuilder()
                .setLabel(`${id}. ${name}`)
                .setDescription(`Type : ${TypeCategoryArray[type - 1].name}`)
                .setValue(`${id_budget}`)
            )
        }

        let arrComponent = []

        arrComponent.push(new ActionRowBuilder()
        .addComponents(selectMenu))

        if(10<dataCategory.length){
            arrComponent.push(
                new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('rigth_select_cat_budget_getmodify')
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji(emojiBtn.right)
                )
            )
        }

        return await interaction.update({
            embeds : [embedAction],
            components : arrComponent,
            ephemeral : true
        })
    }catch(e){
        console.log(e)
    }
}