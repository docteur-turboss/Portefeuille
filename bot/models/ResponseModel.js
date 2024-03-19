module.exports.colorResponseEmbed = {
    successResponse : "DarkGreen",
    choiceBtn : "DarkPurple",
    failResponse : "DarkRed",
    selectMenu : "DarkAqua",
    infoObj : "DarkBlue",
}

module.exports.TitleResponseEmbed = {
    selectMenu : "Selection",
    choiceBtn : "Choisir",
    SuccessCreated : {
        budget : (IdCreated) => "Budget numéro : " + IdCreated
    }
}

module.exports.DescResponseEmbed = {
    category : {
        select : "Veuillez selectionner la catégorie voulu",
    },
    budget : {
        rolloverChoice : "Voulez vous cumuler les restes des mois précédents",
        created : "Votre budget a bien été créé"
    }
}

module.exports.emojiBtn = {
    right : '➡',
    left : '⬅',
    yes : '✅',
    no : '🛑'
}