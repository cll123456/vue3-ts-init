<template>
    <div class="absolute left-50% top-50% duration-100 origin-top-left pointer-events-auto" :style="style">
        <slot />
    </div>
</template>
<script lang="ts" setup>
const props = defineProps({
    /**
     * 当前的宽度， 默认是1920
     */
    width: {
        type: Number,
        required: false,
        default: window.innerWidth
    },
    /**
     * 当前的高度， 默认是 1080
     */
    height: {
        type: Number,
        required: false,
        default: window.innerHeight
    }
})

/**
 * 获取样式
 */
const style = ref({
    width: props.width + 'px',
    height: props.height + 'px',
    transform: 'scale(1) translate(-50%, -50%)'
})

/**
 * 获取缩放比例
 */
const getScale = () => {
    console.info('\x1B[35m%s\x1B[39m', '分辨率为:', window.screen.width, window.screen.height)
    const w = window.innerWidth / props.width
    const h = window.innerHeight / props.height
    return w < h ? w : h
}

/**
 * 设置宽高
 */
const setScale = () => {
    style.value.transform = 'scale(' + getScale() + ') translate(-50%, -50%)'
}

onMounted(() => {
    setScale()
    window.onresize = debounce(setScale, 500, true)
    window.addEventListener('resize', debounce(setScale, 500, true))
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', setScale)
})
</script>

<style scoped></style>
