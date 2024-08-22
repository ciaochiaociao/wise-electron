import { defineConfig } from 'vite'
import path from 'node:path'
import electron from 'vite-plugin-electron/simple'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr"

// https://vitejs.dev/config/
export default defineConfig({  // https://github.com/vitejs/vite/issues/17717
  // no need for this fix anymore after we use monorepo with multiple packages
  // // Fail to import default from a commonjs package, react-conditionally-render, from a file (react-chatbot-kit) in node_modules with optimizeDeps.exclude config
  // optimizeDeps: {
  //   include: ['react-conditionally-render', 'react-chatbot-kit'],
  // },
  // build: {
  //   commonjsOptions: {
  //     include: [/react-conditionally-render/, /react-chatbot-kit/, /node_modules/]
  //   }
  // },
  plugins: [
    react(),
    electron({
      main: {
        // Shortcut of `build.lib.entry`.
        entry: 'electron/main.ts',
      },
      preload: {
        // Shortcut of `build.rollupOptions.input`.
        // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
        input: path.join(__dirname, 'electron/preload.ts'),
      },
      // Ployfill the Electron and Node.js API for Renderer process.
      // If you want use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
      // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
      renderer: process.env.NODE_ENV === 'test'
        // https://github.com/electron-vite/vite-plugin-electron-renderer/issues/78#issuecomment-2053600808
        ? undefined
        : {},
    }),
    svgr(),
  ],
})
