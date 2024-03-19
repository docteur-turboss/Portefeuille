# Cash Eyes (backend documentation)

This repository contains all Cash Eyes api routes

## Packages

- `bcryptjs` ([source](https://www.npmjs.com/package/bcryptjs)) - A powerful Node.js module for salt passwords
- `cookie-parser` ([source](https://www.npmjs.com/package/cookie-parser)) - A module used to retrieve web cookies
- `dotenv` ([source](https://www.npmjs.com/package/dotenv)) - A module for loads environment variables from a `.env` file intro `process.env`.
- `email-validator` ([source](https://www.npmjs.com/package/email-validator)) - A wonderful tool for validating e-mail addresses
- `express` ([source](https://www.npmjs.com/package/express)) - A minimalist web framework ✨
- `express-rate-limit` ([source](https://www.npmjs.com/package/express-rate-limit)) - A powerful rate-limiting middleware for Express.
- `formidable` ([source](https://www.npmjs.com/package/formidable)) - A fantastic Node.js module for parsing form data, especially file uploads.
- `knex` ([source](https://www.npmjs.com/package/knex)) - A SQL query builder that is flexible, portable, and fun to use!
- `mysql2` ([source](https://www.npmjs.com/package/mysql2)) - A sublime MySQL client for Node.js with focus on performance
- `uuid` ([source](https://www.npmjs.com/package/uuid)) - A great module for the creation of RFC4122 UUIDs

## Backend installation

**1. Packages**

```shell
npm install
```

**2. Create configuration file**

```shell
cd ./config
nano .env
```

```
# In the file `.env`
HOSTDB='localhost' # Your machine ip or localhost
PORTDB=Int # Your database port number
USERDB="String" # Your database user
DATABASE="String" # Your database table
PASSWORDDB="String" # Your database password
PORTEXPRESS=Int # A port number for receiving and sending information
SECRETCOOKIES="String" # A password for secure cookies
```
> [!TIP]
> To install the database on your server, simply run the file `/config/installation_database.sql`.

## Run the backendApp
For run the bot you need to execute this :
```shell
cd ./backend
npm run dev
# OR
node index
```

## API

All error returns :
```js
{
    success: boolean;
    code: int;
    reason: string;
}
```

### user
---

#### /api/v1/users/sign/up
A post request
- email (`String`)
- username (`String`)
- password (`String`)

Returns :
`Cookie` : 'auth'
```js
{
    success: boolean;
    data: {
        id: int;
        token: string;
    };
}
```

#### /api/v1/users/sign/in
A post request
- email (`String`)
- password (`String`)

Returns :
`Cookie` : 'auth'
```js
{
    success: boolean;
    data: {
        id:int;
        token: string;
    };
}
```

#### /api/v1/users/sign/out
A post request
- Cookie : `auth` (`String`)
- token (`String`)

Returns :
```js
{
    success: boolean,
    data: {
        commentaire : string
    },
}
```

#### /api/v1/users/update/profile
A post request
- token (`String`)
- email (`String`)
- password (`String`)
- username (`String`)
- Cookie : `auth` (`String`)
  
Returns :
`Cookie` : 'auth'
```js
{
    success: boolean;
    data: {
        id: int;
        token: string;
    };
}
```

#### /api/v1/users/@me
A post request
- token (`String`)
- email (`String`)
- password (`String`)
- username (`String`)
- Cookie : `auth` (`String`)

Returns :
```js
{
    success: boolean;
    data: [{
        id:int;
        email:string;
        token:string;
        username:string;
        cookieSecure:string;
    }],
}
```

#### /api/v1/users/@me/destroy
A post request
- Cookie : `auth` (`String`)
- token (`String`)
- id (`int`)

Returns :
```js
{
    success: boolean;
    data: {
        id:string;
        commentaire:string;
    };
}
```

### compte (/api/v1/compte)
---
#### Post Request
- Cookie : `auth` (`String`)

- token (`String`)
- montant (`Int`)
- type (`Int`)
#### & Put Request
- Cookie : `auth` (`String`)

- token (`String`)
- montant (`Int`)
- id (`Int`)
#### & Delete Request
- Cookie : `auth` (`String`)

- token (`String`)
- user_id (`Int`)
- id (`Int`)

Return 
```js
{
    success: boolean;
    data: {
        id:int;
        commentaire:string
    }
}
```

#### Get Request
- user_id (`Int`)
- id (`Int`)


Returns :
```js
{
    success: boolean;
    data: [{
        id:int;
        type:int;
        user_id:int;
        montant:int;
    }]
}
```

### budget (/api/v1/budget)
---
#### Post Request
- Cookie : `auth` (`String`)

- category_id (`Int`)
- rollover (`Boolean`)
- token (`String`)
- montant (`Int`)
#### & Put Request
- Cookie : `auth` (`String`)

- rollover (`Boolean`)
- token (`String`)
- montant (`Int`)
- id (`Int`)
#### & Delete Request
- id (`Int`)
- user_id (`Int`)
- token (`String`)
- category_id (`Int`)
- Cookie : `auth` (`String`)


Return 
```js
{
    success: boolean;
    data: {
        id:int;
        commentaire:string
    }
}
```

#### Get Request
- category_id (`Int`)
- user_id (`Int`)
- id (`Int`)


Returns :
```js
{
    success: boolean;
    data: [{
        id:int;
        user_id:int;
        montant:int;
        category_id:int;
        rollover:boolean;
    }]
}
```

### objectif (/api/v1/objectif)
---
#### Post Request
- montant_touch (`Boolean`)
- Cookie : `auth` (`String`)

- date_cible (`Date`)
- compte_id (`Int`)
- token (`String`)
- title (`String`)
- montant (`Int`)
- user_id (`Int`)
#### & Put Request
- montant_touch (`Boolean`)
- Cookie : `auth` (`String`)

- date_cible (`Date`)
- title (`String`)
- token (`String`)
- montant (`Int`)
- id (`Int`)
#### & Delete Request
- id (`Int`)
- user_id (`Int`)
- token (`String`)
- compte_id (`Int`)
- Cookie : `auth` (`String`)


Return 
```js
{
    success: boolean;
    data: {
        id:int;
        commentaire:string
    }
}
```

#### Get Request
- compte_id (`Int`)
- user_id (`Int`)
- id (`Int`)


Returns :
```js
{
    success: boolean;
    data: [{
        compte_id:int;
        title:string;
        user_id:int;
        montant:int;
        date_cible:date;
        montant_touch:boolean;
        id:int;
    }]
}
```

### category (/api/v1/category)
---
#### Post Request
- Cookie : `auth` (`String`)

- token (`String`)
- name (`String`)
- type (`Int`)
#### & Put Request
- Cookie : `auth` (`String`)

- token (`String`)
- name (`String`)
#### & Delete Request
- id (`Int`)
- user_id (`Int`)
- token (`String`)
- Cookie : `auth` (`String`)


Return 
```js
{
    success: boolean;
    data: {
        id:int;
        commentaire:string
    }
}
```

#### Get Request
- user_id (`Int`)
- id (`Int`)


Returns :
```js
{
    success: boolean;
    data: [{
        id:int;
        user_id:int;
        name:string;
        type:int;
    }]
}
```

### facture (/api/v1/facture)
---
#### Post Request
- Cookie : `auth` (`String`)

- repetition (`boolean`)
- category_id (`Int`)
- status (`boolean`)
- compte_id (`Int`)
- auto (`boolean`)
- token (`String`)
- title (`String`)
- [rappel (`Date`)]
- user_id (`Int`)
- montant (`Int`)
- date (`Date`)
#### & Put Request
- Cookie : `auth` (`String`)

- repetition (`boolean`)
- category_id (`Int`)
- status (`boolean`)
- compte_id (`Int`)
- auto (`boolean`)
- token (`String`)
- title (`String`)
- montant (`Int`)
- [rappel (`Date`)]
- date (`Date`)
- id (`Int`)
#### & Delete Request
- id (`Int`)
- user_id (`Int`)
- token (`String`)
- compte_id (`Int`)
- category_id (`Int`)
- Cookie : `auth` (`String`)


Return 
```js
{
    success: boolean;
    data: {
        id:int;
        commentaire:string
    }
}
```

#### Get Request
- category_id (`Int`)
- compte_id (`Int`)
- user_id (`Int`)
- id (`Int`)

Returns :
```js
{
    success: boolean;
    data: [{
        repetition:boolean;
        category_id:int;
        status:boolean;
        compte_id:int;
        title:string;
        auto:boolean;
        montant:int;
        rappel:Date;
        user_id:int;
        date:Date;
        id:int;
    }]
}
```

### transaction (/api/v1/transaction)
---
#### Post Request
- Cookie : `auth` (`String`)

- [commentaire (`string`)]
- category_id (`Int`)
- [toaccount (`int`)]
- compte_id (`Int`)
- token (`String`)
- user_id (`Int`)
- montant (`Int`)
- date (`Date`)
- type (`Int`)
#### & Put Request
- Cookie : `auth` (`String`)

- [commentaire (`string`)]
- category_id (`Int`)
- [toaccount (`int`)]
- compte_id (`Int`)
- token (`String`)
- montant (`Int`)
- date (`Date`)
- id (`Int`)
#### & Delete Request
- id (`Int`)
- user_id (`Int`)
- token (`String`)
- compte_id (`Int`)
- category_id (`Int`)
- Cookie : `auth` (`String`)


Return 
```js
{
    success: boolean;
    data: {
        id:int;
        commentaire:string
    }
}
```

#### Get Request
- user_id (`Int`)
- id (`Int`)


Returns :
```js
{
    success: boolean;
    data: [{
        id:int;
        category_id:int
        user_id:int;
        compte_id:int;
        montant:int;
        type:int;
        date:Date;
        commentaire:string;
        toaccount:int;
    }]
}
```


---
## Project progress :

Project version: 1.0.0
- y.x.x = project version y is finished
- x.y.x = step y has arrived 
    - 0 : construction
    - 1 : alpha
    - 2 : beta protype
    - 3 : beta
    - 4 : test prod

- x.x.y = commit number y of version x.x