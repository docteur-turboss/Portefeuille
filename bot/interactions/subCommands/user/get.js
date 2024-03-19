const { SlashCommandSubcommandBuilder, EmbedBuilder } = require("discord.js");
const { failResponse } = require("../../../utils/returnFail");
const { getUser } = require("../../../models/api/user");
const { colorResponseEmbed } = require("../../../models/ResponseModel");

module.exports.data = new SlashCommandSubcommandBuilder()
.setName("get")
.setDescription("Récupérez vos informations")

module.exports.middleware = {
    connected : true
}

module.exports.run = async (interaction, data) => {
    try{
        let result = await getUser({Cookie: data.cookie, token: data.token})
        if(await failResponse(result, interaction) === 1){
            return
        }
    
        return await interaction.reply({ephemeral: true, embeds : [
            new EmbedBuilder()
            .setTitle('Description')
            .setDescription('Voici vos informations sur votre compte')
            .addFields({name : "Username", value : `\`\`\`${result.data.username}\`\`\``})
            .addFields({name : "Email", value : `\`\`\`${result.data.email}\`\`\``})
            .setColor(colorResponseEmbed.info)
            .setTimestamp()
        ]})
    }catch(err){

    }
}
