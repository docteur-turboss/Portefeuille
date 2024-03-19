const { SlashCommandSubcommandBuilder, EmbedBuilder} = require("discord.js");
const { failResponse } = require("../../../utils/returnFail");
const { read } = require("../../../models/api/category");

module.exports.data = new SlashCommandSubcommandBuilder()
.setName("create")
.setDescription("Créez une nouvelle transaction")

module.exports.run = async (interaction, data) => {
    
}