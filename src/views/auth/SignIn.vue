<template>
    <h2 class="text-center">Sign In</h2>
    <form @submit.prevent="login">
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" class="form-control" v-model="email" required />
        </div>
        <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" class="form-control" v-model="password" required />
        </div>
        <div class="form-group mt-4 text-center">
            <button type="submit" class="btn btn-primary w-25">Login</button>
        </div>
        <div class="text-center mt-2">
            <span class="text-secondary">Don't have an account?</span>
            <RouterLink to="/sign-up"> Sign Up</RouterLink>
        </div>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
</template>

<script>
import router from '@/router';
import { useAuthStore } from '@/stores/authStore';
import axios from 'axios';

export default {
    data() {
        return {
            email: '',
            password: '',
            errorMessage: '',
        };
    },
    methods: {
        async login() {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/login', {
                    email: this.email,
                    password: this.password,
                }, { 'Content-type': 'application/json', "Access-Control-Allow-Origin": "*" });
                localStorage.setItem('authToken', response.data.data.token);
                localStorage.setItem('user_name', response.data.data.user.name);

                const authStore = useAuthStore();
                authStore.setToken(response.data.data.token);
                router.push('/campaign/index')
            } catch (error) {
                this.errorMessage = 'Invalid credentials. Please try again.' + error;
            }
        },
    },
};
</script>

<style>
/* Add your CSS styling here */
</style>