const { SlashCommandSubcommandBuilder, EmbedBuilder} = require("discord.js");
const { allResponseBud } = require("../../../utils/responseCommandRun");
const { colorResponseEmbed } = require("../../../models/ResponseModel");
const { failResponse } = require("../../../utils/returnFail");
const { read } = require("../../../models/api/compte");
const { getMenuCompte } = require("../../../utils/nav");

module.exports.data = new SlashCommandSubcommandBuilder()
.setName("create")
.setDescription("Créez vous un objectif financier")
.addNumberOption(opt => 
    opt.setDescription("Le montant de votre objectif")
    .setName('montant')
    .setRequired(true)
)
.addStringOption(opt => 
    opt.setDescription("Le titre de votre objectif (sa raison)")
    .setName("titre")
    .setRequired(true)
)
.addStringOption(opt => 
    opt.setDescription("Dans combien d'année souhaitez vous réaliser cet objectif")
    .setName('date_cible_an')
    .setRequired(true)
    .setChoices(
        {name : '0 an', value : '0'},
        {name : '1 an', value : '1'},
        {name : '2 ans', value : '2'},
        {name : '3 ans', value : '3'},
        {name : '4 ans', value : '4'},
        {name : '5 ans', value : '5'},
        {name : '6 ans', value : '6'},
        {name : '7 ans', value : '7'},
        {name : '8 ans', value : '8'},
        {name : '9 ans', value : '9'},
        {name : '10 ans', value : '10'},
    )
)
.addStringOption(opt => 
    opt.setDescription("Dans combien de mois souhaitez vous réaliser cet objectif")
    .setName('date_cible_mois')
    .setChoices(
        {name : '1 mois', value : '1'},
        {name : '2 mois', value : '2'},
        {name : '3 mois', value : '3'},
        {name : '4 mois', value : '4'},
        {name : '5 mois', value : '5'},
        {name : '6 mois', value : '6'},
        {name : '7 mois', value : '7'},
        {name : '8 mois', value : '8'},
        {name : '9 mois', value : '9'},
        {name : '10 mois', value : '10'},
        {name : '11 mois', value : '11'},
    )
)


module.exports.middleware = {
    connected : true
}

module.exports.run = async (interaction, data) => {
    let result = await read({user_id : data.id}, {token: data.token, Cookie: data.cookie})
    if(await failResponse(result, interaction) === 1){
        return
    }
    
    let mois = interaction.options.getString("date_cible_mois")??0
    let annee = interaction.options.getString("date_cible_an")    
    let montant = interaction.options.getNumber("montant")
    let titre = interaction.options.getString("titre")

    let dateNow = new Date()

    dateNow = new Date(dateNow.getFullYear() + parseInt(annee), dateNow.getMonth() + parseInt(mois), dateNow.getDate())

    let embedAction = new EmbedBuilder()
    .setDescription("Veuillez selectionner le wallet souhaité")
    .setColor(colorResponseEmbed.selection)
    .setTitle("Selection")
    .setTimestamp()

    return await allResponseBud(interaction, false, data, result.data, embedAction, getMenuCompte(0, result.data, "create_objectif"), true, true, {montant : montant, title : titre, date_cible : dateNow})
}