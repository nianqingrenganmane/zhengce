<template>
  <div class="Search">
    <div class="search">
      <div class="searchIcon">
        <img src="../../assets/icon_search.png" alt />
      </div>
      <div class="searchInput">
        <van-field @input="inputs" v-model="value" clearable placeholder="请输入关键词" />
      </div>
      <div class="searchBtn" @click="searchBtn">
        <p>搜索</p>
      </div>
    </div>
    <div class="box" v-show="!show">
      <div class="hotCome">
        <div class="hotTitle">热门推荐</div>
        <div class="hotComes">
          <div
            class="hotComesList"
            @click="searchs(item.name)"
            v-for="(item,index) in hotLists"
            :key="index"
          >{{item.name}}</div>
        </div>
      </div>
      <div class="hotCome record" v-if="searchArray.length > 0">
        <div class="hotTitle">
          搜索记录
          <div class="hotTitles" @click="removArr">清空</div>
        </div>
        <div class="searchRecord">
          <div v-for="(item,index) in searchArray" :key="index">
            <div class="hotComesList" @click="searchs(item)">{{item}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="serList" v-show="show">
      <div class="hotTitle">搜索结果（{{count}}）</div>
      <div class="list" v-for="(item,index) in serLists" :key="index" @click="nextRout(item)">
        <allList :infos="item" :labelLists="labelLists" :tabLists="tabLists"></allList>
      </div>
      <div class="notext" v-if="serLists.length == 0">暂无搜索结果</div>
    </div>
  </div>
</template>

<script>
import allList from "@/components/allInfo.vue";
export default {
  name: "Search",
  data() {
    return {
      value: "",
      hotLists: [],
      searchArray: [],
      show: false,
      serLists: [],
      count: 0,
      labelLists: [],
      tabLists: []
    };
  },
  components: {
    allList
  },
  mounted() {
    this.hotList();
    this.records();
    this.labelList();
    this.tabList();
  },
  methods: {
    // 政策详情
    nextRout(e) {
      console.log(e);
      if (e.type == 1) {
        this.$router.push({
          name: `detailsy`, // 只是把query改了，其他都没变
          query: {
            id: e.id
          }
        });
      } else {
        this.$router.push({
          name: `details`, // 只是把query改了，其他都没变
          query: {
            id: e.id
          }
        });
      }
    },
    inputs(e) {
      console.log(e);
      if (e == "") {
        this.show = false;
      }
    },
    // 清除搜索记录
    removArr() {
      this.$dialog
        .confirm({
          message: "是否清空所有搜索记录"
        })
        .then(() => {
          this.searchArray = [];
          localStorage.setItem("searchArray", JSON.stringify(this.searchArray));
          this.$toast("搜索记录已清空");
        });
      console.log(1);
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
      });
    },
    // 点击搜索
    searchBtn() {
      console.log(this.value);
      if (this.value) {
        this.show = true;
        this.searchList();
        if (this.searchArray.indexOf(this.value) == -1) {
          this.searchArray.unshift(this.value);
          if (this.searchArray.length > 10) {
            this.searchArray.pop();
            console.log(this.searchArray);
          }
        } else {
          this.searchArray.splice(this.searchArray.indexOf(this.value), 1);
          this.searchArray.unshift(this.value);
        }

        localStorage.setItem("searchArray", JSON.stringify(this.searchArray));
      }
    },
    // 搜索记录
    records() {
      if (localStorage.getItem("searchArray")) {
        this.searchArray = JSON.parse(localStorage.getItem("searchArray"));
      }
    },
    searchList() {
      var daty = {
        code: "policy_search",
        data: {
          page_index: 1,
          page_size: 20,
          sorters: [
            {
              field: "created_time",
              sort: "desc"
            }
          ],
          keyword: this.value
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
        this.serLists = res.data.data.list;
        this.count = res.data.data.count;
        console.log(res);
      });
    },
    //热门列表
    hotList() {
      var daty = {
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
          type: "3"
        }
      };
      this.$axios.post("ent/listView", daty).then(res => {
        this.hotLists = res.data.data.list;
        console.log(res);
      });
    },
    // 点击列表
    searchs(text) {
      this.value = text;
      this.searchBtn();
    }
  }
};
</script>
<style scoped>
.Search {
  padding: 0 15px;
}
.search {
  height: 45px;
  border-radius: 50px;
  overflow: hidden;
  background: #f6f6f6;
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
}
.searchIcon {
  width: 15px;
  height: 15px;
  margin-left: 15px;
}
.searchIcon img {
  width: 15px;
  height: 15px;
  margin-top: 15px;
}
.van-cell {
  background: none;
  padding-top: 0;
  padding-bottom: 0;
}
.searchInput {
  width: calc(100% - 105px);
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.searchBtn {
  width: 70px;
  height: 35px;
  background: #c9a97c;
  border-radius: 50px;
  overflow: hidden;
  color: #fff;
  font-size: 16px;
  margin-top: 5px;
  margin-right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.searchBtn:active {
  background: #8c7556;
}
.hotTitle {
  height: 45px;
  line-height: 45px;
  font-size: 15px;
  line-height: 45px;
  border-bottom: 1px solid #e4e4e4;
  font-weight: 600;
  margin-top: 10px;
}
.hotComes {
  display: flex;
  flex-wrap: wrap;
  width: calc(100% + 15px);
  margin-left: -15px;
}
.hotComesList {
  height: 20px;
  border-radius: 2px;
  background: #f6f6f6;
  padding: 0 10px;
  font-size: 12px;
  margin-left: 15px;
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.searchRecord > div .hotComesList {
  display: inline-flex;
  margin-left: 0;
}
.record {
  margin-top: 40px;
}
.hotTitles {
  float: right;
  font-weight: normal;
  font-size: 15px;
  color: #c9a97c;
}
.notext {
  font-size: 17px;
  color: #666;
  text-align: center;
  margin-top: 140px;
}
</style>
