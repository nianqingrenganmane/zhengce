<template>
  <div class="allList">
    <van-list
      v-model="loading"
      :finished="finished"
      :offset="1"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div
        class="listBox"
        :class="item.type == 1?'listBoxzc':'' || item.is_read == 1?'listBoxac':''"
        @click="nextRout(item,index)"
        v-for="(item,index) in contenLists"
        :key="index"
      >
        <allInfo :infos="item" :tabLists="tabLists" :labelLists="labelLists"></allInfo>
      </div>
    </van-list>
  </div>
</template>

<script>
import allInfo from "./allInfo";
export default {
  name: "allList",
  props: {
    contenLists: Array,
    tabLists: Array,
    loading: {
      type: Boolean,
      default: false
    },
    finished: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      list: [],
      labelLists: []
    };
  },
  created() {
    console.log(this);
  },
  components: {
    allInfo
  },
  mounted() {
    console.log();

    this.labelList();
  },
  methods: {
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
    onLoad() {
      this.$emit("page");
    },
    // 政策详情
    nextRout(e, index) {
      console.log(e.type);
      this.contenLists[index].is_read = 1;
      if (e.type == 0) {
        this.$router.push({
          name: `details`, // 只是把query改了，其他都没变
          query: {
            id: e.id
          }
        });
      } else {
        this.$router.push({
          name: `detailsy`, // 只是把query改了，其他都没变
          query: {
            id: e.id
          }
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.allList {
  background: #fff;
  justify-content: flex-start;
}
.label > div {
  display: inline-block;
}
.label {
  display: flex;
}
.labels {
  border-radius: 2px;
  height: 20px;
  font-size: 12px;
  background: #ed7e51;
  color: #fff;
  padding: 0 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.listBox {
  padding-bottom: 15px;
}
.labels:nth-child(1) {
  margin-left: 0;
}
.clear {
  clear: both;
}
.listTitle {
  font-size: 17px;
  margin-top: 10px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  font-weight: 500;
}
.introduce {
  margin-top: 10px;
  color: #666666;
  font-size: 14px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
}
.listFoot {
  color: #666;
  font-size: 12px;
  margin-top: 19px;
  display: flex;
  justify-content: space-between;
}
.listBoxzc .listTitle {
  color: #c9a97c;
}
.listBoxzc .introduce {
  color: #cab69a;
}
.listBoxac .listTitle {
  color: #999;
}
.listBoxac .introduce {
  color: #999;
}
.labesf {
  background: #f6f6f6;
  color: #2f2f2f;
  margin-left: 10px !important;
}
.labely {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  height: 20px;
  font-size: 12px;
  background: #c9a97c;
  padding: 0 4px;
  color: #fff;
  margin-right: 10px;
}
</style>
