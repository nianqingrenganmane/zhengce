<template>
  <div class="city">
    <div class="cityfelx">
      <div class="citysp" v-for="(items, is) in city1" @click="citysChang1(is)" :key="items.id">
        <div class="citys" :class="items.ele == true ? 'cityActive' : ''">{{ items.name }}</div>
      </div>
    </div>
    <div class="cityfelx">
      <div class="citysp" v-for="(items, is) in city2" @click="citysChang2(is)" :key="items.id">
        <div class="citys" :class="items.ele == true ? 'cityActive' : ''">{{ items.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "city",
  props: {
    city1: Array,
    city2: Array
  },
  mounted() {
    console.log(this);
  },
  methods: {
    // 点击选中
    citysChang1(i) {
      this.$emit("citysChang1", { index: i });
    },
    // 点击选中
    citysChang2(i) {
      this.$emit("citysChang2", { index: i });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cityfelx {
  display: flex;
  flex-wrap: wrap;
  margin-top: 22px;
}
.citysp {
  width: calc(100% / 3);
  text-align: center;
  margin-top: 10px;
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
