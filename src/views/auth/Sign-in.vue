<template>
  <div>
    <el-form id="signInForm">
      <span id="formTitle">
        登录
      </span>
      <el-divider></el-divider>
      <el-form-item>
        用户名：
        <el-input title="用户名" class="input" v-model="username"></el-input>
      </el-form-item>
      <el-form-item>
        密&emsp;码：
        <el-input title="密码" show-password class="input" v-model="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="signIn">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {signIn} from "@/apis";
export default {
  name: "Sign-in",
  data () {
    return {
      username: "",
      password: "",
    }
  },
  mounted() {
  },
  methods: {
    signIn () {
      let data = {
        username: this.username,
        password: this.password,
      }
      signIn(data).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>
#signInForm {
  width: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  background: #ffffff;
  padding-bottom: 30px;
}
#signInForm #formTitle {
  font-size: 30px;
  margin: 20px 0 0;
  display: inline-block;
}
.input {
  width: 400px;
}
</style>