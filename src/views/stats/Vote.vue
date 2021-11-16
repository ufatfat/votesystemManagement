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
      <el-button @click="getData" type="primary" size="mini">获取数据</el-button>&emsp;
      <el-button @click="download" type="success" size="mini">下载文件</el-button>
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
      let d = {}
      this.roundInfo.forEach(item => {
        if (item.round_index === this.roundIdx) d.round_id = item.round_id
      })
      getJudgeInfos(d).then(res => {
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
    },
    download () {
      let str = ["作品名", "作品编号", "总票数"]
      this.judgeInfos.forEach(item => {
        str.push(item.name)
      })
      str = str.join("\t,") + "\n"
      let data = {
        page: 1,
        num: 0,
        round_idx: this.roundIdx,
        sort_order: this.order,
      }
      getVotesStats(data).then(res => {
        let d = res.data.data
        d.forEach(item => {
          str += item.name + "\t," + item.user_idx + "\t," + item.votes + "\t,"
          this.judgeInfos.forEach(i => {
            if (i.voted_works.includes(item.user_id.toString())) str += "1\t,"
            else str += "0\t,"
          })
          str += "\n"
        })
        let uri = "data:text/csv;charset=utf-8,\ufeff" + encodeURIComponent(str)
        let link = document.createElement("a")
        link.href = uri
        link.download = "数据.csv"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
      // let map = ["username", "group_id", "updated_timestamp", "work_name", "img_num", "is_enroll_form_uploaded", "is_design_desc_uploaded", "sex", "edu_bg", "univ", "school", "major", "teacher", "teammates", "in_time", "out_time", "stu_id", "phone", "email", "id_type", "id_no", "msg_source"]
      // getFileData().then(res => {
      //   let data = res.data
      //   data.forEach((item, idx) => {
      //     str += idx + "\t,"
      //     for (let i in map) {
      //       switch (map[i]) {
      //         case "group_id":
      //           if (item[map[i]]) {
      //             str += `${this.workGroup[item[map[i]] - 1] + "\t"},`
      //           } else {
      //             str += "未选择,"
      //           }
      //           break
      //         case "img_num":
      //           str += item[map[i]] === undefined ? "0," : `${item[map[i]] + "\t"},`
      //           break
      //         case "sex":
      //           str += item[map[i]] === 1 ? "男," : "女,"
      //           break
      //         case "edu_bg":
      //           str += `${this.eduBG[item[map[i]] - 1] + "\t"},`
      //           break
      //         case "msg_source":
      //           str += `${this.msgSource[item[map[i]] - 1] + "\t"},`
      //           break
      //         case "id_type":
      //           str += `${this.IDType[[item[map[i]]] - 1] + "\t"},`
      //           break
      //         case "is_enroll_form_uploaded":
      //           if (item[map[i]]) {
      //             str += "https://ivillages-images.oss-cn-qingdao.aliyuncs.com/1/" + item["user_id"] + "/enroll_form.docx\t,"
      //           } else {
      //             str += "暂未上传,"
      //           }
      //           break
      //         case "is_design_desc_uploaded":
      //           if (item[map[i]]) {
      //             str += "https://ivillages-images.oss-cn-qingdao.aliyuncs.com/1/" + item["user_id"] + "/design_desc.docx\t,"
      //           } else {
      //             str += "暂未上传,"
      //           }
      //           break
      //         default:
      //           str += `${item[map[i]] + "\t"},`
      //       }
      //     }
      //     str += "\n"
      //   })
      // })
    }
  },
}
</script>

<style scoped>

</style>