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
        path: "/product/add",
        name: "AddProduct",
        component: () => import("@/views/products/ProductForm"),
        props: { mode: 'add' }
      },
      {
        path: "/product/:id/edit",
        name: "EditProduct",
        component: () => import("@/views/products/ProductForm"),
        props: true
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
      {
        path: "/variant",
        name: "variant",
        component: () => import("@/views/products/VariantView"),
      },
      {
        path: "/color",
        name: "color",
        component: () => import("@/views/products/ColorView"),
      },
      // ----end of products----

      // ----stocks----
      {
        path: "/stock",
        name: "stock",
        component: () => import("@/views/StockView"),
      },
      {
        path: "/stock/add",
        name: "AddStock",
        component: () => import("@/views/StockForm"),
        props: { mode: 'add' }
      },
      {
        path: "/stock/:id/edit",
        name: "EditStock",
        component: () => import("@/views/StockForm"),
        props: true
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
      {
        path: "/sales/view",
        name: "Sales Item",
        component: () => import("@/views/SalesItemView"),
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
