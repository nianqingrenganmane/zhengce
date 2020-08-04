<template>
  <div class="Details">
    <div class="fis" @click="requsx">
      <img src="../../assets/home.png" alt />
    </div>
    <div class="box">
      <div class="title">{{info.header}}</div>
      <div class="time">
        <span>{{info.created_rtc}}</span>
        <span>{{info.source?'来源：'+info.source:'政策速递'}}</span>
      </div>
      <div class="labelBox">
        <div class="label">
          <div class="labels labelys">政策速递</div>
          <div
            class="labels"
            v-for="(item,index) in info.label_place_ids"
            :key="index"
            :ref="index"
          >{{item}}</div>
          <div class="labels labely">{{info.label_industry_ids}}</div>
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
      <div class="texts" @click="arhre">想了解更多 点击关注公众号</div>
    </div>
    <div class="boxsy">
      <div class="hotTitle">相关政策</div>
      <div
        :class="index == 1?'hotDic':''"
        v-for="(item,index) in list"
        :key="index"
        @click="nextRout(item)"
      >
        <allList :infos="item" :tabLists="tabLists" :labelLists="labelLists"></allList>
      </div>
    </div>
  </div>
</template>

<script>
import allList from "@/components/allInfo.vue";
import wechatUtil from "@/utils/wechatUtil";
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

        if (res.data.data.label_industry_ids) {
          res.data.data.label_industry_ids = res.data.data.label_industry_ids.split(
            "/"
          );
          res.data.data.label_industry_ids = res.data.data.label_industry_ids.pop();
        }
        if (res.data.data.label_place_ids) {
          res.data.data.label_place_ids = res.data.data.label_place_ids.split(
            ","
          );
        }
        // for (let j = 0; j < this.tabLists.length; j++) {
        //   if (res.data.data.label_place_ids == this.tabLists[j].id) {
        //     res.data.data.xs = this.tabLists[j].name;
        //   }
        // }
        this.info = res.data.data;
        console.log(this.info, 1111111111111);
        this.recommended(res.data.data);
        this.cread(res.data.data);
        this.activetion(res.data.data.id);
        this.logSet(res.data.data.id, "查询", res.data.data.header);
        this.wechat(res.data.data);
        this.detailsy = {
          header: res.data.data.policy_elucidation_header,
          id: res.data.data.policy_elucidation_id
        };
        this.code = res.data.data.code;

        // chrome
        document.body.scrollTop = 0;
        // firefox
        document.documentElement.scrollTop = 0;
        // safari
        window.pageYOffset = 0;
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
          label_place_ids: info.label_place_ids.toString(),
          label_industry_ids: info.label_industry_ids,
          code: info.code,
          id: info.id
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

          if (res.data.data.list[i].label_industry_ids) {
            res.data.data.list[i].label_industry_ids = res.data.data.list[
              i
            ].label_industry_ids.split("/");
            res.data.data.list[i].label_industry_ids = res.data.data.list[
              i
            ].label_industry_ids.pop();
          }
          if (res.data.data.list[i].label_place_ids) {
            res.data.data.list[i].label_place_ids = res.data.data.list[
              i
            ].label_place_ids.split(",");
          }
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
          policy_elucidation_id: null,
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
      this.logSet(e.id, "点击", e.header);
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
            if (res.data.code == 20000) {
              this.$toast({
                message: "已取消收藏",
                duration: 3000
              });
              console.log(res);
              this.activetion(this.id);
            } else {
              this.$toast({
                message: "收藏失败，错误码：" + res.data,
                forbidClick: true,
                duration: 2000
              });
            }
          });
      } else {
        // 添加收藏
        this.$axios
          .post("ent/create", {
            code: "collect",
            data: {
              user_id: this.$store.state.userInfo.id,
              policy_id: this.id,
              policy_elucidation_id: null,
              type: 0,
              code: this.code
            }
          })
          .then(res => {
            if (res.data.code == 20000) {
              this.$toast({
                message: "已收藏",
                forbidClick: true,
                duration: 2000
              });
              this.activetion(this.id);
              this.logSet(this.id, "收藏", this.info.header);
            } else {
              this.$toast({
                message: "收藏失败，错误码：" + res.data,
                forbidClick: true,
                duration: 2000
              });
            }
          });
      }
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
    },
    requsx() {
      this.$router.replace("/");
    },
    arhre() {
      location.replace(
        "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI4MjE3MzM0Mg==#wechat_redirect"
      );
    },
    // 调用jssdk、
    wechat(e) {
      wechatUtil
        .init(["updateAppMessageShareData", "updateTimelineShareData"])
        .then((wx, res) => {
          // 这里写微信的接口
          wx.updateAppMessageShareData({
            title: e.header, // 分享标题
            desc: e.picture, // 分享描述
            link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl:
              "http://wx.qlogo.cn/mmhead/Q3auHgzwzM4Y4ic9zQkgibCz3oVRq2GZzye4ooULRKia6mCR6mv3voXDw/132", // 分享图标
            success: function() {
              // 设置成功
              console.log(this);
            }
          });
          wx.updateTimelineShareData({
            title: e.header, // 分享标题
            desc: e.picture, // 分享描述
            link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl:
              "http://wx.qlogo.cn/mmhead/Q3auHgzwzM4Y4ic9zQkgibCz3oVRq2GZzye4ooULRKia6mCR6mv3voXDw/132", // 分享图标
            success: function() {
              // 设置成功
              console.log(this);
            }
          });
          console.log(111, wx, res);
        });
    }
  }
};
</script>
<style scoped>
.texts {
  background: #c9a97c;
  border-radius: 50px;
  border-radius: 50px;
  width: 220px;
  height: 30px;
  color: #fff;
  font-size: 14px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.Details {
  background: #f6f6f6;
  position: relative;
}
.fis {
  width: 25px;
  height: 25px;
  border-radius: 50px;
  overflow: hidden;
  background: #c9a97c;
  position: fixed;
  padding: 5px;
  bottom: 50px;
  right: 15px;
}
.fis img {
  width: 100%;
  display: block;
}
.box {
  background: #fff;
  padding: 14px 20px;
}
.boxsy {
  margin-top: 10px;
  padding-top: 0;
  padding-bottom: 20px;
  background: #fff;
}
.title {
  font-size: 22px;
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
  font-size: 14px;
  line-height: 150% !important;
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
  width: calc(100% - 30px);
  margin-left: 15px;
}

.labelys {
  background: #c9a97c;
}
.labely {
  background: #f6f6f6;
  color: #2f2f2f;
}
.mainTex >>> table {
  width: 100% !important;
  border: 1px solid #ddd;
  border-collapse: collapse;
  font-size: 14px;
}
.mainTex >>> th,
.mainTex >>> td {
  border: 1px solid #ddd;
}
.mainTex >>> p {
  line-height: 150% !important;
}
.hotDic {
  margin-top: 20px;
}
</style>
<style>
</style>
