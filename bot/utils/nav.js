const { ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuOptionBuilder, StringSelectMenuBuilder } = require("discord.js")
const { TypeCategoryArray } = require("../models/ModuleTypeModel")
const { TypeCompteArray } = require("../models/ModuleTypeModel")

let LeftRightBtn = (page, optionLength, nomParam) => {
    let btnactionRow = new ActionRowBuilder()
    
    if (page>0) {
        btnactionRow.addComponents(new ButtonBuilder()
        .setCustomId('left_select_' + nomParam)
        .setEmoji('⬅')
        .setStyle(ButtonStyle.Primary))
    }
    if (10*(page+1)<optionLength) {
        btnactionRow.addComponents(new ButtonBuilder()
        .setCustomId('rigth_select_' + nomParam)
        .setEmoji('➡')
        .setStyle(ButtonStyle.Primary))
    }

    return btnactionRow
}

let returnComponent = (menuactionRow, selectMenu, btnactionRow) => {
    menuactionRow.setComponents(selectMenu)

    let rtn = []

    if(menuactionRow.components[0].options[0] !== undefined){
        rtn.push(menuactionRow)
    }
    if(btnactionRow.components[0] !== undefined){
        rtn.push(btnactionRow)
    }
    return rtn;
}

module.exports.getMenuCategory = (page, options, nomParam) => {
    let btnactionRow = LeftRightBtn(page, options.length, nomParam)

    let arrMenuOption = []
    for (let i=10*page; i < options.length && i < 10*(page+1); i++) {
        let id = options[i].id
        let type = options[i].type
        let name = options[i].name
        arrMenuOption.push(
            new StringSelectMenuOptionBuilder()
            .setLabel(`${i} ${TypeCategoryArray[type - 1].name}`)
            .setDescription(`Nom : ${name}`)
            .setValue(`${id}`)
        )
    }

    let selectMenu = new StringSelectMenuBuilder()
    .setCustomId("menu_select_" + nomParam)
    .setPlaceholder("Sélectionnez une catégorie")
    .setOptions(arrMenuOption)

    return returnComponent(new ActionRowBuilder(), selectMenu, btnactionRow)
}

module.exports.getMenuCompte = (page, options, nomParam) => {
    let btnactionRow = LeftRightBtn(page, options.length, nomParam)

    let arrMenuOption = []
    for (let i=10*page; i < options.length && i < 10*(page+1); i++) {
        let id = options[i].id
        let type = options[i].type
        let montant = options[i].montant
        arrMenuOption.push(
            new StringSelectMenuOptionBuilder()
            .setLabel(`${i} ${TypeCompteArray[type - 1].name}`)
            .setDescription(`Montant : ${montant}`)
            .setValue(`${id}`)
        )
    }

    let selectMenu = new StringSelectMenuBuilder()
    .setCustomId("menu_select_" + nomParam)
    .setPlaceholder("Sélectionnez un wallet")
    .setOptions(arrMenuOption)

    return returnComponent(new ActionRowBuilder(), selectMenu, btnactionRow)
}

module.exports.getMenuBudget = (page, options, nomParam, categoryData) => {
    let btnactionRow = LeftRightBtn(page, options.length, nomParam)

    let arrMenuOption = []
    for (let i=10*page; i < options.length && i < 10*(page+1); i++) {
        let id = options[i].id
        let montant = options[i].montant
        let categoryId = options[i].category_id
        let cat = categoryData.find(e => e.id === categoryId)
        if(cat !== undefined){
            let type = cat.type
            arrMenuOption.push(
                new StringSelectMenuOptionBuilder()
                .setLabel(`${i} ${TypeCategoryArray[type - 1].name}`)
                .setDescription(`Montant : ${montant}`)
                .setValue(`${id}`)
            )
        }else{
            arrMenuOption.push(
                new StringSelectMenuOptionBuilder()
                .setLabel(`${i} Catégorie numéro : ${categoryId}`)
                .setDescription(`Montant : ${montant}`)
                .setValue(`${id}`)
            )
        }
        
    }
    let selectMenu = new StringSelectMenuBuilder()
    .setPlaceholder("Sélectionnez un budget")
    .setCustomId("menu_select_" + nomParam)
    .setOptions(arrMenuOption)

    return returnComponent(new ActionRowBuilder(), selectMenu, btnactionRow)
}

module.exports.getMenuObjectif = (page, options, nomParam) => {
    let btnactionRow = LeftRightBtn(page, options.length, nomParam)

    let arrMenuOption = []
    for (let i=10*page; i < options.length && i < 10*(page+1); i++) {
        let id = options[i].id
        let title = options[i].title
        let montant = options[i].montant
            arrMenuOption.push(
                new StringSelectMenuOptionBuilder()
                .setLabel(`${i} Titre : ${title}`)
                .setDescription(`Montant : ${montant}`)
                .setValue(`${id}`)
            )
    }

    let selectMenu = new StringSelectMenuBuilder()
    .setPlaceholder("Sélectionnez un budget")
    .setCustomId("menu_select_" + nomParam)
    .setOptions(arrMenuOption)

    return returnComponent(new ActionRowBuilder(), selectMenu, btnactionRow)
}

module.exports.LeftRightBtn = LeftRightBtn
module.exports.returnComponent = returnComponent