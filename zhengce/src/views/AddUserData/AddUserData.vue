<template>
  <div class="addUser">
    <div class="title">欢迎来到政策速递</div>
    <addUsertit :msg="msg"></addUsertit>
    <addTag :date="date" v-if="show == 1"></addTag>
    <addCity
      v-if="show == 2"
      @citysChang2="citysChang2"
      @citysChang1="citysChang1"
      :city1="city1"
      :city2="city2"
    ></addCity>
    <addAddUserInterest v-if="show == 3" @citysChang3="citysChang3" :industry="industrys"></addAddUserInterest>
    <nextButton
      @next="next"
      class="btn"
      :class="this.show ==1?'':'btns'"
      :msg="this.show == 3 ? '完成' : '下一步'"
    ></nextButton>
    <div class="footer" @click="pust" v-if="this.show == 1">暂不提供，直接跳过 ></div>
  </div>
</template>

<script>
// @ is an alias to /src
import nextButton from "@/components/nextButton.vue";
import addUsertit from "./AddUserName";
import addTag from "./AddUserTag";
import addCity from "./AddUserCity";
import addAddUserInterest from "./AddUserInterest";

export default {
  name: "addUser",
  data() {
    return {
      show: 1,
      date: {
        age: "", //年龄
        sex: 0, //性别 0男 1女
        company: "", //公司名
        duty: "", //职务
        user_indust: "", //行业
        understand_goal: "", //了解政策目的
        label_place_ids: "", //选择城市
        label_industry_ids: "" //感兴趣
      },
      msg: "1. 请选择您的身份标签",
      city1: [], //市
      city2: [], //省份
      industrys: [] //兴趣
    };
  },
  components: {
    nextButton,
    addUsertit,
    addTag,
    addCity,
    addAddUserInterest
  },
  mounted() {
    this.cityList();
    this.industry();
  },
  methods: {
    // 下一步
    next() {
      console.log(this.$store.state);
      if (this.show == 1) {
        if (
          this.date.age == "" ||
          this.date.company == "" ||
          this.date.duty == "" ||
          this.date.user_indust == "" ||
          this.date.understand_goal == ""
        ) {
          this.$toast({
            message: "请输入完信息",
            duration: 3000
          });
        } else {
          this.msg = "2. 请选择感兴趣的城市/省份政策标签";
          this.show = 2;
        }
      } else if (this.show == 2) {
        var citysArr = [];
        var commendArr = [];
        for (var i = 0; i < this.city1.length; i++) {
          if (this.city1[i].ele) {
            citysArr.push(this.city1[i].id);
          }
        }
        for (var j = 0; j < this.city2.length; j++) {
          if (this.city2[j].ele) {
            commendArr.push(this.city2[j].id);
          }
        }
        this.msg = "3. 请选择感兴趣行业政策标签";
        this.show = 3;
        this.date.label_place_ids = citysArr.concat(commendArr).toString();
      } else {
        var arrs = [];
        for (var p = 0; p < this.industrys.length; p++) {
          if (this.industrys[p].ele) {
            arrs.push(this.industrys[p].id);
          }
        }
        this.date.label_industry_ids = arrs.toString();
        console.log(this.date);
        this.userUpdata();
        // this.$router.push("/");
      }
    },
    userUpdata() {
      var daty = {
        code: "user",
        data: {
          is_in_all: "no",
          id: this.$store.state.userInfo.id,
          open_id: this.$store.state.userid,
          age: this.date.age, //年龄
          sex: this.date.sex, //性别 0男 1女
          company: this.date.company,
          duty: this.date.duty,
          user_indust: this.date.user_indust,
          understand_goal: this.date.understand_goal,
          label_place_ids: this.date.label_place_ids,
          label_industry_ids: this.date.label_industry_ids
        }
      };
      this.$axios.post("ent/update", daty).then(res => {
        console.log(res);
        this.$router.replace("/");
      });
    },
    //获取兴趣
    industry() {
      this.$axios
        .post("ent/listView", {
          code: "label_place",
          data: {
            page_index: 1,
            page_size: 100,
            sorters: [
              {
                field: "id",
                sort: "asc"
              }
            ],
            type: "1"
          }
        })
        .then(res => {
          this.industrys = res.data.data.list;
        });
    },
    //获取城市
    cityList() {
      this.$axios
        .post("ent/listView", {
          code: "label_industry",
          data: {
            page_index: 1,
            page_size: 100,
            sorters: [
              {
                field: "id",
                sort: "asc"
              }
            ],
            type: "2"
          }
        })
        .then(res => {
          this.city1 = res.data.data.list;
        });
      this.$axios
        .post("ent/listView", {
          code: "label_industry",
          data: {
            page_index: 1,
            page_size: 100,
            sorters: [
              {
                field: "id",
                sort: "asc"
              }
            ],
            type: "1"
          }
        })
        .then(res => {
          console.log(res);
          this.city2 = res.data.data.list;
        });
    },
    citysChang1(res) {
      if (this.city1[res.index].ele) {
        console.log(this.city1);
        this.$set(this.city1, res.index, {
          name: this.city1[res.index].name,
          id: this.city1[res.index].id,
          ele: false
        });
      } else {
        this.$set(this.city1, res.index, {
          name: this.city1[res.index].name,
          id: this.city1[res.index].id,
          ele: true
        });
      }
    },
    citysChang2(res) {
      if (this.city2[res.index].ele) {
        console.log(this.city2);
        this.$set(this.city2, res.index, {
          name: this.city2[res.index].name,
          id: this.city2[res.index].id,
          ele: false
        });
      } else {
        this.$set(this.city2, res.index, {
          name: this.city2[res.index].name,
          id: this.city2[res.index].id,
          ele: true
        });
      }
    },
    citysChang3(res) {
      if (this.industrys[res.index].ele) {
        console.log(this.industrys);
        this.$set(this.industrys, res.index, {
          name: this.industrys[res.index].name,
          id: this.industrys[res.index].id,
          ele: false
        });
      } else {
        this.$set(this.industrys, res.index, {
          name: this.industrys[res.index].name,
          id: this.industrys[res.index].id,
          ele: true
        });
      }
    },
    pust() {
      this.$router.push("/");
    }
    // 城市选中
    // citysChang(res) {
    //   console.log(this.allArray[0][res.index].ele);
    //   // set方法触发视图更新
    //   if (this.allArray[0][res.index].ele) {
    //     console.log(this.allArray[0]);
    //     this.$set(this.allArray[0], res.index, {
    //       name: this.allArray[0][res.index].name,
    //       id: this.allArray[0][res.index].id,
    //       ele: false
    //     });
    //   } else {
    //     this.$set(this.allArray[0], res.index, {
    //       name: this.allArray[0][res.index].name,
    //       id: this.allArray[0][res.index].id,
    //       ele: true
    //     });
    //   }
    // },
  }
};
</script>
<style scoped>
.addUser {
  padding: 0 22.5px;
  min-height: calc(100vh - 35px);
  position: relative;
}
.title {
  font-size: 24px;
  color: #2f2f2f;
  line-height: 24px;
  margin-top: 35px;
}
.footer {
  font-size: 15px;
  text-align: center;
  position: absolute;
  bottom: 15px;
  height: 32px;
  line-height: 32px;
  width: calc(100% - 50px);
}
.btn {
  margin-top: 30px;
}
.btns {
  position: fixed;
  bottom: 20px;
}
</style>
