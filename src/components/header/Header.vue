<template>
  <div id="header">
    <div class="leftTitle">
      <el-image :src="config.config.common.logoImg" class="logo"></el-image>
      <el-menu
          style="margin-left: 20px;"
          :default-active="$router.currentRoute.name"
          mode="horizontal"
          :router="true"
      >
        <el-menu-item index="/index">
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="/stats">
          <template slot="title">
            <span>当前竞赛</span>
          </template>
          <el-menu-item-group>
            <template slot="title">投稿</template>
            <el-menu-item style="text-align: center;" index="/enroll_stats">投稿情况</el-menu-item>
            <el-menu-item style="text-align: center;" @click="getFileData">下载投稿数据</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">评审</template>
            <el-menu-item style="text-align: center;" index="/vote_stats">投票统计</el-menu-item>
            <el-menu-item style="text-align: center;" index="/round_info">轮次信息</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="/config">
          <template slot="title">
            <span>设置</span>
          </template>
          <el-menu-item-group>
            <template slot="title">系统</template>
            <el-menu-item style="text-align: center;" index="/system_config">系统设置</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">比赛</template>
            <el-menu-item style="text-align: center;" index="/contest_config">比赛设置</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <div class="rightBtn" v-if="userInfo">
      <div style="display: flex; align-items: center;">
        <span>欢迎，{{ userInfo.username }}</span>
        <el-button size="small" style="margin-left: 20px;" @click="signOutHandler">登出</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import {getFileData} from "../../apis";

export default {
  name: "Header",
  data () {
    return {
      eduBG: ["中职中专","高职高专","本科","硕士","博士","其它"],
      IDType: ["身份证","护照","港澳居民来往内地通行证"],
      msgSource: ["乡村复兴论坛","知识雷锋","其它"],
      workGroup: ["骆驼道村游客服务中心改造设计","小河村接待中心建筑设计","牵牛镇村玉皇阁景观修复设计","辛兴村兽医站景观改造设计","下董寨村悬崖餐厅改造设计"],
    }
  },
  computed: {
    ...mapGetters([
      "userInfo",
      "config",
    ])
  },
  watch: {
    "$route" () {
    }
  },
  mounted() {
    this.eduBG = this.config
  },
  methods: {
    ...mapMutations([
      "signOut",
    ]),
    signOutHandler () {
      this.signOut()
      this.$router.push({
        path: "/sign-in"
      })
    },
    getFileData () {
      let str = "序号,姓名,设计点位,上传时间,作品名称,图纸张数,报名表,设计说明,性别,学历层次,学校,学院,专业,指导教师,团队成员,入学时间,毕业时间,学号,电话号码,电子邮箱,证件类型,证件号码,消息来源\n"
      let map = ["username", "group_id", "updated_timestamp", "work_name", "img_num", "is_enroll_form_uploaded", "is_design_desc_uploaded", "sex", "edu_bg", "univ", "school", "major", "teacher", "teammates", "in_time", "out_time", "stu_id", "phone", "email", "id_type", "id_no", "msg_source"]
      getFileData().then(res => {
        let data = res.data
        data.forEach((item, idx) => {
          str += idx + "\t,"
          for (let i in map) {
            switch (map[i]) {
              case "group_id":
                if (item[map[i]]) {
                  str += `${this.workGroup[item[map[i]] - 1] + "\t"},`
                } else {
                  str += "未选择,"
                }
                break
              case "img_num":
                str += item[map[i]] === undefined ? "0," : `${item[map[i]] + "\t"},`
                break
              case "sex":
                str += item[map[i]] === 1 ? "男," : "女,"
                break
              case "edu_bg":
                str += `${this.eduBG[item[map[i]] - 1] + "\t"},`
                break
              case "msg_source":
                str += `${this.msgSource[item[map[i]] - 1] + "\t"},`
                break
              case "id_type":
                str += `${this.IDType[[item[map[i]]] - 1] + "\t"},`
                break
              case "is_enroll_form_uploaded":
                if (item[map[i]]) {
                  str += "https://ivillages-images.oss-cn-qingdao.aliyuncs.com/1/" + item["user_id"] + "/enroll_form.docx\t,"
                } else {
                  str += "暂未上传,"
                }
                break
              case "is_design_desc_uploaded":
                if (item[map[i]]) {
                  str += "https://ivillages-images.oss-cn-qingdao.aliyuncs.com/1/" + item["user_id"] + "/design_desc.docx\t,"
                } else {
                  str += "暂未上传,"
                }
                break
              default:
                str += `${item[map[i]] + "\t"},`
            }
          }
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
    }
  }
}
</script>

<style scoped>
#header {
  height: 60px;
  width: 100%;
  top: 0;
  left: 0;
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 99;
}
#header .leftTitle {
  height: 56px;
  margin: 2px 0 2px 54px;
  /*width: 420px;*/
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#header .rightBtn {
  margin-right: 32px;
}
.logo {
  width: 56px;
  height: 56px
}
</style>