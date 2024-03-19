const { navigationBtn } = require("../../../utils/budget.pageNav");

module.exports.data = {
    name : "left_select_budget_getmodify"
}

module.exports.run = async (interaction, responRes, UserParams, result, page) => navigationBtn(interaction, responRes, UserParams, result, page, "budget_getmodify", 0)