const { SlashCommandSubcommandBuilder, EmbedBuilder, ActionRowBuilder} = require("discord.js");
const { allResponseCat } = require("../../../utils/responseCommandRun");
const { existData_MenuTime } = require("../../../utils/MenuDate");
const { failResponse } = require("../../../utils/returnFail");
const { read } = require("../../../models/api/budget");
const { colorResponseEmbed } = require("../../../models/ResponseModel");

module.exports.data = new SlashCommandSubcommandBuilder()
.setName("get-or-update")
.setDescription("Récupérez vos données pour les modifier ou les supprimer")

module.exports.middleware = {
    connected : true
}

module.exports.run = async (interaction, userParams) => {
    let result = await read({user_id : userParams.id}, userParams)
    if(await failResponse(result, interaction) === 1){
        return
    }

    // arrêt de dev ici

    let rowSelect = existData_MenuTime("budget_getmodify", result.data, 0)

    let embedCreate = new EmbedBuilder()
    .setDescription("Veuillez selectionnez le mois de modification :")
    .setColor(colorResponseEmbed.selection)
    .setTitle('Selection')
    .setTimestamp()

    return await allResponseCat(interaction, false, data, result, embedCreate, rowSelect, true, true)
}