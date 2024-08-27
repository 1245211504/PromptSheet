<!--  -->
<template>
  <div class="searchHistory">
    <van-nav-bar
      title="标题"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onSearch"
    >
      <template #title>
        <div class="search flex">
          <van-field v-model="keyword" placeholder="请输入用户名" />
        </div>
      </template>
      <template #right>
        <van-icon name="search" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

//生命周期 - 创建完成（访问当前this实例）
const keyword = ref<string>("");
const route = useRoute();
const router = useRouter();
const source = route.query.source;
const onClickLeft = () => {
  router.push({
    path: source as string,
    query: {
      keyword: route.query.keyword,
    },
  });
};
const onSearch = () => {
  router.push({
    path: source as string,
    query: {
      keyword: keyword.value,
    },
  });
};
onMounted(() => {
  if (route.query.keyword) {
    keyword.value = route.query.keyword as string;
  }
});
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.searchHistory {
  .van-nav-bar {
    background-color: #63adf8;
    padding: 5px 0;
    :deep(.van-icon),
    :deep(.van-nav-bar__text) {
      color: #fff;
    }
    :deep(.van-icon-search) {
      font-size: 24px;
    }
  }
  .search {
    background-color: #fff;
    height: 40px;
    width: 200px;
    border-radius: 20px;
    padding: 0 10px;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
  }
}
</style>
