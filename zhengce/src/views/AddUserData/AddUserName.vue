<template>
  <div class="addname">
    <div class="addnames">{{ msg }}</div>
  </div>
</template>

<script>
export default {
  name: "addname",
  props: {
    msg: String
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.addnames {
  font-size: 15px;
  color: #2f2f2f;
  line-height: 32px;
  height: 32px;
  margin-top: 8px;
}
</style>
