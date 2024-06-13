// loadEnv  Vite 默认是不加载 .env 文件的，使用 Vite 导出的 loadEnv 函数来加载指定的 .env 文件。
import { defineConfig, ConfigEnv, loadEnv, UserConfig } from 'vite'

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


// 环境
import { wrapperEnv } from "./build/utils"
import { createProxy } from "./build/vite/proxy";


const pathSrc = resolve(__dirname, "src");
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());
  const { VITE_PROXY, VITE_PORT } = wrapperEnv(env);
  console.log(VITE_PROXY, VITE_PORT, ' VITE_PROXY, VITE_PORT');

  return {
    plugins: [
      vue(),
      AutoImport({
        imports: ["vue", "vue-router", "pinia"],
        resolvers: [VantResolver()],
        dts: resolve(pathSrc, "auto-imports.d.ts"),
      }),
      Components({
        resolvers: [VantResolver()],
        dts: resolve(pathSrc, "components.d.ts"),
      }),
      Inspect()
    ],
    resolve: {
      alias: {
        "@": pathSrc,
      }
    },
    server: {
      host: "0.0.0.0",
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY),
    }
  }
})
