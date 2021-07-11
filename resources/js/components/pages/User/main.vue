<template>
    <div>
        <user-sidebar></user-sidebar>
        <div id="main">
            <user-navbar></user-navbar>
            <div class="main-content container-fluid">
                <div class="page-title">
                    <h3></h3>
                    <p class="text-subtitle text-muted">A good dashboard to display your statistics</p>
                </div>
                <section class="section" v-if="route === 'user'">
                                                                <!-- memanggil role -->
                    ini dashboard {{ user.name }} | role : {{ user.roles[0].nama_role }}
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
        // console.log(JSON.parse(localStorage.user)); cek local storage user
        return {
            data : 'Main',
            user : JSON.parse(localStorage.user), // mengubah string menjadi json
            route : this.$route.name
        }
    },
}
</script>



