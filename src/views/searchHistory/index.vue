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
    <div class="title">历史搜索</div>
    <div class="listBox">
      <div
        class="row flex sb"
        v-for="item in searchHistory.slice().reverse()"
        :key="item.id"
      >
        <van-icon name="clock-o" color="#C5C5C5" />
        <div class="keyword">{{ item.keyword }}</div>
        <van-icon name="cross" color="#C5C5C5" @click="del(item.id)" />
      </div>
    </div>
    <div class="clear" v-if="searchHistory.length > 0" @click="clear">
      清除搜索记录
    </div>
    <van-empty v-else description="暂无搜索历史" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { stringify, parse } from "flatted";
import moment from "moment";
interface item {
  id: number;
  keyword: string;
}

//生命周期 - 创建完成（访问当前this实例）
const keyword = ref<string>("");
const route = useRoute();
const router = useRouter();
const source = route.query.source;
const searchHistory = ref<item[]>([]);

const clear = () => {
  localStorage.removeItem("searchHistory");
  searchHistory.value = [];
};

const del = (id: number) => {
  searchHistory.value = searchHistory.value.filter((item) => item.id !== id);
  localStorage.setItem("searchHistory", stringify(searchHistory.value));
};
const onClickLeft = () => {
  router.push({
    path: source as string,
    query: {
      keyword: route.query.keyword,
    },
  });
};
const onSearch = () => {
  searchHistory.value = searchHistory.value.filter(
    (item) => item.keyword !== keyword.value
  );
  searchHistory.value.push({
    id: moment().valueOf(),
    keyword: keyword.value,
  });
  localStorage.setItem("searchHistory", stringify(searchHistory.value));
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
  if (localStorage.getItem("searchHistory") !== null) {
    let list = parse(localStorage.getItem("searchHistory") || "");
    searchHistory.value = [...list];
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
  .title {
    background-color: #f6f5fa;
    color: #9f9f9f;
    padding: 0 20px;
    line-height: 30px;
    font-size: 12px;
  }
  .listBox {
    background-color: #fff;
    .row {
      padding: 10px 20px;
      align-items: center;
      .keyword {
        flex: 1;
        padding: 0 20px;
      }
    }
  }
  .clear {
    font-size: 12px;
    text-align: center;
    padding: 10px;
    margin-top: 10px;
    color: #999;
  }
}
</style>
