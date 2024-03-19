const { successEmbed } = require("../../../utils/embedsResponses");
const { failResponse } = require('../../../utils/returnFail');
const { destroy } = require('../../../models/api/budget');

module.exports.data = {
    name : "button_delete_budget_getmodify"
}

module.exports.run = async (interaction, confirmation, data, catInfo) => {
    try{
        let result = await destroy({id : catInfo.id}, {Cookie: data.cookie, token : data.token})
        if(await failResponse(result, interaction) === 1){
            return
        }
    
        return await confirmation.update({
            ephemeral: true,
            embeds : [
                successEmbed("Budget", "Votre budget vient d'être supprimé", 200)
            ],
            components: []
        })
    }catch(err){
        if(err != true){
            if(err.message !== "Collector received no interactions before ending with reason: time "){
                interaction.deleteReply()
            }else{
                console.log(err)
                await interaction.editReply({
                    embeds:[failEmbed()],
                    components: []
                })
                setTimeout(() => {
                    interaction.deleteReply()
                }, 10000);
            }
        }else{
            interaction.deleteReply()
        }
    }
}