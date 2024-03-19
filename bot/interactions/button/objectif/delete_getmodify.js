const { destroy } = require('../../../models/api/objectif')
const { successEmbed } = require('../../../utils/embedsResponses')
const { failResponse } = require('../../../utils/returnFail')

module.exports.data = {
    name : "button_delete_objectif_getmodify"
}

module.exports.run = async (interaction, respRes, UserParams, objectifData) => {
    let result = await destroy({id : objectifData.id}, {token : UserParams.token, Cookie: UserParams.cookie})
    if(await failResponse(result, interaction) === 1){
        return
    }

    return await respRes.update({
        ephemeral: true,
        embeds : [
            successEmbed("Objectif", "Votre objectif vient d'être supprimé", 200)
        ],
        components: []
    })
}