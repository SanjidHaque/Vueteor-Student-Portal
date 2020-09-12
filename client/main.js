import 'bootstrap';
import Vue from 'vue';
import Vuetify from 'vuetify';

import router from './router/index'
import 'vuetify/dist/vuetify.min.css'
import { Meteor } from 'meteor/meteor';

import 'bootstrap/dist/css/bootstrap.min.css';
import VueMeteorTracker from 'vue-meteor-tracker';

import App from '../imports/ui/App.vue';

Meteor.startup(() => {
    Vue.use(Vuetify);
    Vue.use(VueMeteorTracker);

    const vuetify = new Vuetify({
        theme: {
            default: true
        }
    });

    new Vue({
        vuetify,
        router,
        el: '#app',
        ...App
    });
});
