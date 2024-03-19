const { SlashCommandBuilder } = require("discord.js");
const create = require("../../subCommands/budget/create");
const get = require("../../subCommands/budget/getmodifie");

module.exports.data = new SlashCommandBuilder()
.setName("budget")
.setDescription("Budget")
.addSubcommand(create.data)
.addSubcommand(get.data)