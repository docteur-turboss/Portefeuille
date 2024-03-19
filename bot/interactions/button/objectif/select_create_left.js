const { navigationBtn } = require("../../../utils/category.pageNav");

module.exports.data = {
    name : "left_select_create_objectif"
}

module.exports.run = async (interaction, responRes, UserParams, result, page, input) => navigationBtn(interaction, responRes, UserParams, result, page, "budget_create", 0, input)