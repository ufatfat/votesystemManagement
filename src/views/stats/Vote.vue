<template>
  <div>
    <div style="margin-bottom: 10px">
      选择轮次：
      <el-select v-model="roundIdx" size="mini">
        <el-option
            v-for="item in roundInfo"
            :key="item.round_id"
            :label="item.round_desc"
            :value="item.round_index">
        </el-option>
      </el-select>&emsp;
      <el-button @click="getData" type="primary" size="mini">获取数据</el-button>
    </div>
    <el-table :data="voteInfos" v-loading="tableLoading" @sort-change="sortChange">
      <el-table-column label="作品信息" align="center" fixed="left" sortable="custom">
        <template slot-scope="scope">
          <div><b>{{ scope.row.name }}</b></div>
          <el-image :src="scope.row.img_list[0]" :preview-src-list="scope.row.img_list" style="width: 60px;"></el-image>
          <div>当前票数：{{ scope.row.votes }}</div>
        </template>
      </el-table-column>
      <template v-for="(item, idx) in judgeInfos">
        <el-table-column :label="item.name" v-bind:key="idx" align="center" :index="idx">
          <template slot-scope="scope">
            {{ isVoted(scope.column.index, scope.row.user_id)}}
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="pagination">
      <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          :current-page.sync="page"
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
import {getJudgeInfos, getRoundInfo, getVotesStats} from "../../apis"

export default {
  name: "Vote",
  data () {
    return {
      page: 1,
      num: 20,
      total: 0,
      roundIdx: 1,
      roundInfo: [],
      voteInfos: [],
      judgeInfos: [],
      order: 0,
      isVoted: (columnID, workID) => {
        if (this.judgeInfos[columnID].voted_works.includes(workID.toString())) return 1
        else return 0
      },
      tableLoading: false,
    }
  },
  mounted() {
    this.page = ~~(this.$route.query["page"] ?? 1)
    this.num = ~~(this.$route.query["num"] ?? 20)
    getRoundInfo().then(res => {
      this.roundIdx = res.data.current_round_idx
      this.roundInfo = res.data.round_info
      this.getData()
    })
  },
  methods: {
    sortChange (p) {
      let sortOrder = p.order
      switch (sortOrder) {
        case "ascending":
          this.order = 1
          break
        case "descending":
          this.order = -1
          break
        default:
          this.order = 0
          break
      }
      this.page = ~~(this.$route.query["page"] ?? 1)
      this.num = ~~(this.$route.query["num"] ?? 20)
      this.getData()
    },
    pageChangeHandler (val) {
      let url = location.pathname + "?page=" + val + "&num=" + this.num
      history.pushState({url: url, title: document.title}, document.title, url)
      this.page = val
      this.getData()
    },
    sizeChangeHandler (val) {
      let url = location.pathname + "?page=" + this.page + "&num=" + val
      history.pushState({url: url, title: document.title}, document.title, url)
      this.num = val
      this.getData()
    },
    getData () {
      this.tableLoading = true
      getJudgeInfos().then(res => {
        let data = res.data
        data.forEach(item => item.voted_works = item.voted_works.split(","))
        this.judgeInfos = data
      })
      let data = {
        page: this.page,
        num: this.num,
        round_idx: this.roundIdx,
        sort_order: this.order,
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