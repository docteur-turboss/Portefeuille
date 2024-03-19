const axios = require('axios');


let protoproxy = {
    protocol: process.env.PROTOCOL_AXIOS,
    host: process.env.HOST_AXIOS,
    // hostname: process.env.HOST_AXIOS // Takes precedence over 'host' if both are defined
    port: process.env.PORT_AXIOS
}

module.exports = class Objectif {
    static create = async (params = {montant_touch, date_cible, compte_id, montant, title}, urlb={token, Cookie}) => {
        let base = {'X-Requested-With': 'XMLHttpRequest'}
        let auth = {...base, ...urlb};

        let id, commentaire
        try{
            let res = await axios.request({
                url: '/objectif',
                method: 'post',
                baseURL: '/api/v1/ressources/',
                proxy: protoproxy,
                headers: auth,
                data:params
            })
    
            if(res.data.success){
                id = res.data.data.id
                commentaire = res.data.data.commentaire
                return {
                    success : true,
                    data : {id : id, commentaire : commentaire}
                }
            }else{
                throw new Error()
            }
        }catch(err){
            if (err.response) {
                return {
                    success : false,
                    data : {
                        status : err.response.status,
                        data : err.response.data
                    }
                }
            }

            return {
                success : false,
                data : {
                    status : 500,
                    data : ""
                }
            }
        }
    }

    static read = async (params = {compte_id, user_id, id}, urlb={token, Cookie}) => {
        let base = {'X-Requested-With': 'XMLHttpRequest'}
        let auth = {...base, ...urlb}

        let data
        try{
            let res = await axios.request({
                url: '/objectif',
                method: 'get',
                baseURL: '/api/v1/ressources/',
                proxy: protoproxy,
                headers: auth,
                data:params
            })
            if(res.data.success){
                data = res.data.data

                return {
                    success : true,
                    data : data
                }
            }else{
                throw new Error()
            }
        }catch(err) {
            console.log(err)
            if (err.response) {
                return {
                    success : false,
                    data : {
                        status : err.response.status,
                        data : err.response.data
                    }
                }
            }

            return {
                success : false,
                data : {
                    status : 500,
                    data : ""
                }
            }
        }
    }
    
    static update = async (params={montant_touch, date_cible, montant, title, id}, urlb={token, Cookie}) => {
        let base = {'X-Requested-With': 'XMLHttpRequest'}
        let auth = {...base, ...urlb}
    
        let id, commentaire
        try {
            let res = await axios.request({
                url: '/objectif',
                method: 'put',
                baseURL: '/api/v1/ressources/',
                proxy: protoproxy,
                headers:auth,
                data:params
            })

            if(res.data.success){
                id = res.data.data.id
                commentaire = res.data.data.commentaire
                return {
                    success : true,
                    data : {id : id, commentaire : commentaire}
                }
            } else{                
                throw new Error()
            }
        }catch(err) {
            if (err.response) {
                return {
                    success : false,
                    data : {
                        status : err.response.status,
                        data : err.response.data
                    }
                }
            }

            return {
                success : false,
                data : {
                    status : 500,
                    data : ""
                }
            }
        }
    }

    static destroy = async(params={id, compte_id, user_id}, urlb={token, Cookie}) =>{
        let base = {'X-Requested-With': 'XMLHttpRequest'}
        let auth = {...base, ...urlb}
        
        let id, commentaire
        try{
            let res = await axios.request({
                url: '/objectif',
                method: 'delete',
                baseURL: '/api/v1/ressources/',
                proxy: protoproxy,
                headers: auth,
                data:params
            })
    
            if(res.data.success){
                id = res.data.data.id
                commentaire = res.data.data.commentaire

                return {
                    success : true,
                    data : {
                        commentaire : commentaire,
                        id : id
                    }
                }
            }else{
                throw new Error()
            }
        }catch(err) {
            if (err.response) {
                return {
                    success : false,
                    data : {
                        status : err.response.status,
                        data : err.response.data
                    }
                }
            }
            
            return {
                success : false,
                data : {
                    status : 500,
                    data : ""
                }
            }
        }
    }
}