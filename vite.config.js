import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { copy } from 'fs-extra';

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'copy-assets',
      apply: 'build',
      writeBundle() {
        const assetFolders = ['audio', 'download', 'images'];
        assetFolders.forEach(folder => {
          copy(resolve(__dirname, `src/assets/${folder}`), resolve(__dirname, `dist/assets/${folder}`))
              .then(() => console.log(`Folder ${folder} copied successfully!`))
              .catch(error => console.error(`Error copying folder ${folder}:`, error));
        });
      },
    },
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});