
const { EmbedBuilder } = require("discord.js");
const { update } = require('../../../models/api/budget');
const { failResponse } = require("../../../utils/returnFail");
const { colorResponseEmbed } = require("../../../models/ResponseModel");

module.exports.data = {
    name : "rollover_budget_modify_true"
}

module.exports.run = async (interaction, responRes, UserParams, idCat, montant) => {
    let dest = await update({id : idCat, rollover: true, montant : montant}, {Cookie : UserParams.cookie, token: UserParams.token})
    if(await failResponse(dest, interaction) === 1){
        return
    }

    return await responRes.update({
        embeds : [
            new EmbedBuilder()
            .setTitle("Budget numéro : " + idCat)
            .setDescription("Votre budget a bien été modifié")
            .setColor(colorResponseEmbed.success)
            .setImage(process.env.GifSuccess)
        ], components : []
    })
}