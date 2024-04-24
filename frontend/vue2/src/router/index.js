import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: () => import("@/views/dashboard"),
    children: [
      // ----products----
      {
        path: "/product",
        name: "product",
        component: () => import("@/views/products/ProductView"),
      },
      {
        path: "/brand",
        name: "brand",
        component: () => import("@/views/products/BrandView"),
      },
      {
        path: "/category",
        name: "category",
        component: () => import("@/views/products/CategoryView"),
      },
      {
        path: "/unit",
        name: "unit",
        component: () => import("@/views/products/UnitView"),
      },
      // ----end of products----

      // ----stocks----
      {
        path: "/stock",
        name: "stock",
        component: () => import("@/views/StockView"),
      },
      // ----end of stocks----

      // ----delivery----
      {
        path: "/delivery",
        name: "delivery",
        component: () => import("@/views/DeliveryView"),
      },
      // ----end of delivery----

      // ----contacts----
      {
        path: "/customer",
        name: "customer",
        component: () => import("@/views/contacts/CustomerView"),
      },
      {
        path: "/supplier",
        name: "supplier",
        component: () => import("@/views/contacts/SupplierView"),
      },
      // ----end of contacts----
      
      // ----users----
      {
        path: "/user",
        name: "user",
        component: () => import("@/views/users/UserView"),
      },
      {
        path: "/user-role",
        name: "roles",
        component: () => import("@/views/users/UserRoleView"),
      },
      {
        path: "/user-logs",
        name: "logs",
        component: () => import("@/views/users/UserLogsView"),
      },
      // ----end of users----

      // ----sales----
      {
        path: "/sale",
        name: "sale",
        component: () => import("@/views/SalesView"),
      },
      // ----end of sales----

    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
