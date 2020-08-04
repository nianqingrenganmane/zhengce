<template>
  <div class="Unscramble">
    <div class="vipLog">
      <div class="vipLog_box">
        <img src="../../assets/viplog.png" alt />
        <div class="vipLog_boxs">
          <div class="vipLog_log">
            <img src="../../assets/vip.png" alt />
          </div>
          <p class="vipLog_title">捕捉时事政策，解读价值发现</p>
          <div class="vipLog_foot">
            <div class="vipLog_foot_left">
              <div class="vipLog_ret"></div>
              <div class="vipLog_tex">有效期至：限时免费</div>
            </div>
            <div class="vipLog_foot_rigt">限时免费</div>
          </div>
        </div>
      </div>
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
    this.logSet("null", "查询", "null");

    // chrome
    document.body.scrollTop = 0;
    // firefox
    document.documentElement.scrollTop = 0;
    // safari
    window.pageYOffset = 0;
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
    },
    // 日志记录
    logSet(cid, op, cont) {
      console.log(location.href);
      this.$axios
        .post("log/set", {
          data: {
            cid: cid,
            uid: this.$store.state.userid,
            pid: this.$route.path,
            lat: this.$store.state.setItude.lat,
            lon: this.$store.state.setItude.lon,
            op: op,
            cont: cont
          }
        })
        .then(res => {
          console.log(res);
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
.vipLog_box {
  position: relative;
}
.vipLog img {
  width: 100%;
  display: block;
}
.vipLog_boxs {
  position: absolute;
  top: 0;
  width: calc(100% - 29px);
  padding: 0 14.5px;
}
.vipLog_log {
  width: 111px;
  height: 17px;
  margin-top: 14.5px;
}
.vipLog_title {
  margin-top: 14.5px;
  font-size: 12px;
  color: #fff;
  opacity: 0.7;
}
.vipLog_foot {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}
.vipLog_ret {
  width: 225px;
  height: 6px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 4px;
}
.vipLog_tex {
  font-size: 12px;
  color: #fff;
  margin-top: 6px;
}
.vipLog_foot_rigt {
  background: #c9a97c;
  border-radius: 25px;
  color: #fff;
  font-size: 13px;
  width: 75px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
