import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

// router pages login
import auth_login from '../components/auth/login.vue';
import auth_register from '../components/auth/register.vue';
// admin
import admin_main from '../components/pages/admin/main.vue';
import admin_user from '../components/pages/admin/User/index.vue';

//user route
import user_main from '../components/pages/user/main.vue';
import user_index from '../components/pages/user/index.vue';

// ini route nya
const routes = [{
        // role admin
        // role user ( kalau role harus memakai child nya kalau kalau ga nanti redirect if autenticatenya nanti gabisa )
        name: 'admin',
        path: '/admin/',
        component: admin_main,
        meta: {
            requiresAuth: true, // meta ngasih tau membutuhkan login
            isAdmin: true // meta untuk mengasih tau membutuh kan role admin
        },
        children: [{
                name: 'admin_user',
                path: 'user',
                component: admin_user
            },
        ],
    },
    {
        // role user ( kalau role harus memakai child nya kalau kalau ga nanti redirect if autenticatenya nanti gabisa )
        name: 'user',
        path: '/user/',
        component: user_main,
        meta: {
            requiresAuth: true,
            isUser: true
        },
        children: [{
            name: 'user_index',
            path: 'index',
            component: user_index
        }],
    },
    {
        // login auth
        name: 'login',
        path: '/login',
        component: auth_login,
    },
    {
        name: 'register',
        path: '/register',
        component: auth_register,
    },
]




// configurasi
const router = new VueRouter({
    // mengahpus tanya #
    mode: 'history',
    routes: routes, // ituin route nya
});


// beforeach ini funtion sebelum di jalakanya route
router.beforeEach((to, from, next) => {
    // ngecek kalau di arraynya ada isinya atau true
    // make matched untuk mengubah ke array of object
    // some untuk mengecek isi array nya
    // contoh
    // console.log(to.matched.some(record => true));

    // contoh untuk memakai meta  requiresAuth
    // jika membuatuhkan login / requiresAuth
    if (to.matched.some(isi => isi.meta.requiresAuth)) {
        // mencari token dari local storage
        let token = localStorage.token != null;
        // jika token kosong
        if (!token) {
            // kembali ke login
            next('/login')
        } else {
            // mencari user di localstorage
            let user = JSON.parse(localStorage.user);
            console.log(to.matched.some(isi => isi.meta.isUser));
            // mendapta kan role menggunakan map untuk mengambil isi nya mengunakan anonymous funtion
            let role = user.roles[0].nama_role;
            next();
            // cek meta jika metanya trus seperti di atas nya true
            if (to.matched.some(isi => isi.meta.isUser)) {
                // cari role
                switch (role) {
                    case 'user': // jika role user
                        next(); // lanjutkan
                        break;
                    case 'admin': // jika role admin maka ke admin beserta child nya
                        next('/admin'); // ke / admin
                        break;

                }
            } else
                // cek meta jika metanya is admin sberarti true
                if (to.matched.some(isi => isi.meta.isAdmin)) {
                    // cari role
                    switch (role) {
                        case 'admin': // jika role admin
                            next(); // lanjutkan
                            break;
                        case 'user': // jika role use
                            next('/user'); // maka di lanjutkan ke user
                            break;

                    }
                }
        }
    } else {
        next();
    }

});

// balikin atau export default nya route nya
export default router
