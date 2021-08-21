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
            }
        }
    ]
})

export default router