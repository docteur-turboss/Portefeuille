# Cash Eyes (bot documentation)

This repository contains all Cash Eyes bot commands

## Packages 

- `axios` ([source](https://www.npmjs.com/package/axios)) - Promise based HTTP client for the browser and node.js
- `discord.js` ([source](https://www.npmjs.com/package/discord.js)) - A powerful Node.js module that allows you to easily interact with the Discord API.
- `dotenv` ([source](https://www.npmjs.com/package/dotenv)) - A module for loads environment variables from a `.env` file 
- `knex` ([source](https://www.npmjs.com/package/knex)) - A SQL query builder that is flexible, portable, and fun to use!
- `moment` ([source](https://www.npmjs.com/package/moment)) - A JavaScript date library for parsing, validating, manipulating, and formatting dates.
- `mysql2` ([source](https://www.npmjs.com/package/mysql2)) - A sublime MySQL client for Node.js with focus on performance

## Bot installation

**1. Packages**

```shell
npm install
```

**2. Create configuration file**
```shell
cd ./config
nano .env
```

```env
# In the file `.env`
BOT_TOKEN="String" # Your bot token
HOSTDB='localhost' # Your machine ip or localhost
PORTDB=Int # Your database (for the bot) port number
USERDB="String" # Your database user (for the bot) port number
DATABASE="String" # Your database table (for the bot)
PASSWORDDB="String" # Your database password (for the bot)
CLIENTID=Int # Your bot id
GifFail="String" # Link to a fail gif (for the embeds)
GifSuccess="String" # Link to a success gif (for the embeds)
PROTOCOL_AXIOS='http' | 'https # protocole of your backend
HOST_AXIOS="String" # Your backend adress
PORT_AXIOS='int' # Your backend port number
```
> [!TIP]
> To install the database on your server, simply run the file `/config/installation_database.sql`.


## Commands

> [!IMPORTANT]
> You need to run this shell code in portefeuille forder for execute the commands on discord
```shell
cd ./bot/config
node register-command.js
```

### Fonctionnal commands
- [x] budget create (if you are connected and have already create category)
- [ ] budget get-or-update
- [ ] category create
- [ ] category get-or-update
- [ ] facture create
- [ ] facture get-or-update
- [ ] objectif create
- [ ] objectif get-or-update
- [x] ping
- [ ] transaction create
- [ ] transaction get-or-update
- [x] user delete
- [x] user get
- [x] user log-out
- [x] user sign-in
- [x] user sign-up
- [x] user update
- [ ] wallet create
- [ ] wallet get-or-update


## Run the bot
For run the bot you need to execute this :
```shell
cd ./bot
npm run dev
# OR
node index
```

---
## Projet progress :

Project version: 0.0.1
- y.x.x = project version y is finished
- x.y.x = step y has arrived 
    - 0 : construction
    - 1 : alpha
    - 2 : beta protype
    - 3 : beta
    - 4 : test prod

- x.x.y = commit number y of version x.x

## About :
- `RoadMap bot` [source](./RoadMap.md)
- `Home readme` [source](../README.md)