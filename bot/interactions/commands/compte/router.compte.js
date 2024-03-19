const { SlashCommandBuilder } = require("discord.js");
const get = require("../../subCommands/compte/getmodifie");
const create = require("../../subCommands/compte/create");

module.exports.data = new SlashCommandBuilder()
.setName("wallet")
.setDescription("Portefeuille")
.addSubcommand(create.data)
.addSubcommand(get.data)