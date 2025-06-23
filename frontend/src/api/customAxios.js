import axios from 'axios'

const customAxios = axios.create({ 

baseURL: "http://localhost:5050",
withCredentials: true


})

customAxios.interceptors.request.use((config) => { 

const token = localStorage.getItem('token')

if(token) { 

config.headers.authorization = `Bearer ${token}`


}

return config

})

customAxios.interceptors.response.use((res) => {

    return res
},async(error) => { 

const originalRequest = error.config

if(error.response?.status === 401 && !originalRequest._retry) { 

originalRequest._retry = true;

try { 


const getToken = await customAxios.get('/refresh/')

const newToken = getToken.data.token

console.log("maybe new token: ",newToken)

localStorage.setItem('token',newToken)

originalRequest.headers.authorization = `Bearer ${newToken}`

return customAxios(originalRequest)


}catch(err) {

    return Promise.reject(err)
}


}


return Promise.reject(error)
})

export default customAxios