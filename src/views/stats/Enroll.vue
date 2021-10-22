<template>
  <div>
    <div style="display: flex; flex-wrap: wrap; align-items: center;">
      <div style="display: flex; align-items: center;">
        <span>仅已上传图片：</span>
        <el-switch v-model="isPreviewMode" active-color="#13ce66" @change="previewModeChangeHandler"></el-switch>
      </div>
    </div>
    <el-table :data="enrollStatsData" v-loading="tableLoading" style="width: 100%; margin: 20px auto;" :fit="true" >
      <el-table-column type="index" label="序号" align="center" fixed="left">
        <template slot-scope="scope">
          {{ (page-1)*num+scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column prop="username" label="姓名" align="center" fixed="left"></el-table-column>
      <el-table-column prop="work_name" label="作品名称" align="center" width="150" fixed="left"></el-table-column>
      <el-table-column prop="img_num" label="图纸张数" align="center" fixed="left"></el-table-column>
      <el-table-column prop="img_list" label="图纸预览" align="center" fixed>
        <template slot-scope="scope">
          <template v-if="scope.row.img_list.length===0">
            暂未上传
          </template>
          <template v-else>
            <el-image :src="scope.row.img_list[0]" :preview-src-list="scope.row.img_list"></el-image>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="is_enroll_form_uploaded" label="报名表" align="center" width="120" fixed="left">
        <template slot-scope="scope">
          <el-button v-if="scope.row.is_enroll_form_uploaded" type="primary" size="mini" @click="download(scope, 'enroll_form')">点此下载</el-button>
          <span v-else>暂未上传</span>
        </template>
      </el-table-column>
      <el-table-column prop="is_design_desc_uploaded" label="设计说明" align="center" width="120" fixed="left">
        <template slot-scope="scope">
          <el-button v-if="scope.row.is_design_desc_uploaded" type="primary" size="mini" @click="download(scope, 'design_desc')">点此下载</el-button>
          <span v-else>暂未上传</span>
        </template>
      </el-table-column>
      <el-table-column prop="sex" label="性别" align="center">
        <template slot-scope="scope">
          {{ scope.row.sex === 1 ? "男" : "女" }}
        </template>
      </el-table-column>
      <el-table-column prop="edu_bg" label="学历层次" align="center">
        <template slot-scope="scope">
          {{ eduBG[scope.row.edu_bg-1] }}
        </template>
      </el-table-column>
      <el-table-column prop="univ" label="学校" align="center" width="150"></el-table-column>
      <el-table-column prop="school" label="学院" align="center" width="180"></el-table-column>
      <el-table-column prop="major" label="专业" align="center" width="180"></el-table-column>
      <el-table-column prop="teacher" label="指导教师" align="center"></el-table-column>
      <el-table-column prop="teammates" label="团队成员" align="center"></el-table-column>
      <el-table-column prop="in_time" label="入学时间" align="center"></el-table-column>
      <el-table-column prop="out_time" label="毕业时间" align="center"></el-table-column>
      <el-table-column prop="stu_id" label="学号" align="center" min-width="150"></el-table-column>
      <el-table-column prop="phone" label="电话号码" align="center" min-width="150"></el-table-column>
      <el-table-column prop="email" label="电子邮箱" align="center" min-width="180"></el-table-column>
      <el-table-column prop="id_type" label="证件类型" align="center">
        <template slot-scope="scope">
          {{ IDType[scope.row.id_type-1] }}
        </template>
      </el-table-column>
      <el-table-column prop="id_no" label="证件号码" align="center" min-width="210"></el-table-column>
      <el-table-column prop="msg_source" label="消息来源" align="center" min-width="150">
        <template slot-scope="scope">
          {{ msgSource[scope.row.msg_source-1] }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" align="center" label="操作" width="200"></el-table-column>
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
import {getEnrollStats} from "@/apis";
export default {
  name: "Enroll",
  data() {
    return {
      enrollStatsData: [],
      eduBG: ["中职中专","高职高专","本科","硕士","博士","其它"],
      IDType: ["身份证","护照","港澳居民来往内地通行证"],
      msgSource: ["乡村复兴论坛","知识雷锋","其它"],
      page: 1,
      num: 20,
      total: 0,
      roundIdx: 1,
      isPreviewMode: false,
      tableLoading: false,
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    pageChangeHandler (val) {
      this.page = val
      this.getData()
    },
    sizeChangeHandler () {
      this.getData()
    },
    previewModeChangeHandler () {
      this.getData()
    },
    download (scope, type) {
      console.log(scope)
      window.open("https://ivillages-images.oss-cn-qingdao.aliyuncs.com/1/" + scope.row.user_id + "/" + type + ".docx")
    },
    getData () {
      this.tableLoading = true
      let data = {
        page: this.page,
        num: this.num,
        is_preview_mode: this.isPreviewMode,
        round_idx: this.roundIdx,
      }
      getEnrollStats(data).then(res => {
        let data = res.data.data
        data.forEach(item => {
          if (item.img_list.length > 0) {
            item.img_list.forEach((i, idx) => {
              item.img_list[idx] = i.slice(0, i.lastIndexOf(".")) + "_compressed" + i.slice(i.lastIndexOf("."), i.length)
            })
          }
        })
        this.enrollStatsData = data
        this.tableLoading = false
        this.total = res.data.total
      })
    },
  }
}
</script>

<style scoped>

</style>