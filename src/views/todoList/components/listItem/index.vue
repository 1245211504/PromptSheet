<!--  -->
<template>
  <div class="listitem flex">
    <div class="dot" :style="{ backgroundColor: getColor() }"></div>
    <div class="content">
      <InfoContent
        @on-click="toDetails"
        :info="{
          msgTitle: itemInfo.msgTitle,
          msgAbstract: itemInfo.msgAbstract,
          msgContentUrl: itemInfo.msgContentUrl,
        }"
      />
      <Remark
        :info="{
          promptNum: itemInfo.promptNum,
          publishTime: itemInfo.publishTime,
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
//生命周期 - 创建完成（访问当前this实例）
import legend from "@/assets/json/legend.json";
import Remark from "@/components/remark/index.vue";
import InfoContent from "@/components/infoContent/index.vue";
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";
const { itemInfo } = defineProps(["itemInfo"]);
const router = useRouter();
const route = useRoute();
const toDetails = () => {
  router.push({
    path: "/Details/PromptSheet",
    query: {
      source: route.path,
      id:itemInfo.promptMsgId
    },
  });
};

const getColor = () => {
  return legend.find((i) => i.id === itemInfo.promptStatus)?.color;
};

onMounted(() => {});
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.listitem {
  background-color: #fff;
  margin-top: 10px;
  padding: 10px 5px;
  .dot {
    margin: 5px;
  }
  .content {
    flex: 1;
  }
}
</style>
