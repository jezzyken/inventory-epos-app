import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/",
    name: "",
    component: () => import("@/views/dashboard"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/DashboardView"),
        meta: { requiresAuth: true },
      },
      // ----products----
      {
        path: "/product",
        name: "product",
        component: () => import("@/views/products/ProductView"),
        meta: { requiresAuth: true },
      },
      {
        path: "/product/add",
        name: "AddProduct",
        component: () => import("@/views/products/ProductForm"),
        props: { mode: "add" },
        meta: { requiresAuth: true },
      },
      {
        path: "/product/:id/edit",
        name: "EditProduct",
        component: () => import("@/views/products/ProductForm"),
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: "/brand",
        name: "brand",
        component: () => import("@/views/products/BrandView"),
        meta: { requiresAuth: true },
      },
      {
        path: "/category",
        name: "category",
        component: () => import("@/views/products/CategoryView"),
        meta: { requiresAuth: true },
      },
      {
        path: "/unit",
        name: "unit",
        component: () => import("@/views/products/UnitView"),
        meta: { requiresAuth: true },
      },
      {
        path: "/variant",
        name: "variant",
        component: () => import("@/views/products/VariantView"),
        meta: { requiresAuth: true },
      },
      // ----end of products----

      // ----Inventory----
      {
        path: "/stock",
        name: "stock",
        component: () => import("@/views/inventory/stocks/StockView"),
        meta: { requiresAuth: true },
      },
      {
        path: "/stock/add",
        name: "AddStock",
        component: () => import("@/views/inventory/stocks/StockForm"),
        props: { mode: "add" },
        meta: { requiresAuth: true },
      },
      {
        path: "/stock/:id/edit",
        name: "EditStock",
        component: () => import("@/views/inventory/stocks/StockForm"),
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: "/adjustment",
        name: "adjustment",
        component: () => import("@/views/inventory/adjustments/AdjustmentView"),
        meta: { requiresAuth: true },
      },
      {
        path: "/adjustment/add",
        name: "AddAjustment",
        component: () => import("@/views/inventory/adjustments/AdjustmentForm"),
        props: { mode: "add" },
        meta: { requiresAuth: true },
      },
      {
        path: "/adjustment/:id/edit",
        name: "EditAdjustment",
        component: () => import("@/views/inventory/adjustments/AdjustmentForm"),
        props: true,
        meta: { requiresAuth: true },
      },
      // ----end of Inventory----

      // ----delivery----
      {
        path: "/delivery",
        name: "delivery",
        component: () => import("@/views/DeliveryView"),
        meta: { requiresAuth: true },
      },
      // ----end of delivery----

      // ----contacts----
      {
        path: "/customer",
        name: "customer",
        component: () => import("@/views/contacts/CustomerView"),
        meta: { requiresAuth: true },
      },
      {
        path: "/supplier",
        name: "supplier",
        component: () => import("@/views/contacts/SupplierView"),
        meta: { requiresAuth: true },
      },
      // ----end of contacts----

      // ----users----
      {
        path: "/user",
        name: "user",
        component: () => import("@/views/users/UserView"),
        meta: { requiresAuth: true },
      },
      {
        path: "/user-role",
        name: "roles",
        component: () => import("@/views/users/UserRoleView"),
        meta: { requiresAuth: true },
      },
      {
        path: "/user-logs",
        name: "logs",
        component: () => import("@/views/users/UserLogsView"),
        meta: { requiresAuth: true },
      },
      // ----end of users----

      // ----sales----
      {
        path: "/sale",
        name: "sale",
        component: () => import("@/views/sales/SalesView"),
        meta: { requiresAuth: true },
      },
      {
        path: "/sale/add",
        name: "AddSales",
        component: () => import("@/views/sales/SalesForm"),
        props: { mode: "add" },
        meta: { requiresAuth: true },
      },
      {
        path: "/sale/:id/edit",
        name: "EditSales",
        component: () => import("@/views/sales/SalesForm"),
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: "/sales/view",
        name: "Sales Item",
        component: () => import("@/views/SalesItemView"),
        meta: { requiresAuth: true },
      },
      // ----end of sales----
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginForm"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters["auth/isAuthenticated"]) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else if (to.path === "/login" && store.getters["auth/isAuthenticated"]) {
    next({ path: "/dashboard" });
  } else {
    next();
  }
});

export default router;
