const { SlashCommandSubcommandBuilder, EmbedBuilder} = require("discord.js");
const { allResponseCat } = require("../../../utils/responseCommandRun");
const { failResponse } = require("../../../utils/returnFail");
const { getMenuCategory } = require("../../../utils/nav");
const { read } = require("../../../models/api/category");
const { colorResponseEmbed } = require("../../../models/ResponseModel");

module.exports.data = new SlashCommandSubcommandBuilder()
.setName("get-or-update")
.setDescription("Récupérez vos données pour les modifier ou les supprimer")

module.exports.middleware = {
    connected : true
}

module.exports.run = async (interaction, data) => {
    let result = await read({user_id : data.id}, {token: data.token, Cookie: data.cookie})
    if(await failResponse(result, interaction) === 1){
        return
    }
    
    let embedAction = new EmbedBuilder()
    .setDescription("Veuillez selectionner la catégorie voulu")
    .setColor(colorResponseEmbed.selection)
    .setTitle("Selection")
    .setTimestamp()

    return await allResponseCat(interaction, false, data, result, embedAction, getMenuCategory(0, result.data, "category_getmodify"), true, true)
}