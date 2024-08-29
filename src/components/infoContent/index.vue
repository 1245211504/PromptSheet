<!--  -->
<template>
  <div class="infoContent">
    <div class="title ellipsis-2" @click="titleClick">
      <van-highlight
        :keywords="[route.query.keyword]"
        :source-string="info.msgTitle || ''"
        highlight-class="highlight0"
      />
    </div>
    <div class="abstract">
      <van-highlight
        :keywords="[route.query.keyword]"
        :source-string="info.msgAbstract || ''"
        highlight-class="highlight0"
      />
    </div>
    <div class="url ellipsis-2">
      {{ info.msgContentUrl }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
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
onMounted(() => {});
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.infoContent {
  font-size: 14px;
  text-align: left;
  & > div {
    word-break: break-all;
  }
  .title {
    line-height: 18px;
    font-size: 14px;
    font-weight: bold !important;
  }
  .abstract {
    line-height: 18px;
    margin: 10px 0;
  }
  .url {
    text-decoration: underline;
    color: #1873d7;
  }
}
</style>
