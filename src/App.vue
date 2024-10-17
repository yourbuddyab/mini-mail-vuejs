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
import { useAuthStore } from './stores/authStore';

export default {
  name: "DashboardView",
  components: {
    SidebarComponent,
  },
  setup() {
    const authStore = useAuthStore();
    return {
      isAuthenticated: authStore.isAuthenticated,
    };
  },
};
</script>

<style scoped>
.content {
  padding: 20px;
}
</style>
