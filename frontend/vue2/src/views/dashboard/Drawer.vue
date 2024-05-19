<template>
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
    return {};
  },
};
</script>

<style scoped>
.nav-bg {
  background: hsla(333, 100%, 53%, 1);

  background: linear-gradient(
    270deg,
    hsla(333, 100%, 53%, 1) 0%,
    hsla(33, 94%, 57%, 1) 100%
  );

  background: -moz-linear-gradient(
    270deg,
    hsla(333, 100%, 53%, 1) 0%,
    hsla(33, 94%, 57%, 1) 100%
  );

  background: -webkit-linear-gradient(
    270deg,
    hsla(333, 100%, 53%, 1) 0%,
    hsla(33, 94%, 57%, 1) 100%
  );

  filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#FF0F7B", endColorstr="#F89B29", GradientType=1 );
}
</style>
