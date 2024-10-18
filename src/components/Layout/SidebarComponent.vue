<template>
    <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
        <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <a href="/campaign/index"
                class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span class="fs-5 d-none d-sm-inline">Mini Campaign</span>
            </a>
            <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                <li class="nav-item">
                    <RouterLink to="/campaign/index" class="nav-link px-0 align-middle">Home</RouterLink>
                </li>
                <li>
                    <RouterLink to="/campaign/index" class="nav-link px-0 align-middle">Campaign List</RouterLink>
                </li>
                <li>
                    <RouterLink to="/campaign/create" class="nav-link px-0 align-middle">Campaign Create</RouterLink>
                </li>
            </ul>
            <hr>
            <div class="dropdown pb-4">
                <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                    id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"
                        alt="hugenerd" width="30" height="30" class="rounded-circle">
                    <span class="d-none d-sm-inline mx-1">{{ name }}</span>
                </a>
                <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
                    <li><a class="dropdown-item" href="#">Profile</a></li>
                    <li>
                        <hr class="dropdown-divider">
                    </li>
                    <li><button class="dropdown-item" v-on:click="logout()">Sign out</button></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { useAuthStore } from '@/stores/authStore';
import axios from 'axios';

export default {
    name: "SidebarComponent",
    data() {
        return {
            name: localStorage.getItem('user_name'),
        };
    },
    methods: {
        async logout() {
            const response = await axios.post(`http://127.0.0.1:8000/api/logout`, "", {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                }
            });

            if (response.data.success) {
                localStorage.removeItem('authToken',);
                localStorage.removeItem('user_name',);
                const authStore = useAuthStore();
                authStore.removeToken();
                this.$router.push({ name: 'home' });
            } else {
                alert('Failed to logout content.');
            }
        },
    },
};
</script>