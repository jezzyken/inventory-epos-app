<template>
  <v-app>
    <Drawer />
    <AppBar />
    <v-main>
      <div class="main-container">
        <router-view></router-view>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "./AppBar.vue";
import Drawer from "./Drawer.vue";
export default {
  name: "DashboardView",
  components: {
    AppBar,
    Drawer,
  },
};
</script>
<style scoped>
.main-container {
  margin: 20px;
}
</style>
