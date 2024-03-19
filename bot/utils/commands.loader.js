let fs = require("fs")
let path = require('path')
let { Collection } = require('discord.js')

let SubCommandsLoader = (fileDirector) => {
    let coll = new Collection()
    const foldersPath = path.join(__dirname, "../interactions", "subCommands", fileDirector);
    const commandFiles = fs.readdirSync(foldersPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(foldersPath, file);
        const command = require(filePath);
        if(!('data' in command && 'run' in command)){
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "run" property.`);
            break;
        }

        coll.set(command.data.name, command);
    }
    
    return coll
}

module.exports = (collection, collectionFolders) =>{
    const foldersPath = path.join(__dirname, "../interactions", collectionFolders);
    const commandFolders = fs.readdirSync(foldersPath);

    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        for (let file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            if(file.indexOf('router') !== -1){
                let delarr = (arr, idx) => {
                    let retidx = arr.indexOf(idx)
                    if(retidx > -1){
                        arr.splice(retidx, 1)
                    }
                    return arr
                }

                file = file.split('.')
                file = delarr(file, 'router')
                file = delarr(file, 'js')
                file = file[0]

                collection.set(command.data.name, SubCommandsLoader(file))
            }else{
                if (!('data' in command && 'run' in command)) {
                    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "run" property.`);
                    break;
                }

                collection.set(command.data.name, command);
            }
        }
    }
    return collection
}