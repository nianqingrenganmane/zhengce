<template>
  <div class="Details">
    <div class="box">
      <div class="title">{{info.header}}</div>
      <div class="time">
        <span>{{info.created_time}}</span>
        <span>政策速递</span>
      </div>
      <div class="labelBox">
        <div class="label">
          <div class="labels"># {{info.xs}}</div>
          <div class="labels labely">@ {{info.xq}}</div>
          <div class="collection" @click="collection">
            <img v-if="collections == true" src="../../assets/icon_comm.png" alt />
            <img v-if="collections == false" src="../../assets/icon_come.png" alt />
          </div>
        </div>
        <div class="mask" v-if="detailsy.header">
          <div class="maskLeft">
            <div class="maskLeftTit">政策解读</div>
            <div class="maskLeftNin">{{detailsy.header}}</div>
          </div>
          <div class="maskRight" @click="nextRouts(detailsy)">免费查看</div>
        </div>
      </div>
      <div class="mainTex" v-html="info.content">{{info.content}}</div>
    </div>
    <div class="box boxsy">
      <div class="hotTitle">相关政策</div>
      <div v-for="(item,index) in list" :key="index" @click="nextRout(item)">
        <allList :infos="item" :tabLists="tabLists" :labelLists="labelLists"></allList>
      </div>
    </div>
  </div>
</template>

<script>
import allList from "@/components/allInfo.vue";
export default {
  name: "Details",
  data() {
    return {
      collections: false,
      info: {},
      list: [],
      labelLists: [],
      tabLists: [],
      id: this.$route.query.id,
      ids: "",
      userId: "",
      code: "",
      detailsy: {}
    };
  },
  components: { allList },
  mounted() {
    this.labelList();
    this.tabList();
  },
  watch: {
    $route() {
      this.id = this.$route.query.id;
      console.log(this.id, 222);
    },
    id() {
      this.labelList();
      this.tabList();
    }
  },
  methods: {
    // 查询详情
    detaInfo(id) {
      var daty = {
        code: "policy",
        data: {
          id: id.id
        }
      };
      this.$axios.post("ent/info", daty).then(res => {
        console.log(this.labelLists, this.tabLists);
        var dateee = new Date(res.data.data.created_time).toJSON();
        res.data.data.created_time = new Date(
          +new Date(dateee) + 8 * 3600 * 1000
        )
          .toISOString()
          .replace(/T/g, " ")
          .replace(/\.[\d]{3}Z/, "");

        for (let i = 0; i < this.labelLists.length; i++) {
          if (res.data.data.label_industry_ids == this.labelLists[i].id) {
            res.data.data.xq = this.labelLists[i].name;
          }
        }
        for (let j = 0; j < this.tabLists.length; j++) {
          if (res.data.data.label_place_ids == this.tabLists[j].id) {
            res.data.data.xs = this.tabLists[j].name;
          }
        }
        this.info = res.data.data;
        console.log(this.info);
        this.recommended(res.data.data);
        this.cread(res.data.data);
        this.activetion(res.data.data.id);
        this.detailsy = {
          header: res.data.data.policy_elucidation_header,
          id: res.data.data.policy_elucidation_id
        };
        this.code = res.data.data.code;
      });
    },
    recommended(info) {
      var daty = {
        code: "relation_policy",
        data: {
          page_index: 1,
          page_size: 2,
          sorters: [
            {
              field: "COALESCE(industry_matching,0)",
              sort: "desc"
            },
            {
              field: "COALESCE(place_matching,0)",
              sort: "desc"
            },
            {
              field: "industry_difference",
              sort: "asc"
            },
            {
              field: "place_difference",
              sort: "asc"
            }
          ],
          label_place_ids: info.label_place_ids,
          label_industry_ids: info.label_industry_ids,
          code: info.code
        }
      };
      this.$axios.post("qry/all", daty).then(res => {
        for (var i = 0; i < res.data.data.list.length; i++) {
          var dateee = new Date(res.data.data.list[i].created_time).toJSON();
          res.data.data.list[i].created_time = new Date(
            +new Date(dateee) + 8 * 3600 * 1000
          )
            .toISOString()
            .replace(/T/g, " ")
            .replace(/\.[\d]{3}Z/, "");
        }

        this.list = res.data.data.list;
      });
    },
    // 添加是否已读
    cread(e) {
      console.log(e);
      var daty = {
        code: "user_read",
        data: {
          user_id: this.$store.state.userInfo.id,
          policy_id: e.id,
          type: 0,
          is_read: "1",
          code: e.code
        }
      };
      this.$axios.post("ent/create", daty).then(res => {
        console.log(res);
      });
    },
    // 获取地点标签
    labelList() {
      var daty = {
        code: "label_industry",
        data: {
          page_index: 1,
          page_size: 100,
          sorters: [
            {
              field: "id",
              sort: "desc"
            }
          ]
        }
      };
      this.$axios.post("ent/listView", daty).then(res => {
        this.labelLists = res.data.data.list;

        this.detaInfo(this.$route.query);
      });
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
          this.tabLists = res.data.data.list;
        });
    },
    // 政策详情
    nextRout(e) {
      console.log(e);
      this.$router.push({
        name: `details`, // 只是把query改了，其他都没变
        query: {
          id: e.id
        }
      });
    },
    // 政策详情
    nextRouts(e) {
      // console.log(e);
      this.$router.push({
        name: `detailsy`, // 只是把query改了，其他都没变
        query: {
          id: e.id
        }
      });
    },
    // 查询收藏详情
    activetion(id) {
      var daty = {
        code: "collect",
        data: {
          user_id: this.$store.state.userInfo.id,
          policy_id: id,
          policy_elucidation_id: "-1",
          type: "0"
        }
      };
      this.$axios.post("ent/info", daty).then(res => {
        console.log(res);
        if (res.data.data == null) {
          this.collections = false;
        } else {
          this.ids = res.data.data.id;
          this.collections = true;
        }
      });
    },
    // 收藏
    collection() {
      // 取消收藏
      if (this.collections == true) {
        this.$axios
          .post("ent/delete", {
            code: "collect",
            data: {
              ids: this.ids
            }
          })
          .then(res => {
            this.$toast({
              message: "已取消收藏",
              duration: 3000
            });
            console.log(res);
          });
      } else {
        // 添加收藏
        this.$axios
          .post("ent/create", {
            code: "collect",
            data: {
              user_id: this.$store.state.userInfo.id,
              policy_id: this.id,
              type: 0,
              code: this.code
            }
          })
          .then(res => {
            this.$toast({
              message: "已收藏",
              duration: 3000
            });
            this.activetion(this.id);
            console.log(res);
          });
      }
      this.collections = !this.collections;
    }
  }
};
</script>
<style scoped>
.Details {
  background: #f6f6f6;
}
.box {
  background: #fff;
  padding: 14px 20px;
}
.boxsy {
  margin-top: 10px;
  padding-top: 0;
}
.title {
  font-size: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.time {
  font-size: 12px;
  color: #999;
  padding: 5px 0;
}
.time span {
  display: inline-block;
  padding-right: 15px;
}
.label {
  height: 24px;
}
.labels {
  border-radius: 2px;
  height: 20px;
  font-size: 12px;
  background: #ed7e51;
  float: left;
  color: #fff;
  padding: 0 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
}
.labels:nth-child(1) {
  margin-left: 0;
}
.labelBox {
  padding: 10px 0;
}
.collection {
  width: 24px;
  height: 24px;
  float: right;
}
.collection img {
  width: 24px;
  height: 24px;
  display: block;
}
.mask {
  margin-top: 20px;
  background: #f6f6f6;
  border-radius: 7px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
}
.maskLeft {
  width: 230px;
}
.maskLeftTit {
  font-size: 15px;
  padding: 0;
  font-weight: 600;
}
.maskLeftNin {
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.maskRight {
  width: 75px;
  height: 25px;
  color: #fff;
  border-radius: 50px;
  text-align: center;
  background: #c9a97c;
  font-size: 13px;
  margin-top: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mainTex {
  font-size: 18px;
  line-height: 28px;
  padding-bottom: 50px;
}
.mainTex table {
  width: 100% !important;
}
.hotTitle {
  height: 50px;
  font-size: 15px;
  border-bottom: 1px solid #e4e4e4;
  font-weight: 600;
  margin-top: 10px;
  display: flex;
  align-items: center;
}
.labely {
  background: #f6f6f6;
  color: #2f2f2f;
}
</style>
