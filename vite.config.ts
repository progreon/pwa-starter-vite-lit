import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { createHtmlPlugin } from 'vite-plugin-html';
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
// import { m } from '@vite-pwa/assets-generator/dist/shared/assets-generator.5e51fd40.mjs';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the
  // `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: '/vite-lit/', // Change this to your desired base path
    build: {
      emptyOutDir: true, // Clears <outDir> before building
      outDir: 'dist/vite-lit'
    },
    // resolve: {
    //   alias: {
    //     "App": "src/app",
    //     "Core": "src/app/core",
    //     "CoreActions": "src/app/core/actions",
    //     "CoreComponents": "src/app/core/components",
    //     "CoreReducers": "src/app/core/reducers",
    //     "Redux": "src/app/core/redux",
    //     "Images": "src/app/images",
    //     "SharedComponents": "src/app/shared/components",
    //     "SharedData": "src/app/shared/data",
    //     "SharedModules": "src/app/shared/modules",
    //     "Shared": "src/app/shared"
    //   }
    // },
    plugins: [
      tsconfigPaths(),
      VitePWA({
        registerType: 'prompt',
        injectRegister: false,

        pwaAssets: {
          disabled: false,
          config: true,
        },

        manifest: {
          name: 'vite-pwa-test',
          short_name: 'vite-pwa-test',
          description: 'vite-pwa-test',
          theme_color: '#ffffff',
        },

        workbox: {
          globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
          cleanupOutdatedCaches: true,
          clientsClaim: true,
        },

        devOptions: {
          enabled: false,
          navigateFallback: 'index.html',
          suppressWarnings: true,
          type: 'module',
        },
      }),
      viteStaticCopy({
        targets: [
          {
            src: 'serve.json',
            dest: '../'
          }
        ]
      }),
      createHtmlPlugin({
        inject: {
          data: {
            title: 'vite-plugin-html title',
            // description: 'This is a description with vite-plugin-html'
          },
          tags: [
            {
              tag: 'meta',
              attrs: {
                name: 'description',
                content: 'This is a description with vite-plugin-html'
              }
            },
            {
              tag: 'meta',
              attrs: {
                name: 'build-timestamp',
                content: new Date().toString()
              }
            }
          ]
        }
      }),
      // tailwindcss(),
    ],
  }
})