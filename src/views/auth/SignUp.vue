<template>
    <div class="container">
        <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6 card mt-5">
                <div class="register card-body">
                    <h2 class="text-center">Sign Up</h2>
                    <form @submit.prevent="register">
                        <div class="form-group mt-2">
                            <label for="name">Name <span class="text-danger">*</span></label>
                            <input type="text" v-model="name" required class="form-control" />
                        </div>
                        <div class="form-group mt-2">
                            <label for="email">Email <span class="text-danger">*</span></label>
                            <input type="email" v-model="email" required class="form-control" />
                        </div>
                        <div class="form-group mt-2">
                            <label for="password">Password <span class="text-danger">*</span></label>
                            <input type="password" v-model="password" required class="form-control" />
                        </div>
                        <div class="form-group mt-2">
                            <label for="password_confirmation">Confirm Password <span
                                    class="text-danger">*</span></label>
                            <input type="password" v-model="password_confirmation" required class="form-control" />
                        </div>
                        <div class="form-group mt-4 text-center">
                            <button type="submit" class="btn btn-primary w-25">Register</button>
                        </div>
                        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
                    </form>
                </div>
            </div>
        </div>
        <div class="col-md-3"></div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            errorMessage: '',
        };
    },
    methods: {
        async register() {
            try {
                await axios.post('http://127.0.0.1:8000/api/register', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password_confirmation,
                }, { 'Content-type': 'application/json', "Access-Control-Allow-Origin": "*" });
                alert('Successfully register your information. Now Login')
                this.$router.push('/');
                // eslint-disable-next-line no-unused-vars
            } catch (error) {
                this.errorMessage = 'Registration failed. Please try again.';
            }
        },
    },
};
</script>