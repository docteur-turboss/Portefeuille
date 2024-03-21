# Cash Eyes (backend documentation)

Ce repository contien toutes les routes de l'api de Cash Eyes.

## Table des matières
- [Packages](#packages)
- [Backend installation](#backend-installation)
- [Démarer le backend](#démarer-le-backend-de-lapplication)
- [api](#api)


## Packages

- `bcryptjs` ([source](https://www.npmjs.com/package/bcryptjs)) - Un module Nodejs pour saler les mots de passe.
- `cookie-parser` ([source](https://www.npmjs.com/package/cookie-parser)) - Un middleware d'Express pour les cookies
- `dotenv` ([source](https://www.npmjs.com/package/dotenv)) - Un module pour charger les variables d'environnement à partir d'un fichier `.env` dans la propriété `process.env`.
- `email-validator` ([source](https://www.npmjs.com/package/email-validator)) - Un merveilleux outil pour valider les adresses e-mail
- `express` ([source](https://www.npmjs.com/package/express)) - Un framework web minimaliste ✨
- `express-rate-limit` ([source](https://www.npmjs.com/package/express-rate-limit)) - Un puissant middleware de limitation de requêtes pour Express.
- `formidable` ([source](https://www.npmjs.com/package/formidable)) - Un fantastique module Node.js pour analyser les données de formulaire, en particulier les téléchargements de fichiers.
- `knex` ([source](https://www.npmjs.com/package/knex)) - Un générateur de requêtes SQL flexible, portable et amusant à utiliser !
- `mysql2` ([source](https://www.npmjs.com/package/mysql2)) - Un sublime client MySQL pour Node.js qui met l'accent sur la performance
- `uuid` ([source](https://www.npmjs.com/package/uuid)) - Un excellent module pour la création d'UUIDs RFC4122

## Backend installation

**1. Packages**

```shell
npm install
```

**2. Créer les fichiers de configuration**

```shell
cd ./config
nano .env
```

```env
# Dans le fichier `.env`
HOSTDB=String # L'ip de votre machine ou localhost
PORTDB=Int # Le port d'écoute de votre database
USERDB=String # L'utilisateur de votre database 
DATABASE=String # Le nom de votre database
PASSWORDDB=String # Le mot de passe de votre database
PORTEXPRESS=Int # Le port qu'écoutera Express (donc votre le port de requête de votre app)
SECRETCOOKIES=String # Le mot de passe pour sécuriser les cookies
```
> [!TIP]
> Pour installer la database sur votre serveur, il faut simplement exécuter le fichier `/config/installation_database.sql`.

## Démarer le backend de l'application
Pour démarer le backend vous avez besoin de faire les étapes précédemment expliquées puis les commandes suivantes.
```shell
cd ./backend
npm run dev
# OR
node index
```

## API

### Table des matières

- [User](#users)
  - [Récupérer le profil](#récupérer-son-profil)
  - [Créer un compte utilisateur](#créer-un-compte-utilisateur)
  - [Connexion](#connexion)
  - [Déconnexion](#déconnexion)
  - [Supprimer son profil](#supprimer-son-profil)
  - [Modifier son profil](#modifier-son-profil)
- [Errors](#errors)
  - [Error Response](#error-response)
  - [Type code](#type-code)
- [Budget](#budget)
  - [Créer un budget](#créer-un-budget)
  - [Modifier un budget](#modifier-un-budget)
  - [Supprimer un budget](#supprimer-un-budget)
  - [Récupérer un ou des budgets](#récupérer-un-budget)
- [Compte](#compte)
  - [Type de compte](#type-de-compte)
  - [Créer un compte](#créer-un-compte)
  - [Modifier un compte](#modifier-un-compte)
  - [Supprimer un compte](#supprimer-un-compte)
  - [Récupérer un ou des comptes](#récupérer-un-compte)
- [Facture](#facture)
  - [Créer une facture](#créer-une-facture)
  - [Modifier une facture](#modifier-une-facture)
  - [Supprimer une facture](#supprimer-une-facture)
  - [Récupérer une ou des facture](#récupérer-une-facture)
- [Category](#catégorie)
  - [Type de catégorie](#type-de-catégorie)
  - [Créer une catégorie](#créer-une-catégorie)
  - [Modifier une catégorie](#modifier-une-catégorie)
  - [Supprimer une catégorie](#supprimer-une-catégorie)
  - [Récupérer une ou des catégorie](#récupérer-une-catégorie)
- [Objectif](#objectif)
  - [Créer un objectif](#créer-un-objectif)
  - [Modifier un objectif](#modifier-un-objectif)
  - [Supprimer un objectif](#supprimer-un-objectif)
  - [Récupérer un ou des objectif](#récupérer-un-objectif)
- [Transaction](#transaction)
  - [Type de transaction](#type-de-transaction)
  - [Créer une transaction](#créer-une-transaction)
  - [Modifier une transaction](#modifier-une-transaction)
  - [Supprimer une transaction](#supprimer-une-transaction)
  - [Récupérer une ou des transaction](#récupérer-une-transaction)

### Users
#### Récupérer son profil
##### Authentification

Requires auth cookie and token params in body.

> [!NOTE]
> La combinaison des paramètres `token` et `auth` sont les clés d'autorisation pour authentifier l'authenticité de votre requête 

##### URL
```http
GET /api/v1/users/@me
```

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    let auth = storedCookie.auth
    let token = localStorage.token
    axios.request({
        url: '/@me',
        method: 'get',
        baseURL: '/api/v1/users/',
        proxy: protoproxy,
        headers: {
            Cookie : auth, 
            token : token
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :

| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `data` | `Array` | Le tableau d'information |
| `data.id` | `Interger` | L'id de l'utilisateur |
| `data.email` | `String` | L'email de l'utilisateur |
| `data.username` | `String` | Le nom de l'utilisateur |


##### *Exemple de réponse*
```js
{
    success: true;
    data: [{
        id: 240;
        email:"Smith@example.com";
        username:"John Smith";
    }],
}
```

#### Créer un compte utilisateur
##### URL
```http
POST /api/v1/users/sign/up
```

##### Paramètre
| Paramètre | Type | Description | Obligatoire |
| :-- | :-- | :-- | :--: |
| `email` | `String` | L'email de votre compte | &#9745; |
| `username` | `String` | Votre nom dans l'application | &#9745; |
| `password` | `String` | Votre mot de passe pour vos futures connexions | &#9745; |

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/sign/up',
        method: 'post',
        baseURL: '/api/v1/users/',
        proxy: protoproxy,
        headers: {
            username : "Smith",
            email : "John@example.com",
            password : "1234ctrésécure"
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `data` | `Array` | Le tableau d'information |
| `data.token` | `String` | Votre deuxième clé d'authenticité |

L'envoie d'un cookie "auth" est fait
> [!IMPORTANT]
> Le cookie Auth est la première clé d'authenticité, l'accès est refusé si vous ne la présenté pas (de même si elle n'est pas présenté avec le token)

##### *Exemple de réponse*
```js
{
    success: true;
    data: [{
        token : "A153FB1.A153FB1.A153FB1"
    }],
}
```

#### Connexion
##### URL
```http
POST /api/v1/users/sign/in
```

##### Paramètre
| Paramètre | Type | Description | Obligatoire |
| :-- | :-- | :-- | :--: |
| `email` | `String` | L'email de votre compte | &#9745; |
| `password` | `String` | Votre mot de passe | &#9745; |

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/sign/in',
        method: 'post',
        baseURL: '/api/v1/users/',
        proxy: protoproxy,
        headers: {
            email : "John@example.com",
            password : "1234ctrésécure"
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `data` | `Array` | Le tableau d'information |
| `data.token` | `String` | Votre deuxième clé d'authenticité |

L'envoie d'un cookie "auth" est fait
> [!IMPORTANT]
> Le cookie Auth est la première clé d'authenticité, l'accès est refusé si vous ne la présenté pas (de même si elle n'est pas présenté avec le token)

##### *Exemple de réponse*
```js
{
    success: true;
    data: [{
        token : "A153FB1.A153FB1.A153FB1"
    }],
}
```

#### Déconnexion
##### Authentification

Requires auth cookie and token params in body.

> [!NOTE]
> La combinaison des paramètres `token` et `auth` sont les clés d'autorisation pour authentifier l'authenticité de votre requête 

##### URL
```http
POST /api/v1/users/sign/out
```

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    let auth = storedCookie.auth
    let token = localStorage.token
    axios.request({
        url: '/sign/out',
        method: 'post',
        baseURL: '/api/v1/users/',
        proxy: protoproxy,
        headers: {
            Cookie : auth, 
            token : token
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :

| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `data` | `Object` | L'objget d'information |
| `data.commentaire` | `String` | Le commentaire de réponse |

> [!TIP]
> La requête supprime aussi le cookie auth


##### *Exemple de réponse*
```js
{
    success: true;
    data: {
        commentaire : "Utilisateur bien déconnecté."
    },
}
```

#### Supprimer son profil
##### Authentification

Requires auth cookie and token params in body.

> [!NOTE]
> La combinaison des paramètres `token` et `auth` sont les clés d'autorisation pour authentifier l'authenticité de votre requête 

##### URL
```http
DELETE /api/v1/users/@me/destroy
```

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    let auth = storedCookie.auth
    let token = localStorage.token
    axios.request({
        url: '/@me/destroy',
        method: 'delete',
        baseURL: '/api/v1/users/',
        proxy: protoproxy,
        headers: {
            Cookie : auth, 
            token : token
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :

| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `data` | `Object` | L'objget d'information |
| `data.id` | `Object` | l'id du compte supprimé |
| `data.commentaire` | `Object` | Le commentaire de réponse |

> [!TIP]
> La requête supprime aussi le cookie auth

##### *Exemple de réponse*
```js
{
    success: true;
    data: {
        id : 2591
        commentaire : "Utilisateur bien détruit."
    },
}
```

#### Modifier son profil
##### URL
```http
PUT /api/v1/users/update/profile
```

##### Paramètre
| Paramètre | Type | Description | Obligatoire |
| :-- | :-- | :-- | :--: |
| `email` | `String` | L'email de votre compte | &#9744; |
| `username` | `String` | Votre nom dans l'application | &#9744; |
| `password` | `String` | Votre mot de passe pour vos futures connexions | &#9744; |

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/sign/up',
        method: 'post',
        baseURL: '/api/v1/users/',
        proxy: protoproxy,
        headers: {
            username : "John",
            email : "Wick@example.com",
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `data` | `Array` | Le tableau d'information |
| `data.token` | `String` | Votre deuxième clé d'authenticité |

L'envoie d'un cookie "auth" est fait
> [!IMPORTANT]
> Le cookie Auth est la première clé d'authenticité, l'accès est refusé si vous ne la présenté pas (de même si elle n'est pas présenté avec le token)

##### *Exemple de réponse*
```js
{
    success: true;
    data: [{
        token : "A153FB1.A153FB1.A153FB1"
    }],
}
```

### Errors
#### Error Response
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `code` | `Integer` | Le code http de l'erreur |
| `reason` | `String` | La raison associé à l'erreur |

#### Type code
| Code | Titre | Signification |
| :--: | :-- | :-- |
| `401` | `UNAUTHORIZED` | Vous devez être connecter pour avoir cette information |
| `403` | `FORBIDDEN` | Vous n'avez pas les droits suffisant pour avoir cette information
| `404` | `NOT FOUND` | Vous demandez quelque chose qui n'existe pas |
| `406` | `NOT ACCEPTABLE` | Vos paramètres ne sont pas accepté, la raison vous apportera des détails ainsi que le paramètre dérangeant |
| `429` | `TO MANY REQUEST` | Vous avez dépasser le nombre requête autorisé dans l'heure, pour des raisons de sécurité vous avez été filtré. |
| `500` | `INTERNAL SERVER ERROR` | Une erreur interne s'est produite, il est conseillé au développeur de lire les logs pour en connaitre l'origine

### Budget
#### Créer un budget
##### Authentification

Requires auth cookie and token params in body.

> [!NOTE]
> La combinaison des paramètres `token` et `auth` sont les clés d'autorisation pour authentifier l'authenticité de votre requête 

##### URL
```http
POST /api/v1/budget
```

##### Paramètre
| Paramètre | Type | Description | Obligatoire |
| :-- | :-- | :-- | :--: |
| `category_id` | `Integer` | L'id de la catégorie que suivra le budget | &#9745; |
| `rollover` | `Boolean` | L'option qui défini si le budget récupérera les restes des mois précédents ou non | &#9745; |
| `montant` | `Number` | Le montant du budget au mois | &#9745; |


##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/budget',
        method: 'post',
        baseURL: '/api/v1/',
        proxy: protoproxy,
        headers: {
            category_id : 27,
            rollover : true,
            montant : 100
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `data` | `Objet` | L'objet d'information |
| `data.id` | `Integer` | L'id du budget créé |
| `data.commentaire` | `String` | Le commentaire lié |

##### *Exemple de réponse*
```js
{
    success: true,
    data: {
        id : 29,
        commentaire : "Budget créé"
    }
}
```

#### Modifier un budget
##### Authentification

Requires auth cookie and token params in body.

> [!NOTE]
> La combinaison des paramètres `token` et `auth` sont les clés d'autorisation pour authentifier l'authenticité de votre requête 

##### URL
```http
PUT /api/v1/budget
```

##### Paramètre
| Paramètre | Type | Description | Obligatoire |
| :-- | :-- | :-- | :--: |
| `id` | `Integer` | L'id du budget à modifier | &#9745; |
| `rollover` | `Boolean` | L'option qui défini si le budget récupérera les restes des mois précédents ou non | &#9744; |
| `montant` | `Number` | Le montant du budget au mois | &#9744; |


##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/budget',
        method: 'put',
        baseURL: '/api/v1/',
        proxy: protoproxy,
        headers: {
            id : 29,
            rollover : false,
            montant : 100
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `data` | `Objet` | L'objet d'information |
| `data.id` | `Integer` | L'id du budget modifié |
| `data.commentaire` | `String` | Le commentaire lié |

##### *Exemple de réponse*
```js
{
    success: true,
    data: {
        id : 29,
        commentaire : "Budget modifié"
    }
}
```

#### Supprimer un budget
##### Authentification

Requires auth cookie and token params in body.

> [!NOTE]
> La combinaison des paramètres `token` et `auth` sont les clés d'autorisation pour authentifier l'authenticité de votre requête 

##### URL
```http
DELETE /api/v1/budget
```

##### Paramètre
| Paramètre | Type | Description | Obligatoire |
| :-- | :-- | :-- | :--: |
| `id` | `Integer` | L'id du budget à supprimer | &#9744; |
| `user_id` | `Integer` | L'id de l'utilisateur pour supprimer tout les budgets de ce compte | &#9744; |
| `category_id` | `Integer` | L'id de la catégorie pour supprimer tout les budgets de cette catégorie | &#9744; |

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/budget',
        method: 'delete',
        baseURL: '/api/v1/',
        proxy: protoproxy,
        headers: {
            id : 29,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `data` | `Objet` | L'objet d'information |
| `data.id` | `Integer` | L'id du budget supprimé |
| `data.commentaire` | `String` | Le commentaire lié |

##### *Exemple de réponse*
```js
{
    success: true,
    data: {
        id : 29,
        commentaire : "Budget supprimé"
    }
}
```

#### Récupérer un budget
##### Authentification

Requires auth cookie and token params in body.

> [!NOTE]
> La combinaison des paramètres `token` et `auth` sont les clés d'autorisation pour authentifier l'authenticité de votre requête 

##### URL
```http
GET /api/v1/budget
```

##### Paramètre
| Paramètre | Type | Description | Obligatoire |
| :-- | :-- | :-- | :--: |
| `id` | `Integer` | L'id du budget à récupérer | &#9744; |
| `user_id` | `Integer` | Pour récupérer tout les budgets du compte id | &#9744; |
| `category_id` | `Integer` | Pour récupérer tout les budgets de la catégorie id | &#9744; |

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/budget',
        method: 'get',
        baseURL: '/api/v1/',
        proxy: protoproxy,
        headers: {
            id : 29,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `data` | `Array` | Le tableau d'information |
| `data.id` | `Integer` | L'id du budget récupéré |
| `data.user_id` | `Integer` | L'id de la personne détenant le budget |
| `data.montant` | `Number` | Le montant du budget mensuel |
| `data.category_id` | `Integer` | L'id de la catégorie associé au budget |
| `data.rollover` | `Boolean` | Si le budget récupère les restes du budget du mois précédent |

##### *Exemple de réponse*
```js
{
    success: true,
    data: [{
        id : 29,
        user_id : 563,
        montant : 100,
        category_id : 26,
        rollover : false
    }]
}
```


### Compte
#### Type de compte

| Nom | Numéro type |
| :-- | :--: |
| `Compte bancaire` | `1` |
| `Espèce` | `2` |
| `Portefeuille` | `3` |
| `Courant` | `4` |
| `Épargne` | `5` |
| `Carte de crédit` | `6` |
| `Ligne de crédit` | `7` |
| `Retraite` | `8` |
| `Courtage` | `9` |
| `Investissements` | `10` |
| `Assurance` | `11` |
| `Crypto` | `12` |
| `Prêt` | `13` |
| `Hypothèque` | `14` |
| `Propriété` | `15` |
| `Autre` | `16` |

> [!WARNING]
> Pour l'instant, tout les types de compte fonctionnent de la même manière.

#### Créer un compte
##### Authentification

Requires auth cookie and token params in body.

> [!NOTE]
> La combinaison des paramètres `token` et `auth` sont les clés d'autorisation pour authentifier l'authenticité de votre requête 

##### URL
```http
POST /api/v1/compte
```

##### Paramètre
| Paramètre | Type | Description | Obligatoire |
| :-- | :-- | :-- | :--: |
| `type` | `Integer` | Le type de compte | &#9745; |
| `montant` | `Number` | Le montant du compte | &#9745; |


##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/compte',
        method: 'post',
        baseURL: '/api/v1/',
        proxy: protoproxy,
        headers: {
            type : 27,
            montant : 100
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `data` | `Objet` | L'objet d'information |
| `data.id` | `Integer` | L'id du compte créé |
| `data.commentaire` | `String` | Le commentaire lié |

##### *Exemple de réponse*
```js
{
    success: true,
    data: {
        id : 29,
        commentaire : "Compte créé"
    }
}
```

#### Modifier un compte
##### Authentification

Requires auth cookie and token params in body.

> [!NOTE]
> La combinaison des paramètres `token` et `auth` sont les clés d'autorisation pour authentifier l'authenticité de votre requête 

##### URL
```http
PUT /api/v1/compte
```

##### Paramètre
| Paramètre | Type | Description | Obligatoire |
| :-- | :-- | :-- | :--: |
| `id` | `Integer` | L'id du compte à modifier | &#9745; |
| `montant` | `Number` | Le nouveau montant du compte | &#9744; |

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/compte',
        method: 'put',
        baseURL: '/api/v1/',
        proxy: protoproxy,
        headers: {
            id : 29,
            montant : 100
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `data` | `Objet` | L'objet d'information |
| `data.id` | `Integer` | L'id du compte modifié |
| `data.commentaire` | `String` | Le commentaire lié |

##### *Exemple de réponse*
```js
{
    success: true,
    data: {
        id : 29,
        commentaire : "Compte modifié"
    }
}
```

#### Supprimer un compte
##### Authentification

Requires auth cookie and token params in body.

> [!NOTE]
> La combinaison des paramètres `token` et `auth` sont les clés d'autorisation pour authentifier l'authenticité de votre requête 

##### URL
```http
DELETE /api/v1/compte
```

##### Paramètre
| Paramètre | Type | Description | Obligatoire |
| :-- | :-- | :-- | :--: |
| `id` | `Integer` | L'id du compte à supprimer | &#9744; |
| `user_id` | `Integer` | L'id de l'utilisateur pour supprimer tout les compte bancaire de cet utilisateur | &#9744; |

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/compte',
        method: 'delete',
        baseURL: '/api/v1/',
        proxy: protoproxy,
        headers: {
            id : 29,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `data` | `Objet` | L'objet d'information |
| `data.id` | `Integer` | L'id du compte supprimé |
| `data.commentaire` | `String` | Le commentaire lié |

##### *Exemple de réponse*
```js
{
    success: true,
    data: {
        id : 29,
        commentaire : "Compte supprimé"
    }
}
```

#### Récupérer un compte
##### Authentification

Requires auth cookie and token params in body.

> [!NOTE]
> La combinaison des paramètres `token` et `auth` sont les clés d'autorisation pour authentifier l'authenticité de votre requête 

##### URL
```http
GET /api/v1/compte
```

##### Paramètre
| Paramètre | Type | Description | Obligatoire |
| :-- | :-- | :-- | :--: |
| `id` | `Integer` | L'id du compte à récupérer | &#9744; |
| `user_id` | `Integer` | Pour récupérer tout les comptes bancaires enregitré de l'utilisateur de cet id | &#9744; |

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/compte',
        method: 'get',
        baseURL: '/api/v1/',
        proxy: protoproxy,
        headers: {
            id_user : 29,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `data` | `Array` | Le tableau d'information |
| `data.id` | `Integer` | L'id du compte récupéré |
| `data.user_id` | `Integer` | L'id de la personne détenant le compte |
| `data.montant` | `Number` | Le montant du compte actuellement |
| `data.type` | `Integer` | Le type de compte financier |

##### *Exemple de réponse*
```js
{
    success: true,
    data: [{
        id : 29,
        user_id : 563,
        montant : 100,
        type : 2,
    }]
}
```

### Facture
#### Créer une facture
##### Authentification

Requires auth cookie and token params in body.

> [!NOTE]
> La combinaison des paramètres `token` et `auth` sont les clés d'autorisation pour authentifier l'authenticité de votre requête 

##### URL
```http
POST /api/v1/facture
```

##### Paramètre
| Paramètre | Type | Description | Obligatoire |
| :-- | :-- | :-- | :--: |
| `repetition` | `Boolean` | Si la facture est répétitive | &#9745; |
| `category_id` | `Integer` | L'id de la catégorie associé | &#9745; |
| `status` | `Boolean` | Si la facture est payé actuellement | &#9745; |
| `compte_id` | `Integer` | L'id du compte financier associé à la facture | &#9745; |
| `auto` | `Boolean` | Si le paiement est automatique | &#9745; |
| `title` | `String` | Le titre de la facture | &#9745; |
| `rappel` | `Date` | Quand l'utilisateur veut-être rappelé de sa facture à payer | &#9744; |
| `user_id` | `Integer` | L'id de l'utilisateur associé à la facture | &#9745; |
| `date` | `Date` | Quand doit-être payé la facture | &#9745; |
| `montant` | `Number` | Le montant de la facture | &#9745; |


##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/facture',
        method: 'post',
        baseURL: '/api/v1/',
        proxy: protoproxy,
        headers: {
            repetition : false,
            category_id : 12,
            status : true, 
            compte_id : 35,
            auto: false,
            title : "internet",
            rappel : new Date(2024, 3, 5),
            user_id : 27,
            date : new Date(2024, 3, 10),
            montant : 100
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `data` | `Objet` | L'objet d'information |
| `data.id` | `Integer` | L'id de la facture créé |
| `data.commentaire` | `String` | Le commentaire lié |

##### *Exemple de réponse*
```js
{
    success: true,
    data: {
        id : 29,
        commentaire : "Facture créé"
    }
}
```

#### Modifier une facture
##### Authentification

Requires auth cookie and token params in body.

> [!NOTE]
> La combinaison des paramètres `token` et `auth` sont les clés d'autorisation pour authentifier l'authenticité de votre requête 

##### URL
```http
PUT /api/v1/facture
```

##### Paramètre
| Paramètre | Type | Description | Obligatoire |
| :-- | :-- | :-- | :--: |
| `id` | `Integer` | L'id de la facture à modifier | &#9745; |
| `repetition` | `Boolean` | Si la facture est répétitive | &#9744; |
| `category_id` | `Integer` | L'id de la catégorie associé | &#9744; |
| `status` | `Boolean` | Si la facture est payé actuellement | &#9744; |
| `compte_id` | `Integer` | L'id du compte financier associé à la facture | &#9744; |
| `auto` | `Boolean` | Si le paiement est automatique | &#9744; |
| `title` | `String` | Le titre de la facture | &#9744; |
| `rappel` | `Date` | Quand l'utilisateur veut-être rappelé de sa facture à payer | &#9744; |
| `date` | `Date` | Quand doit-être payé la facture | &#9744; |
| `montant` | `Number` | Le nouveau montant de la facture | &#9744; |

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/facture',
        method: 'put',
        baseURL: '/api/v1/',
        proxy: protoproxy,
        headers: {
            repetition : true,
            category_id : 12,
            status : false, 
            compte_id : 35,
            auto: true,
            title : "internet",
            rappel : new Date(2024, 5, 3),
            date : new Date(2024, 6, 10),
            montant : 500,
            id: 27
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `data` | `Objet` | L'objet d'information |
| `data.id` | `Integer` | L'id de la facture modifié |
| `data.commentaire` | `String` | Le commentaire lié |

##### *Exemple de réponse*
```js
{
    success: true,
    data: {
        id : 29,
        commentaire : "Facture modifié"
    }
}
```

#### Supprimer une facture
##### Authentification

Requires auth cookie and token params in body.

> [!NOTE]
> La combinaison des paramètres `token` et `auth` sont les clés d'autorisation pour authentifier l'authenticité de votre requête 

##### URL
```http
DELETE /api/v1/facture
```

##### Paramètre
| Paramètre | Type | Description | Obligatoire |
| :-- | :-- | :-- | :--: |
| `id` | `Integer` | L'id de la facture à supprimer | &#9744; |
| `user_id` | `Integer` | L'id de l'utilisateur pour supprimer toutes les facture de cet utilisateur | &#9744; |
| `compte_id` | `Integer` | L'id du compte financier pour supprimer toutes les facture de ce compte-ci | &#9744; |
| `category_id` | `Integer` | L'id de la catégorie pour supprimer toutes les facture de cette catégorie | &#9744; |

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/facture',
        method: 'delete',
        baseURL: '/api/v1/',
        proxy: protoproxy,
        headers: {
            id : 29,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `data` | `Objet` | L'objet d'information |
| `data.id` | `Integer` | L'id de la facture supprimé |
| `data.commentaire` | `String` | Le commentaire lié |

##### *Exemple de réponse*
```js
{
    success: true,
    data: {
        id : 29,
        commentaire : "Facture supprimé"
    }
}
```

#### Récupérer une facture
##### Authentification

Requires auth cookie and token params in body.

> [!NOTE]
> La combinaison des paramètres `token` et `auth` sont les clés d'autorisation pour authentifier l'authenticité de votre requête 

##### URL
```http
GET /api/v1/facture
```

##### Paramètre
| Paramètre | Type | Description | Obligatoire |
| :-- | :-- | :-- | :--: |
| `id` | `Integer` | L'id de la facture à récupérer | &#9744; |
| `user_id` | `Integer` | Pour récupérer toutes les factures de l'utilisateur de cet id | &#9744; |
| `category_id` | `Integer` | Pour récupérer toutes les factures de la catégorie de cet id | &#9744; |
| `compte_id` | `Integer` | Pour récupérer toutes les factures du compte financier de cet id | &#9744; |

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/facture',
        method: 'get',
        baseURL: '/api/v1/',
        proxy: protoproxy,
        headers: {
            id_user : 29,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `data` | `Array` | Le tableau d'information |
| `data.id` | `Integer` | L'id de la facture récupéré |
| `data.user_id` | `Integer` | L'id de la personne détenant la facture |
| `data.montant` | `Number` | Le montant de la facture |
| `data.repetition` | `Boolean` | Si la facture est répétitive |
| `data.category_id` | `Integer` | L'id de la catégorie associé |
| `data.status` | `Boolean` | Si la facture est payé actuellement |
| `data.compte_id` | `Integer` | L'id du compte financier associé à la facture |
| `data.title` | `String` | Le titre de la facture |
| `data.auto` | `Boolean` | Si le paiement est automatique |
| `data.rappel` | `Date` | Quand l'utilisateur veut-être rappelé de sa facture à payer | &#9744; |
| `data.date` | `Date` | Quand doit-être payé la facture |


##### *Exemple de réponse*
```js
{
    success: true,
    data: [{
        id : 29,
        user_id : 563,
        montant : 100,
        repetition:true;
        category_id:25;
        status:false;
        compte_id:15;
        title:"dentiste";
        auto:false;
        rappel:Date;
        date:Date;
    }]
}
```

### Catégorie
#### Type de catégorie
| Nom | Numéro type |
| :-- | :--: |
| `Dépense` | `1` |
| `Revenu` | `2` |
| `Facture` | `3` |
| `Transfère` | `4` |

> [!CAUTION]
> Pour l'instant, seuls ces types sont disponibles.

#### Créer une catégorie
##### Authentification

Requires auth cookie and token params in body.

> [!NOTE]
> La combinaison des paramètres `token` et `auth` sont les clés d'autorisation pour authentifier l'authenticité de votre requête 

##### URL
```http
POST /api/v1/category
```

##### Paramètre
| Paramètre | Type | Description | Obligatoire |
| :-- | :-- | :-- | :--: |
| `name` | `String` | Le nom de la catégorie | &#9745; |
| `type` | `Integer` | Le type de catégorie | &#9745; |

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/category',
        method: 'post',
        baseURL: '/api/v1/',
        proxy: protoproxy,
        headers: {
            type : 1,
            nom : "baby sitting"
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `data` | `Objet` | L'objet d'information |
| `data.id` | `Integer` | L'id de la category créé |
| `data.commentaire` | `String` | Le commentaire lié |

##### *Exemple de réponse*
```js
{
    success: true,
    data: {
        id : 29,
        commentaire : "Category créé"
    }
}
```

#### Modifier une catégorie
##### Authentification

Requires auth cookie and token params in body.

> [!NOTE]
> La combinaison des paramètres `token` et `auth` sont les clés d'autorisation pour authentifier l'authenticité de votre requête 

##### URL
```http
PUT /api/v1/category
```

##### Paramètre
| Paramètre | Type | Description | Obligatoire |
| :-- | :-- | :-- | :--: |
| `id` | `Integer` | L'id de la catégorie à modifier | &#9745; |
| `name` | `String` | le nouveau nom de la catégorie | &#9745; |

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/category',
        method: 'put',
        baseURL: '/api/v1/',
        proxy: protoproxy,
        headers: {
            name : "jardin"
            id: 27
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `data` | `Objet` | L'objet d'information |
| `data.id` | `Integer` | L'id de la category modifié |
| `data.commentaire` | `String` | Le commentaire lié |

##### *Exemple de réponse*
```js
{
    success: true,
    data: {
        id : 29,
        commentaire : "Category modifié"
    }
}
```

#### Supprimer une catégorie
##### Authentification

Requires auth cookie and token params in body.

> [!NOTE]
> La combinaison des paramètres `token` et `auth` sont les clés d'autorisation pour authentifier l'authenticité de votre requête 

##### URL
```http
DELETE /api/v1/category
```

##### Paramètre
| Paramètre | Type | Description | Obligatoire |
| :-- | :-- | :-- | :--: |
| `id` | `Integer` | L'id de la catégorie à supprimer | &#9744; |
| `user_id` | `Integer` | L'id de l'utilisateur pour supprimer toutes les catégories de cet utilisateur | &#9744; |

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/category',
        method: 'delete',
        baseURL: '/api/v1/',
        proxy: protoproxy,
        headers: {
            id : 29,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `data` | `Objet` | L'objet d'information |
| `data.id` | `Integer` | L'id de la category supprimé |
| `data.commentaire` | `String` | Le commentaire lié |

##### *Exemple de réponse*
```js
{
    success: true,
    data: {
        id : 29,
        commentaire : "Category supprimé"
    }
}
```

#### Récupérer une catégorie
##### Authentification

Requires auth cookie and token params in body.

> [!NOTE]
> La combinaison des paramètres `token` et `auth` sont les clés d'autorisation pour authentifier l'authenticité de votre requête 

##### URL
```http
GET /api/v1/category
```

##### Paramètre
| Paramètre | Type | Description | Obligatoire |
| :-- | :-- | :-- | :--: |
| `id` | `Integer` | L'id de la catégorie à récupérer | &#9744; |
| `user_id` | `Integer` | Pour récupérer toutes les catégories de l'utilisateur de cet id | &#9744; |

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/category',
        method: 'get',
        baseURL: '/api/v1/',
        proxy: protoproxy,
        headers: {
            id_user : 29,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `data` | `Array` | Le tableau d'information |
| `data.id` | `Integer` | L'id de la catégorie récupéré |
| `data.user_id` | `Integer` | L'id de la personne détenant la catégorie |
| `data.name` | `String` | Le nom de la catégorie |
| `data.type` | `Integer` | Le type de la catégorie |


##### *Exemple de réponse*
```js
{
    success: true,
    data: [{
        id : 29,
        user_id : 563,
        name : 'dentiste',
        type : 2
    }]
}
```

### Objectif
#### Créer un objectif
##### Authentification

Requires auth cookie and token params in body.

> [!NOTE]
> La combinaison des paramètres `token` et `auth` sont les clés d'autorisation pour authentifier l'authenticité de votre requête 

##### URL
```http
POST /api/v1/objectif
```

##### Paramètre
| Paramètre | Type | Description | Obligatoire |
| :-- | :-- | :-- | :--: |
| `title` | `String` | Le titre de objectif | &#9745; |
| `user_id` | `Integer` | L'id de l'utilisateur lié à cet objectif | &#9745; |
| `montant` | `Integer` | Le montant de cet objectif | &#9745; |
| `compte_id` | `Integer` | Le compte financier lié à cet objectif | &#9745; |
| `date_cible` | `Date` | La date cible pour accomplir cet objectif | &#9745; |
| `montant_touch` | `Boolean` | Si l'on touche au fond du compte pour aider l'objectif à aller plus vite | &#9745; |

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/objectif',
        method: 'post',
        baseURL: '/api/v1/',
        proxy: protoproxy,
        headers: {
            title : "baby sitting",
            user_id : 1,
            montant : 50,
            compte_id : 2,
            date_cible : new Dat(2025, 12, 1),
            montant_touch : false
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `data` | `Objet` | L'objet d'information |
| `data.id` | `Integer` | L'id de l'objectif créé |
| `data.commentaire` | `String` | Le commentaire lié |

##### *Exemple de réponse*
```js
{
    success: true,
    data: {
        id : 29,
        commentaire : "Objectif créé"
    }
}
```

#### Modifier un objectif
##### Authentification

Requires auth cookie and token params in body.

> [!NOTE]
> La combinaison des paramètres `token` et `auth` sont les clés d'autorisation pour authentifier l'authenticité de votre requête 

##### URL
```http
PUT /api/v1/objectif
```

##### Paramètre
| Paramètre | Type | Description | Obligatoire |
| :-- | :-- | :-- | :--: |
| `montant_touch` | `Integer` | Si l'on touche au fond du compte pour aider l'objectif à aller plus vite | &#9744; |
| `date_cible` | `Integer` | La date cible pour accomplir cet objectif | &#9744; |
| `montant` | `Integer` | Le montant de cet objectif | &#9744; |
| `title` | `String` | Le titre de objectif | &#9744; |
| `id` | `Integer` | L'id de l'objectif à modifier | &#9745; |

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/objectif',
        method: 'put',
        baseURL: '/api/v1/',
        proxy: protoproxy,
        headers: {
            title : "jardin"
            id: 27
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `data` | `Objet` | L'objet d'information |
| `data.id` | `Integer` | L'id de l'objectif modifié |
| `data.commentaire` | `String` | Le commentaire lié |

##### *Exemple de réponse*
```js
{
    success: true,
    data: {
        id : 29,
        commentaire : "Objectif modifié"
    }
}
```

#### Supprimer un objectif
##### Authentification

Requires auth cookie and token params in body.

> [!NOTE]
> La combinaison des paramètres `token` et `auth` sont les clés d'autorisation pour authentifier l'authenticité de votre requête 

##### URL
```http
DELETE /api/v1/objectif
```

##### Paramètre
| Paramètre | Type | Description | Obligatoire |
| :-- | :-- | :-- | :--: |
| `id` | `Integer` | L'id de la catégorie à supprimer | &#9744; |
| `user_id` | `Integer` | L'id de l'utilisateur pour supprimer tout les objectif de cet utilisateur | &#9744; |
| `compte_id` | `Integer` | L'id du compte financier pour supprimer tout les objectif de cet utilisateur | &#9744; |

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/objectif',
        method: 'delete',
        baseURL: '/api/v1/',
        proxy: protoproxy,
        headers: {
            id : 29,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `data` | `Objet` | L'objet d'information |
| `data.id` | `Integer` | L'id de l'objectif supprimé |
| `data.commentaire` | `String` | Le commentaire lié |

##### *Exemple de réponse*
```js
{
    success: true,
    data: {
        id : 29,
        commentaire : "Objectif supprimé"
    }
}
```

#### Récupérer un objectif
##### Authentification

Requires auth cookie and token params in body.

> [!NOTE]
> La combinaison des paramètres `token` et `auth` sont les clés d'autorisation pour authentifier l'authenticité de votre requête 

##### URL
```http
GET /api/v1/objectif
```

##### Paramètre
| Paramètre | Type | Description | Obligatoire |
| :-- | :-- | :-- | :--: |
| `id` | `Integer` | L'id de la catégorie à récupérer | &#9744; |
| `user_id` | `Integer` | Pour récupérer tout les objectif de l'utilisateur de cet id | &#9744; |
| `compte_id` | `Integer` | Pour récupérer tout les objectifs de l'utilisateur de cet id | &#9744; |

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/objectif',
        method: 'get',
        baseURL: '/api/v1/',
        proxy: protoproxy,
        headers: {
            id_user : 29,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `data` | `Array` | Le tableau d'information |
| `data.id` | `Integer` | L'id de l'objectif récupéré |
| `data.compte_id` | `Integer` | L'id du compte financier associé à l'objectif |
| `data.title` | `String` | le titre de l'objectif |
| `data.user_id` | `Integer` | L'id de la personne détenant la catégorie |
| `data.montant` | `Integer` | Le montant à atteindre pour l'objectif |
| `data.date_cible` | `String` | Date espérer pour réussir l'objectif |
| `data.montant_touch` | `Integer` | Si l'objectif touche au fond du compte pour aller plus vite |


##### *Exemple de réponse*
```js
{
    success: true,
    data: [{
        id : 29,
        compte_id : 56,
        user_id : 563,
        title : 'dentiste',
        montant : 2000,
        date_cible : Date,
        montant_touch : false
    }]
}
```

### Transaction
#### Type de transaction
| Nom | Numéro type |
| :-- | :--: |
| `Dépense` | `1` |
| `Revenu` | `2` |
| `Facture` | `3` |
| `Transfère` | `4` |

> [!CAUTION]
> Pour l'instant, seuls ces types sont disponibles.

#### Créer une transaction
##### Authentification

Requires auth cookie and token params in body.

> [!NOTE]
> La combinaison des paramètres `token` et `auth` sont les clés d'autorisation pour authentifier l'authenticité de votre requête 

##### URL
```http
POST /api/v1/transaction
```

##### Paramètre
| Paramètre | Type | Description | Obligatoire |
| :-- | :-- | :-- | :--: |
| `commentaire` | `String` | Le commentaire pour détailler la transaction | &#9744; |
| `category_id` | `Integer` | L'id de la catégorie associé | &#9745; |
| `toaccount` | `Integer` | L'id de l'adresse où est transférer les fonds (besoin qu'en transaction) | &#9744; |
| `compte_id` | `Integer` | L'id du compte financier associé à la transaction | &#9745; |
| `user_id` | `Integer` | L'id de l'utilisateur associé à la transaction | &#9745; |
| `montant` | `Number` | Le montant de la transaction | &#9745; |
| `date` | `Date` | Quand a été payé la transaction | &#9745; |
| `type` | `Integer` | Le type de transaction | &#9745; |


##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/transaction',
        method: 'post',
        baseURL: '/api/v1/',
        proxy: protoproxy,
        headers: {
            category_id : 12,
            compte_id : 35,
            user_id : 27,
            montant : 100
            date : new Date(2024, 3, 10),
            type: 1,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `data` | `Objet` | L'objet d'information |
| `data.id` | `Integer` | L'id de la transaction créé |
| `data.commentaire` | `String` | Le commentaire lié |

##### *Exemple de réponse*
```js
{
    success: true,
    data: {
        id : 29,
        commentaire : "Transaction créé"
    }
}
```

#### Modifier une transaction
##### Authentification

Requires auth cookie and token params in body.

> [!NOTE]
> La combinaison des paramètres `token` et `auth` sont les clés d'autorisation pour authentifier l'authenticité de votre requête 

##### URL
```http
PUT /api/v1/transaction
```

##### Paramètre
| Paramètre | Type | Description | Obligatoire |
| :-- | :-- | :-- | :--: |
| `id` | `Integer` | L'id de la transaction à modifier | &#9745; |
| `commentaire` | `String` | Le commentaire pour détailler la transaction | &#9744; |
| `category_id` | `Integer` | L'id de la catégorie associé | &#9744; |
| `toaccount` | `Integer` | L'id de l'adresse où est transférer les fonds (besoin qu'en transaction) | &#9744; |
| `compte_id` | `Integer` | L'id du compte financier associé à la transaction | &#9744; |
| `montant` | `Number` | Le montant de la transaction | &#9744; |
| `date` | `Date` | Quand a été payé la transaction | &#9744; |


##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/transaction',
        method: 'put',
        baseURL: '/api/v1/',
        proxy: protoproxy,
        headers: {
            category_id : 1,
            compte_id : 42,
            montant : 300
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `data` | `Objet` | L'objet d'information |
| `data.id` | `Integer` | L'id de la transaction modifié |
| `data.commentaire` | `String` | Le commentaire lié |

##### *Exemple de réponse*
```js
{
    success: true,
    data: {
        id : 29,
        commentaire : "Transaction modifié"
    }
}
```

#### Supprimer une transaction
##### Authentification

Requires auth cookie and token params in body.

> [!NOTE]
> La combinaison des paramètres `token` et `auth` sont les clés d'autorisation pour authentifier l'authenticité de votre requête 

##### URL
```http
DELETE /api/v1/transaction
```

##### Paramètre
| Paramètre | Type | Description | Obligatoire |
| :-- | :-- | :-- | :--: |
| `id` | `Integer` | L'id de la transaction à supprimer | &#9744; |
| `user_id` | `Integer` | L'id de l'utilisateur pour supprimer toutes les transaction de cet utilisateur | &#9744; |
| `compte_id` | `Integer` | L'id du compte financier pour supprimer toutes les transaction de ce compte-ci | &#9744; |
| `category_id` | `Integer` | L'id de la catégorie pour supprimer toutes les transaction de cette catégorie | &#9744; |

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/transaction',
        method: 'delete',
        baseURL: '/api/v1/',
        proxy: protoproxy,
        headers: {
            id : 29,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `data` | `Objet` | L'objet d'information |
| `data.id` | `Integer` | L'id de la transaction supprimé |
| `data.commentaire` | `String` | Le commentaire lié |

##### *Exemple de réponse*
```js
{
    success: true,
    data: {
        id : 29,
        commentaire : "Transaction supprimé"
    }
}
```

#### Récupérer une transaction
##### Authentification

Requires auth cookie and token params in body.

> [!NOTE]
> La combinaison des paramètres `token` et `auth` sont les clés d'autorisation pour authentifier l'authenticité de votre requête 

##### URL
```http
GET /api/v1/transaction
```

##### Paramètre
| Paramètre | Type | Description | Obligatoire |
| :-- | :-- | :-- | :--: |
| `id` | `Integer` | L'id de la transaction à récupérer | &#9744; |
| `user_id` | `Integer` | Pour récupérer toutes les transactions de l'utilisateur de cet id | &#9744; |
| `category_id` | `Integer` | Pour récupérer toutes les transactions de la catégorie de cet id | &#9744; |
| `compte_id` | `Integer` | Pour récupérer toutes les transactions du compte financier de cet id | &#9744; |

##### *Exemple de requête*
```js
    let axios = require('axios')
    // ...Code existant...//
    axios.request({
        url: '/transaction',
        method: 'get',
        baseURL: '/api/v1/',
        proxy: protoproxy,
        headers: {
            id_user : 29,
        },
    })
    .then(res => res.json())
    .then(json => ...)
```

##### Response Parameters :
| Parameter | Type | Description |
| :-------- | :--: | :---------- |
| `success` | `Boolean` | Validation si la requête s'est terminé sans problème où inversement |
| `data` | `Array` | Le tableau d'information |
| `data.id` | `Integer` | L'id de la transaction récupéré |
| `data.category_id` | `Integer` | L'id de la catégorie associé |
| `data.user_id` | `Integer` | L'id de la personne détenant la transaction |
| `data.compte_id` | `Integer` | L'id du compte financier associé à la transaction |
| `data.montant` | `Number` | Le montant de la transaction |
| `data.type` | `Integer` | Le type de transaction |
| `data.date` | `Date` | Quand a été payé la transaction |
| `data.commentaire` | `String` | Un commentaire sur la transaction |
| `data.toaccount` | `Integer` | L'id du compte sur lesquel a été transférer le montant de la transaction |


##### *Exemple de réponse*
```js
{
    success: true,
    data: [{
        id:29;
        category_id:25
        user_id:563;
        compte_id:15;
        montant:100;
        type:1;
        date:Date;
    }]
}
```

------------
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
  
## About :
- `RoadMap backend` [source](./RoadMap.md)
- `Home readme` [source](../README.md)