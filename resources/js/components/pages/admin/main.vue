<template>
    <div>
        <admin-sidebar></admin-sidebar>
        <div id="main">
            <admin-navbar></admin-navbar>
            <div class="main-content container-fluid">
                <div class="page-title">
                    <h3></h3>
                    <p class="text-subtitle text-muted">A good dashboard to display your statistics</p>
                </div>
                <section class="section" v-if="route == 'user'">
                    <!--  name ngambil dari localstorage -->
                    ini dashboard | {{ user.name }}
                </section>
                <section class="section" v-else>
                    <router-view></router-view>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        console.log(JSON.parse(localStorage.user));
        return {
            data : 'Main',
            user : JSON.parse(localStorage.user), // mengubah string menjadi json
            route : this.$route.name
        }
    },
}
</script>
