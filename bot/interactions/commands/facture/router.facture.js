const { SlashCommandBuilder } = require("discord.js");
const get = require("../../subCommands/facture/getmodifie");
const create = require("../../subCommands/facture/create");

module.exports.data = new SlashCommandBuilder()
.setName("facture")
.setDescription("Facture")
// .addSubcommand(create.data)
// .addSubcommand(get.data)