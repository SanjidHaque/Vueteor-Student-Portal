import Router from 'vue-router';
import Vue from "vue";

import Students from '../components/Students';

Vue.use(Router);


const router = new Router({
    routes: [
        {
            path: '/',
            name: 'Students',
            component: Students
        },
        {
            path: '/subjects',
            name: 'Subjects',
            component: () => import('../components/Subjects')
        }
    ]
});

export default router