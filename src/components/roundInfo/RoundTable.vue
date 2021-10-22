<template>
  <div>
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
      <span>
        当前轮次：{{ currentRoundIdx }}
      </span>
      <el-select size="small" v-model="selectedRoundID" @change="changeHandler">
        <el-option
            v-for="item in roundInfo"
            :key="item.round_id"
            :label="item.round_desc"
            :value="item.round_id"
            :disabled="item.round_index>currentRoundIdx"
        >
        </el-option>
      </el-select>
    </div>
    <el-table :data="roundData" v-loading="tableLoading">
      <el-table-column prop="name" label="评委姓名" align="center"></el-table-column>
      <el-table-column label="是否已提交结果" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.is_done">
            已提交
          </template>
          <template v-else>
            未提交
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getRoundData, getRoundInfo} from "../../apis";

export default {
  name: "VoteStatTable",
  data () {
    return {
      currentRoundIdx: 0,
      selectedRoundID: 0,
      roundData: [],
      roundInfo: [],
      tableLoading: false,
    }
  },
  mounted() {
    getRoundInfo().then(res => {
      this.currentRoundIdx = res.data.current_round_idx
      this.selectedRoundID = res.data.current_round_idx
      this.roundInfo = res.data.round_info
      this.getData()
    })
  },
  methods: {
    changeHandler () {
      this.getData()
    },
    getData () {
      this.tableLoading = true
      let data = {
        round_id: this.selectedRoundID,
      }
      getRoundData(data).then(res => {
        this.roundData = res.data
        this.tableLoading = false
      })
    }
  }
}
</script>

<style scoped>

</style>