<template>
  <div>
    <HeaderSearch />
  </div>
</template>
<script lang="ts" setup>
import HeaderSearch from "@/components/headerSearch/index.vue";
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
<style lang="less" scoped></style>
