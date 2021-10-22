import storage from "@/utils/storage";
const expires = 24 * 3600 * 1000
const user = {
    state: {
        userInfo: storage.getItem("userInfo")
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
        signOut: state => {
            storage.removeItem("token")
            storage.removeItem("userInfo")
            storage.removeItem("voteInfo")
            storage.removeItem("votedWorks")
            storage.removeItem("contestConfig")
            storage.removeItem("totalWorkNum")
            state.userInfo = null
        }
    },

    actions: {
        updateUserInfo ({ commit }, userInfo) {
            commit("updateUserInfo", userInfo)
        },
        signOut ({ commit }) {
            commit("signOut")
        }
    },
}
export default user