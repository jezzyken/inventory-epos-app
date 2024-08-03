<template>
  <!-- src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg" -->

  <v-navigation-drawer v-model="$store.state.drawer" dark class="nav-bg" app>
    <DrawerListVue />
  </v-navigation-drawer>
</template>

<script>
import DrawerListVue from "@/components/dashboard/DrawerList.vue";

export default {
  name: "AppDrawer",
  components: { DrawerListVue },
  data() {
    return {
      imageUrl: "https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg",
    };
  },
};
</script>

<style scoped>
.nav-bg {
  background: rgb(36, 36, 79);
  background: linear-gradient(
    0deg,
    rgba(36, 36, 79, 1) 5%,
    rgba(15, 49, 196, 1) 96%
  );
}
</style>
