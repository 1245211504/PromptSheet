<!--  -->
<template>
  <div class="infoContent">
    <div class="title ellipsis-2" @click="titleClick">
      {{ info.msgTitle }}
    </div>
    <div class="abstract">
      {{ info.msgAbstract }}
    </div>
    <div class="url ellipsis-2">
      {{ info.msgContentUrl }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

interface Info {
  msgTitle: string;
  msgAbstract: string;
  msgContentUrl: string;
}

const emit = defineEmits(["on-click"]);
const { info: Info } = defineProps(["info"]);

const titleClick = () => {
  emit("on-click");
};
onMounted(() => {
});
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.infoContent {
  font-size: 14px;
  text-align: left;
  .title {
    line-height: 18px;
    font-size: 14px;
    font-weight: 600;
  }
  .abstract {
    line-height: 18px;
    margin: 10px 0;
  }
  .url {
    text-decoration: underline;
    color: #1873d7;
    word-break: break-all;
  }
}
</style>
