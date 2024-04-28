<template>
  <v-navigation-drawer v-model="$store.state.drawer" app>
    <DrawerListVue />
  </v-navigation-drawer>
</template>

<script>
import DrawerListVue from '@/components/dashboard/DrawerList.vue';

export default {
  name: "AppDrawer",
  components: { DrawerListVue },
  data() {
    return {};
  },
};
</script>
