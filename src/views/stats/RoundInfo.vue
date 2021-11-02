<template>
  <div style="display: flex; justify-content: space-between;">
    <RoundTable style="width: 300px;"></RoundTable>
    <div style="width: calc(100% - 320px);">
      <div style="display: flex; justify-content: space-evenly; align-items: center;">
        <span>当前可晋级作品数：{{ promotionNum }}</span>
        <span>当前轮次可晋级作品数：{{ roundInfo[currentRoundIdx-1].promotion_num }}</span>
        <span>已选中晋级作品数：{{ votedWorks.length }}</span>
        <template v-if="currentRoundIdx<roundInfo.length">
          <el-button size="small" type="warning" @click="openNextRound">开放下一轮次</el-button>
        </template>
        <template v-else>
          <el-button size="small" type="danger" @click="closeJudge">结束线上评审</el-button>
        </template>
      </div>
      <div class="workContainer" style="flex-direction: column; margin-top: 10px;">
        <template v-for="(row, index) in sliceList(promotionInfo, 5)">
          <div class="workRow" style="width: 100%; display: flex; justify-content: space-evenly;" v-bind:key="index">
            <template v-for="(item,idx) in row">
              <div class="workBox" v-bind:key="idx" :class="item.checked?'workBoxChecked':''" @click="workBoxClickHandler(item)">
                <div class="imgNCheckBox">
                  <div><el-checkbox v-model="item.checked" :disabled="(roundInfo[currentRoundIdx].promotion_num === votedWorks.length) && !item.checked" @click.self.prevent></el-checkbox></div>
                  <div style="width: 148.5px; height: 210px;">
                    <el-image :src="item.img_list[0]" lazy></el-image>
                  </div>
                </div>
                <div style="margin-top: 10px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                  <span class="workName">{{ item.user_idx }} - {{ item.work_name }}</span>
                </div>
              </div>
            </template>
          </div>
        </template>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <el-pagination
            layout="total, sizes"
            @size-change="sizeChangeHandler"
            :page-size.sync="num"
            :total.sync="promotionNum"
            :page-sizes="[10,20]"
        ></el-pagination>
        <el-pagination
            layout="prev, pager, next, jumper"
            :current-page="page"
            @current-change="pageChangeHandler"
            :page-size.sync="num"
            :total.sync="promotionNum"
            :page-sizes="[10,20]"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import RoundTable from "../../components/roundInfo/RoundTable";
import {openNextRound, getRoundInfo, getPromotionInfo} from "../../apis";

export default {
  name: "RoundInfo",
  components: {RoundTable},
  data () {
    return {
      roundInfo: [],
      currentRoundIdx: 0,
      promotionNum: 0,
      page: 1,
      num: 10,
      votedWorks: [],
      voteInfo: [],
      promotionInfo: [],
    }
  },
  mounted() {
    getRoundInfo().then(res => {
      this.currentRoundIdx = res.data.current_round_idx
      this.roundInfo = res.data.round_info
    })
    this.getData()
  },
  computed: {
    sliceList () {
      return (data, count) => {
        let idx = 0
        let tmpArr = []
        if (data !== undefined) {
          for (let i = 0; i < data.length; i ++) {
            idx = parseInt(i / count)
            if (tmpArr.length <= idx) {
              tmpArr.push([])
            }
            tmpArr[idx].push(data[i])
          }
        }
        return tmpArr
      }
    }
  },
  methods: {
    pageChangeHandler (curPage) {
      this.page = curPage
      this.getData()
    },
    sizeChangeHandler (size) {
      this.num = size
      this.getData()
    },
    workBoxClickHandler (item) {
      if ((this.votedWorks.length === this.roundInfo[this.currentRoundIdx-1].promotion_num) && !item.checked) {
        this.$message({
          type: "warning",
          message: "不能再选了！",
        })
        return
      }
      item.checked = !item.checked
      this.checkChangeHandler(item)
    },
    checkChangeHandler (item) {
      let voteInfo = this.voteInfo
      let votedWorks = this.votedWorks
      if (!item.checked) {
        voteInfo.splice(voteInfo.findIndex(i => i.user_id === item.user_id), 1)
        votedWorks.splice(votedWorks.indexOf(item.user_id), 1)
      } else {
        voteInfo.push(item)
        voteInfo.sort((a, b) => {
          return a.user_id - b.user_id
        })
        votedWorks.push(item.user_id)
        votedWorks.sort((a, b) => {
          return a - b
        })
      }
    },
    openNextRound () {
      if (this.votedWorks.length === this.roundInfo[this.currentRoundIdx].promotion_num)
        this.$confirm("当前可晋级作品数超过本轮评审应该晋级的作品数，且没有人工平票重投。若开启下一轮次则当前所有可晋级作品均晋级到下一轮，且本轮次还未提交评审结果的评委的剩余票数将不计入总票数内。此操作不可逆，请确认。", "", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          let data = {
            voted_works: this.votedWorks
          }
          openNextRound(data).then(() => {
            this.$message({
              type: "success",
              message: "操作成功！",
            })
            location.reload()
          })
        }).catch(() => {
          this.$message({
            type: "error",
            message: "操作失败！",
          })
        })
      else if (this.votedWorks.length < this.roundInfo[this.currentRoundIdx].promotion_num)
        this.$confirm("当前平票重投选中作品数少于本轮评审应该晋级的作品数。若开启下一轮次则仅被选中的作品可晋级下一轮，且本轮次还未提交评审结果的评委的剩余票数将不计入总票数内。此操作不可逆，请确认。", "", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          let data = {
            voted_works: this.votedWorks
          }
          openNextRound(data).then(() => {
            this.$message({
              type: "success",
              message: "操作成功！",
            })
            setTimeout(() => {
              location.reload()
            }, 1000)
          })
        }).catch(() => {
          this.$message({
            type: "error",
            message: "操作失败！",
          })
        })
      else
        this.$confirm("即将开放下一轮次，本轮次还未提交评审结果的评委的剩余票数将不计入总票数内。此操作不可逆，请确认。", "", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          openNextRound().then(() => {
            this.$message({
              type: "success",
              message: "操作成功！",
            })
            setTimeout(() => {
              location.reload()
            }, 1000)
          })
        }).catch(() => {
          this.$message({
            type: "error",
            message: "操作失败！",
          })
        })
    },
    closeJudge () {
      this.$confirm("即将关闭线上评审，本轮次还未提交评审结果的评委的剩余票数将不计入总票数内。此操作不可逆，确认？", "", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        openNextRound().then(() => {
          this.$message({
            type: "success",
            message: "操作成功！",
          })
          setTimeout(() => {
            location.reload()
          }, 1000)
        })
      }).catch(() => {
        this.$message({
          type: "error",
          message: "操作失败！",
        })
      })
    },
    getData () {
      let data = {
        page: this.page,
        num: this.num,
      }
      getPromotionInfo(data).then((res) => {
        this.promotionNum = res.data.total
        let data = res.data.promotion_info
        data.forEach(item => {
          if (this.votedWorks.includes(item.user_id)) item.checked = true
          else item.checked = false
          if (item.work_name === "") item.work_name = "测试"
          if (!item.img_list ?? true) item.img_list = ["https://ivillages-images.oss-cn-qingdao.aliyuncs.com/1/static/imgs/test.png"]
        })
        this.promotionInfo = data
      })
    }
  }
}
</script>

<style scoped>

.title {
  font-family: Noto Sans SC;
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  line-height: 30px;
  display: flex;
  align-items: center;
  font-feature-settings: 'tnum' on, 'lnum' on;color: #303133;
}
.workContainer {
  width: 100%;
  border: 1px solid #E4E7ED;
  box-sizing: border-box;
  border-radius: 4px;
  height: calc(100% - 120px);
  overflow: auto;
  margin-bottom: 16px;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: #ffffff;
}
.workContainer:hover {
  animation: border .2s ease-in forwards;
}
.titleBox {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
  height: 40px;
}
.tipText {
  font-family: Noto Sans SC;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 18px;
  font-feature-settings: 'tnum' on, 'lnum' on;
  color: #909399;
  margin-top: 10px;
}
.workName {
  font-family: Arial;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 18px;
  text-align: center;
  color: #4D4F53;
}
.workBox {
  width: calc((100% - 60px) / 5);
  height: calc((100vh - 240px) / 2);
  border: 1px solid #DCDFE6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 30px 0;
  border-radius: 8px;
  min-width: 148.5px;
  max-width: 240px;
  min-height: 300px;
  max-height: 350px;
}
.workBox .imgNCheckBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 240px;
}
.workBox:hover {
  animation: border .2s ease-in forwards;
  cursor: pointer;
}
.workBoxChecked {
  border: 1px solid #409EFF;
}
@keyframes border {
  100% {
    border: 1px solid #409EFF;
  }
}
</style>