<!--  -->
<template>
  <div class="listitem flex">
    <div class="dot"></div>
    <div class="content">
      <InfoContent @on-click="toDetails" />
      <Remark />
    </div>
  </div>
</template>

<script setup lang="ts">
//生命周期 - 创建完成（访问当前this实例）
import Remark from "@/components/remark/index.vue";
import InfoContent from "@/components/infoContent/index.vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const toDetails = () => {
  router.push({
    path: "/Details/PromptSheet",
    query: {
      source: route.path,
    },
  });
};
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.listitem {
  background-color: #fff;
  margin-top: 10px;
  padding: 10px 5px;
  .dot {
    background-color: red;
    margin: 5px;
  }
  .content {
    flex: 1;
  }
}
</style>
