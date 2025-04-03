import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { createHtmlPlugin } from 'vite-plugin-html';
import tsconfigPaths from 'vite-tsconfig-paths';
// import babel from 'vite-plugin-babel';
// import tailwindcss from '@tailwindcss/vite'
// import { m } from '@vite-pwa/assets-generator/dist/shared/assets-generator.5e51fd40.mjs';

// config
import serverConfig from './config/serverConfig';
import serverConfigProd from './config/serverConfig.prod';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the
  // `VITE_` prefix.
  const env = loadEnv(mode, process.cwd() + '/config', '');
  const serverConfigs = {
    'PROD': serverConfigProd
  }
  // console.log('defineConfig', process.cwd(), mode, env, JSON.stringify(serverConfigs[env['APP_ENV']] || serverConfig));
  return {
    base: env['APP_BASE_PATH'], // Change this to your desired base path
    build: {
      emptyOutDir: true, // Clears <outDir> before building
      outDir: 'dist' + env['APP_BASE_PATH']
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
          name: env['APP_NAME'],
          short_name: env['APP_NAME'],
          description: env['APP_DESCRIPTION'],
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
            dest: './'
          }
        ]
      }),
      createHtmlPlugin({
        inject: {
          data: {
            appTitle: env['APP_NAME'],
            appName: env['APP_NAME'],
            version: env['npm_package_version'] || '0.0.0',
            basePath: env['APP_BASE_PATH'],
            wideWidth: env['APP_WIDE_WIDTH'],
            serverConfig: JSON.stringify(serverConfigs[env['APP_ENV']] || serverConfig)
          },
          tags: [
            {
              tag: 'title',
              children: env['APP_NAME']
            },
            {
              tag: 'meta',
              attrs: {
                name: 'description',
                content: env['APP_DESCRIPTION']
              }
            },
            {
              tag: 'meta',
              attrs: {
                name: 'version',
                content: env['npm_package_version'] || '0.0.0'
              }
            },
            {
              tag: 'meta',
              attrs: {
                name: 'build-timestamp',
                content: new Date().toString()
              }
            },
            {
              tag: 'base',
              attrs: {
                href: env['APP_BASE_PATH']
              }
            }
          ]
        }
      }),
      // tailwindcss(), // uncomment if you want to use tailwind
    ],
  }
})