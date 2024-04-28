<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>Application</v-toolbar-title>
  </v-app-bar>
</template>
<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: "AppBar",
  data() {
    return {
    }
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
  },
  methods: {
    ...mapMutations({
      setDrawer: "SET_DRAWER"
    })
  }
}
</script>