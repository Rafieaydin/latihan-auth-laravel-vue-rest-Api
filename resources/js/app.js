/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');


import Vue from 'vue'

// router
import routers from '../js/router/router.js'
Vue.use(routers);


// component
Vue.component('example-component', require('./components/ExampleComponent.vue').default);
// admin
Vue.component('admin-navbar', require('./components/template/admin/navbar.vue').default);
Vue.component('admin-sidebar', require('./components/template/admin/sidebar.vue').default);
// user
Vue.component('user-navbar', require('./components/template/user/navbar.vue').default);
Vue.component('user-sidebar', require('./components/template/user/sidebar.vue').default);
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',

    // untuk route route dari routes
    router : routers,
});
