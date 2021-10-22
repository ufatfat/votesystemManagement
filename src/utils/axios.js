import axios from "axios"
// import Vue from "vue"

let instance = axios.create({
    baseURL: '/',
    timeout: 600000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "ContestId": "1",
    }
})

export default instance