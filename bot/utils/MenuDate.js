const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require("discord.js")
const { LeftRightBtn, returnComponent } = require("./nav")

const MoisDef = [
    "Janvier", 
    "Février", 
    "Mars", 
    "Avril", 
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre"
]

module.exports.existData_MenuTime = (ModuleName, results, page) => {
    let cache = {}
    let resultDate = results.map(elem => {
        elem = new Date(elem.date)
        let mois = elem.getMonth()
        let annee = elem.getFullYear()
        
        if(cache[`${mois}/${annee}`]){
            return null
        }else{
            cache[`${mois}/${annee}`]=`${mois}/${annee}`;
            return elem
        }
    })
    resultDate = resultDate.filter(e => e != null).sort((a,b)=>a-b).reverse();

    let btnactionRow = LeftRightBtn(page, resultDate.length, ModuleName)

    let arrMenuOption = []
    for(let i = 10*page; i < resultDate.length && i<10*(page+1); i++){
        if(resultDate[i] !== null){
            arrMenuOption.push(
                new StringSelectMenuOptionBuilder()
                .setLabel(`${MoisDef[resultDate[i].getMonth()]} ${resultDate[i].getFullYear()}`)
                .setValue(`${resultDate[i].getMonth()}/${resultDate[i].getFullYear()}`)
                .setDescription("La date du " + MoisDef[resultDate[i].getMonth()] + " " + resultDate[i].getFullYear())
            )
        }
    }

    let menuComponent = new StringSelectMenuBuilder()
    .setCustomId("date_filter_" + ModuleName)
    .setPlaceholder("Sélectionnez une date de budget")
    .setOptions(arrMenuOption)

    return returnComponent(new ActionRowBuilder(), menuComponent, btnactionRow)
}