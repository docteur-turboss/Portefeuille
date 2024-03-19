const { EmbedBuilder } = require('discord.js')
const { colorResponseEmbed } = require('../../../models/ResponseModel')

module.exports.data = {
    name : "button_modif_objectif_getmodify"
}

module.exports.run = async (interaction, respRes, UserParams, objectifData) => {
    let embedAction = new EmbedBuilder()
    .setTimestamp()
    .setTitle("Choisir")
    .setColor(colorResponseEmbed.choice)
    .setDescription("Voulez vous modifier la date fixée ?")
    .setFooter({text : `${objectifData.id}`})

}