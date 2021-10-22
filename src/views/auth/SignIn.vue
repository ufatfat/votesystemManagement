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
import {signIn} from "../../apis"
import {mapGetters, mapMutations} from "vuex"
export default {
  name: "SignIn",
  data () {
    return {
      username: "",
      password: "",
    }
  },
  mounted() {
  },
  computed: {
    ...mapGetters([
        "userInfo",
    ])
  },
  methods: {
    ...mapMutations([
        "updateUserInfo"
    ]),
    signIn () {
      let data = {
        username: this.username,
        password: this.password,
      }
      signIn(data).then(res => {
        setTimeout(() => {
          this.$router.push({
            path: "/"
          })
        }, 200)
        let data = res.data
        this.updateUserInfo({
          username: data.admin_name,
        })
      }).catch(error => {
        if (error.response.status === 404)
          this.$message({
            type: "error",
            message: "用户名/密码错误！",
          })
        else
          this.$message({
            type: "error",
            message: "该账号不是当前比赛评委！"
          })
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