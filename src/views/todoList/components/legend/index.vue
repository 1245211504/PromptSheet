<template>
  <div class="legend flex">
    <div class="flex label">
      <SvgIcon name="bell" width="24px" height="24px" />
      <span>
        待处理：<span class="num">{{ props.num }}</span
        >个
      </span>
    </div>
    <div class="species flex">
      <div class="item flex" v-for="item in legend">
        <div class="dot" :style="{ backgroundColor: item.color }"></div>
        <div class="name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import legend from "@/assets/json/legend.json";
const props = defineProps({
  num: {
    type: Number,
    default: 0,
  },
});
</script>

<style lang="less" scoped>
.legend {
  margin-top: 30px;
  padding: 10px;
  background-color: #fff;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  .label {
    align-items: center;
    .num {
      font-weight: 600;
    }
  }
  .species {
    .item {
      align-items: center;
    }
  }
}
</style>
