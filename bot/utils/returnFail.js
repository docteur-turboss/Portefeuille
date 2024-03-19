const { failEmbed } = require("./embedsResponses")

module.exports.failResponse = async (result, interaction) => {
    if(result.success == false){
        if(result.data.status !== 500){
            let respofil = failEmbed(result.data.data.errMess, result.data.data.reason, result.data.status)
            if(interaction.replied || interaction.deferred) {
                await interaction.editReply({ embeds:[respofil], ephemeral: true , components: []});
            } else {
                await interaction.reply({ephemeral: true, embeds : [respofil], components: []})
            }
            setTimeout(() => {
                interaction.deleteReply()
            }, 10000);
            return 1
        }


        console.log(result)
        let respofil = failEmbed(result.data.data.errMess, result.data.data.reason, result.data.status)
        if(interaction.replied || interaction.deferred) {
            await interaction.editReply({ embeds:[respofil], ephemeral: true, components: [] });
        } else {
            await interaction.reply({ephemeral: true, embeds : [respofil], components: []})
        }
        setTimeout(() => {
            interaction.deleteReply()
        }, 10000);
        return 1
    }

    return 0
}