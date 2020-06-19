<template>
  <div class="Unscramble">
    <div class="vipLog">
      <img src="../../assets/viplog.png" alt />
    </div>
    <van-sticky>
      <navTab :tabLists="tabLists" @onchange="onchange"></navTab>
    </van-sticky>
    <div v-for="(item,index) in tabLists" :key="index">
      <div v-if="tabIDS == item.id" class="mains">
        <keep-alive include="unscramble">
          <HomePage :tabLists="tabLists" :type="1" :tabId="item.id"></HomePage>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
import HomePage from "../HomePage/HomePage";
import navTab from "@/components/navTab.vue";
export default {
  name: "Unscramble",
  data() {
    return {
      value: "",
      tabLists: [],
      tabIDS: ""
    };
  },
  components: {
    HomePage,
    navTab
  },
  mounted() {
    this.tabList();
  },
  methods: {
    // 获取tab下标
    onchange(e) {
      this.tabIDS = this.tabLists[e].id;
    },
    //Tab列表
    tabList() {
      this.$axios
        .post("ent/listView", {
          code: "label_place",
          data: {
            page_index: 1,
            page_size: 100,
            sorters: [
              {
                field: "id",
                sort: "desc"
              }
            ],
            type: "2"
          }
        })
        .then(res => {
          res.data.data.list.splice(0, 0, {
            name: "全部",
            id: 0
          });
          this.tabLists = res.data.data.list;
        });
    }
  }
};
</script>
<style scoped>
.vipLog {
  padding: 0 15px;
  margin-top: 15px;
}
.vipLog img {
  width: 100%;
  display: block;
}
.mains {
  padding: 0 15px;
}
</style>
