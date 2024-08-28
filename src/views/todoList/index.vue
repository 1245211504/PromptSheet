<template>
  <div>
    <HeaderSearch />
    <Legend :num="18" />
    <div class="listbox">
      <ListItem />
    </div>
  </div>
</template>
<script lang="ts" setup>
import HeaderSearch from "@/components/headerSearch/index.vue";
import Legend from "./components/legend/index.vue";
import ListItem from "./components/listItem/index.vue";
import { onMounted } from "vue";
import { findAllAPI } from "@/services/api";
import { useRoute } from "vue-router";
const route = useRoute();
const getData = async () => {
  const params = {
    timeType: 0,
    msgStatus: -1,
    msgType: 1,
    keyWord: route.query.keyword,
    pageNum: 1,
    pageSize: 20,
    organId: 241,
    orderType: "desc",
    orderBy: "send_time",
    startDate: "2024-01-01 00:00:00",
    endDate: "2024-08-28 23:59:59",
  };
  const response = await findAllAPI(params);
  console.log(response);
};
onMounted(() => {
  getData();
});
</script>
<style lang="less" scoped></style>
