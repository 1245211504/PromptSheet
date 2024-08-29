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
      <div class="id">（编号：{{ info.promptNum }}）</div>
      <div class="table">
        <div class="row">
          <div class="item half">
            <div class="label">发送单位</div>
            <div class="value">{{ info.sendOrgName }}</div>
          </div>
          <div class="item half">
            <div class="label">发送时间</div>
            <div class="value">
              {{ moment(info.sendTime).format("YYYY-MM-DD hh:mm:ss") }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="item half">
            <div class="label">接收人</div>
            <div class="value">{{ info.sendUserName }}</div>
          </div>
          <div class="item half">
            <div class="label">联系电话</div>
            <div class="value">{{ info.sendUserPhone }}</div>
          </div>
        </div>
        <div class="row">
          <div class="item">
            <div class="label">舆情线索</div>
            <div class="value">
              <InfoContent
                :info="{
                  msgTitle: info.msgTitle,
                  msgAbstract: info.msgAbstract,
                  msgContentUrl: info.msgContentUrl,
                }"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="item">
            <div class="label">舆情处 <br />置建议</div>
            <div class="value">{{ info.suggest }}</div>
          </div>
        </div>
        <div class="row">
          <div class="item">
            <div class="label">情况反馈</div>
            <div class="value w-284">
              <div class="btn">
                {{ info.backContent }}
                <van-icon name="records-o" />
                填写反馈内容
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="remark">
        <div class="item">单位：{{ info.promptOrganName }}</div>
        <div class="item">联系人：{{ info.promptUserName }}</div>
        <div class="item">电话：{{ info.sendPhone }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//生命周期 - 创建完成（访问当前this实例）
import moment from "moment";
import InfoContent from "@/components/infoContent/index.vue";
import { onBeforeMount, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { findById } from "@/services/api";
const info: any = ref({});
const route = useRoute();
console.log(route.query);

onBeforeMount(async () => {
  const response = await findById({
    promptMsgId: route.query.id,
  });
  console.log(response);
  // Object.assign(info, response.data);
  info.value = response.data;
});

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
    border-top: 1px solid #aaa;
    border-left: 1px solid #aaa;
    margin: 5px;
    font-size: 14px;
    .row {
      display: flex;
    }
    .item {
      width: 100%;
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
        width: 25%;
        text-align: center;
        font-weight: 600;
      }
      .value {
        width: 75%;
        text-align: center;
        word-break: break-all;
        /deep/.infoContent {
          padding: 10px;
        }
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
    .half {
      width: 50%;
      .label {
        width: 50%;
      }
      .value {
        width: 50%;
      }
    }
  }
  .remark {
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
