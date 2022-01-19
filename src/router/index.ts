import { createRouter, createWebHistory } from "vue-router";

// 1. Define route components.
// These can be imported from other files
import Index from "../pages/Index.vue";
import About from "../pages/About.vue";
import Suggestion from "../pages/Suggestion.vue";
import Thanks from "../pages/Thanks.vue";
import Statistics from "../pages/Statistics.vue";

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: "/", component: Index },
  { path: "/about", component: About },
  { path: "/suggestion", component: Suggestion },
  { path: "/thanks", component: Thanks },
  { path: "/statistics", component: Statistics },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

export default router;
