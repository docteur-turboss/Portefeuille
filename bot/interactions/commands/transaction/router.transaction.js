const { SlashCommandBuilder } = require("discord.js");
const get = require("../../subCommands/transaction/getmodifie");
const create = require("../../subCommands/transaction/create");

module.exports.data = new SlashCommandBuilder()
.setName("transaction")
.setDescription("Transaction")
// .addSubcommand(create.data)
// .addSubcommand(get.data)