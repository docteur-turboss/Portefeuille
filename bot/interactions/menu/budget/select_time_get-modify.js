const { allResponseBud } = require("../../../utils/responseCommandRun");
const { colorResponseEmbed } = require("../../../models/ResponseModel");
const { read } = require('../../../models/api/category');
const { getMenuBudget } = require("../../../utils/nav");
const { EmbedBuilder } = require("discord.js");

module.exports.data = {
    name : "date_filter_budget_getmodify"
}

module.exports.run = async (interaction, UserParams, data) => {
    let dataCategory = []
    let resTabFil = await result.data.filter(elem => {
        let tmp =  new Date(elem.date)
        let mois = tmp.getMonth()
        let annee = tmp.getFullYear()

        return (`${mois}/${annee}` === responRes.values[0])? 1 : 0;
    })

    for(elem of resTabFil){
        let tmp = await read({id : elem.category_id}, {token : UserParams.token, Cookie: UserParams.cookie})
        dataCategory.push(await tmp.data[0])
    }

    let embedAction = new EmbedBuilder()
    .setDescription("Veuillez selectionner la catégorie souhaité")
    .setColor(colorResponseEmbed.selection)
    .setTitle("Selection")
    .setTimestamp()
    
    return await allResponseBud(interaction, responRes, UserParams, resTabFil, embedAction, getMenuBudget(0, resTabFil, "budget_getmodify", dataCategory), true, false, dataCategory)
}