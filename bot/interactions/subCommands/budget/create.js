const { SlashCommandSubcommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuOptionBuilder, StringSelectMenuBuilder } = require("discord.js");
const { colorResponseEmbed, TitleResponseEmbed, DescResponseEmbed } = require("../../../models/ResponseModel");
const { protocolesEmbedsFooter } = require("../../../models/protocolModel");
const { TypeCategoryArray } = require("../../../models/ModuleTypeModel");
const { failResponse } = require("../../../utils/returnFail");
const { read } = require("../../../models/api/category");

module.exports.data = new SlashCommandSubcommandBuilder()
.setName("create")
.setDescription("Créez vous un budget")

module.exports.middleware = {
    connected : true
}

module.exports.run = async (interaction, userKeys) => {
    let result = await read({user_id : userKeys.id}, userKeys)
    if(await failResponse(result, interaction) === 1){
        return
    }

    let embedAction = new EmbedBuilder()
    .setFooter({text : `Page 0`})
    .setDescription(DescResponseEmbed.category.select)
    .setColor(colorResponseEmbed.selectMenu)
    .setTitle(TitleResponseEmbed.selectMenu)
    .setTimestamp()

    let selectMenu = new StringSelectMenuBuilder()
    .setCustomId("menu_select_budget_create")
    .setPlaceholder("Sélectionnez une catégorie")

    for (let i=0; i < result.data.length && i < 10; i++) {
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
    if(10<result.data.length){
        arrComponent.push(new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('rigth_select_budget_create')
            .setEmoji('➡')
            .setStyle(ButtonStyle.Primary)
        ))
    }
    
    return await interaction.reply({
        embeds : [embedAction],
        components : arrComponent,
        ephemeral : true
    })
}