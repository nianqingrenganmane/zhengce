<template>
  <div class="city">
    <div class="cityfelx">
      <div
        class="citysp"
        :style="{'margin-top': is == 9 ?50:'' + 'px'}"
        v-for="(items, is) in industry"
        @click="citysChang3(is)"
        :key="items.id"
      >
        <div class="citys" :class="items.ele == true ? 'cityActive' : ''">{{ items.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddUserInterest",
  props: {
    industry: Array
  },
  mounted() {
    console.log(this);
  },
  methods: {
    // 点击选中
    citysChang3(i) {
      this.$emit("citysChang3", { index: i });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.city {
  overflow-y: hidden;
  overflow-y: scroll;
  height: 70vh;
}
.cityfelx {
  display: flex;
  flex-wrap: wrap;
}
.citysp {
  width: calc(100% / 3);
  text-align: center;
  margin-top: 10px;
}
.citysp:nth-child(9n + 1) {
  margin-top: 28px;
}
.citysp:nth-child(9n + 2) {
  margin-top: 28px;
}
.citysp:nth-child(9n + 3) {
  margin-top: 28px;
}
.citys {
  width: 60px;
  height: 25px;
  border-radius: 25px;
  border: 1px solid #666666;
  font-size: 12px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cityActive {
  color: #fff;
  background: #c9a97c;
  border: 1px solid #c9a97c;
}
</style>
