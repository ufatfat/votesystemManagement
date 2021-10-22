<template>
  <div>
    <el-table :data="voteInfos" v-loading="tableLoading" @sort-change="sortChange">
      <el-table-column label="作品信息" align="center" fixed="left" sortable="custom">
        <template slot-scope="scope">
          <div><b>{{ scope.row.work_name }}</b></div>
          <el-image :src="scope.row.img_list[0]" :preview-src-list="scope.row.img_list" style="width: 60px;"></el-image>
          <div>当前票数：{{ scope.row.votes }}</div>
        </template>
      </el-table-column>
      <template v-for="(item, idx) in judgeInfos">
        <el-table-column :label="item.name" v-bind:key="idx" align="center">
          <template slot-scope="scope">
            {{ isVoted(scope.column.id, scope.row.user_id)}}
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="pagination">
      <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          :current-page="page"
          @current-change="pageChangeHandler"
          @size-change="sizeChangeHandler"
          :page-size.sync="num"
          :total.sync="total"
          :page-sizes="[10,20,50]"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import {getJudgeInfos, getVotesStats} from "../../apis"

export default {
  name: "Vote",
  data () {
    return {
      page: 1,
      num: 20,
      total: 0,
      roundIdx: 1,
      voteInfos: [],
      judgeInfos: [],
      isVoted: (columnID, workID) => {
        let idx = (~~columnID.slice(columnID.lastIndexOf("_")+1, columnID.length)) - 2
        if (idx > this.judgeInfos.length) location.reload()
        if (this.judgeInfos[idx].voted_works.includes(workID.toString())) return 1
        else return 0
      },
      tableLoading: false,
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    sortChange (p) {
      let sortOrder = p.order
      switch (sortOrder) {
        case "ascending":
          this.getData(1)
          break
        case "descending":
          this.getData(-1)
          break
        default:
          this.getData()
          break
      }
    },
    pageChangeHandler (val) {
      this.page = val
      this.getData()
    },
    sizeChangeHandler () {
      this.getData()
    },
    getData (sortOrder = 0) {
      this.tableLoading = true
      getJudgeInfos().then(res => {
        let data = res.data
        data.forEach(item => item.voted_works = item.voted_works.split(","))
        this.judgeInfos = data
      })
      let data = {
        page: 1,
        num: 20,
        round_idx: this.roundIdx,
        sort_order: sortOrder,
      }
      getVotesStats(data).then(res => {
        let data = res.data.data
        data.forEach(item => {
          if (item.img_list.length > 0) {
            item.img_list.forEach((i, idx) => {
              item.img_list[idx] = i.slice(0, i.lastIndexOf(".")) + "_compressed" + i.slice(i.lastIndexOf("."), i.length)
            })
          }
        })
        this.voteInfos = data
        this.total = res.data.total
        this.tableLoading = false
      })
    }
  },
}
</script>

<style scoped>

</style>