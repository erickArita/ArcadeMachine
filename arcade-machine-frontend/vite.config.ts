import MillionLint from "@million/lint";
import { defineConfig, PluginOption } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
const _plugins: PluginOption[] = [react()];
_plugins.unshift(MillionLint.vite());
export default defineConfig({
  plugins: _plugins,
});
