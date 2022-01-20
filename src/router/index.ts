import { createRouter, createWebHistory } from "vue-router";

// 1. Define route components.
// These can be imported from other files
import Index from "../pages/Index.vue";
import About from "../pages/About.vue";
import Suggestions from "../pages/Suggestions.vue";
import Thanks from "../pages/Thanks.vue";
import Statistics from "../pages/Statistics.vue";

const routes = [
  { path: "/", component: Index },
  { path: "/about", component: About },
  { path: "/suggestions", component: Suggestions },
  { path: "/thanks", component: Thanks },
  { path: "/statistics", component: Statistics },
];

const router = createRouter({
  // nginx
  history: createWebHistory(),
  routes,
});

export default router;
