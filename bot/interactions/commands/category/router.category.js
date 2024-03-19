const { SlashCommandBuilder } = require("discord.js");
const get = require("../../subCommands/category/getmodifie");
const create = require("../../subCommands/category/create");

module.exports.data = new SlashCommandBuilder()
.setName("category")
.setDescription("Catégorie")
.addSubcommand(create.data)
.addSubcommand(get.data)