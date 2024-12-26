import {createRouter, createWebHashHistory} from 'vue-router'
import SignIn from '@/vue/SignIn.vue';
import Home from "../vue/home.vue";

const routes = [
    {
        path: '/',
        name: 'Main',
        component: Home,
        meta: { requiresAuth: true }, // 인증이 필요한 경우 설정
        children: [
            {
                name: 'HomeMain',
                component: () => import('@/views/home-main.vue'),
                path: '/',
            },
            {
                name: 'HomePopular',
                component: () => import('@/views/home-popular.vue'),
                path: 'popular',
            },
            {
                name: 'HomeWishList',
                component: () => import('@/views/home-wishlist.vue'),
                path: 'wishlist',
            },
            {
                name: 'HomeSearch',
                component: () => import('@/views/home-search.vue'),
                path: 'search',
            }
        ]
    },
    {
        path: '/signin',
        name: 'SignIn', // name 추가
        component: SignIn,
    },
]

const router = createRouter({
    history: createWebHashHistory('/24-02-WSD-Assignment-02-Demo/'),
    routes
})

// router.beforeEach((to, _from, next): void => {
//     const isAuthenticated = localStorage.getItem('TMDb-Key') !== null;
//
//     if (to.matched.some(record => record.meta.requiresAuth)) {
//         // If the route requires authentication and the user is not authenticated
//         if (!isAuthenticated) {
//             next({ name: 'SignIn' }); // Redirect to the SignIn page
//         } else {
//             next(); // Proceed to the requested route
//         }
//     } else {
//         // If the user is already authenticated and tries to access the SignIn page
//         if (to.name === 'SignIn' && isAuthenticated) {
//             next({ name: '/' }); // Redirect to the home page
//         }
//         else {
//             next(); // Proceed to the requested route
//         }
//     }
// });
router.beforeEach((to, _from, next): void => {
    // Access Token을 기준으로 인증 상태 확인
    const isAuthenticated = !!localStorage.getItem('accessToken'); // Access Token이 존재하면 true

    if (to.matched.some(record => record.meta.requiresAuth)) {
        // 인증이 필요한 페이지에 접근 시
        if (!isAuthenticated) {
            next({ name: 'SignIn' }); // 인증되지 않은 경우 SignIn으로 리디렉션
        } else {
            next(); // 인증된 경우 요청한 페이지로 이동
        }
    } else {
        // 인증되지 않은 페이지에 접근 시
        if (to.name === 'SignIn' && isAuthenticated) {
            next({ name: 'Main' }); // 이미 인증된 사용자는 Main으로 리디렉션
        } else {
            next(); // 요청한 페이지로 이동
        }
    }
});



export default router

