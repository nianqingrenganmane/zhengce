<template>
  <div class="login">
    <div class="title">欢迎来到政策速递</div>
    <div class="inputs">
      <div class="user">
        <van-field type="phone" maxlength="13" v-model="dataPhone" clearable placeholder="请输入手机号"></van-field>
      </div>
      <div class="user users">
        <van-field type="phone" maxlength="7" v-model="vcode" center clearable placeholder="请输入验证码"></van-field>
        <div class="codeBtn" @click="activeVcode" v-show="vcodeShow">获取验证码</div>
        <div class="codeBtn codeBtns" v-show="!vcodeShow">{{vcodeNum}}S重新获取</div>
      </div>
    </div>
    <nextButton @next="next" class="btn" msg="验证登录"></nextButton>
  </div>
</template>

<script>
// @ is an alias to /src
import nextButton from "@/components/nextButton.vue";
import utils from "@/utils/utils.js";
export default {
  name: "login",
  data() {
    return {
      dataPhone: "",
      vcode: "",
      vcodeShow: true,
      vcodeNum: 60,
      timer: ""
    };
  },
  components: {
    nextButton
  },
  watch: {
    // 通过watch来设置空格
    dataPhone(newValue, oldValue) {
      if (newValue.length > oldValue.length) {
        // 文本框中输入
        if (newValue.length === 3 || newValue.length === 8) {
          this.dataPhone += " ";
        }
        console.log(this.dataPhone);
      } else {
        // 文本框中删除
        if (newValue.length === 9 || newValue.length === 4) {
          this.dataPhone = this.dataPhone.trim();
        }
      }
    },
    vcode(newValue, oldValue) {
      if (newValue.length > oldValue.length) {
        // 文本框中输入
        if (newValue.length === 3) {
          this.vcode += " ";
        }
        console.log(this.vcode);
      } else {
        // 文本框中删除
        if (newValue.length === 4) {
          this.vcode = this.vcode.trim();
        }
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    // 登录
    next() {
      var phone = this.dataPhone.replace(/\s*/g, "");
      var yzm = this.vcode.replace(/\s*/g, "");
      console.log();
      const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      if (reg.test(phone)) {
        if (yzm.length == 6) {
          this.vcodeIs(phone, yzm);
        } else {
          this.$toast({
            message: "验证码输入错误",
            duration: 3000
          });
        }
      } else {
        this.$toast({
          message: "手机号格式不正确",
          duration: 3000
        });
      }
      console.log();
      // this.$router.push("/addUser");
    },
    // 校检是否正确验证码
    vcodeIs(tel, vcode) {
      this.$axios
        .post("user/checkVcode", {
          mobile: tel,
          vcode: vcode
        })
        .then(res => {
          if (res.data.data.value == 0) {
            this.$toast({
              message: "验证码输入错误",
              duration: 3000
            });
          } else {
            this.logins(tel);
          }
          console.log(res);
        });
    },
    // 创建用户
    logins(phone) {
      this.$axios
        .post("weChat/createUser", {
          access_token: this.$store.state.access_token,
          open_id: this.$store.state.userid,
          phone: phone
        })
        .then(res => {
          window.localStorage.setItem("ele_login", res.data.data.token);
          this.userInfo(this.$store.state.userid);
        });
    },
    userInfo(openid) {
      this.$axios
        .post("user/info", {
          code: "user",
          data: {
            openid: openid
          }
        })
        .then(res => {
          this.$store.commit("userInfo", res.data.data);
          this.$router.replace("/addUser");
        });
    },
    // 获取验证码
    activeVcode() {
      if (utils.phone(this.dataPhone.replace(/\s*/g, ""))) {
        this.vcodeShow = false;
        this.timer = setInterval(() => {
          console.log(this.vcodeNum--);
          if (this.vcodeNum == 0) {
            clearInterval(this.timer);
            this.vcodeShow = true;
          }
        }, 1000);
        this.send(this.dataPhone.replace(/\s*/g, ""));
      } else {
        this.$toast({
          message: "手机号格式不正确",
          duration: 3000
        });
      }
    },
    // 发送验证码
    send(tel) {
      this.$axios
        .post("user/send", {
          mobile: tel
        })
        .then(res => {
          console.log(res);
        });
    }
  }
};
</script>
<style scoped>
.login {
  padding: 0 22.5px;
}
.title {
  font-size: 24px;
  color: #2f2f2f;
  line-height: 24px;
  margin-top: 35px;
}
.inputs {
  border: 1px solid #eeeeee;
  border-radius: 7.5px;
  margin-top: 52px;
  overflow: hidden;
}
.btn {
  margin-top: 40px;
}
.van-cell {
  padding-left: 0;
  padding-right: 0;
  border-bottom: 1px solid #eee;
  font-size: 18px;
}
.users .van-cell {
  border-bottom: 0;
}
.user {
  padding: 0 15px;
}
.users {
  position: relative;
}
.codeBtn {
  position: absolute;
  background: #f6f6f6;
  border-radius: 5px;
  font-size: 16px;
  color: #c9a97c;
  padding: 9px 16px;
  top: 2px;
  right: 15px;
}
.codeBtns {
  color: #999;
  background: #f6f6f6;
}
</style>
