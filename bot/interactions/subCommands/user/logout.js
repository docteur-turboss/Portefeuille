const { failEmbed, successEmbed } = require("../../../utils/embedsResponses");
const { SlashCommandSubcommandBuilder } = require("discord.js");
const User = require("../../../models/db/user");

module.exports.data = new SlashCommandSubcommandBuilder()
.setName("log-out")
.setDescription("Déconnectez vous")

module.exports.middleware = {
    connected : true
}

module.exports.run = async (interaction, data) => {
    let res = await User.update({token: "", cookie: ""}, {id_bot : interaction.user.id})
    if(res == 400){
        return await interaction.reply({ephemeral: true, embeds:[failEmbed()]})
    }

    return await interaction.reply({ephemeral: true, embeds:[
        successEmbed("Utilisateur déconnecté", "Vous êtes déconnecté")
    ]})
}