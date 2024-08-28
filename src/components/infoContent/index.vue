<!--  -->
<template>
  <div class="infoContent">
    <div class="title ellipsis-2" @click="titleClick">
      莱芜戴花园凤城总部经济港的电梯频频困人，按键缺失莱芜戴花园凤城总部经济港的电梯频频困人，按键缺失
    </div>
    <div class="abstract">
      莱芜在线论坛用户“红石夏雨荷”称，戴花园凤城总部经济港的垃圾电梯，没人管吗？听工作人员说动不动就把人困里面，现在按键都没了。
    </div>
    <div class="url ellipsis-2">
      https://www.toutiao.com/video/7379082308392387083/?channel=&source=search_tab
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["on-click"]);

//生命周期 - 创建完成（访问当前this实例）
const titleClick = () => {
  emit("on-click");
};
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
