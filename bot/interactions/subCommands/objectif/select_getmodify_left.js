const { navigationBtn } = require('../../../utils/category.pageNav')

module.exports.data = {
    name : "left_select_objectif_getmodify"
}

module.exports.run = async (interaction, responRes, UserParams, result, page) => navigationBtn(interaction, responRes, UserParams, result, page, "objectif_getmodify", 0)