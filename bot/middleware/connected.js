const User = require("../models/db/user")

module.exports = async (interaction) => {
    let data = await User.read({id_bot : interaction.user.id})
    if(data == 400){
        return false
    }

    data = {
        id : data.id,
        token : data.token,
        Cookie : data.cookie
    }
    
    return data
}