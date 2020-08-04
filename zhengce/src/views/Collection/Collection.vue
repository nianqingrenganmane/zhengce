<template>
  <div class="Collection">
    <van-sticky>
      <navTab :tabLists="tabLists" @onchange="onchange"></navTab>
    </van-sticky>
    <div class="box">
      <div v-for="(item,index) in tabLis" :key="index">
        <div v-if="type == index">
          <allList
            :loading="loading"
            :finished="finished"
            :tabLists="tabLis"
            :contenLists="contenLists"
            @page="page"
          ></allList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import allList from "@/components/allList.vue";
import navTab from "@/components/navTab.vue";
export default {
  name: "Collection",
  data() {
    return {
      value: "",
      tabLists: [{ name: "政策" }, { name: "解读" }, {}, {}],
      tabLis: [],
      type: 0,
      page_index: 1,
      page_size: 5,
      loading: false,
      finished: false,
      contenLists: []
    };
  },
  components: {
    allList,
    navTab
  },
  mounted() {
    this.tabList();
    this.onList();
    this.logSet("null", "查询", "null");
  },
  methods: {
    // 点击分页
    onchange(e) {
      this.contenLists = [];
      this.page_index = 1;
      this.type = e;
      this.onList();
    },
    // 查看收藏列表
    onList() {
      var daty = {
        code: "collect_all",
        data: {
          page_index: this.page_index,
          page_size: this.page_size,
          sorters: [
            {
              field: "c.id",
              sort: "desc"
            }
          ],
          user_id: this.$store.state.userInfo.id,
          type: this.type
        }
      };
      this.$axios.post("qry/all", daty).then(res => {
        for (let i = 0; i < res.data.data.list.length; i++) {
          var dateee = new Date(res.data.data.list[i].created_time).toJSON();
          res.data.data.list[i].created_time = new Date(
            +new Date(dateee) + 8 * 3600 * 1000
          )
            .toISOString()
            .replace(/T/g, " ")
            .replace(/\.[\d]{3}Z/, "");
          if (res.data.data.list[i].type == 0) {
            res.data.data.list[i].id = res.data.data.list[i].policy_id;
          } else if (res.data.data.list[i].type == 1) {
            res.data.data.list[i].id =
              res.data.data.list[i].policy_elucidation_id;
          }
          if (res.data.data.list[i].label_industry_ids) {
            res.data.data.list[i].label_industry_ids = res.data.data.list[
              i
            ].label_industry_ids.split("/");
          }
          res.data.data.list[i].label_industry_ids = res.data.data.list[
            i
          ].label_industry_ids.pop();

          if (res.data.data.list[i].label_place_ids) {
            res.data.data.list[i].label_place_ids = res.data.data.list[
              i
            ].label_place_ids.split(",");
          }
        }
        this.count = res.data.data.count;
        this.contenLists = this.contenLists.concat(res.data.data.list);
        console.log(this.contenLists, res.data.data.list);
        this.loading = false;
        this.finished = false;
      });
    },
    // 改变page
    page() {
      if (this.iny == 0) {
        this.iny = 1;
      } else {
        this.loading = true;
        var NUS = this.count / this.page_size;
        console.log(this.count, this.page_size, NUS);
        if (NUS > this.page_index) {
          this.page_index = this.page_index + 1;
          this.onList();
        } else {
          console.log(11);
          this.finished = true;
        }
      }
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
          this.tabLis = res.data.data.list;
        });
    },
    // 日志记录
    logSet(cid, op, cont) {
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
.box {
  padding: 10px 0px;
}
</style>
