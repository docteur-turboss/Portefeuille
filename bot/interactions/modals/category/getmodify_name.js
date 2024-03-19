const { EmbedBuilder } = require("discord.js");
const { update } = require('../../../models/api/category');
const { failResponse } = require("../../../utils/returnFail");
const { colorResponseEmbed } = require("../../../models/ResponseModel");
module.exports.data = {
    name : "modal_category_getmodify"
}

module.exports.run = async (interaction, responRes, idCat, UserParams) => {
    let newName = responRes.fields.getTextInputValue('name_modal_category_getmodify');
    let dest = await update({ name : newName, id : idCat}, {token: UserParams.token, Cookie : UserParams.cookie})
    if(await failResponse(dest, interaction) === 1){
        return
    }
    
    return await responRes.update({
        embeds : [
            new EmbedBuilder()
            .setTitle("Catégorie numéro : " + idCat)
            .setDescription("Votre catégorie a bien été modifié")
            .setColor(colorResponseEmbed.success)
            .setImage(process.env.GifSuccess)
        ], components : []
    })
}