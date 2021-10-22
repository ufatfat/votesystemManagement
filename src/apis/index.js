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

export function getJudgeInfos () {
    return request.get("/manageapi/stats/judge")
}

export function getVotesStats (data) {
    return request.get("/manageapi/stats/votes", {
        params: data
    })
}

export function getRoundData (data) {
    return request.get("/manageapi/round/stats", {
        params: data
    })
}

export function getRoundInfo () {
    return request.get("/manageapi/round/info")
}

export function openNextRound () {
    return request.post("/manageapi/round/next")
}