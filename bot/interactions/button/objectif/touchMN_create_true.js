const { EmbedBuilder } = require('discord.js')
const { create } = require('../../../models/api/objectif')
const { failResponse } = require('../../../utils/returnFail')
const { colorResponseEmbed } = require('../../../models/ResponseModel')

module.exports.data = {
    name : "touchMN_objectif_create_true"
}

module.exports.run = async (interaction, resp, UserKey, input) => {
    try{
        let result = await create({...input, montant_touch : true}, {token : UserKey.token, Cookie : UserKey.cookie})
        if(await failResponse(result, resp) == 1){
            return
        }

        resp.update({
            embeds : [
                new EmbedBuilder()
                .setTitle("Objectif numéro : " + result.data.id)
                .setDescription("Votre objectif a bien été créé")
                .setColor(colorResponseEmbed.success)
                .setImage(process.env.GifSuccess)
            ], components : []
        })
    }catch(err){
        console.log(err)
    }
}