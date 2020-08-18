import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../home/HomePage'
import DashboardPage from '../dashboard/DashboardPage'
import LoginPage from '../login/LoginPage'
import SignUpPage from '../signup/SignUpPage'

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        { path: '/home', component: HomePage },
        { path: '/', component: DashboardPage },
        { path: '/login', component: LoginPage },
        { path: '/signup', component: SignUpPage },

        // otherwise redirect to home
        { path: '*', redirect: '/home' }
    ]
});

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login', '/signup'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    if (authRequired && !loggedIn) {
        return next('/login');
    }

    next();
})