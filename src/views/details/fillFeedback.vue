<!--  -->
<template>
  <div class="fillFeedback">
    <van-nav-bar
      title="填写反馈内容"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="box">
      <van-field autofocus v-model="value" placeholder="请输入用户名" ref="checkbox" />
    </div>
    <div class="btnBox">
        <div class="item">
            暂存
        </div>
        <div class="item">
            提交
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

//生命周期 - 创建完成（访问当前this实例）
const value = ref("");
const onClickLeft = () => {};
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.fillFeedback {
  .box {
    height: 50vh;
    background-color: #fff;
    margin: 20px;
    border-radius: 10px;
    overflow-y: auto;
  }
}
</style>
