import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Forward /api/* from Vite (5173) → Firebase Hosting emulator (5000),
      // which then rewrites to your Cloud Function.
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        // no path rewrite needed; we want /api/tmdb/** unchanged
      },
    },
  },
});
