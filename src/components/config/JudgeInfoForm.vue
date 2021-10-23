<template>
  <div>
    <el-form label-position="left" label-width="100px" :model="judgeInfoCopy">
      <el-form-item label="姓名">
        <el-input v-model="judgeInfoCopy.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="judgeInfoCopy.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="defaultPassword"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {updateJudgeInfo} from "../../apis";

export default {
  name: "JudgeInfoForm",
  props: {
    judgeInfo: Object,
    submit: Boolean,
  },
  data () {
    return {
      judgeInfoCopy: new Object(this.judgeInfo),
      defaultPassword: "",
    }
  },
  watch: {
    submit () {
      let data = {
        name: this.judgeInfoCopy.name,
        username: this.judgeInfoCopy.username,
      }
      if (this.defaultPassword !== "")
        this.$confirm("确认要修改此评委的登录密码吗？此操作不可逆", "", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          data.password = this.defaultPassword
          this.updateJudgeInfo(data)
        }).catch(() => {
          this.defaultPassword = ""
        })
      else this.updateJudgeInfo(data)
    }
  },
  methods: {
    updateJudgeInfo (data) {
      updateJudgeInfo(data).then(() => {
        this.$message({
          type: "success",
          message: "更新成功！",
        })
        this.roundInfo = this.roundInfoCopy
      }).catch(() => {
        this.roundInfoCopy = this.roundInfo
        this.$message({
          type: "error",
          message: "更新失败，请联系管理员！",
        })
      })
    }
  }
}
</script>

<style scoped>

</style>