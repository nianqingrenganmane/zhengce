<template>
  <div class="hello">
    <div class="buton" @click="next">{{ msg }}</div>
  </div>
</template>

<script>
export default {
  name: "nextButton",
  props: {
    msg: String
  },
  methods: {
    next() {
      this.$emit("next");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.buton {
  background: #c9a97c;
  border-radius: 50px;
  border-radius: 50px;
  width: 330px;
  height: 50px;
  color: #fff;
  font-size: 18px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.buton:active {
  background: #8c7556;
}
</style>
