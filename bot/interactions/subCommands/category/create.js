const { successEmbed } = require("../../../utils/embedsResponses");
const { SlashCommandSubcommandBuilder } = require("discord.js");
const { failResponse } = require("../../../utils/returnFail");
const { create } = require("../../../models/api/category");
const typeCat = require('../../../models/ModuleTypeModel');

module.exports.data = new SlashCommandSubcommandBuilder()
.setName("create")
.setDescription("Créez vous une catégorie")
.addStringOption(option => 
    option
    .setName("type".toLocaleString())
    .setDescription("Le type de catégorie")
    .setChoices(...typeCat.TypeCategoryArray)
    .setRequired(true))
.addStringOption(option =>
    option
    .setName("name".toLocaleString())
    .setDescription("Le nom de la catégorie")
    .setRequired(true))

module.exports.middleware = {
    connected : true
}

module.exports.run = async (interaction, data) => {
    let type = await interaction.options.getString('type')
    let name = await interaction.options.getString('name')

    let result = await create({name: name, type: type}, {token: data.token, Cookie: data.cookie})
    if(await failResponse(result, interaction) === 1){
        return
    }
    
    if(interaction.replied || interaction.deferred) {
        return await interaction.editReply({ embeds:[
            successEmbed("Catégorie", "Votre catégorie vient d'être crée", 200)
        ], ephemeral: true });
    } else {
        return await interaction.reply({ephemeral: true, embeds : [successEmbed("Catégorie", "Votre catégorie vient d'être crée", 200)]})
    }
}
