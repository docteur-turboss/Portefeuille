const { EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { DescResponseEmbed, colorResponseEmbed, TitleResponseEmbed, emojiBtn } = require("../../../models/ResponseModel");
const { failResponse } = require("../../../utils/returnFail");
const { read } = require('../../../models/api/budget');
const moment = require('moment');

module.exports.data = {
    name : "rigth_select_budget_getmodify"
}

module.exports.middleware = {
    connected : true,
    messageProtocoleFooter : true
}

module.exports.run = async (interaction, userParams, data) => {
    try{
        let page = parseInt(data[0].slice(5)) - 1 ?? 0;
        let result = await read({user_id : userParams.id}, userParams)
        if(await failResponse(result, interaction) === 1){
            return
        }

        let cache = {}
        let resultDate = result.data.map(e => {
            e = new Date(e.date)
            let mois = e.getMonth()
            let annee = e.getFullYear()
    
            if(cache[`${mois}/${annee}`]){
                return null
            }else{
                cache[`${mois}/${annee}`]=`${mois}/${annee}`;
                return e
            }
        })
    
        resultDate = resultDate.filter(e => e != null).sort((a,b)=>a-b).reverse();
    
        let embedAction = new EmbedBuilder()
        .setFooter({text : `Page ${page}`})
        .setDescription(DescResponseEmbed.budget.monthSelect)
        .setColor(colorResponseEmbed.selectMenu)
        .setTitle(TitleResponseEmbed.selectMenu)
        .setTimestamp()

        let selectMenu = new StringSelectMenuBuilder()
        .setCustomId('date_filter_budget_getmodify')
        .setPlaceholder(DescResponseEmbed.budget.monthSelect)

        for (let i=10*page; i < resultDate.length && i < 10*(page+1); i++) {
            if(resultDate[i] !== null){
                console.log(resultDate[i])
                let date = moment(resultDate[i]).locale("fr")
                let dateDesc = date.format("[Le mois de ]MMMM YYYY")
                let dateLabel = date.format("MM[/]YYYY")
                let dateValue = date.format("M[/]YYYY")
                selectMenu.addOptions(
                    new StringSelectMenuOptionBuilder()
                    .setDescription(dateDesc)
                    .setLabel(dateLabel)
                    .setValue(dateValue)
                )
            }
        }

        let arrComponent = []
        arrComponent.push(new ActionRowBuilder()
        .addComponents(selectMenu))

        let btnNav = new ActionRowBuilder()
        if(page>0){
            btnNav
            .addComponents(
                new ButtonBuilder()
                .setCustomId('left_select_budget_getmodify')
                .setStyle(ButtonStyle.Primary)
                .setEmoji(emojiBtn.left)
            )
        }
        if(10*(page+1)<resultDate.length){
            btnNav
            .addComponents(
                new ButtonBuilder()
                .setCustomId('rigth_select_budget_getmodify')
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