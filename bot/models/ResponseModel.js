module.exports.colorResponseEmbed = {
    successResponse : "DarkGreen",
    description : "DarkNavy",
    failResponse : "DarkRed",
    choiceBtn : "DarkPurple",
    selectMenu : "DarkAqua",
    infoObj : "DarkBlue",
}

module.exports.TitleResponseEmbed = {
    description : "Description",
    selectMenu : "Selection",
    deleteBtn : "Supprimer",
    modifyBtn : "Modifier",
    choiceBtn : "Choisir",
    SuccessCreated : {
        budget : (IdCreated) => "Budget numéro : " + IdCreated
    },
}

module.exports.DescResponseEmbed = {
    category : {
        select : "Veuillez selectionner une catégorie",
    },
    budget : {
        rolloverChoice : "Voulez vous cumuler les restes des mois précédents",
        description : "Voici les informations de votre budget",
        monthSelect : "Veuillez selectionnez un mois",
        created : "Votre budget a bien été créé",
        select : "Veuillez selectionner un budget"
    }
}

module.exports.emojiBtn = {
    modify : '🔧',
    delete : '🗑',
    right : '➡',
    left : '⬅',
    yes : '✅',
    no : '🛑'
}