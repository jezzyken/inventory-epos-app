<template>
  <v-app-bar app color="white">
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>{{ capitalizedRouteName }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn v-if="isAuthenticated" @click="logout" text
      ><v-icon dark> mdi-logout-variant </v-icon></v-btn
    >
  </v-app-bar>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "AppBar",
  computed: {
    ...mapState({
      drawer: (state) => state.drawer,
    }),
    ...mapGetters("auth", ["isAuthenticated", "user"]),
    userName() {
      return this.user && (this.user.fname || this.user.lname)
        ? `${this.user.fname} ${this.user.lname}`
        : "";
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
    ...mapActions("auth", ["logout"]),
    ...mapMutations({
      setDrawer: "SET_DRAWER",
    }),
  },
};
</script>
