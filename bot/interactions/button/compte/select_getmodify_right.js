const { navigationBtn } = require("../../../utils/category.pageNav");

module.exports.data = {
    name : "rigth_select_compte_getmodify"
}

module.exports.run = async (interaction, responRes, UserParams, result, page) => navigationBtn(interaction, responRes, UserParams, result, page, "compte_getmodify", 1)