const { failEmbed, successEmbed } = require("../../../utils/embedsResponses");
const { SlashCommandSubcommandBuilder } = require("discord.js");
const { failResponse } = require("../../../utils/returnFail");
const { destroyUser } = require("../../../models/api/user");
const User = require("../../../models/db/user");

module.exports.data = new SlashCommandSubcommandBuilder()
.setName("delete")
.setDescription("Supprimez votre compte utilisateur");

module.exports.middleware = {
    connected : true
}

module.exports.run = async (interaction, data) => {
    let result = await destroyUser({Cookie: data.cookie, token: data.token})
    if(await failResponse(result, interaction) === 1){
        return
    }
    
    let res = User.delete({ id_bot : interaction.user.id})
    if(res == 400){
        console.log(res)
        return await interaction.reply({ephemeral: true, embeds:[failEmbed()]})
    }

    return await interaction.reply({ephemeral: true, embeds : [
        successEmbed("Utilisateur supprimé", "Vous pouvez retourner à vos occupations")
    ]})
}