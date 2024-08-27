<!--suppress NpmUsedModulesInstalled -->
<script setup>

import {RouterView, useRoute, useRouter} from 'vue-router'
import {ref, watch} from 'vue'

const active = ref('TodoList')

const router = useRouter()
const route = useRoute()

watch(active, (newVal) => {
  console.log(newVal)
  console.log(route.query)
  router.push({
    path: '/' + newVal,
    query: {
      id: 1
    }
  })

})

</script>

<template>
  <RouterView/>
  <van-tabbar v-model="active">
    <van-tabbar-item icon="home-o" name="TodoList">待办提示单</van-tabbar-item>
    <van-tabbar-item icon="search" name="NearlyWeek">近七日提示单</van-tabbar-item>
  </van-tabbar>
</template>

<style scoped>

</style>
