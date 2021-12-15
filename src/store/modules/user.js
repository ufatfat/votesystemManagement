import storage from "../../utils/storage"
const expires = 12 * 3600 * 1000
const user = {
    state: {
        userInfo: storage.getItem("userInfo"),
        config: storage.getItem("config"),
    },

    mutations: {
        updateUserInfo: (state, userInfo) => {
            let data = {
                name: "userInfo",
                value: userInfo,
                expires: expires,
            }
            storage.setItem(data)
            state.userInfo = userInfo
        },
        updateConfig: (state, config) => {
            let data = {
                name: "config",
                value: config,
                expires: expires,
            }
            storage.setItem(data)
            state.config = config
        },
        signOut: state => {
            storage.removeItem("token")
            storage.removeItem("userInfo")
            storage.removeItem("voteInfo")
            storage.removeItem("votedWorks")
            storage.removeItem("contestConfig")
            storage.removeItem("totalWorkNum")
            storage.removeItem("config")
            state.userInfo = null
        }
    },

    actions: {
        updateUserInfo ({ commit }, userInfo) {
            commit("updateUserInfo", userInfo)
        },
        updateConfig ({ commit }, config) {
            commit("updateConfig", config)
        },
        signOut ({ commit }) {
            commit("signOut")
        }
    },
}
export default user