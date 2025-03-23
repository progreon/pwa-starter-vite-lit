import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { createHtmlPlugin } from 'vite-plugin-html';
import tsconfigPaths from 'vite-tsconfig-paths';
// import babel from 'vite-plugin-babel';
// import tailwindcss from '@tailwindcss/vite'
// import { m } from '@vite-pwa/assets-generator/dist/shared/assets-generator.5e51fd40.mjs';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the
  // `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: '/vite-pwa/', // Change this to your desired base path
    build: {
      emptyOutDir: true, // Clears <outDir> before building
      outDir: 'dist/vite-pwa'
    },
    plugins: [
      // babel(),
      // babel({
      //   babelConfig: {
      //     plugins: [
      //       ['@babel/plugin-proposal-decorators', { version: '2023-05' }],
      //       ['@babel/plugin-proposal-class-properties', { loose: true }],
      //       ['@babel/plugin-transform-class-static-block']
      //     ],
      //   },
      // }),
      tsconfigPaths(),
      VitePWA({
        registerType: 'prompt',
        injectRegister: false,

        pwaAssets: {
          disabled: false,
          config: true,
        },

        manifest: {
          name: 'vite-pwa',
          short_name: 'vite-pwa',
          description: 'This is a description for the vite-pwa',
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
            title: 'vite-pwa',
            // description: 'This is a description for the vite-pwa'
          },
          tags: [
            {
              tag: 'meta',
              attrs: {
                name: 'description',
                content: 'This is a description for the vite-pwa'
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
      // tailwindcss(), // uncomment if you want to use tailwind
    ],
  }
})