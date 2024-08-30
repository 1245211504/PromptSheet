<!--  -->
<template>
  <div class="fillFeedback">
    <van-nav-bar
      title="填写反馈内容"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="box" @click="onFocus">
      <van-field
        autofocus
        v-model="value"
        placeholder="请输入用户名"
        ref="input"
        autosize
        type="textarea"
      />
    </div>
    <div class="btnBox">
      <van-button type="primary" color="#aaa" @click="onStorage"
        >暂存</van-button
      >
      <van-button
        :loading="submitLoading"
        type="primary"
        color="#228be2"
        @click="onSubmit"
        loading-type="spinner"
        loading-text="稍等..."
        >提交</van-button
      >
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { stringify, parse } from 'flatted';

import { updateMsgStatus } from "@/services/api";
import { jsonToFormData } from "@/utils/formDataUtils"; // 导入公共方法
//生命周期 - 创建完成（访问当前this实例）
const value = ref("");
const input = ref(null);
const submitLoading = ref(false);

onBeforeMount(() => {
  let feedback = localStorage.getItem("feedback");
  if (feedback) {
    value.value = feedback;
  }
});

// 提交
const onSubmit = () => {
  showConfirmDialog({
    title: "标题",
    message: "反馈内容提交后无法撤回，确定要提交吗？",
  }).then(async () => {
    submitLoading.value = true;
    let details = parse(localStorage.getItem("promptSheetDetails"));
    let data = {
      msgNum: details.promptNum,
      type: 4,
      content: value.value,
    };
    const response = await updateMsgStatus(jsonToFormData(data));
    if (response.status === 0) {
      localStorage.removeItem("feedback");
      history.back();
    } else {
      showDialog({
        message: response.message,
        theme: "round-button",
      });
      submitLoading.value = false;
    }
  });
};

//暂存
const onStorage = () => {
  localStorage.setItem("feedback", value.value);
  history.back();
};

//聚焦输入框
const onFocus = () => {
  input.value.focus(); // 聚焦到 input1
};

const onClickLeft = () => {
  history.back();
};
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
  .btnBox {
    display: flex;
    justify-content: center;
    .van-button {
      margin: 0 10px;
      text-align: center;
      color: #fff;
    }
  }
}
</style>
