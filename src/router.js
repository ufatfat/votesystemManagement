import Vue from "vue"
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/sign-in",
            component: () => import("@/views/auth/Sign-in"),
            meta: {
                title: "登录",
            }
        }, {
            path: "/enroll_stats",
            component: () => import("@/views/stats/Enroll"),
            meta: {
                title: "报名统计",
                requireSignIn: true,
            }
        }, {
            path: "/",
            redirect: "/sign-in",
            meta: {
                title: "首页",
            }
        }
    ]
})

router.beforeEach(async (to, from, next) => {
    let token = sessionStorage.getItem("token")
    if (to.meta.title) {
        document.title = to.meta.title
    }
    if (token && to.path === "/sign-in") {
        next({
            path: "/enroll_stats"
        })
    }
    if(to.meta.requireSignIn) {
        if (token) {
            if (Object.keys(from.query).length === 0) {
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
                    redirect: to.fullPath
                }
            })
        }
    } else {
        next()
    }
})

export default router