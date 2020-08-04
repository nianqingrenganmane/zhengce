<template>
  <div class="allList">
    <div class="listBox">
      <div class="label">
        <div v-if="infos.type == 1">
          <div class="labely labelys">政策解读</div>
        </div>
        <div v-if="infos.type == 0">
          <div class="labely">政策速递</div>
        </div>
        <div class="ss" v-for="(items,indexs) in infos.label_place_ids" :key="indexs + 100">
          <div class="labels">{{items}}</div>
        </div>
        <div>
          <div class="labels labesf">{{infos.label_industry_ids}}</div>
        </div>

        <!-- <div
            v-for="(labelItem,labels) in item.label_induustry_ids"
            :key="labelItem.id"
            :ref="labels"
          >
            <div v-for="(labelItems,labelss) in labelLists" :key="labelss + 2">
              <div class="labels labesf" v-if="labelItem == labelItems.id">@ {{labelItems.name}}</div>
            </div>
        </div>-->

        <div class="clear"></div>
      </div>
      <div class="listTitle">{{infos.header}}</div>
      <div class="introduce">{{infos.picture}}</div>
      <div class="listFoot">
        <div class="listTime">{{infos.created_rtc}}</div>
        <div class="views">{{infos.hits}}已读</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "allInfo",
  props: {
    infos: Object,
    tabLists: Array,
    labelLists: Array
  },
  data() {
    return {};
  },
  created() {},
  computed: {},
  mounted() {
    console.log(this);
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.allList {
  background: #fff;
  justify-content: flex-start;
  padding: 0 15px;
}
.label > div {
  display: inline-block;
}
.label {
  display: flex;
  flex-wrap: wrap;
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
}
.ss {
  margin-left: 10px;
}
.ss:nth-child(1) {
  margin-left: 0;
}
.labelys {
  background: #e9b66f;
}
</style>
