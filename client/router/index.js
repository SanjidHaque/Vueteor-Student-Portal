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
            path: '/add-student',
            name: 'AddStudent',
            component: () => import('../components/AddStudent')
        },
        {
            path: '/edit-student/:id',
            name: 'EditStudent',
            component: () => import('../components/EditStudent')
        },
        {
            path: '/subjects',
            name: 'Subjects',
            component: () => import('../components/Subjects')
        }
    ]
});

export default router
