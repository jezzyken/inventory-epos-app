import { defineStore } from 'pinia'

export const useStore = defineStore({
  id: 'app',
  state: () => ({
    drawer: true,
  }),
  actions: {
    toggleDrawer() {
      console.log({state: this.drawer})
      this.drawer = !this.drawer
    },
  },
})
