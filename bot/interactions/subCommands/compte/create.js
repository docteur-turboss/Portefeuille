const { successEmbed } = require("../../../utils/embedsResponses");
const { SlashCommandSubcommandBuilder } = require("discord.js");
const { failResponse } = require("../../../utils/returnFail");
const { create } = require("../../../models/api/compte");
const TypeCompte = require('../../../models/ModuleTypeModel');

module.exports.data = new SlashCommandSubcommandBuilder()
.setName("create")
.setDescription("Créez vous un compte de valeur.")
.addStringOption(option => 
    option
    .setName("type".toLocaleString())
    .setDescription("Le type de portefeuille")
    .setChoices(...TypeCompte.TypeCompteArray)
    .setRequired(true))
.addIntegerOption(option =>
    option
    .setName("montant".toLocaleString())
    .setDescription("Le montant du portefeuille")
    .setRequired(true))

module.exports.middleware = {
    connected : true
}

module.exports.run = async (interaction, data) => {
    let type = interaction.options.getString('type')
    let montant = interaction.options.getInteger('montant')



    let result = await create({montant: montant, type: type}, {token: data.token, Cookie: data.cookie})
    if(await failResponse(result, interaction) === 1){
        return
    }

    if(interaction.replied || interaction.deferred) {
        return await interaction.editReply({ embeds:[
            successEmbed("Wallet", "Votre wallet vient d'être crée", 200)
        ], ephemeral: true });
    } else {
        return await interaction.reply({ephemeral: true, embeds : [
            successEmbed("Wallet", "Votre wallet vient d'être crée", 200)
        ]})
    }
}
