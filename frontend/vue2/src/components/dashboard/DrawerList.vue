<template>
  <div class="drawer">
    <v-list class="user-profile">
      <v-list-item>
        <v-list-item-avatar size="48" class="avatar">
          <v-img :src="userAvatar" :alt="userName"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-h6 font-weight-medium"
            >Admin</v-list-item-title
          >
          <v-list-item-subtitle class="text-caption">{{
            user.email
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav dense class="navigation-list">
      <v-list-item to="/dashboard" class="dashboard-item">
        <v-list-item-icon>
          <v-icon color="white">mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Dashboard</v-list-item-title>
      </v-list-item>

      <v-list-group
        v-for="item in menuItems"
        :key="item.title"
        :prepend-icon="item.action"
        class="menu-group"
        color="white"
      >
        <template v-slot:activator>
          <v-list-item-title class="font-weight-medium">{{
            item.title
          }}</v-list-item-title>
        </template>

        <v-list-item
          v-for="child in item.items"
          :key="child.title"
          :to="child.route"
          link
          class="submenu-item"
        >
          <v-list-item-title class="pl-4">{{ child.title }}</v-list-item-title>
        </v-list-item>
      </v-list-group>

      <v-list-item
        v-for="item in singleItems"
        :key="item.title"
        :to="item.route"
        class="single-item"
      >
        <v-list-item-icon>
          <v-icon color="white">{{ item.action }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AppDrawer",

  data: () => ({
    userAvatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsHPpMe4GCRLHPMQJgfRJkVED2tVK07pHMlQ&s",
    menuItems: [
      {
        action: "mdi-clipboard-list-outline",
        title: "Products",
        items: [
          { title: "Products", route: "/product" },
          { title: "Brands", route: "/brand" },
          { title: "Units", route: "/unit" },
          { title: "Categories", route: "/category" },
          { title: "Variants", route: "/variant" },
        ],
      },
      {
        action: "mdi-package-up",
        title: "Inventory",
        items: [
          { title: "Stocks", route: "/stock" },
          { title: "Adjustments", route: "/adjustment" },
        ],
      },
      {
        action: "mdi-contacts",
        title: "Contacts",
        items: [{ title: "Supplier", route: "/supplier" }],
      },
    ],
    singleItems: [
      { title: "Sales", action: "mdi-invoice-list", route: "/sale" },
      { title: "Delivery", action: "mdi-truck-delivery", route: "/delivery" },
      { title: "Users", action: "mdi-account-group", route: "/user" },
      { title: "Reports", action: "mdi-chart-box", route: "/reports" },
    ],
  }),

  computed: {
    ...mapGetters("auth", ["user"]),
    userName() {
      return this.user?.fname && this.user?.lname
        ? `${this.user.fname} ${this.user.lname}`
        : "User Name";
    },
  },
};
</script>

<style scoped>
.drawer {
  height: 100%;
  background-color: #000249;
}

.v-list-item--active {
  background-color: #dd1717 !important;
  color: #fff;
}

.v-list-item--active .v-icon {
  color: #fff !important;
}
</style>
