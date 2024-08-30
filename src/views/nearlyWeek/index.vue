<template>
  <div class="NearlyWeek">
    <HeaderSearch />
    <div class="listBox">
      <van-empty v-if="!loading && count === 0" description="暂无数据" />
      <van-list
        v-else
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getData"
      >
        <ListItem v-for="item in dataList" :itemInfo="item" />
      </van-list>
      <van-back-top bottom="10vh" right="5vw" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import moment from "moment";
import HeaderSearch from "@/components/headerSearch/index.vue";
import ListItem from "./components/listItem/index.vue";
import { onMounted, reactive, ref } from "vue";
import { findAllAPI } from "@/services/api";
import { useRoute } from "vue-router";
const route = useRoute();
const pageNo = ref(0);
const count = ref(0);
const loading = ref(false);
const finished = ref(false);
let dataList = reactive<any[]>([]);

// 获取今天的日期
const today = moment();

// 获取最近七天的日期
const lastSevenDays = Array.from({ length: 7 }, (_, i) =>
  moment(today).subtract(i, "days").format("YYYY-MM-DD")
);

// 显示最近七天的日期
console.log("最近七天的日期：", lastSevenDays);

const getData = async () => {
  loading.value = true;
  pageNo.value++;
  const params = {
    msgStatus: -1,
    keyWord: route.query.keyword,
    timeType: 7,
    msgType: 1,
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
.NearlyWeek {
  height: calc(~"100vh - 50px");
  overflow-y: auto;
  .listBox {
    padding: 20px 0;
  }
}
</style>
