const { failEmbed } = require("./embedsResponses");

module.exports.PageNav = async (interaction, resp, UserParams, result, page, input) => {
    try{
        const collectorFilter = i => i.user.id === interaction.user.id;
        const confirmation = await resp.awaitMessageComponent({ filter: collectorFilter, time: 1000 * 60 * 3 });
        
        let command;
        if(confirmation.isStringSelectMenu() == true){
            command = interaction.client.menu.get(confirmation.customId)
        }else if(confirmation.isButton() == true){
            command = interaction.client.buttons.get(confirmation.customId)
        }else{
            throw new Error()
        }
        
        if (!command) {
            console.error(`No command matching ${confirmation.customId} was found.`);
            await confirmation.update({embeds : [failEmbed("NOT FOUND", "Aucune commande trouvé", 404)], components: []});
            throw true
        }

        return await command.run(interaction, confirmation,  UserParams, result, page, input)
    }catch(err){
        if(err != true){
            if(err.message !== "Collector received no interactions before ending with reason: time "){
                return interaction.deleteReply()
            }else{
                console.log(err)
                interaction.editReply({
                    embeds:[failEmbed()],
                    components: []
                })
            }
        }
        
        return setTimeout(() => {
            interaction.deleteReply()
        }, 10000);
    }
}