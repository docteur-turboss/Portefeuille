const { EmbedBuilder } = require("discord.js");
const { getMenuCategory } = require("./nav");
const { PageNav } = require("./pageNav");
const { colorResponseEmbed } = require("../models/ResponseModel");

module.exports.navigationBtn = async (interaction, responRes, UserParams, result, page, nameID, btnType, input) => {
    if(btnType==1) page++;
    else page--;

    let embedAction = new EmbedBuilder()
    .setDescription("Veuillez selectionner la catégorie voulu")
    .setColor(colorResponseEmbed.selection)
    .setTitle("Selection")
    .setTimestamp()

    const resp = await responRes.update({
        embeds : [embedAction],
        components: getMenuCategory(page, result.data, nameID),
        ephemeral : true
    });

    await PageNav(interaction, resp, UserParams, result, page, input)
}