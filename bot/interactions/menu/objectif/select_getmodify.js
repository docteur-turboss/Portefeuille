const { ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { allResponseCat } = require("../../../utils/responseCommandRun");
const { TypeCompteArray } = require("../../../models/ModuleTypeModel");
const { read } = require("../../../models/api/compte")
const moment = require('moment');

module.exports.data = {
    name : "menu_select_objectif_getmodify"
}

module.exports.run = async (interaction, responRes, UserParams, result) => {
    let readObjectif
    let data = result.data
    const i = data.findIndex(e => e.id == responRes.values[0]);
    if (i > -1) {
        readObjectif = data[i]
    }

    let walletData = await read({id : readObjectif.compte_id}, {token: UserParams.token, Cookie : UserParams.cookie})

    moment.locale('fr')

    let dateCible = moment(readObjectif.date_cible).from().toString()
    dateCible = dateCible[0].toUpperCase() + dateCible.slice(1)

    let embedDescription = new EmbedBuilder()
    .setTitle('Description')
    .setDescription('Voici les détails de votre objectif')
    .setColor('DarkGreen')
    .addFields({name : "ID", value : `\`\`\`${readObjectif.id}\`\`\``})
    .addFields({name : "Titre", value : `\`\`\`${readObjectif.title}\`\`\``})
    .addFields({name : "Date cible", value : `\`\`\`${dateCible}\`\`\``})
    .addFields({name : "Montant cible", value : `\`\`\`${readObjectif.montant}\`\`\``})
    .addFields({name : "Wallet ID", value : `\`\`\`${readObjectif.compte_id}\`\`\``})
    .setTimestamp()

    if(walletData.success !== false){
        embedDescription
        .addFields({name : "Type de Wallet", value : `\`\`\`${TypeCompteArray[walletData.data[0].type - 1].name}\`\`\``})
        .addFields({name : "Montant du Wallet", value : `\`\`\`${walletData.data[0].montant}\`\`\``})
    }

    embedDescription
    .addFields({name : "Utilisation des fonds du Wallet", value : `\`\`\`${(readObjectif.montant_touch)? 'Oui' : 'Non'}\`\`\``})

    let btnModify = new ButtonBuilder()
    .setCustomId("button_modif_objectif_getmodify")
    .setStyle(ButtonStyle.Primary)
    .setEmoji('🔧')
    .setLabel("Modifier")

    let btnDelete = new ButtonBuilder()
    .setCustomId("button_delete_objectif_getmodify")
    .setStyle(ButtonStyle.Danger)
    .setEmoji('🗑')
    .setLabel('Supprimer')

    let action = new ActionRowBuilder()
    .addComponents(btnModify, btnDelete)

    return await allResponseCat(interaction, responRes, UserParams, readObjectif, embedDescription, [action], false, true)
}