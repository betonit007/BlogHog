
import { API } from '../config'
import axios from 'axios'
import cookie from 'js-cookie'

export const signup = async ({ name, email, password }) => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    let body = { name, email, password }

    try {
        const res = await axios.post(`${API}/api/signup`, body, config)
        console.log('action', res)
        return res.data

    } catch (err) {
        console.log(err.response.data)
        return err.response.data
    }
}

export const signin = async ({ email, password }) => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    let body = { email, password }

    try {
        const res = await axios.post(`${API}/api/signin`, body, config)
        
        return res.data

    } catch (err) {
        console.log(err.response.data)
        return err.response.data
    }
}

//SignOut
export const signout = cb => {
    removeCookie('token')
    removeLocalStorage('user')
    cb()

    try {
        axios.get(`${API}/api/signout`)
        console.log('logout success')
    } catch (err) {
      console.log(err.response.data)
    }
}

//Set Cookie
export const setCookie = (key, value) => {
    if(process.browser) { //if we are on the client side 
      cookie.set(key, value, {
          expires: 1
      })
    }
}

//Remove Cookie
export const removeCookie = (key) => {
    if(process.browser) { //if we are on the client side 
      cookie.set(key, {
          expires: 1
      })
    }
}

//Get Cookie

export const getCookie = (key) => {
    if(process.browser) { //if we are on the client side 
     return cookie.get(key)
    }
}

//local storage
export const setLocalStorage = (key, value) => {
    if(process.browser) {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

//local storage
export const removeLocalStorage = (key, value) => {
    if(process.browser) {
        localStorage.removeItem(key)
    }
}

//authenticate 
export const authenticate = (data, cb) => {  //like a middleware since we're executing something after we run this
  console.log(data)
  setCookie('token', data.token)
  setLocalStorage('user', data.user)
  cb()
}

export const isAuth = () => {
    if(process.browser) {
        const cookieChecked = getCookie('token')
        if(cookieChecked) {
            if(localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'))
            } else return false 
        }
    }
}