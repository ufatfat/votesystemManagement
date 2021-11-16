import axios from "axios"

let instance = axios.create({
    baseURL: '/',
    timeout: 600000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Cache-Control": "no-cache",
    }
})

export default instance