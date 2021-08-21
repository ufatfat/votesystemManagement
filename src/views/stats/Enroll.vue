<template>
  <div>
    <el-table :data="enrollStatsData" style="width: 98%; margin: 50px auto;" :fit="true">
      <el-table-column type="index" label="序号" align="center" fixed="left"></el-table-column>
      <el-table-column prop="username" label="姓名" align="center" fixed="left"></el-table-column>
      <el-table-column prop="work_name" label="作品名称" align="center" width="150" fixed="left"></el-table-column>
      <el-table-column prop="img_num" label="图纸张数" align="center" fixed="left"></el-table-column>
      <el-table-column prop="is_enroll_form_uploaded" label="报名表" align="center" width="120" fixed="left">
        <template slot-scope="scope">
          <el-button v-if="scope.row.is_enroll_form_uploaded" type="primary" size="mini" @click="download">点此下载</el-button>
          <span v-else>暂未上传</span>
        </template>
      </el-table-column>
      <el-table-column prop="is_design_desc_uploaded" label="设计说明" align="center" width="120" fixed="left">
        <template slot-scope="scope">
          <el-button v-if="scope.row.is_design_desc_uploaded" type="primary" size="mini">点此下载</el-button>
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
          layout="prev, pager, next"
          :current-page="page"
          @current-change="pageChangeHandler"
          :page-size.sync="num"
          :total.sync="total"
          :hide-on-single-page="true"
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
    getData () {
      let data = {
        page: this.page,
        num: this.num,
      }
      getEnrollStats(data).then(res => {
        this.enrollStatsData = res.data.data
      })
    }
  }
}
</script>

<style scoped>

</style>