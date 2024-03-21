const { SlashCommandSubcommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ButtonBuilder, ButtonStyle} = require("discord.js");
const { colorResponseEmbed, DescResponseEmbed, TitleResponseEmbed, emojiBtn } = require("../../../models/ResponseModel");
const { failResponse } = require("../../../utils/returnFail");
const { read } = require("../../../models/api/budget");
const moment = require('moment');

module.exports.data = new SlashCommandSubcommandBuilder()
.setName("get-or-update")
.setDescription("Récupérez vos données pour les modifier ou les supprimer")

module.exports.middleware = {
    connected : true
}

module.exports.run = async (interaction, userParams) => {
    try{
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
        .setFooter({text : `Page 0`})
        .setDescription(DescResponseEmbed.budget.monthSelect)
        .setColor(colorResponseEmbed.selectMenu)
        .setTitle(TitleResponseEmbed.selectMenu)
        .setTimestamp()
        
        let selectMenu = new StringSelectMenuBuilder()
        .setCustomId('date_filter_budget_getmodify')
        .setPlaceholder(DescResponseEmbed.budget.monthSelect)


        for(let i = 0; i < resultDate.length && i<10; i++){
            if(resultDate[i] !== null){
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

        if(10<resultDate){
            arrComponent.push(new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('rigth_select_budget_getmodify')
                .setEmoji(emojiBtn.right)
                .setStyle(ButtonStyle.Primary)
            ))
        }
        
        return await interaction.reply({
            embeds : [embedAction],
            components : arrComponent,
            ephemeral : true
        })
    }catch(e){
        console.log(e)
    }
}