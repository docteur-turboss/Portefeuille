const { SlashCommandBuilder } = require("discord.js");
const destroy = require("../../subCommands/user/delete");
const uptdate = require("../../subCommands/user/update");
const signin = require("../../subCommands/user/signin");
const create = require("../../subCommands/user/create");
const logout = require("../../subCommands/user/logout");
const get = require("../../subCommands/user/get");

module.exports.data = new SlashCommandBuilder()
.setName("user")
.setDescription("Utilisateur")
.addSubcommand(create.data)
.addSubcommand(destroy.data)
.addSubcommand(get.data)
.addSubcommand(logout.data)
.addSubcommand(signin.data)
.addSubcommand(uptdate.data)