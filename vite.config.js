import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { BiCommand } from "react-icons/bi";

// https://vitejs.dev/config/
// export default defineConfig({
//   define: { "process.env": {} },

//   plugins: [react()],
//   optimizeDeps: {
//     exclude: ["js-big-decimal"],
//   },
//   build: {
//     chunkSizeWarningLimit: 1600,
//     commonjsOptions: {
//       transformMixedEsModules: true,
//       // include: [/linked-dep/, /node_modules/],
//     },
//   },
// });

// export default defineConfig(({mode,command}))

export default defineConfig(({ command, mode, ssrBuild }) => {
  const config = {
    plugins: [react()],
    base: "/",
  };

  if (command !== "serve") {
    config.base = "/pharmacy-inventory-react-app/";
  }
  return config;
});
