const { EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { DescResponseEmbed, colorResponseEmbed, TitleResponseEmbed, emojiBtn } = require("../../../models/ResponseModel");
const { TypeCategoryArray } = require("../../../models/ModuleTypeModel");
const { failResponse } = require("../../../utils/returnFail");
const category = require("../../../models/api/category");
const budget = require('../../../models/api/budget');

module.exports.data = {
    name : "rigth_select_cat_budget_getmodify"
}

module.exports.middleware = {
    connected : true,
    messageProtocoleFooter : true
}

module.exports.run = async (interaction, UserParams, data) => {
    try{
        let result = await budget.read({user_id : UserParams.id}, UserParams)
        if(await failResponse(result, interaction) === 1){
            return
        }

        let page = parseInt(data[0].slice(5)) + 1
        let valueChoice = data[1]

        let resTabFil = await result.data.filter(elem => {
            let tmp =  new Date(elem.date)
            let mois = tmp.getMonth() + 1
            let annee = tmp.getFullYear()

            return (`${mois}/${annee}` === valueChoice)? 1 : 0;
        })

        let dataCategory = []

        for(elem of resTabFil){
            let tmp = await category.read({id : elem.category_id}, UserParams)
            if(await failResponse(result, interaction) === 1){
                return
            }

            dataCategory.push(await tmp.data[0])
        }

        let embedAction = new EmbedBuilder()
        .setFooter({text : `Page ${page}, ${valueChoice}`})
        .setDescription(DescResponseEmbed.category.select)
        .setColor(colorResponseEmbed.selectMenu)
        .setTitle(TitleResponseEmbed.selectMenu)
        .setTimestamp()

        let selectMenu = new StringSelectMenuBuilder()
        .setCustomId("menu_select_budget_getmodify")
        .setPlaceholder(DescResponseEmbed.category.select)

        for (let i=10*page; i < dataCategory.length && i < 10*(page+1); i++) {
            let id = dataCategory[i].id
            let type = dataCategory[i].type
            let name = dataCategory[i].name

            selectMenu.addOptions(
                new StringSelectMenuOptionBuilder()
                .setLabel(`${id}. ${name}`)
                .setDescription(`Type : ${TypeCategoryArray[type - 1].name}`)
                .setValue(`${id}`)
            )
        }

        let arrComponent = []

        arrComponent.push(new ActionRowBuilder()
        .addComponents(selectMenu))

        let btnNav = new ActionRowBuilder()
        if(page>0){
            btnNav
            .addComponents(
                new ButtonBuilder()
                .setCustomId('left_select_cat_budget_getmodify')
                .setStyle(ButtonStyle.Primary)
                .setEmoji(emojiBtn.left)
            )
        }
        if(10*(page+1)<dataCategory.length){
            btnNav
            .addComponents(
                new ButtonBuilder()
                .setCustomId('rigth_select_cat_budget_getmodify')
                .setStyle(ButtonStyle.Primary)
                .setEmoji(emojiBtn.right)
            )
        }

        if(btnNav.components[0] !== undefined){
            arrComponent.push(btnNav)
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