<template>
  <div>
    <v-list>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img
            src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1721001600&semt=ais_user"></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{ userName }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list v-for="item in items" :key="item.title">
      <v-list-item :to="item.route">
        <v-list-item-icon>
          <v-icon>{{ item.action }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
      <v-list-group v-for="list in item.list" :key="list.title" v-model="list.active" :prepend-icon="list.action"
        @click.prevent="openRoute(list)" :append-icon="list.appendIcon" no-action link active-class="white--text">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="list.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item v-for="child in list.items" :key="child.title" :to="child.route" link active-class="white--text">
          <v-list-item-title v-text="child.title"></v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    admins: [
      ["Management", "mdi-account-multiple-outline"],
      ["Settings", "mdi-cog-outline"],
    ],
    items: [
      {
        action: "mdi-home",
        title: "Dashboard",
        route: "/dashboard",
        list: [
          {
            action: "mdi-clipboard-list-outline",
            items: [
              { title: "Products", route: "/product" },
              { title: "Brands", route: "/brand" },
              { title: "Units", route: "/unit" },
              { title: "Categories", route: "/category" },
              { title: "Variants", route: "/variant" },
            ],
            title: "Products",
            appendIcon: "mdi-chevron-down",
          },
          {
            action: "mdi-package-up",
            items: [
              { title: "Stocks", route: "/stock" },
              { title: "Adjustments", route: "/adjustment" },
            ],
            title: "Inventory",
            appendIcon: "mdi-chevron-down",
          },
          {
            action: "mdi-invoice-list",
            title: "Sales",
            appendIcon: "",
            route: "/sale",
          },
          {
            action: "mdi-truck-delivery",
            title: "Delivery",
            appendIcon: "",
            route: "/delivery",
          },
          {
            action: "mdi-contacts",
            items: [
              // { title: "Customer", route: "/customer" },
              { title: "Supplier", route: "/supplier" },
            ],
            title: "Contacts",
            appendIcon: "mdi-chevron-down",
          },
          // {
          //   action: "mdi-account-group",
          //   items: [{ title: "Users" }, { title: "Logs" }, { title: "Role" }],
          //   title: "Users",
          //   appendIcon: "mdi-chevron-down",
          // },
          {
            action: "mdi-account-group",
            title: "Users",
            appendIcon: "",
            route: "/user",
          },
          {
            action: "mdi-chart-box",
            title: "Reports",
            appendIcon: "",
            route: "/reports",
          },
        ],
      },
    ],
  }),
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "user"]),
    userName() {
      return this.user && (this.user.fname || this.user.lname)
        ? `${this.user.fname} ${this.user.lname}`
        : "";
    },
  },
  methods: {
    openRoute(items) {
      let route = items.route;

      if (items.route === undefined) return;

      if (route === this.$route.path) return;

      this.$router.push(items.route);
    },
  },
};
</script>
