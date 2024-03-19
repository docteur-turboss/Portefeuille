const { EmbedBuilder } = require("discord.js");
const { update } = require('../../../models/api/compte');
const { failResponse } = require("../../../utils/returnFail");
const { colorResponseEmbed } = require("../../../models/ResponseModel");
module.exports.data = {
    name : "modal_compte_getmodify"
}

module.exports.run = async (interaction, responRes, idWal, UserParams) => {
    let newMontant = responRes.fields.getTextInputValue('name_modal_compte_getmodify');
    let dest = await update({ montant : newMontant, id : idWal}, {token: UserParams.token, Cookie : UserParams.cookie})
    if(await failResponse(dest, interaction) === 1){
        return
    }
    
    return await responRes.update({
        embeds : [
            new EmbedBuilder()
            .setTitle("Wallet numéro : " + idWal)
            .setDescription("Votre wallet a bien été modifié")
            .setColor(colorResponseEmbed.success)
            .setImage(process.env.GifSuccess)
        ], components : []
    })
}