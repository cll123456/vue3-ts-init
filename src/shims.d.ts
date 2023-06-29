declare module '*.vue' {
    import { type DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

/**
 * 重写window的interface
 */
interface Window extends Window {
    /**
     * 配置
     */
    commonSettings: {
        /**
         * 当前分辨率的高度
         */
        height: number
        /**
         * 当前分辨率的宽度
         */
        width: number
        /**
         * 分辨率之比，也就是 16： 9
         */
        radio: number
    }

    aircityPlayer: AirCityPlayerTypes
}
