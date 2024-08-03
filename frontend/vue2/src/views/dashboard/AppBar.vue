<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>{{ capitalizedRouteName }}</v-toolbar-title>
  </v-app-bar>
</template>
<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "AppBar",
  data() {
    return {};
  },
  computed: {
    ...mapState(["drawer"]),
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(val) {
        this.$store.commit("SET_DRAWER", val);
      },
    },
    capitalizedRouteName() {
      if (this.$route.name) {
        return this.$route.name
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      }
      return "";
    },
  },
  methods: {
    ...mapMutations({
      setDrawer: "SET_DRAWER",
    }),
  },
};
</script>
