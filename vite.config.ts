import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import presetAttributify from '@unocss/preset-attributify'
import presetUno from '@unocss/preset-uno'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Pages from 'vite-plugin-pages'
import presetRemToPx from '@unocss/preset-rem-to-px'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        UnoCSS({ presets: [presetUno(), presetAttributify(), presetRemToPx()] }),
        AutoImport({
            include: [/\.[jt]sx?$/, /\.vue/],
            imports: ['vue', 'vue-router'],
            dirs: ['./src/utils/**'],
            dts: './src/auto-imports.d.ts',
            presetOverriding: true,
            vueTemplate: true
        }),
        Components({
            extensions: ['vue', 'svg'],
            directoryAsNamespace: true,
            dts: './src/comontents-imports.d.ts',
            globalNamespaces: ['global'],
            include: [/\.vue$/, /\.vue\?vue/]
        }),
        Pages({
            extensions: ['vue'],
            dirs: 'src/views'
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
        dedupe: ['vue']
    }
})
