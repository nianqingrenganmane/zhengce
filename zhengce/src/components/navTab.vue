<template>
  <div class="navTab">
    <div class="tab">
      <van-tabs @click="onChange" :sticky="true">
        <van-tab
          :title-style="item.name?item.name.length > 2?'flex-basis: 19%;':'flex-basis: 15%;':'flex-basis: 19%'"
          :disabled="!item.name"
          :title="item.name"
          v-for="(item,index) in tabLists"
          :key="index"
        ></van-tab>
      </van-tabs>
    </div>
    <router-link to="/search" v-if="type==1">
      <div class="search">
        <img src="../assets/icon_search.png" />
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "navTab",
  data() {
    return {
      length: " ",
      lengths: " "
    };
  },
  props: {
    tabLists: Array,
    type: Number
  },
  mounted() {
    console.log(this);
  },
  methods: {
    onChange(event) {
      this.$emit("onchange", event);
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search {
  position: absolute;
  width: 60px;
  height: 44px;
  background: #fff;
  right: 0;
  top: 0;
  z-index: 9999;
  text-align: center;
  border-bottom: 1px solid #e4e4e4;
  box-shadow: -6px -4px 10px -1px #eee;
}
.search img {
  width: 24px;
  height: 24px;
  margin-top: 10px;
}
</style>
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
