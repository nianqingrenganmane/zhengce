<template>
  <div class="about">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :offset="500"
      @load="onLoad"
    >
      <div class="sa">111</div>
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false
    };
  },
  methods: {
    onLoad() {
      console.log(1);
      this.loading = false;
      console.log(this.loading);
    }
  }
};
</script>
<style scoped>
.sa {
  min-height: 110vh;
}
</style>
