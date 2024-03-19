const { SlashCommandBuilder } = require("discord.js");
const get = require("../../subCommands/objectif/getmodifie");
const create = require("../../subCommands/objectif/create");

module.exports.data = new SlashCommandBuilder()
.setName("objectif")
.setDescription("Objectif")
.addSubcommand(create.data)
.addSubcommand(get.data)