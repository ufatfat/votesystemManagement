import request from "../utils/axios"

export function signIn (data) {
    return request.post("/manageapi/auth/sign-in", data)
}

export function getEnrollStats (data) {
    return request.get("/manageapi/stats/enroll", {
        params: data
    })
}

export function getFileData () {
    return request.get("/manageapi/stats/data")
}