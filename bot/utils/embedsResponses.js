const { EmbedBuilder } = require("discord.js");
const { colorResponseEmbed } = require("../models/ResponseModel");

module.exports.successEmbed = (titleApp, commentaire, status) => new EmbedBuilder()
.setTitle(titleApp)
.setDescription(commentaire)
.setFooter({text : "(status " + (status ?? "200") + ")"})
.setColor(colorResponseEmbed.successResponse)
.setImage(process.env.GifSuccess)
.setTimestamp()

module.exports.failEmbed = (errMess, errComm, status) => new EmbedBuilder()
.setTitle(errMess ?? "INTERNAL SERVER ERROR")
.setDescription(errComm ?? "Une erreur s'est produite, veuillez réessayer plus tard")
.setFooter({text : "(error " + (status ?? "500") + ")"})
.setColor(colorResponseEmbed.failResponse)
.setImage(process.env.GifFail)
.setTimestamp()