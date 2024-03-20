const { EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { DescResponseEmbed, colorResponseEmbed, TitleResponseEmbed, emojiBtn } = require("../../../models/ResponseModel");
const { TypeCategoryArray } = require("../../../models/ModuleTypeModel");
const { failResponse } = require("../../../utils/returnFail");
const { read } = require("../../../models/api/category");


module.exports.data = {
    name : "left_select_budget_create"
}

module.exports.middleware = {
    connected : true,
    messageProtocoleFooter : true
}

module.exports.run = async (interaction, UserParams, data) => {
    try{
        let page = parseInt(data[0].slice(5)) - 1 ?? 0;

        let result = await read({user_id : UserParams.id}, UserParams)
        if(await failResponse(result, interaction) === 1){
            return
        }
    
        let embedAction = new EmbedBuilder()
        .setFooter({text : `Page ${page}`})
        .setDescription(DescResponseEmbed.category.select)
        .setColor(colorResponseEmbed.selectMenu)
        .setTitle(TitleResponseEmbed.selectMenu)
        .setTimestamp()
    
        let selectMenu = new StringSelectMenuBuilder()
        .setCustomId("menu_select_budget_create")
        .setPlaceholder(DescResponseEmbed.category.select)
        
        for (let i=10*page; i < result.data.length && i < 10*(page+1); i++) {
            let id = result.data[i].id
            let type = result.data[i].type
            let name = result.data[i].name
            selectMenu.addOptions(
                new StringSelectMenuOptionBuilder()
                .setLabel(`${id} ${name}`)
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
                .setCustomId('left_select_budget_create')
                .setStyle(ButtonStyle.Primary)
                .setEmoji(emojiBtn.left)
            )
        }
        if(10*(page+1)<result.data.length){
            btnNav
            .addComponents(
                new ButtonBuilder()
                .setCustomId('rigth_select_budget_create')
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