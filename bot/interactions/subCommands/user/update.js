const { successEmbed } = require("../../../utils/embedsResponses");
const { SlashCommandSubcommandBuilder } = require("discord.js");
const { failResponse } = require("../../../utils/returnFail");
const { updateUser } = require("../../../models/api/user");
const User = require("../../../models/db/user");

module.exports.data = new SlashCommandSubcommandBuilder()
.setName("update")
.setDescription("Modifiez votre compte")
.addStringOption(option => 
    option
    .setName("email".toLocaleString())
    .setDescription("Si vous voulez modifier votre email")
    .setMaxLength(200))
.addStringOption(option =>
    option
    .setName("password".toLocaleString())
    .setDescription("Si vous voulez modifier votre mot de passe")
    .setMinLength(4))
.addStringOption(option=>
    option
    .setName("username".toLocaleString())
    .setDescription("Si vous voulez modifier votre username")
    .setMinLength(4)
    .setMaxLength(50))

    module.exports.middleware = {
        connected : true
    }

module.exports.run = async (interaction, data) => {
    let email = interaction.options.getString('email')
    let password = interaction.options.getString('password')
    let username = interaction.options.getString('username')

    let result = await updateUser({email: email, password: password, username: username}, {Cookie: data.cookie, token: data.token})
    if(await failResponse(result, interaction) === 1){
        return
    }
    
    let res = await User.update({cookie : result.data.cookie, token : result.data.token}, {id_bot : interaction.user.id})
    if(res == 400){
        return await interaction.reply({ephemeral: true, embeds:[embedError]})
    }

    return await interaction.reply({ephemeral: true, embeds : [
        successEmbed("Utilisateur modifié", "Toutes les informations sont mis à jours")
    ]})
}
