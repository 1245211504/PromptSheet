<!--  -->
<template>
  <div class="listItem">
    <div class="status">未接收</div>
    <div class="title ellipsis-2" @click="toDetails">
      莱芜戴花园凤城总部经济港的电梯频频困人，按键缺失。莱芜戴花园凤城总部经济港的电梯频频困人，按键缺失。
    </div>
    <Remark />
  </div>
</template>

<script setup lang="ts">
//生命周期 - 创建完成（访问当前this实例）
import Remark from "@/components/remark/index.vue";

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
.listItem {
  background-color: #ffff;
  padding: 5px 10px;
  margin-top: 10px;
  position: relative;
  .status {
    position: absolute;

    width: 50px;
    line-height: 20px;
    background-color: red;
    color: #fff;
    text-align: center;
    border-radius: 5px;
    font-size: 12px;
    font-weight: 600;
  }
  .title {
    font-size: 18px;
    font-weight: 400;
    line-height: 22px;
    text-indent: 55px;
  }
}
</style>
