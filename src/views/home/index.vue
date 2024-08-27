<template>
  <div @click="update">
    {{ count }}
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'

const count = ref(0)

const update = () => {
  count.value++
}

</script>

<style lang="less" scoped>

</style>