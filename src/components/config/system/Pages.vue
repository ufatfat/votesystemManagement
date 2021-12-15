<template>
  <div style="margin-top: 10px;">
    <div style="display: flex; align-items: center;">
      <span>选择页面：</span>
      <el-select v-model="selectedPage" size="mini" style="width: 300px" @change="changePage">
        <template v-for="(item, idx) in pages">
          <el-option :value="item.page_name_en" :label="item.page_name_cn" v-bind:key="idx"></el-option>
        </template>
      </el-select>
      <el-button type="primary" size="mini" style="margin-left: 20px;" @click="savePageChange">保存修改</el-button>
    </div>
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-top: 20px;">
      <div style="width: 49%">
        <div style="display: flex; justify-content: flex-start;">编辑：</div>
        <wysiwyg v-model="html" style="background: #ffffff; "></wysiwyg>
      </div>
      <div style="width: 49%;">
        <div style="display: flex; justify-content: flex-start;">预览：</div>
        <div style="padding: 5px; background: #ffffff;">
          <div v-html="html"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import {updateContest} from "../../../apis";

export default {
  name: "Pages",
  data () {
    return {
      html: "",
      contestID: 0,
      selectedPage: "topic",
      pages: [{
        page_name_en: "proc",
        page_name_cn: "赛事流程"
      }, {
        page_name_en: "topic",
        page_name_cn: "竞赛主题"
      }, {
        page_name_en: "joinUs",
        page_name_cn: "欢迎加入"
      }, {
        page_name_en: "aboutUs",
        page_name_cn: "关于我们"
      }, {
        page_name_en: "contactUs",
        page_name_cn: "联系我们"
      }, {
        page_name_en: "rewards",
        page_name_cn: "奖项设置"
      }],
    }
  },
  mounted() {
    this.html = this.unescape(this.config.config.pages[this.selectedPage])
    this.axios.get("/contest_id").then(res => {
      this.contestID = res.data.contest_id
    })
  },
  computed: {
    ...mapGetters([
        "config"
    ]),
  },
  methods: {
    ...mapMutations([
        "updateConfig"
    ]),
    changePage (val) {
      this.selectedPage = val
      this.html = this.unescape(this.config.config.pages[this.selectedPage])
    },
    savePageChange () {
      let config = this.config.config
      config.pages[this.selectedPage] = this.html
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
          message: "更新成功",
        })
      }).catch(err => {
        this.$message({
          type: "error",
          message: "更新失败，报错：" + err.response.data.msg
        })
      })
    }
  }
}
</script>

<style scoped>

</style>