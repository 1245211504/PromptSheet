<!--  -->
<template>
  <div class="listItem">
    <div class="status" :style="{ backgroundColor: getColor() }">
      {{ getText() }}
    </div>
    <div class="title ellipsis-2" @click="toDetails">
      <van-highlight
        :keywords="[route.query.keyword]"
        :source-string="itemInfo.msgTitle || ''"
        highlight-class="highlight0"
      />
    </div>
    <Remark
      :info="{
        promptNum: itemInfo.promptNum,
        publishTime: itemInfo.publishTime,
      }"
    />
  </div>
</template>

<script setup lang="ts">
//生命周期 - 创建完成（访问当前this实例）
import Remark from "@/components/remark/index.vue";
import legend from "@/assets/json/legend.json";

import { useRoute, useRouter } from "vue-router";
const { itemInfo } = defineProps(["itemInfo"]);
const router = useRouter();
const route = useRoute();
const toDetails = () => {
  router.push({
    path: "/Details/PromptSheet",
    query: {
      source: route.path,
      id: itemInfo.promptMsgId,
    },
  });
};

const getColor = () => {
  return legend.find((i) => i.id === itemInfo.promptStatus)?.color;
};

const getText = () => {
  return legend.find((i) => i.id === itemInfo.promptStatus)?.name;
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
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;
    text-indent: 55px;
  }
}
</style>
