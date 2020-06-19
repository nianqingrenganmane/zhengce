<template>
  <div class="navTab">
    <div class="tab">
      <van-tabs @click="onChange" :sticky="true">
        <van-tab
          :disabled="!item.name"
          :title="item.name"
          v-for="(item,index) in tabLists"
          :key="index"
        ></van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "navTab",
  props: {
    tabLists: Array
  },
  methods: {
    onChange(event) {
      this.$emit("onchange", event);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
<style>
.navTab .van-tab--active {
  color: #c9a97c;
}
.navTab .van-tabs__line {
  background-color: #c9a97c;
}
.navTab .van-tabs--line .van-tabs__wrap {
  height: 44px;
  border-bottom: 1px solid #e4e4e4;
}
.navTab [class*="van-hairline"]::after {
  border: none;
}
</style>
