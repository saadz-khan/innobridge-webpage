import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiTarget = env.VITE_API_PROXY_TARGET || "http://localhost:4000";
  const base = env.VITE_APP_BASE_PATH || (mode === "development" ? "/" : "./");

  return {
    base,
    plugins: [react(), svgr()],
    server: {
      port: 5173,
      proxy: {
        "/api": {
          target: apiTarget,
          changeOrigin: true
        }
      }
    },
    build: {
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
            icons: ["lucide-react"]
          }
        }
      }
    }
  };
});
