<template>
  <div style="display: flex; justify-content: space-between;">
    <RoundTable style="width: 400px;"></RoundTable>
    <div style="width: calc(100% - 420px);">
      <el-button @click="openNextRound">开放下一轮次</el-button>
    </div>
  </div>
</template>

<script>
import RoundTable from "../../components/roundInfo/RoundTable";
import {openNextRound} from "../../apis";

export default {
  name: "RoundInfo",
  components: {RoundTable},
  data () {
    return {

    }
  },
  methods: {
    openNextRound () {
      this.$confirm("即将开放下一轮次，本轮次还未提交评审结果的评委的剩余票数将不计入总票数内。此操作不可逆，确认？", "", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        openNextRound().then(() => {
          this.$message({
            type: "success",
            message: "操作成功！",
          })
        })
      }).catch(() => {

      })
    }
  }
}
</script>

<style scoped>

</style>