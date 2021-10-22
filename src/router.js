import Vue from "vue"
import Router from 'vue-router'
import MainContainer from "./containers/MainContainer"
import storage from "./utils/storage"

Vue.use(Router)

const router = new Router({
    mode: 'history',
    // base: process.env.BASE_URL,
    routes: [
        {
            path: "/sign-in",
            name: "sign-in",
            component: () => import("@/views/auth/SignIn"),
            meta: {
                title: "登录",
            }
        }, {
            path: "/",
            redirect: "/index",
            component: MainContainer,
            meta: {
                title: "首页",
                requireSignIn: true,
            },
            children: [
                {
                    path: "enroll_stats",
                    name: "enroll_stats",
                    component: () => import("@/views/stats/Enroll"),
                    meta: {
                        title: "报名统计",
                        requireSignIn: true,
                    }
                }, {
                    path: "index",
                    name: "index",
                    component: () => import("@/views/Index"),
                    meta: {
                        title: "首页",
                        requireSignIn: true,
                    }
                }, {
                    path: "vote_stats",
                    name: "vote_stats",
                    component: () => import("@/views/stats/Vote"),
                    meta: {
                        title: "投票统计",
                        requireSignIn: true,
                    }
                }, {
                    path: "system_config",
                    name: "system_config",
                    component: () => import("@/views/config/System"),
                    meta: {
                        title: "系统设置",
                        requireSignIn: true,
                    }
                }, {
                    path: "contest_config",
                    name: "contest_config",
                    component: () => import("@/views/config/Contest"),
                    meta: {
                        title: "比赛设置",
                        requireSignIn: true,
                    }
                }, {
                    path: "round_info",
                    name: "round_info",
                    component: () => import("@/views/stats/RoundInfo"),
                    meta: {
                        title: "轮次信息",
                        requireSignIn: true,
                    }
                }
            ]
        }
    ]
})

router.beforeEach(async (to, from, next) => {
    let token = storage.getItem("userInfo")
    if (to.meta.title) {
        document.title = to.meta.title
    }
    if (to.path === "/sign-in" && token)
        next({
            path: "/index"
        })
    if (to.meta.requireSignIn) {
        if (token) {
            if(Object.keys(from.query).length === 0) {
                next()
            } else {
                let redirect = from.query.redirect
                if (to.path === redirect) {
                    next()
                } else {
                    next({
                        path: redirect
                    })
                }
            }
        } else {
            next({
                path: "/sign-in",
                query: {
                    redirect: to.fullPath,
                },
            })
        }
    } else {
        next()
    }
})

export default router