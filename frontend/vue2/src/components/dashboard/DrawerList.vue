<template>
  <div>
    <v-list v-for="item in items" :key="item.title">
      <v-list-item>
        <v-list-item-icon>
          <v-icon>{{ item.action }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
      <v-list-group
        v-for="list in item.list"
        :key="list.title"
        v-model="list.active"
        :prepend-icon="list.action"
        @click.prevent="openRoute(list)"
        :append-icon="list.appendIcon"
        no-action
        link
        active-class="white--text"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="list.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="child in list.items"
          :key="child.title"
          :to="child.route"
          link
          active-class="white--text"
        >
          <v-list-item-title v-text="child.title"></v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-list>
  </div>
</template>

<script>
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
        route: "/",
        list: [
          {
            action: "mdi-clipboard-list-outline",
            active: true,
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
            title: "Stocks",
            route: "/stock",
            appendIcon: "",
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
              { title: "Customer", route: "/customer" },
              { title: "Supplier", route: "/supplier" },
            ],
            title: "Contacts",
            appendIcon: "mdi-chevron-down",
          },
          {
            action: "mdi-account-group",
            items: [{ title: "Users" }, { title: "Logs" }, { title: "Role" }],
            title: "Users",
            appendIcon: "mdi-chevron-down",
          },
          {
            action: "mdi-invoice-list",
            title: "Sales",
            appendIcon: "",
            route: "/sale",
          },
          {
            action: "mdi-chart-box",
            items: [],
            title: "Reports",
            appendIcon: "mdi-chevron-down",
          },
        ],
      },
    ],
  }),
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
