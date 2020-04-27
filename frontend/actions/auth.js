
import { API } from '../config'
import axios from 'axios'

export const signup = async ({ name, email, password }) => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    let body = { name, email, password }

    try {
        const res = await axios.post(`${API}/api/signup`, body, config)
       
        return res.data

    } catch (err) {
        console.log(err)
    }

    
}