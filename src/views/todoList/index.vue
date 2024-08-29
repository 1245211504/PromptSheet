<template>
  <div class="todoList">
    <HeaderSearch @search="getData" />
    <Legend :num="count" />
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getData"
    >
      <ListItem v-for="item in dataList" :itemInfo="item" />
    </van-list>
    <van-back-top bottom="10vh" right="5vw"/>
  </div>
</template>
<script lang="ts" setup>
import HeaderSearch from "@/components/headerSearch/index.vue";
import Legend from "./components/legend/index.vue";
import ListItem from "./components/listItem/index.vue";
import { onMounted, reactive, ref } from "vue";
import { findAllAPI } from "@/services/api";
import { useRoute } from "vue-router";
const route = useRoute();
const count = ref(0);
const loading = ref(false);
const finished = ref(false);
const pageNo = ref(0);
let dataList = reactive<any[]>([]);
const getData = async () => {
  loading.value = true;
  pageNo.value++;
  const params = {
    timeType: 0,
    msgStatus: "2,3,5",
    msgType: 1,
    keyWord: route.query.keyword,
    pageNum: pageNo.value,
    pageSize: 20,
    organId: 47,
    orderType: "desc",
    orderBy: "send_time",
  };
  const response = await findAllAPI(params);

  let data = response.data;
  count.value = data.count;

  dataList.push(...data.data);
  loading.value = false;
  if (dataList.length >= count.value) {
    finished.value = true;
  }
};
onMounted(() => {
  getData();
});
</script>
<style lang="less" scoped>
.todoList{
  height: calc(~'100vh - 50px');
  overflow-y: auto;
}</style>
