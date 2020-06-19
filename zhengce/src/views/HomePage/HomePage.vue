<template>
  <div class="topSwiperBox">
    <allList
      :loading="loading"
      :finished="finished"
      :tabLists="tabLists"
      :contenLists="contenLists"
      @page="page"
    ></allList>
  </div>
</template>

<script>
import allList from "@/components/allList.vue";
export default {
  props: { tabId: Number, tabLists: Array, type: Number },
  data() {
    return {
      contenLists: [],
      handpick: -1,
      label_place_ids: -1,
      page_index: 1,
      page_size: 5,
      count: 0,
      loading: false,
      finished: false,
      iny: 0
    };
  },
  created() {
    if (this.tabId == -1) {
      this.handpick = 1;
      this.label_place_ids = -1;
    } else if (this.tabId == 0) {
      this.handpick = -1;
      this.label_place_ids = -1;
    } else {
      this.handpick = -1;
      this.label_place_ids = this.tabId;
    }
  },
  mounted() {
    this.contenList();
  },
  components: {
    allList
  },
  methods: {
    // 获取内容
    contenList() {
      var daty = {};
      if (this.type == 1) {
        daty = {
          code: "policy_elucidation",
          data: {
            page_index: this.page_index,
            page_size: this.page_size,
            sorters: [
              {
                field: "created_time",
                sort: "desc"
              }
            ],
            label_place_ids: this.label_place_ids,
            handpick: this.handpick
          }
        };
        this.$axios.post("ent/listView", daty).then(res => {
          for (let i = 0; i < res.data.data.list.length; i++) {
            // if (res.data.data.list[i].label_industry_ids) {
            //   res.data.data.list[i].label_industry_ids = res.data.data.list[
            //     i
            //   ].label_industry_ids.split(",");
            // }
            var dateee = new Date(res.data.data.list[i].created_time).toJSON();
            res.data.data.list[i].created_time = new Date(
              +new Date(dateee) + 8 * 3600 * 1000
            )
              .toISOString()
              .replace(/T/g, " ")
              .replace(/\.[\d]{3}Z/, "");
          }
          this.count = res.data.data.count;
          this.contenLists = this.contenLists.concat(res.data.data.list);
          console.log(this.contenLists, res.data.data.list);
          this.loading = false;
          this.finished = false;
        });
      } else {
        daty = {
          code: "policy_double",
          data: {
            page_index: this.page_index,
            page_size: this.page_size,
            sorters: [
              {
                field: "created_time",
                sort: "desc"
              }
            ],
            label_place_ids: this.label_place_ids,
            handpick: this.handpick
          }
        };
        this.allLists(daty);
      }
    },
    // 获取内容列表
    allLists(daty) {
      this.$axios.post("qry/all", daty).then(res => {
        for (let i = 0; i < res.data.data.list.length; i++) {
          // if (res.data.data.list[i].label_industry_ids) {
          //   res.data.data.list[i].label_industry_ids = res.data.data.list[
          //     i
          //   ].label_industry_ids.split(",");
          // }
          var dateee = new Date(res.data.data.list[i].created_time).toJSON();
          res.data.data.list[i].created_time = new Date(
            +new Date(dateee) + 8 * 3600 * 1000
          )
            .toISOString()
            .replace(/T/g, " ")
            .replace(/\.[\d]{3}Z/, "");
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
          this.contenList();
        } else {
          console.log(11);
          this.finished = true;
        }
      }
    }
  }
};
</script>
<style scoped>
</style>
