import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

export default (mode: any) => {
  process.env = { ...process.env, ...loadEnv(mode.mode, process.cwd()) };

  return defineConfig({
    base: process.env.VITE_VUE_APP_PATH,

    plugins: [vue(), vueDevTools()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  });
};
