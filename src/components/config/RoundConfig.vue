<template>
  <div>
    <fieldset style="background: #ffffff;">
      <legend>轮次信息</legend>
      <el-table :data="roundInfo" v-loading="tableLoading">
        <el-table-column prop="round_index" label="轮次" align="center" width="80px"></el-table-column>
        <el-table-column prop="round_desc" label="描述" align="center"></el-table-column>
        <el-table-column prop="max_votes_num" label="最大投票数" align="center"></el-table-column>
        <el-table-column prop="promotion_num" label="晋级作品数" align="center"></el-table-column>
        <el-table-column label="是否反票" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.is_negative">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="180px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="editRoundInfo(scope.$index)">修改</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteRoundInfo(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px; text-align: left;">增加轮次：</div>
      <el-form label-position="left" inline style="width: 46vw">
        <el-form-item label="描述：" label-width="60px">
          <el-input v-model="newRoundInfo.round_desc" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="最大票数：">
          <el-input-number v-model="newRoundInfo.max_votes_num" size="mini" :min="0" controls-position="right"></el-input-number>
        </el-form-item>
        <el-form-item label="晋级作品数：">
          <el-input-number v-model="newRoundInfo.promotion_num" size="mini" :min="0" controls-position="right"></el-input-number>
        </el-form-item>
        <el-form-item label="是否反票">
          <el-switch v-model="newRoundInfo.is_negative" active-color="#67C23A" active-text="是" inactive-color="#F56C6C" inactive-text="否"></el-switch>
        </el-form-item><br>
        <el-form-item>
          <el-button type="danger" size="small" @click="clearForm">清空</el-button>
          <el-button type="primary" size="small" style="margin-left: 20px;" @click="submitForm">提交</el-button>
        </el-form-item>
      </el-form>
    </fieldset>
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
import RoundInfoForm from "./RoundInfoForm";

export default {
  name: "RoundConfig",
  components: {RoundInfoForm},
  data () {
    return {
      roundInfo: [],
      newRoundInfoDemo: {
        round_desc: "",
        max_votes_num: null,
        promotion_num: null,
        is_negative: false,
      },
      newRoundInfo: {
        round_desc: "",
        max_votes_num: null,
        promotion_num: null,
        is_negative: false,
      },
      editRoundInfoDialogVisible: false,
      editRoundInfoIdx: null,
      editRoundInfoSubmit: false,
      tableLoading: false,
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
        this.clearForm()
      }).catch(() => {
        this.$message({
          type: "error",
          message: "新建失败，请联系管理员!"
        })
      })
    },
    getData () {
      this.tableLoading = true
      getRoundInfo().then(res => {
        this.roundInfo = res.data.round_info
        this.tableLoading = false
      }).catch(() => {
        this.tableLoading = false
      })
    }
  }
}
</script>

<style scoped>

</style>