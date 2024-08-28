<template>
  <div class="headerSearch flex">
    <div class="title">舆情提示单</div>
    <div class="search flex">
      <div v-if="keyword" class="keyword" @click="toSearchHistory">
        {{ keyword }}
      </div>
      <div v-else class="placeholder" @click="toSearchHistory">
        请输入关键词
      </div>
      <van-icon name="search" @click="search" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const keyword = ref("");
const router = useRouter();
const route = useRoute();

const emit = defineEmits(["search"]);

const search = () => {
  emit("search");
};

const toSearchHistory = () => {
  router.push({
    path: "/SearchHistory",
    query: {
      source: route.path,
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
.headerSearch {
  background-color: #63adf8;
  height: 80px;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;

  .title {
    width: 100%;
    color: #fff;
    font-weight: 600;
    line-height: 80px;
    font-size: 24px;
    text-align: center;
  }

  .search {
    background-color: #fff;
    position: absolute;
    bottom: -20px;
    height: 40px;
    width: 300px;
    border-radius: 20px;
    padding: 0 20px;
    justify-content: space-between;
    align-items: center;
    .placeholder,
    .keyword {
      flex: 1;
    }

    .van-icon-search {
      font-size: 30px;
      color: #999;
    }

    .placeholder {
      line-height: 40px;
      color: #999;
    }
  }
}
</style>
