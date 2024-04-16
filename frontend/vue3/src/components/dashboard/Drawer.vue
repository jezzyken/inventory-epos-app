<template>
  <v-navigation-drawer v-model="drawer">
  </v-navigation-drawer>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useStore } from '@/stores/app'

const store = useStore()
const drawer = ref(store.drawer)

watch(() => store.drawer, (newValue) => {
  drawer.value = newValue
})

</script>
