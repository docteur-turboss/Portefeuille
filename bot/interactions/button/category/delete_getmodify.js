const { successEmbed } = require("../../../utils/embedsResponses");
const { failResponse } = require('../../../utils/returnFail');
const { destroy } = require('../../../models/api/category');

module.exports.data = {
    name : "button_delete_category_getmodify"
}

module.exports.run = async (interaction, confirmation, dataCat, UserParams) => {
    let result = await destroy({id : dataCat.id}, {Cookie: UserParams.cookie, token : UserParams.token})
    if(await failResponse(result, interaction) === 1){
        return
    }

    return await confirmation.update({
        ephemeral: true,
        embeds : [
            successEmbed("Catégorie", "Votre catégorie vient d'être supprimé", 200)
        ],
        components: []
    })
}