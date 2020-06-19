<template>
  <div class="addname">
    <div class="addnames">
      <van-cell title="性别">
        <template #right-icon>
          <div class="sex" :class="date.sex == 0 ? 'sexmr' : ''" @click="date.sex = 0">男</div>
          <div class="sex" :class="date.sex == 1 ? 'sexmis' : ''" @click="date.sex = 1">女</div>
        </template>
      </van-cell>
      <van-cell
        title="年龄"
        :value="date.age == ''?'请选择':date.age"
        is-link
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" round position="bottom">
        <van-picker
          show-toolbar
          title="请选择您的年龄段"
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="onConfirm"
        />
      </van-popup>
      <div class="height"></div>
      <van-cell title="公司">
        <template #right-icon>
          <div class="inputRight">
            <input type="text" v-model="date.company" placeholder="请输入你的公司名" />
          </div>
        </template>
      </van-cell>
      <van-cell title="职务">
        <template #right-icon>
          <div class="inputRight">
            <input type="text" v-model="date.duty" placeholder="请输入你的公司职务" />
          </div>
        </template>
      </van-cell>
      <van-cell
        title="行业"
        :value="date.user_indust == ''?'请选择':date.user_indust"
        is-link
        @click="user_indust = true"
      />
      <van-popup v-model="user_indust" round position="bottom">
        <van-picker
          show-toolbar
          title="请选择您所在的行业"
          :columns="columnss"
          @cancel="user_indust = false"
          @confirm="user_industs"
        />
      </van-popup>
      <van-cell
        title="了解政策目的"
        :value="date.understand_goal == ''?'请选择':date.understand_goal"
        is-link
        @click="understand_goal = true"
      />
      <van-popup v-model="understand_goal" round position="bottom">
        <van-picker
          show-toolbar
          title="请选择您了解政策目的"
          :columns="columnsss"
          @cancel="understand_goal = false"
          @confirm="understand_goals"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
export default {
  name: "addname",
  data() {
    return {
      username: "",
      password: "",
      value: "",
      age: "", //年龄
      sex: 0,
      showPicker: false,
      showIndustry: false,
      user_indust: false,
      understand_goal: false,
      showObjective: false,
      companyname: "",
      position: "",
      columnsss: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
      columns: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
      columnss: ["杭州", "宁波", "温州", "嘉兴", "湖州"]
    };
  },
  props: {
    date: Object
  },
  mounted() {
    console.log(this);
    this.columns = ["18~24", "25~35", "36~45", "46~55", "55以上"];
    this.columnss = ["创意产业", "互联网行业", "金融行业", "设计行业", "其他"];
    this.columnsss = ["商务", "政务", "爱好", "其他"];
  },
  methods: {
    onConfirm(value) {
      this._props.date.age = value;
      this.showPicker = false;
    },
    //选择行业
    user_industs(value) {
      this._props.date.user_indust = value;
      this.user_indust = false;
    },
    // 选择政策目的
    understand_goals(value) {
      this._props.date.understand_goal = value;
      this.understand_goal = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.addnames {
  margin-top: 37px;
}
.sex {
  font-size: 12px;
  text-align: center;
  border-radius: 25px;
  width: 50px;
  height: 25px;
  border: 1px solid #222;
  margin-left: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sexmr {
  border: 1px solid #4783f6;
  background: #4783f6;
  color: #fff;
}
.sexmis {
  border: 1px solid #d44948;
  background: #d44948;
  color: #fff;
}
.inputRight {
  padding: 0;
}
.inputRight input {
  border: 0;
  text-align: right;
}
.height {
  height: 30px;
}
</style>
