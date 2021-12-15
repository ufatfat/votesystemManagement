<template>
  <div style="margin-top: 10px; ">
    <div style="display: flex; align-items: center;">
      <span>当前开放竞赛：</span>
      <el-select v-model="contestID" size="mini" style="width: 300px" @change="openContest" :loading="contestSelectorLoading">
        <template v-for="(item, idx) in contests">
          <el-option :value="item.contest_id" :label="item.contest_name" v-bind:key="idx"></el-option>
        </template>
      </el-select>
      <el-button type="danger" size="mini" @click="deleteContest" style="margin-left: 20px;">删除此竞赛</el-button>
      <el-button type="primary" size="mini" @click="createContest" style="margin-left: 60px;">添加竞赛</el-button>
    </div>
    <fieldset>
      <legend>竞赛设置</legend>
      <fieldset>
        <legend>通用设置</legend>
        <div>
          <el-form label-position="left">
            <el-form-item label="竞赛名称">
              <el-input v-model="contestName" @change="updateContestName" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="背景图片：">
              <el-input v-model="conf.common.bgImg" size="mini" @change="updateImgUrl($event, 1)">
                <template slot="suffix">
                  <el-button @click="chooseImg(1)" type="primary" size="mini">选择上传</el-button>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="logo图片：">
              <el-input v-model="conf.common.logoImg" size="mini" @change="updateImgUrl($event, 2)">
                <template slot="suffix">
                  <el-button @click="chooseImg(2)" type="primary" size="mini">选择上传</el-button>
                </template>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </fieldset>
      <fieldset>
        <legend>时间设置</legend>
        <el-form inline>
          <el-form-item label="报名系统截止时间：">
            <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" v-model="registryEndDatetime" size="mini" @change="updateTimestamp(1)" placeholder="选择截止时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="上传作品开放时间：">
            <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" v-model="uploadBeginDatetime" size="mini" @change="updateTimestamp(2)" placeholder="选择截止时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="上传作品截止时间：">
            <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" v-model="uploadEndDatetime" size="mini" @change="updateTimestamp(3)" placeholder="选择截止时间"></el-date-picker>
          </el-form-item>
        </el-form>
      </fieldset>
      <fieldset>
        <legend>上传设置</legend>
        <el-form inline>
          <el-form-item label="文件大小限制：">
            <el-input v-model="maxFileSize" size="mini" @change="updateMaxFileSize">
              <el-select v-model="unit" size="mini" slot="append" placeholder="请选择" style="width: 100px">
                <template v-for="(item, idx) in units">
                  <el-option v-bind:key="idx" :value="idx" :label="item"></el-option>
                </template>
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item label="图纸数量限制：">
            <el-input-number size="mini" v-model="maxImageNum" controls-position="right" :precision="0" :step="1" @change="updateMaxImageNum"></el-input-number>
          </el-form-item>
          <el-form-item label="赛点：">
            <el-input size="mini" v-model="newWorkGroup">
              <el-select v-model="workGroup" size="mini" style="width:200px" placeholder="在右边增加赛点" slot="prepend">
                <template v-for="(item, idx) in workGroups">
                  <el-option :value="idx" v-bind:key="idx + 'workgroups'" :label="item">
                    <span style="float: left">{{ item }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">
                      <el-button size="mini" type="danger" @click="delWorkGroup(idx)">删除</el-button>
                    </span>
                  </el-option>
                </template>
              </el-select>
              <el-button slot="append" @click="addWorkGroup" style="width: 100px" size="mini" type="primary">添加赛点</el-button>
            </el-input>
          </el-form-item>
        </el-form>
      </fieldset>
    </fieldset>
    <input id="file1" type="file" @change="updateImg(1)" style="display: none;" accept="image/png, image/jpeg">
    <input id="file2" type="file" @change="updateImg(2)" style="display: none;" accept="image/png, image/jpeg">
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import {getConfig, getContestInfo, updateContest, uploadImage, deleteContest, createContest} from "../../../apis";

export default {
  name: "General",
  data () {
    return {
      contestSelectorLoading: false,
      contests: [],
      conf: {
        "pages": {
          "proc": "",
          "topic": "",
          "joinUs": "",
          "aboutUs": "",
          "rewards": "",
          "contactUs": ""
        },
        "common": {
          "bgImg": "",
          "logoImg": "",
          "themeColor": {
            "deep": "",
            "light": "",
            "deepest": "",
            "lightest": ""
          }
        },
        "system": {
          "uploadEndTimestamp": 0,
          "registryEndTimestamp": 0,
          "uploadBeginTimestamp": 0
        },
        "uploadRes": {
          "workGroups": [],
          "maxFileSize": 0,
          "maxImageNum": 0
        },
        "enableMarking": false
      },
      maxFileSize: 0,
      maxImageNum: 0,
      unit: 0,
      units: [
          "Bytes", "KiB", "MiB", "GiB"
      ],
      contestName: "",
      contestID: 0,
      registryEndDatetime: "",
      uploadBeginDatetime: "",
      uploadEndDatetime: "",
      workGroups: [],
      workGroup: 0,
      newWorkGroup: "",
    }
  },
  computed: {
    ...mapGetters([
        "config",
    ]),
  },
  mounted() {
    this.mount()
  },
  methods: {
    mount () {
      this.contestSelectorLoading = true
      getContestInfo().then(res => {
        let data = res.data
        data.forEach(item => {
          if (item.is_open) this.contestID = item.contest_id
        })
        this.contests = data
        this.conf = this.config.config
        this.contestName = this.config.contestName
        this.contestSelectorLoading = false

        this.updateDatetimes()
        let maxFileSize = this.config.config.uploadRes.maxFileSize, i = 0
        while (maxFileSize) {
          maxFileSize >>= 10
          i ++
        }
        this.unit = i - 1
        this.maxFileSize = this.config.config.uploadRes.maxFileSize >> (10 * (i - 1))
        this.maxImageNum = this.config.config.uploadRes.maxImageNum
        this.workGroups = this.config.config.uploadRes.workGroups
        console.log(this.conf)
      })
    },
    deleteContest () {
      this.$confirm("即将删除当前竞赛，此操作不可逆，确认？", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      }).then(() => {
        let data = {
          contest_id: this.contestID
        }
        deleteContest(data).then(() => {
          this.$message({
            type: "success",
            message: "删除成功"
          })
          this.contests.splice(this.contests.findIndex(item => item.contest_id === this.contestID), 1)
          this.contestID = this.contests[this.contests.length-1].contest_id
          this.openContest(this.contestID)
        }).catch(err => {
          this.$message({
            type: "error",
            message: "删除失败，原因：" + err.response.data.msg
          })
        })
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消",
        })
      })
    },
    createContest () {
      let conf = {
        "pages": {
          "proc": "",
          "topic": "",
          "joinUs": "",
          "aboutUs": "",
          "rewards": "",
          "contactUs": ""
        },
        "common": {
          "bgImg": "",
          "logoImg": "",
          "themeColor": {
            "deep": "",
            "light": "",
            "deepest": "",
            "lightest": ""
          }
        },
        "system": {
          "uploadEndTimestamp": 0,
          "registryEndTimestamp": 0,
          "uploadBeginTimestamp": 0
        },
        "uploadRes": {
          "workGroups": [],
          "maxFileSize": 0,
          "maxImageNum": 0
        },
        "enableMarking": false
      }
      let data = {
        config: JSON.stringify(conf)
      }
      createContest(data).then(() => {
        this.$message({
          type: "success",
          message: "添加成功"
        })
        this.mount()
      }).catch(err => {
        this.$message({
          type: "error",
          message: "添加失败，原因：" + err.response.data.msg
        })
      })
    },
    delWorkGroup (idx) {
      let config = this.config.config
      config.uploadRes.workGroups.splice(idx, 1)
      let data = {
        contest_id: this.contestID,
        config: JSON.stringify(config)
      }
      updateContest(data).then(() => {
        this.$message({
          type: "success",
          message: "删除成功"
        })
        let c = this.config
        c.config = config
        this.updateConfig(c)
        this.workGroups.splice(idx, 1)
      }).catch(err => {
        this.$message({
          type: "error",
          message: "删除失败，报错：" + err.response.data.msg
        })
      })
    },
    addWorkGroup () {
      let config = this.config.config
      config.uploadRes.workGroups.push(this.newWorkGroup)
      let data = {
        contest_id: this.contestID,
        config: JSON.stringify(config)
      }
      updateContest(data).then(() => {
        this.$message({
          type: "success",
          message: "添加成功"
        })
        let c = this.config
        c.config = config
        this.updateConfig(config)
        this.workGroups.push(this.newWorkGroup)
        this.newWorkGroup = ""
      }).catch(err => {
        this.$message({
          type: "error",
          message: "添加失败，报错：" + err.response.data.msg
        })
        this.newWorkGroup = ""
      })
    },
    ...mapMutations([
        "updateConfig"
    ]),
    updateDatetimes () {
      this.registryEndDatetime = this.formatDatetime(this.config.config.system.registryEndTimestamp)
      this.uploadBeginDatetime = this.formatDatetime(this.config.config.system.uploadBeginTimestamp)
      this.uploadEndDatetime = this.formatDatetime(this.config.config.system.uploadEndTimestamp)
    },
    formatDatetime (ts) {
      if (!ts) return ""
      let t = new Date(ts * 1000)
      let add0 = (t) => {
        if (t < 10) return "0" + t
        else return t
      }
      let y = t.getFullYear(),
          M = add0(t.getMonth() + 1),
          d = add0(t.getDate()),
          H = add0(t.getHours()),
          m = add0(t.getMinutes()),
          s = add0(t.getSeconds())
      return y + "-" + M + "-" + d + " " + H + ":" + m + ":" + s
    },
    chooseImg (val) {
      let elem = document.querySelector("#file" + val)
      elem.click()
    },
    updateImg (val) {
      let fd = new FormData()
      let elem = document.querySelector("#file" + val)
      let file = elem.files[0]
      fd.append("image", file)
      fd.append("suffix", file.name.slice(file.name.lastIndexOf(".")))
      uploadImage(fd).then(res => {
        let config = this.config.config
        val === 1 ? (config.common.bgImg = res.data.url) : (config.common.logoImg = res.data.url)
        let data = {
          contest_id: this.contestID,
          config: JSON.stringify(config)
        }
        updateContest(data).then(() => {
          let c = this.config
          c.config = config
          this.updateConfig(c)
          this.$message({
            type: "success",
            message: "上传成功",
          })
        }).catch(err => {
          this.$message({
            type: "error",
            message: "上传失败，报错：" + err.response.data.msg
          })
        })
      }).catch(err => {
        this.$message({
          type: "error",
          message: "上传失败，报错：" + err.response.data.msg
        })
      })
    },
    updateImgUrl (val, idx) {
      let config = this.config.config
      idx === 1 ? (config.common.bgImg = val) : (config.common.logoImg = val)
      let data = {
        contest_id: this.contestID,
        config: JSON.stringify(config)
      }
      updateContest(data).then(() => {
        let c = this.config
        c.config = config
        this.updateConfig(c)
        this.$message({
          type: "success",
          message: "上传成功",
        })
      }).catch(err => {
        this.$message({
          type: "error",
          message: "上传失败，报错：" + err.response.data.msg
        })
      })
    },
    openContest (val) {
      this.contestSelectorLoading = true
      let data = {
        contest_id: val,
        is_open: true,
      }
      updateContest(data).then(() => {
        this.$message({
          type: "success",
          message: "更新成功！",
        })
        this.axios.defaults.headers["ContestID"] = this.contestID
        getConfig().then(res => {
          let d = res.data
          d.config = JSON.parse(d.config)
          this.updateConfig(d)
          this.updateDatetimes()
          this.contestSelectorLoading = false
          this.mount()
        }).catch(() => {
          this.contestSelectorLoading = false
        })
      }).catch(() => {
        this.$message({
          type: "error",
          message: "更新失败，请联系管理员",
        })
        this.contestSelectorLoading = false
      })
    },
    updateTimestamp (idx) {
      let config = this.config.config
      switch (idx) {
        case 1:
          config.system.registryEndTimestamp = (new Date(this.registryEndDatetime).getTime()) / 1000
          break
        case 2:
          config.system.registryEndTimestamp = (new Date(this.uploadBeginDatetime).getTime()) / 1000
          break
        case 3:
          config.system.registryEndTimestamp = (new Date(this.uploadEndDatetime).getTime()) / 1000
          break
      }
      let data = {
        contest_id: this.contestID,
        config: JSON.stringify(config)
      }
      updateContest(data).then(() => {
        this.updateConfig(config)
        this.$message({
          type: "success",
          message: "更新成功",
        })
        let c = this.config
        c.config = config
        this.updateConfig(c)
      }).catch(err => {
        this.$message({
          type: "error",
          message: "更新失败，报错：" + err.response.data.msg
        })
      })
    },
    updateMaxFileSize () {
      let conf = this.config.config
      conf.uploadRes.maxFileSize = this.maxFileSize << (this.unit * 10)
      let data = {
        contest_id: this.contestID,
        config: JSON.stringify(conf)
      }
      updateContest(data).then(() => {
        this.$message({
          type: "success",
          message: "更新成功"
        })
        let c = this.config
        c.config = conf
        this.updateConfig(c)
      }).catch(err => {
        this.$message({
          type: "error",
          message: "更新失败，报错：" + err.response.data.msg
        })
      })
    },
    updateMaxImageNum () {
      let conf = this.config.config
      conf.uploadRes.maxImageNum = this.maxImageNum
      let data = {
        contest_id: this.contestID,
        config: JSON.stringify(conf)
      }
      updateContest(data).then(() => {
        this.$message({
          type: "success",
          message: "更新成功"
        })
        let c = this.config
        c.config = conf
        this.updateConfig(c)
      }).catch(err => {
        this.$message({
          type: "error",
          message: "更新失败，报错：" + err.response.data.msg
        })
      })
    },
    updateContestName (val) {
      let data = {
        contest_id: this.contestID,
        contest_name: val
      }
      updateContest(data).then()
    }
  }
}
</script>

<style scoped>
fieldset {
  background: #ffffff;
}

.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__append {
  background-color: #fff;
}
</style>