<!-- 提示单详情 -->
<template>
  <div class="promptSheet">
    <van-nav-bar
      title="提示单详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="box">
      <div class="title">舆情提示单</div>
      <div class="id">（编号：2024-0156）</div>
      <div class="table">
        <div class="item">
          <div class="label">发送单位</div>
          <div class="value">拓尔思</div>
        </div>
        <div class="item">
          <div class="label">发送事件</div>
          <div class="value">2024-07-24 20:54:56</div>
        </div>
        <div class="item">
          <div class="label">接收人</div>
          <div class="value">测试001</div>
        </div>
        <div class="item">
          <div class="label">联系电话</div>
          <div class="value">18888888888</div>
        </div>
        <div class="item">
          <div class="label">舆情线索</div>
          <div class="value w-284">
            <InfoContent />
          </div>
        </div>
        <div class="item">
          <div class="label">舆情处 <br />置建议</div>
          <div class="value w-284">建议关注舆情，及时核实反馈。</div>
        </div>
        <div class="item">
          <div class="label">情况反馈</div>
          <div class="value w-284">
            <div class="btn">
              <van-icon name="records-o" />
              填写反馈内容
            </div>
          </div>
        </div>
      </div>
      <div class="remark">
        <div class="item">单位：市委网信办-网络舆情与应急管理处</div>
        <div class="item">联系人：你好</div>
        <div class="item">电话：188888888888</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//生命周期 - 创建完成（访问当前this实例）
import InfoContent from "@/components/infoContent/index.vue";

const onClickLeft = () => {
  history.back();
};
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.promptSheet {
  .box {
    height: calc(~"100vh - 105px");
    overflow-y: auto;
    // background-color: #63adf8;
  }
  .title {
    font-weight: 600;
    text-align: center;
    font-size: 18px;
    line-height: 30px;
  }
  .id {
    text-align: center;
  }
  .table {
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
    border-top: 1px solid #aaa;
    border-left: 1px solid #aaa;
    margin: 5px;
    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 50px;
      & > div {
        border-bottom: 1px solid #aaa;
        border-right: 1px solid #aaa;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .label {
        width: 80px;
        text-align: center;
        font-weight: 600;
      }
      .value {
        width: 102px;
        text-align: center;
        padding: 5px;
      }
      .w-284 {
        width: 284px;
      }
      .Clue {
        height: 400px;
      }
      .content {
        width: 100%;
      }
      .btn {
        background-color: #e6f7ff;
        border: 1px solid #228be2;
        border-radius: 5px;
        padding: 0 5px;
        font-size: 14px;
        line-height: 26px;
        .van-icon {
          color: #228be2;
          font-size: 16px;
        }
      }
    }
  }
  .remark{
    padding: 10px;
    font-size: 14px;
  }
}
.van-nav-bar {
  background-color: #63adf8;
  padding: 5px 0;
  :deep(.van-icon),
  :deep(.van-nav-bar__title),
  :deep(.van-nav-bar__text) {
    color: #fff;
  }
  :deep(.van-icon-search) {
    font-size: 24px;
  }
}
</style>
