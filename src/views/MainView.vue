<template>
    <div class="container mt-5">
        <div class="row">
            <!-- Left Side: Logo & Description -->
            <div class="col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div class="text-center">
                    <img src="../assets/logo.svg" class="img-fluid mb-4" alt="Logo">
                    <h1 class="display-5">Email Campaign Manager</h1>
                    <p class="lead">Effortlessly manage and send email campaigns to your audience.</p>
                </div>
            </div>

            <!-- Right Side: Sign Up Form -->
            <div class="col-md-6">
                <div class="card shadow p-4">
                    <SignIn />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SignIn from "./auth/SignIn.vue";

export default {
    components: {
        SignIn,
    },
};
</script>

<style scoped>
body {
    background-color: #f8f9fa;
}

.card {
    border: none;
    border-radius: 10px;
}

img {
    max-width: 150px;
}

h1 {
    color: #343a40;
}

.lead {
    color: #6c757d;
}

.btn-primary {
    background-color: #007bff;
    border-color: #007bff;
}

.btn-primary:hover {
    background-color: #0056b3;
    border-color: #004085;
}
</style>