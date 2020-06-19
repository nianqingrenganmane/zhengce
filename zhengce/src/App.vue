<template>
  <div id="app">
    <keep-alive :include="cashViews">
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 要缓存的组件
      cashViews: ["Home", "Search", "Unscramble", "Collection"]
    };
  }
};
</script>    
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2f2f2f;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
