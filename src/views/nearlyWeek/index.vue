<template>
  <div class="NearlyWeek">
    <HeaderSearch />
    <div class="listBox">
      <ListItem />
    </div>
  </div>
</template>

<script lang="ts" setup>
import HeaderSearch from "@/components/headerSearch/index.vue";
import ListItem from "./components/listItem/index.vue";
import { onMounted } from "vue";
import { findAllAPI } from "@/services/api";
import { useRoute } from "vue-router";
const route = useRoute();
const getData = async () => {
  const params = {
    timeType: 0,
    msgStatus: -1,
    keyWord: route.query.keyword,
  };
  const response = await findAllAPI(params);
  console.log(response);
};
onMounted(() => {
  getData();
});
</script>
<style lang="less" scoped>
.NearlyWeek {
  .listBox {
    padding: 20px 0;
  }
}
</style>
