const { navigationBtn } = require("../../../utils/category.pageNav");

module.exports.data = {
    name : "left_select_category_getmodify"
}

module.exports.run = async (interaction, responRes, UserParams, result, page) => navigationBtn(interaction, responRes, UserParams, result, page, "category_getmodify")