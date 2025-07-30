import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => {
  return {
    root: '.', // Proje kökü ana klasör (config ve index.html burada)
    build: {
      rollupOptions: {
        input: './index.html', // Ana giriş noktası root'ta index.html
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: chunkInfo => {
            if (chunkInfo.name === 'commonHelpers') {
              return 'commonHelpers.js';
            }
            return '[name].js';
          },
          assetFileNames: assetInfo => {
            if (assetInfo.name && assetInfo.name.endsWith('.html')) {
              return '[name].[ext]';
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
      outDir: 'dist', // Build sonrası dosyalar dist klasöründe olacak
      emptyOutDir: true,
      sourcemap: true,
    },
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    plugins: [
      injectHTML(),
      FullReload(['./**/*.html']),
      SortCss({
        sort: 'mobile-first',
      }),
    ],
  };
});
