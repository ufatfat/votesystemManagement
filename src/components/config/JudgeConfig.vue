<template>
  <div>
    <fieldset style="background: #ffffff;">
      <legend>评委信息</legend>
      <el-table :data="judgeData" v-loading="tableLoading">
        <el-table-column type="index" align="center" width="50px" label="序号"></el-table-column>
        <el-table-column prop="name" align="center" label="姓名"></el-table-column>
        <el-table-column prop="is_rules_read" align="center" label="评审规则已读">
          <template slot-scope="scope">
            <span v-if="scope.row.is_rules_read">
              已读
            </span>
            <span v-else>
              未读
            </span>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="editJudge(scope.$index)">修改</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteJudge(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px; text-align: left;">增加评委：</div>
      <el-form label-position="left" style="width: 46vw" label-width="auto">
        <el-form-item label="手机号：">
          <el-input v-model="newJudgeInfo.username" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input v-model="newJudgeInfo.name" size="mini" controls-position="right"></el-input>
        </el-form-item>
        <el-form-item label="初始密码：">
          <el-input v-model="newJudgeInfo.password" size="mini" controls-position="right"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" size="small" @click="clearForm">清空</el-button>
          <el-button type="primary" size="small" style="margin-left: 20px;" @click="submitForm">提交</el-button>
        </el-form-item>
      </el-form>
    </fieldset>
    <el-dialog title="修改评委信息" :visible.sync="editDialogVisible">
      <JudgeInfoForm :judge-info="judgeData[editJudgeIdx]" :submit="editSubmit"></JudgeInfoForm>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="editDialogVisible=false;editSubmit=true">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {createNewJudge, deleteJudge, getJudgeInfos} from "../../apis";
import JudgeInfoForm from "./JudgeInfoForm";

export default {
  name: "JudgeConfig",
  components: {JudgeInfoForm},
  data () {
    return {
      judgeData: [],
      newJudgeInfo: {
        name: "",
        username: "",
        password: "",
      },
      newJudgeInfoDemo: {},
      tableLoading: false,
      editDialogVisible: false,
      editSubmit: false,
      editJudgeIdx: null,
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    editJudge (idx) {
      this.editJudgeIdx = idx
      this.editDialogVisible = true
    },
    deleteJudge (idx) {
      let data = {
        judge_id: this.judgeData[idx].judge_id
      }
      deleteJudge(data).then(() => {
        this.$message({
          type: "success",
          message: "删除成功！",
        })
        this.judgeData.splice(idx, 1)
      }).catch(() => {
        this.$message({
          type: "error",
          message: "删除失败，请联系管理员!"
        })
      })
    },
    clearForm () {
      this.newJudgeInfo = this.newJudgeInfoDemo
    },
    submitForm () {
      let data = this.newJudgeInfo
      createNewJudge(data).then((res) => {
        this.$message({
          type: "success",
          message: "新建成功！",
        })
        data.judge_id = res.data.judge_id
        this.judgeData.push(data)
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
      getJudgeInfos().then(res => {
        this.judgeData = res.data
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