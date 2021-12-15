<template>
  <div style="display: flex; align-items: flex-start; justify-content: space-between;">
    <div style="display: flex; flex-direction: column; width: 48%; align-items: center">
      <RoundConfig></RoundConfig>
    </div>
    <div style="display: flex; flex-direction: column; width: 48%; align-items: center">
      <JudgeConfig></JudgeConfig>
    </div>
    <el-dialog title="修改轮次信息" :visible.sync="editRoundInfoDialogVisible">
      <RoundInfoForm :round-info="roundInfo[editRoundInfoIdx]" :submit="editRoundInfoSubmit"></RoundInfoForm>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editRoundInfoDialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="editRoundInfoDialogVisible=false;editRoundInfoSubmit=true">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {getRoundInfo, deleteRound, createNewRound} from "../../apis";
import RoundConfig from "../../components/config/contest/RoundConfig";
import JudgeConfig from "../../components/config/contest/JudgeConfig";

export default {
  name: "Contest",
  components: {JudgeConfig, RoundConfig},
  data () {
    return {
      roundInfo: [],
      newRoundInfoDemo: {
        round_desc: "",
        max_votes_num: null,
        promotion_num: null,
      },
      newRoundInfo: {
        round_desc: "",
        max_votes_num: null,
        promotion_num: null,
      },
      editRoundInfoDialogVisible: false,
      editRoundInfoIdx: null,
      editRoundInfoSubmit: false,
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    editRoundInfo (idx) {
      this.editRoundInfoIdx = idx
      this.editRoundInfoDialogVisible = true
    },
    deleteRoundInfo (idx) {
      let data = {
        round_id: this.roundInfo[idx].round_id
      }
      deleteRound(data).then(() => {
        this.$message({
          type: "success",
          message: "删除成功！",
        })
        this.roundInfo.splice(idx, 1)
      }).catch(() => {
        this.$message({
          type: "error",
          message: "删除失败，请联系管理员!"
        })
      })
    },
    clearForm () {
      this.newRoundInfo = this.newRoundInfoDemo
    },
    submitForm () {
      let data = this.newRoundInfo
      createNewRound(data).then((res) => {
        this.$message({
          type: "success",
          message: "新建成功！",
        })
        data.round_index = this.roundInfo.length+1
        data.round_id = res.data.round_id
        this.roundInfo.push(data)
      }).catch(() => {
        this.$message({
          type: "error",
          message: "新建失败，请联系管理员!"
        })
      })
    },
    getData () {
      getRoundInfo().then(res => {
        this.roundInfo = res.data.round_info
      })
    }
  }
}
</script>

<style scoped>

</style>