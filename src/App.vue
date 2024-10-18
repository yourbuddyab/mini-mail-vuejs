<template>
  <div class="row flex-nowrap">
    <SidebarComponent v-if="isAuthenticated" />
    <div class="col py-3">
      <RouterView />
    </div>
  </div>
</template>

<script>
import SidebarComponent from '@/components/Layout/SidebarComponent.vue';
import { useAuthStore } from '@/stores/authStore'; // Fixed import path
import { computed } from 'vue';

export default {
  name: "DashboardView",
  components: {
    SidebarComponent,
  },
  setup() {
    const authStore = useAuthStore();

    // Use a computed property for reactivity
    const isAuthenticated = computed(() => authStore.isAuthenticated); // Make it reactive

    return {
      isAuthenticated,
    };
  },
  mounted() {
  }
};
</script>

<style scoped>
.content {
  padding: 20px;
}
</style>
