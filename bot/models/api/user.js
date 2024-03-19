const axios = require('axios');


let protoproxy = {
    protocol: process.env.PROTOCOL_AXIOS,
    host: process.env.HOST_AXIOS,
    // hostname: process.env.HOST_AXIOS // Takes precedence over 'host' if both are defined
    port: process.env.PORT_AXIOS
}

module.exports.signup = async (params = {email, username, password}) => {
    let cookie, token
    try{
        let res = await axios.request({
            url: '/sign/up',
            method: 'post',
            baseURL: '/api/v1/users/',
            proxy: protoproxy,
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            data:params
        })

        if(res.headers['set-cookie'] && res.headers['set-cookie'][0] && res.data.success){
            token = res.data.data.token
            cookie = res.headers['set-cookie']
            id = res.data.data.id
            
            return {
                success : true,
                data : {cookie : cookie, token : token, id : id}
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

module.exports.signin = async (params = {email, password}) => {
    let cookie, token
    try{
        let res = await axios.request({
            url: '/sign/in',
            method: 'post',
            baseURL: '/api/v1/users/',
            proxy: protoproxy,
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            data:params
        })
        if(res.headers['set-cookie'] && res.headers['set-cookie'][0] && res.data.success){
            cookie = res.headers['set-cookie']
            token = res.data.data.token
            id = res.data.data.id
            
            return {
                success : true,
                data : {cookie : cookie, token : token, id: id}
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

module.exports.updateUser = async(params={username, email, password}, urlb={token, Cookie}) =>{
    let base = {'X-Requested-With': 'XMLHttpRequest'}
    let auth = {...base, ...urlb}
    let cookie, token
    try{
        let res = await axios.request({
            url: '/update/profile',
            method: 'put',
            baseURL: '/api/v1/users/',
            proxy: protoproxy,
            headers: auth,
            data:params
        })

        if(res.headers['set-cookie'] && res.headers['set-cookie'][0] && res.data.success){
            cookie = res.headers['set-cookie']
            token = res.data.data.token
           
            return {
                success : true,
                data : {cookie : cookie, token : token}
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

module.exports.getUser = async(urlb={Cookie, token}) => {
    let base = {'X-Requested-With': 'XMLHttpRequest'}
    let auth = {...base, ...urlb}

    let user
    try{
        let res = await axios.request({
            url: '/@me',
            method: 'get',
            baseURL: '/api/v1/users/',
            proxy: protoproxy,
            headers: auth,
        })

        if(res.data.success){
            user =  res.data.data
           
            return {
                success : true,
                data : user[0]
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

module.exports.destroyUser = async(urlb={Cookie, token}) =>{
    let base = {'X-Requested-With': 'XMLHttpRequest'}
    let auth = {...base, ...urlb}
    let confirmation
    try{
        let res = await axios.request({
            url: '/@me/destroy',
            method: 'delete',
            baseURL: '/api/v1/users/',
            proxy: protoproxy,
            headers: auth,
        })

        if(res.data.success){
            confirmation = res.data.data
           
            return {
                success : true,
                data : confirmation
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