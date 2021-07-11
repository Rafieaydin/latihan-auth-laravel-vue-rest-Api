<template>
    <div id="auth">
        <div class="container">
            <div class="row">
                <div class="col-md-5 col-sm-12 mx-auto">
                    <div class="card pt-4">
                        <div class="card-body">
                            <div class="text-center mb-5">
                                <img src="/images/favicon.svg" height="48" class='mb-4'>
                                <h3>Sign In</h3>
                                <p>Login untuk memasuki halaman.</p>
                            </div>
                            <!-- kalau mager bisa make ini untuk eror ini sama ka -->
                            <!-- <div v-if="errors">
                                username or password is inccorect
                            </div> -->
                            <form @submit.prevent="SubmitLogin()" action="/api/login" method="POST">
                                <div class="form-group position-relative has-icon-left">
                                    <label for="username">Email</label>
                                    <div class="position-relative">
                                        <input type="text" v-model="form.email" name="email" class="form-control"
                                            v-bind:class="{ 'is-invalid': errors.email }">
                                        <div class="form-control-icon">
                                            <i data-feather="user"></i>
                                        </div>
                                    </div>
                                    <div v-if="errors.email" class="invalid-feedback">
                                        {{ errors.email[0] }}
                                    </div>
                                </div>
                                <div class="form-group position-relative has-icon-left">
                                    <div class="clearfix">
                                        <label for="password">Password</label>
                                        <a href="auth-forgot-password.html" class='float-end'>
                                            <small>Forgot password?</small>
                                        </a>
                                    </div>
                                    <div class="position-relative">
                                        <input type="password" v-model="form.password" name="password"
                                            class="form-control" v-bind:class="{ 'is-invalid': errors.password }">
                                        <div class="form-control-icon">
                                            <i data-feather="lock"></i>
                                        </div>
                                    </div>
                                    <div v-if="errors.password" class="invalid-feedback">
                                        {{ errors.password[0] }}
                                    </div>
                                </div>

                                <div class='form-check clearfix my-4'>
                                    <div class="checkbox float-start">
                                        <input type="checkbox" id="checkbox1" class='form-check-input'>
                                        <label for="checkbox1">Remember me</label>
                                    </div>
                                    <div class="float-end">
                                        <router-link :to="{ name: 'register' }">Don't have an account?</router-link>
                                    </div>
                                </div>
                                <div class="clearfix">
                                    <button type="submit" class="btn btn-primary float-end">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    email: '', // variable kosong kaya biasa
                    password: '',
                },
                errors: [],
            }
        },
        methods: {
            SubmitLogin() {
                console.log(this.form);
                axios.post('/api/login', this.form).then((response) => {
                    // data yang sudah di dapatkan di masukan di local storage / sesi client side nya
                    localStorage.setItem('user', JSON.stringify(response.data.response.user)) // mengubah json menjadi string
                    localStorage.setItem('token', response.data.response.token);
                    // role redirect
                    // ini ngambil role dari array response di json nya
                    let role = response.data.response.user.roles[0].nama_role;
                    console.log(role);
                    switch (role) {
                        case 'user':
                            this.$router.push('/user');
                            break;
                        case 'admin':
                            this.$router.push('/admin');
                            break;
                    }
                }).catch((erorr) => {
                    console.log(erorr);
                    // catch erornya
                    // ini buat nangkep erorr
                    this.errors = erorr.response.data.errors;
                    console.log(this.erorr);
                });
            }
        },
    }

</script>
<style>
    .invalid-feedback {
        display: block;
    }

</style>
