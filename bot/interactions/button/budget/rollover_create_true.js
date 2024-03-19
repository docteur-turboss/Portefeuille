const { colorResponseEmbed, TitleResponseEmbed, DescResponseEmbed } = require("../../../models/ResponseModel");
const { failResponse } = require("../../../utils/returnFail");
const { create } = require('../../../models/api/budget');
const { EmbedBuilder } = require("discord.js");

module.exports.data = {
    name : "rollover_budget_create_true"
}

module.exports.middleware = {
    connected : true,
    messageProtocoleFooter : true
}

module.exports.run = async (interaction, UserParams, data) => {
    try{
        let idCat = data[0].split(': ')[1]
        let montant = data[1].split(': ')[1]
    
        let dest = await create({category_id : idCat, rollover: true, montant : montant}, UserParams)
        if(await failResponse(dest, interaction) === 1){
            return
        }
    
        await interaction.update({
            embeds : [
                new EmbedBuilder()
                .addFields({name : "Récupération des budgets antérieurs.", value:  `\`\`\`Oui\`\`\``})
                .addFields({name : "Id de la catégorie", value : `\`\`\`${idCat}\`\`\``})
                .addFields({name : "Montant", value : `\`\`\`${montant}\`\`\``})
                .setTitle(TitleResponseEmbed.SuccessCreated.budget(dest.data.id))
                .setDescription(DescResponseEmbed.budget.created)
                .setColor(colorResponseEmbed.successResponse)
                .setImage(process.env.GifSuccess)
                .setTimestamp()
            ], components : []
        })
        
        setTimeout(() => {
            try{interaction.deleteReply()}catch(e){}
        }, 10000);
    }catch(e){
        console.log(e)
    }
}