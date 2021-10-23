<template>
  <div>
    <el-form label-position="left" label-width="100px" :model="roundInfoCopy">
      <el-form-item label="轮次">
        <el-input v-model="roundInfoCopy.round_index"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="roundInfoCopy.round_desc"></el-input>
      </el-form-item>
      <el-form-item label="最大票数">
        <el-input v-model="roundInfoCopy.max_votes_num"></el-input>
      </el-form-item>
      <el-form-item label="晋级作品数">
        <el-input v-model="roundInfoCopy.promotion_num"></el-input>
      </el-form-item>
      <el-form-item label="是否反票">
        <el-switch v-model="roundInfoCopy.is_negative" active-color="#67C23A" active-text="是" inactive-color="#F56C6C" inactive-text="否"></el-switch>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {updateRoundInfo} from "../../apis";

export default {
  name: "RoundInfoForm",
  props: {
    roundInfo: Object,
    submit: Boolean,
  },
  data () {
    return {
      roundInfoCopy: new Object(this.roundInfo)
    }
  },
  watch: {
    submit () {
      let data = this.roundInfoCopy
      data.max_votes_num = ~~data.max_votes_num
      data.promotion_num = ~~data.promotion_num
      updateRoundInfo(data).then(() => {
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