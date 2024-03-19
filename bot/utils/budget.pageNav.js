const { EmbedBuilder } = require("discord.js");
const { existData_MenuTime } = require("./MenuDate");
const { PageNav } = require("./pageNav");
const { colorResponseEmbed } = require("../models/ResponseModel");

module.exports.navigationBtn = async (interaction, responRes, UserParams, result, page, nameID, btnType) => {
    if(btnType==1) page++;
    else page--;

    let embedAction = new EmbedBuilder()
    .setDescription("Veuillez selectionnez le mois de modification :")
    .setColor(colorResponseEmbed.selection)
    .setTitle("Selection")
    .setTimestamp()

    const resp = await responRes.update({
        embeds : [embedAction],
        components: existData_MenuTime(nameID, result.data, page),
        ephemeral : true
    });

    await PageNav(interaction, resp, UserParams, result, page)
}