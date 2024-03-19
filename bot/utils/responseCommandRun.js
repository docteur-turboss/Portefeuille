const { failEmbed } = require("./embedsResponses");

let MixedResp = async (embedAction, components, interaction, respRes, BtnTrue, MenuTrue) => {
    try{
        let resp
        let respOpt = {
            embeds : [embedAction],
            components: components,
            ephemeral : true
        }
        if(interaction.replied || interaction.deferred){
            if(!respRes){
                resp = await interaction.editReply(respOpt)
            }else{
                resp = await respRes.update(respOpt)
            }
        }else{
            resp = await interaction.reply(respOpt)
        }
    
        const collectorFilter = i => i.user.id === interaction.user.id;
        const confirmation = await resp.awaitMessageComponent({ filter: collectorFilter, time: 1000 * 60 * 3 });

        let command;
        if(confirmation.isButton() == true && BtnTrue == true){
            command = await interaction.client.buttons.get(confirmation.customId)
        }else if(confirmation.isStringSelectMenu() == true && MenuTrue == true){
            command = await interaction.client.menu.get(confirmation.customId)
        }else{
            throw true
        }

        if (!command) {
            console.error(`No command matching ${confirmation.customId} was found.`);
            await confirmation.update({embeds : [failEmbed("NOT FOUND", "Aucune commande trouvé", 404)], components: []});
            throw true
        }

        return {command, confirmation}
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
            setTimeout(() => {
                interaction.deleteReply()
            }, 10000);
        }

        return 1
    }
}

module.exports.modalResponseCat = async (responRes, interaction, idCat, UserParams, modal) => {
    try{
        await responRes.showModal(modal);
        const collectorFilter = i => i.user.id === interaction.user.id;
        const confirmation = await responRes.awaitModalSubmit({ filter: collectorFilter, time: 1000 * 60 * 5 })
        
        let command;
        if(confirmation.isModalSubmit() == true){
            command = interaction.client.modals.get(confirmation.customId)
        }else{
            throw new Error()
        }

        if (!command) {
            console.error(`No command matching ${confirmation.customId} was found.`);
            confirmation.update({embeds : [failEmbed("NOT FOUND", "Aucune commande trouvé", 404)], components: []});
            throw true
        }

        return await command.run(interaction, confirmation, idCat, UserParams)
    }catch(err){
        if(err != true){
            if(err.message !== "Collector received no interactions before ending with reason: time "){
                interaction.editReply({
                    embeds:[failEmbed("TIME OUT", "Vous avez mis trop de temps à répondre", 408)],
                    components: []
                })
                setTimeout(() => {
                    interaction.deleteReply()
                }, 10000);
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

module.exports.allResponseCat = async (interaction, respRes, data, result, embedAction, components, MenuTrue, BtnTrue) => {
    let mixedRet = await MixedResp(embedAction, components, interaction, respRes, BtnTrue, MenuTrue)
    if(mixedRet == 1) return;

    return await mixedRet.command.run(interaction, mixedRet.confirmation, data, result, 0)
}

module.exports.allResponseBud = async (interaction, respRes, data, result, embedAction, components, MenuTrue, BtnTrue, catInfo) => {
    let mixedRet = await MixedResp(embedAction, components, interaction, respRes, BtnTrue, MenuTrue)
    if(mixedRet == 1) return;

    return await mixedRet.command.run(interaction, mixedRet.confirmation, data, result, 0, catInfo)
}

module.exports.MixedResp = MixedResp