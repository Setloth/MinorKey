import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // node_modules is a symlink to node_modules.nosync so iCloud Drive
    // doesn't offload dependency files. Keep the symlinked path so Vite
    // still treats packages as dependencies and pre-bundles them.
    preserveSymlinks: true,
  },
})
