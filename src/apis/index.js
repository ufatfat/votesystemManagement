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

export function getJudgeInfos (data) {
    return request.get("/manageapi/stats/judge", {
        params: data
    })
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
    return request.get("/manageapi/round")
}

export function openNextRound (data = {voted_works: []}) {
    return request.post("/manageapi/round/next", data)
}

export function updateRoundInfo (data) {
    return request.put("/manageapi/round", data)
}

export function createNewRound (data) {
    return request.post("/manageapi/round", data)
}

export function deleteRound (data) {
    return request.delete("/manageapi/round", {
        params: data
    })
}

export function openJudgeRevote (data) {
    return request.post("/manageapi/round/judge_revote", data)
}

export function getJudgeRevoteStatus () {
    return request.get("manageapi/round/judge_revote")
}

export function createNewJudge (data) {
    return request.post("/manageapi/judge", data)
}

export function updateJudgeInfo (data) {
    return request.put("/manageapi/judge", data)
}

export function deleteJudge (data) {
    return request.delete("/manageapi/judge", {
        params: data
    })
}

export function getPromotionInfo (data) {
    return request.get("/manageapi/round/promotion", {
        params: data
    })
}

export function getConfig () {
    return request.get("/api/config")
}

export function getContestInfo () {
    return request.get("/manageapi/system/contest")
}

export function updateContest (data) {
    return request.put("/manageapi/system/contest", data)
}

export function uploadImage (data) {
    return request.post("/manageapi/system/image", data, {
        "Content-Type": "multipart/form-data",
    })
}

export function deleteContest (data) {
    return request.delete("/manageapi/system/contest", {
        params: data,
    })
}

export function createContest (data) {
    return request.post("/manageapi/system/contest", data)
}