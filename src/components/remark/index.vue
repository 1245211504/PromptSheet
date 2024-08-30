<!-- 备注 -->
<template>
  <div class="remark flex sb">
    <div class="item">编号：【{{ info.promptNum }}】</div>
    <div class="item">
      下发时间：{{ moment(info.publishTime).format("YYYY-MM-DD hh:mm:ss") }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import moment from "moment";

//生命周期 - 创建完成（访问当前this实例）
const { info } = defineProps(["info"]);
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.remark {
  color: #aaaaaa;
  font-size: 12px;
  margin-top: 10px;
}
</style>
