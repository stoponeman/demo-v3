import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { resolve } from 'node:path';
import vue from '@vitejs/plugin-vue'
// 检查Vite插件的中间状态。对于调试和创作插件很有用
import Inspect from 'vite-plugin-inspect'
// 用于解决在书写组件时，总是需要从vue中import引入相同依赖的重复劳动
import AutoImport from 'unplugin-auto-import/vite';
// 按需引入组件
import Components from 'unplugin-vue-components/vite';
// 引入Vant
import { VantResolver } from '@vant/auto-import-resolver';

const pathSrc = resolve(__dirname, "src");
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue", "vue-router", "pinia"],
      resolvers: [VantResolver()],
      dts: resolve(pathSrc, "auto-imports.d.ts"),
    }),
    Components({
      resolvers: [VantResolver()],
      dts: true
    }),
    Inspect()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
