import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => {
    return { sidebar: false };
  },
  actions: {
    toggleSidebar() {
      this.sidebar = !this.sidebar;
    },
  },
});
