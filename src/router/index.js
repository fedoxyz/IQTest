import { createRouter, createWebHistory } from "vue-router";
import MainView from "../views/MainView.vue";
import TestView from "../views/TestView.vue";

const routes = [
  { path: "/", component: MainView },
  { path: "/test", component: TestView }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;

