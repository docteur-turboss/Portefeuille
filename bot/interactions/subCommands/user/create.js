const { failEmbed, successEmbed } = require("../../../utils/embedsResponses");
const { SlashCommandSubcommandBuilder } = require("discord.js");
const { failResponse } = require("../../../utils/returnFail");
const { signup } = require("../../../models/api/user");
const User = require("../../../models/db/user");

module.exports.data = new SlashCommandSubcommandBuilder()
.setName("sign-up")
.setDescription("Créez vous un compte utilisateur")
.addStringOption(option => 
    option
    .setName("email".toLocaleString())
    .setDescription("Votre email")
    .setMaxLength(200)
    .setRequired(true))
.addStringOption(option =>
    option
    .setName("password".toLocaleString())
    .setDescription("Votre mot de passe")
    .setMinLength(4)
    .setRequired(true))
.addStringOption(option=>
    option
    .setName("username".toLocaleString())
    .setDescription("Votre nom d'utilisateur")
    .setMinLength(3)
    .setMaxLength(40)
    .setRequired(true));

module.exports.run = async (interaction) => {
    let email = interaction.options.getString('email')
    let password = interaction.options.getString('password')
    let username = interaction.options.getString('username')

    let result = await signup({email: email, password: password, username: username})
    if(await failResponse(result, interaction) === 1){
        return
    }
    
    let read = await User.read({id_bot : interaction.user.id})
    let res
    if(read.id){
        res = await User.update({id : result.data.id, cookie: result.data.cookie, token: result.data.token}, {id_bot: interaction.user.id})
    }else{
        res = await User.create({id_bot : interaction.user.id, id: result.data.id, cookie : result.data.cookie, token : result.data.token})
    }
    
    if(res == 400){
        console.log(res)
        return await interaction.reply({ephemeral: true, embeds:[failEmbed()]})
    }

    return await interaction.reply({ephemeral: true, embeds : [
        successEmbed("Utilisateur créé", "Vous pouvez utiliser l'application désormais")
    ]})
}
