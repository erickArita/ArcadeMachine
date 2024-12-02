import MillionLint from "@million/lint";
import { defineConfig, PluginOption } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
const _plugins: PluginOption[] = [ react() ];

export default defineConfig({
  plugins: _plugins,
  server: {
    port: 4001,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:4001",
  },
});
