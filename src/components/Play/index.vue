<template>
    <div id="player" class="z--1 w-100% h-100% absolute"></div>
</template>

<script lang="ts" setup>
// import OnReady from '@/components/aircityutils/onReady'
// import OnEvent from '@/components/aircityutils/Event'
// import { useAirCityStore } from '@/stores/aircity'
// import { useToolsStore } from '@/stores/tools'
// import { useDialogStore } from '@/stores/dialog'
import { AirCityAPIOptionsTypes, AirCityPlayerOptionsTypes, AirCityPlayerTypes, ApiParentInterfaceTypes } from 'types__g'
import { Ref } from 'vue'

// const AirCitystore = useAirCityStore()
let aircityPlayer: Ref<AirCityPlayerTypes | undefined> = ref()
let aircityApi: Ref<ApiParentInterfaceTypes | undefined> = ref()
const loadingText = ref('系统正在加载......')
const loading = ref(true)
const reTimer = ref()
// const tools = useToolsStore()
// const useDialog = useDialogStore()
const initInterface = (iscloud: boolean) => {
    let log = (e: any) => {
        console.log(e, 'log')
    }
    //onReady
    let _onReady = () => {
        // OnReady()
        loading.value = false
    }
    //onEvent
    let _onEvent = (e: any) => {
        console.log(e, 'event----')

        // onEvent(e)
    }

    let _onClose = (e: any) => {
        console.log(e, 'e_onClose')

        //如果没有指定工程文件，则加上pid参数，pid=-1让服务器随便指定一个工程文件
        //如果想访问指定的工程文件，则明确指定pid, 例如pid=3
        if (e && e.code == 4009) {
            if (location.href.indexOf('?') == -1) location.href += '?pid=-1'
            else location.href += '&pid=-1'
        }
        const code_need_reconcent = [1006, 1008, 1013, 4e3, 4001, 4002, 4003, 4004, 4005, 4006, 4007, 4008, 4009, 4100, 4101, 4102, 4103, 4105, 4107]
        if (e && code_need_reconcent.includes(e.code)) {
            loading.value = true
            loadingText.value = e.reason || '连接已断开，正在重新连接......'
            // AirCitystore.SetIsOnReady(false)
            reTimer.value && clearInterval(reTimer.value)
            let i = 5
            reTimer.value = setInterval(() => {
                loadingText.value = `${e.reason},${i}s后重新连接` || `连接已断开,${i}s后重新连接`
                if (i == 0) {
                    reTimer.value && clearInterval(reTimer.value)
                    loadingText.value = `系统正在加载......`

                    reConnect()
                }
                i--
            }, 1000)
        } else {
            loadingText.value = `${e.reason}`
        }
    }
    // _onApiVersion
    let _onApiVersion = () => {
        console.log('_onApiVersion')
    }
    // onloaded
    let _onloaded = () => {
        onResize()
    }
    //AirCityAPI初始化选项
    let apiOptions: AirCityAPIOptionsTypes = {
        onReady: _onReady,
        onApiVersion: _onApiVersion,
        onEvent: e => {
            onEventExe(e)
        },
        onLog: e => {
            console.log(e)
        },
        useColorLog: false //仅用于SDK测试页面，二次开发请设置为false
    }
    if (iscloud) {
        //AirCityPlayer
        let options: AirCityPlayerOptionsTypes = { domId: 'player' }
        if (document.getElementById('player')) {
            //需要显示视频流
            options = {
                pid: null,
                domId: 'player',
                apiOptions: apiOptions,
                keyEventReceiver: 'video', //三维键盘交互事件接收者，可选的值：document / video / none
                ui: {
                    startupInfo: true, //默认值为true，初始化过程中是否显示详细信息（如果不需要，直接去掉此属性即可）
                    statusIndicator: true, //默认值为true，左上角闪烁的状态指示灯，可以从不同的颜色看出当前的状态
                    statusButton: false, //默认值为false，是否在左下角显示信息按钮（如果不需要，直接去掉此属性即可）
                    fullscreenButton: false, //默认值为false，是否在右下角显示全屏按钮（如果不需要，直接去掉此属性即可）
                    homeButton: false, //默认值为false，是否在左下角显示“回到初始位置”按钮（如果不需要，直接去掉此属性即可）
                    taskListBar: 1 //默认值为1，是否在下方显示“任务队列（API调用队列）”信息（0: 永不显示；1: 执行比较耗时的操作时显示；2: 一直显示）
                },
                onclose: _onClose,
                onloaded: _onloaded
            }
        } else {
            options = {
                pid: null,
                apiOptions: apiOptions
            }
        }
        // ;(options as any).actionEventHander = {
        //     // mouseKeyListener: {
        //     onMouseEnter: (e: any) => {
        //         console.log(e, '----------onMouseEnter')
        //     },
        //     onMouseLeave: (e: any) => {
        //         console.log(e, '----------onMouseLeave')
        //     },
        //     onMouseMove: (e: any) => {
        //         console.log(e, '----------onMouseMove')
        //     },
        //     onMouseDown: (e: any) => {
        //         console.log(e, '----------onMouseDown')
        //     },
        //     onMouseUp: (e: any) => {
        //         console.log(e, '----------onMouseUp')
        //     },
        //     onKeyDown: (e: any) => {
        //         console.log(e, '----------onKeyDown')
        //     },
        //     onKeyUp: (e: any) => {
        //         console.log(e, '----------onKeyUp')
        //     },
        //     onKeyPress: (e: any) => {
        //         console.log(e, '----------onKeyPress')
        //         // }
        //     }
        // }

        // eslint-disable-next-line @typescript-eslint/no-extra-semi
        // ;(options as any).actionEventHander = {
        //     onmousedown: (e: any) => {
        //         console.log(`[MouseDn] button: ${e.button}, pos: ${e.x}, ${e.y}`)
        //     }
        // }

        const Ip = '192.168.5.217:8088'
        aircityPlayer.value = new window.AirCityPlayer(Ip, options)
        window.aircityPlayer = aircityPlayer.value
        // AirCitystore.SetAirCityPlayer(aircityPlayer.value)
        aircityApi.value = aircityPlayer.value.getAPI()
        // AirCitystore.SetAirCityApi(aircityApi.value)

        let res = document.getElementById('player') || null
        let pre = res ? res.getElementsByTagName('pre') : null
        let i = res ? res.getElementsByTagName('i') : null
        if (pre) {
            pre[0].style.left = '47%'
            pre[0].style.top = '15%'
        }
        if (i) {
            i[0].style.left = '47%'
            i[0].style.top = '14%'
        }
    }
}
const onResize = () => {
    console.log(aircityPlayer, 'onResize')
    aircityPlayer.value?.resize && aircityPlayer.value.resize()
}
const beforeunloadHandler = () => {
    aircityApi.value?.reset()
}
const reConnect = () => {
    initInterface(true)
}
onMounted(async () => {
    initInterface(true)
})

onUnmounted(() => {
    aircityPlayer.value && aircityPlayer.value.destroy()
    aircityApi.value && aircityApi.value.destroy()
    window.removeEventListener('resize', onResize)
    window.removeEventListener('beforeunload', beforeunloadHandler)
})
</script>
<style scoped></style>
