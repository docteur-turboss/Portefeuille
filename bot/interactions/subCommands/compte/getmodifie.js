const { SlashCommandSubcommandBuilder, EmbedBuilder} = require("discord.js");
const { allResponseCat } = require("../../../utils/responseCommandRun");
const { failResponse } = require("../../../utils/returnFail");
const { getMenuCompte } = require('../../../utils/nav');
const { read } = require("../../../models/api/compte");
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
    .setDescription("Veuillez selectionner le portefeuille souhaité")
    .setColor(colorResponseEmbed.selection)
    .setTitle("Selection")
    .setTimestamp()

    return await allResponseCat(interaction, false, data, result, embedAction, getMenuCompte(0, result.data, "compte_getmodify"), true, true)
}