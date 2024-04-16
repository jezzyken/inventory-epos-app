<template>
  <v-app-bar>
    <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
    <v-app-bar-title>Application</v-app-bar-title>
  </v-app-bar>
</template>

<script setup>
import { useStore } from '@/stores/app'
const store = useStore()
const toggleDrawer = () => store.toggleDrawer()
</script>
