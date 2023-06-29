<script setup lang="ts">
const width = ref(window.commonSettings.width)
const height = ref(window.commonSettings.height)
</script> 

<template>
    <ScreenAdpter :width="width" :height="height">
        <Play></Play>
        <div text-1>4324324</div>
        <RouterView></RouterView>
    </ScreenAdpter>
</template>

<style scoped></style>
