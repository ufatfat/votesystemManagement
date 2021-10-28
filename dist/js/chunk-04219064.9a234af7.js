(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-04219064"],{9530:function(e,n,t){"use strict";t.r(n);var o=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticStyle:{display:"flex","align-items":"flex-start","justify-content":"space-between"}},[t("div",{staticStyle:{display:"flex","flex-direction":"column",width:"48%","align-items":"center"}},[t("RoundConfig")],1),t("div",{staticStyle:{display:"flex","flex-direction":"column",width:"48%","align-items":"center"}},[t("JudgeConfig")],1),t("el-dialog",{attrs:{title:"修改轮次信息",visible:e.editRoundInfoDialogVisible},on:{"update:visible":function(n){e.editRoundInfoDialogVisible=n}}},[t("RoundInfoForm",{attrs:{"round-info":e.roundInfo[e.editRoundInfoIdx],submit:e.editRoundInfoSubmit}}),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(n){e.editRoundInfoDialogVisible=!1}}},[e._v("取 消")]),t("el-button",{attrs:{type:"primary"},on:{click:function(n){e.editRoundInfoDialogVisible=!1,e.editRoundInfoSubmit=!0}}},[e._v("确 定")])],1)],1)],1)},i=[],a=(t("a434"),t("f8c8")),l=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("fieldset",{staticStyle:{background:"#ffffff"}},[t("legend",[e._v("轮次信息")]),t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.tableLoading,expression:"tableLoading"}],attrs:{data:e.roundInfo}},[t("el-table-column",{attrs:{prop:"round_index",label:"轮次",align:"center",width:"80px"}}),t("el-table-column",{attrs:{prop:"round_desc",label:"描述",align:"center"}}),t("el-table-column",{attrs:{prop:"max_votes_num",label:"最大投票数",align:"center"}}),t("el-table-column",{attrs:{prop:"promotion_num",label:"晋级作品数",align:"center"}}),t("el-table-column",{attrs:{label:"是否反票",align:"center"},scopedSlots:e._u([{key:"default",fn:function(n){return[n.row.is_negative?t("span",[e._v("是")]):t("span",[e._v("否")])]}}])}),t("el-table-column",{attrs:{label:"操作",align:"center",width:"180px"},scopedSlots:e._u([{key:"default",fn:function(n){return[t("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-edit"},on:{click:function(t){return e.editRoundInfo(n.$index)}}},[e._v("修改")]),t("el-button",{attrs:{type:"danger",size:"mini",icon:"el-icon-delete"},on:{click:function(t){return e.deleteRoundInfo(n.$index)}}},[e._v("删除")])]}}])})],1),t("div",{staticStyle:{"margin-top":"20px","text-align":"left"}},[e._v("增加轮次：")]),t("el-form",{staticStyle:{width:"46vw"},attrs:{"label-position":"left",inline:""}},[t("el-form-item",{attrs:{label:"描述：","label-width":"60px"}},[t("el-input",{attrs:{size:"mini"},model:{value:e.newRoundInfo.round_desc,callback:function(n){e.$set(e.newRoundInfo,"round_desc",n)},expression:"newRoundInfo.round_desc"}})],1),t("el-form-item",{attrs:{label:"最大票数："}},[t("el-input-number",{attrs:{size:"mini",min:0,"controls-position":"right"},model:{value:e.newRoundInfo.max_votes_num,callback:function(n){e.$set(e.newRoundInfo,"max_votes_num",n)},expression:"newRoundInfo.max_votes_num"}})],1),t("el-form-item",{attrs:{label:"晋级作品数："}},[t("el-input-number",{attrs:{size:"mini",min:0,"controls-position":"right"},model:{value:e.newRoundInfo.promotion_num,callback:function(n){e.$set(e.newRoundInfo,"promotion_num",n)},expression:"newRoundInfo.promotion_num"}})],1),t("el-form-item",{attrs:{label:"是否反票"}},[t("el-switch",{attrs:{"active-color":"#67C23A","active-text":"是","inactive-color":"#F56C6C","inactive-text":"否"},model:{value:e.newRoundInfo.is_negative,callback:function(n){e.$set(e.newRoundInfo,"is_negative",n)},expression:"newRoundInfo.is_negative"}})],1),t("br"),t("el-form-item",[t("el-button",{attrs:{type:"danger",size:"small"},on:{click:e.clearForm}},[e._v("清空")]),t("el-button",{staticStyle:{"margin-left":"20px"},attrs:{type:"primary",size:"small"},on:{click:e.submitForm}},[e._v("提交")])],1)],1)],1),t("el-dialog",{attrs:{title:"修改轮次信息",visible:e.editRoundInfoDialogVisible},on:{"update:visible":function(n){e.editRoundInfoDialogVisible=n}}},[t("RoundInfoForm",{attrs:{"round-info":e.roundInfo[e.editRoundInfoIdx],submit:e.editRoundInfoSubmit}}),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(n){e.editRoundInfoDialogVisible=!1}}},[e._v("取 消")]),t("el-button",{attrs:{type:"primary"},on:{click:function(n){e.editRoundInfoDialogVisible=!1,e.editRoundInfoSubmit=!0}}},[e._v("确 定")])],1)],1)],1)},u=[],s=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("el-form",{attrs:{"label-position":"left","label-width":"100px",model:e.roundInfoCopy}},[t("el-form-item",{attrs:{label:"轮次"}},[t("el-input",{model:{value:e.roundInfoCopy.round_index,callback:function(n){e.$set(e.roundInfoCopy,"round_index",n)},expression:"roundInfoCopy.round_index"}})],1),t("el-form-item",{attrs:{label:"描述"}},[t("el-input",{model:{value:e.roundInfoCopy.round_desc,callback:function(n){e.$set(e.roundInfoCopy,"round_desc",n)},expression:"roundInfoCopy.round_desc"}})],1),t("el-form-item",{attrs:{label:"最大票数"}},[t("el-input",{model:{value:e.roundInfoCopy.max_votes_num,callback:function(n){e.$set(e.roundInfoCopy,"max_votes_num",n)},expression:"roundInfoCopy.max_votes_num"}})],1),t("el-form-item",{attrs:{label:"晋级作品数"}},[t("el-input",{model:{value:e.roundInfoCopy.promotion_num,callback:function(n){e.$set(e.roundInfoCopy,"promotion_num",n)},expression:"roundInfoCopy.promotion_num"}})],1),t("el-form-item",{attrs:{label:"是否反票"}},[t("el-switch",{attrs:{"active-color":"#67C23A","active-text":"是","inactive-color":"#F56C6C","inactive-text":"否"},model:{value:e.roundInfoCopy.is_negative,callback:function(n){e.$set(e.roundInfoCopy,"is_negative",n)},expression:"roundInfoCopy.is_negative"}})],1)],1)],1)},d=[],r={name:"RoundInfoForm",props:{roundInfo:Object,submit:Boolean},data:function(){return{roundInfoCopy:new Object(this.roundInfo)}},watch:{submit:function(){var e=this,n=this.roundInfoCopy;n.max_votes_num=~~n.max_votes_num,n.promotion_num=~~n.promotion_num,Object(a["o"])(n).then((function(){e.$message({type:"success",message:"更新成功！"}),e.roundInfo=e.roundInfoCopy})).catch((function(){e.roundInfoCopy=e.roundInfo,e.$message({type:"error",message:"更新失败，请联系管理员！"})}))}}},c=r,f=t("2877"),m=Object(f["a"])(c,s,d,!1,null,"52e490a4",null),p=m.exports,g={name:"RoundConfig",components:{RoundInfoForm:p},data:function(){return{roundInfo:[],newRoundInfo:{round_desc:"",max_votes_num:null,promotion_num:null,is_negative:!1},editRoundInfoDialogVisible:!1,editRoundInfoIdx:null,editRoundInfoSubmit:!1,tableLoading:!1}},mounted:function(){this.getData()},methods:{editRoundInfo:function(e){this.editRoundInfoIdx=e,this.editRoundInfoDialogVisible=!0},deleteRoundInfo:function(e){var n=this,t={round_id:this.roundInfo[e].round_id};Object(a["d"])(t).then((function(){n.$message({type:"success",message:"删除成功！"}),n.roundInfo.splice(e,1)})).catch((function(){n.$message({type:"error",message:"删除失败，请联系管理员!"})}))},clearForm:function(){this.newRoundInfo={round_desc:"",max_votes_num:null,promotion_num:null,is_negative:!1}},submitForm:function(){var e=this,n=this.newRoundInfo;Object(a["b"])(n).then((function(t){e.$message({type:"success",message:"新建成功！"}),n.round_index=e.roundInfo.length+1,n.round_id=t.data.round_id,e.roundInfo.push(n),e.clearForm()})).catch((function(){e.$message({type:"error",message:"新建失败，请联系管理员!"})}))},getData:function(){var e=this;this.tableLoading=!0,Object(a["j"])().then((function(n){e.roundInfo=n.data.round_info,e.tableLoading=!1})).catch((function(){e.tableLoading=!1}))}}},b=g,I=Object(f["a"])(b,l,u,!1,null,"4eaa610b",null),_=I.exports,v=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("fieldset",{staticStyle:{background:"#ffffff"}},[t("legend",[e._v("评委信息")]),t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.tableLoading,expression:"tableLoading"}],attrs:{data:e.judgeData}},[t("el-table-column",{attrs:{type:"index",align:"center",width:"50px",label:"序号"}}),t("el-table-column",{attrs:{prop:"name",align:"center",label:"姓名"}}),t("el-table-column",{attrs:{prop:"is_rules_read",align:"center",label:"评审规则已读"},scopedSlots:e._u([{key:"default",fn:function(n){return[n.row.is_rules_read?t("span",[e._v(" 已读 ")]):t("span",[e._v(" 未读 ")])]}}])}),t("el-table-column",{scopedSlots:e._u([{key:"default",fn:function(n){return[t("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-edit"},on:{click:function(t){return e.editJudge(n.$index)}}},[e._v("修改")]),t("el-button",{attrs:{type:"danger",size:"mini",icon:"el-icon-delete"},on:{click:function(t){return e.deleteJudge(n.$index)}}},[e._v("删除")])]}}])})],1),t("div",{staticStyle:{"margin-top":"20px","text-align":"left"}},[e._v("增加评委：")]),t("el-form",{staticStyle:{width:"46vw"},attrs:{"label-position":"left","label-width":"auto"}},[t("el-form-item",{attrs:{label:"手机号："}},[t("el-input",{attrs:{size:"mini"},model:{value:e.newJudgeInfo.username,callback:function(n){e.$set(e.newJudgeInfo,"username",n)},expression:"newJudgeInfo.username"}})],1),t("el-form-item",{attrs:{label:"姓名："}},[t("el-input",{attrs:{size:"mini","controls-position":"right"},model:{value:e.newJudgeInfo.name,callback:function(n){e.$set(e.newJudgeInfo,"name",n)},expression:"newJudgeInfo.name"}})],1),t("el-form-item",{attrs:{label:"初始密码："}},[t("el-input",{attrs:{size:"mini","controls-position":"right"},model:{value:e.newJudgeInfo.password,callback:function(n){e.$set(e.newJudgeInfo,"password",n)},expression:"newJudgeInfo.password"}})],1),t("el-form-item",[t("el-button",{attrs:{type:"danger",size:"small"},on:{click:e.clearForm}},[e._v("清空")]),t("el-button",{staticStyle:{"margin-left":"20px"},attrs:{type:"primary",size:"small"},on:{click:e.submitForm}},[e._v("提交")])],1)],1)],1),t("el-dialog",{attrs:{title:"修改评委信息",visible:e.editDialogVisible},on:{"update:visible":function(n){e.editDialogVisible=n}}},[t("JudgeInfoForm",{attrs:{"judge-info":e.judgeData[e.editJudgeIdx],submit:e.editSubmit}}),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(n){e.editDialogVisible=!1}}},[e._v("取 消")]),t("el-button",{attrs:{type:"primary"},on:{click:function(n){e.editDialogVisible=!1,e.editSubmit=!0}}},[e._v("确 定")])],1)],1)],1)},h=[],y=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("el-form",{attrs:{"label-position":"left","label-width":"100px",model:e.judgeInfoCopy}},[t("el-form-item",{attrs:{label:"姓名"}},[t("el-input",{model:{value:e.judgeInfoCopy.name,callback:function(n){e.$set(e.judgeInfoCopy,"name",n)},expression:"judgeInfoCopy.name"}})],1),t("el-form-item",{attrs:{label:"手机号"}},[t("el-input",{model:{value:e.judgeInfoCopy.username,callback:function(n){e.$set(e.judgeInfoCopy,"username",n)},expression:"judgeInfoCopy.username"}})],1),t("el-form-item",{attrs:{label:"密码"}},[t("el-input",{model:{value:e.defaultPassword,callback:function(n){e.defaultPassword=n},expression:"defaultPassword"}})],1)],1)],1)},x=[],w=(t("b0c0"),{name:"JudgeInfoForm",props:{judgeInfo:Object,submit:Boolean},data:function(){return{judgeInfoCopy:new Object(this.judgeInfo),defaultPassword:""}},watch:{submit:function(){var e=this,n={name:this.judgeInfoCopy.name,username:this.judgeInfoCopy.username};""!==this.defaultPassword?this.$confirm("确认要修改此评委的登录密码吗？此操作不可逆","",{confirmButtonText:"确认",cancelButtonText:"取消",type:"warning"}).then((function(){n.password=e.defaultPassword,e.updateJudgeInfo(n)})).catch((function(){e.defaultPassword=""})):this.updateJudgeInfo(n)}},methods:{updateJudgeInfo:function(e){var n=this;Object(a["n"])(e).then((function(){n.$message({type:"success",message:"更新成功！"}),n.roundInfo=n.roundInfoCopy})).catch((function(){n.roundInfoCopy=n.roundInfo,n.$message({type:"error",message:"更新失败，请联系管理员！"})}))}}}),R=w,C=Object(f["a"])(R,y,x,!1,null,"8e1daf4e",null),j=C.exports,$={name:"JudgeConfig",components:{JudgeInfoForm:j},data:function(){return{judgeData:[],newJudgeInfo:{name:"",username:"",password:""},tableLoading:!1,editDialogVisible:!1,editSubmit:!1,editJudgeIdx:null}},mounted:function(){this.getData()},methods:{editJudge:function(e){this.editJudgeIdx=e,this.editDialogVisible=!0},deleteJudge:function(e){var n=this,t={judge_id:this.judgeData[e].judge_id};Object(a["c"])(t).then((function(){n.$message({type:"success",message:"删除成功！"}),n.judgeData.splice(e,1)})).catch((function(){n.$message({type:"error",message:"删除失败，请联系管理员!"})}))},clearForm:function(){this.newJudgeInfo={name:"",username:"",password:""}},submitForm:function(){var e=this,n=this.newJudgeInfo;Object(a["a"])(n).then((function(t){e.$message({type:"success",message:"新建成功！"}),n.judge_id=t.data.judge_id,e.judgeData.push(n),e.clearForm()})).catch((function(){e.$message({type:"error",message:"新建失败，请联系管理员!"})}))},getData:function(){var e=this;this.tableLoading=!0,Object(a["g"])().then((function(n){e.judgeData=n.data,e.tableLoading=!1})).catch((function(){e.tableLoading=!1}))}}},k=$,D=Object(f["a"])(k,v,h,!1,null,"78437bd7",null),J=D.exports,S={name:"Contest",components:{JudgeConfig:J,RoundConfig:_},data:function(){return{roundInfo:[],newRoundInfoDemo:{round_desc:"",max_votes_num:null,promotion_num:null},newRoundInfo:{round_desc:"",max_votes_num:null,promotion_num:null},editRoundInfoDialogVisible:!1,editRoundInfoIdx:null,editRoundInfoSubmit:!1}},mounted:function(){this.getData()},methods:{editRoundInfo:function(e){this.editRoundInfoIdx=e,this.editRoundInfoDialogVisible=!0},deleteRoundInfo:function(e){var n=this,t={round_id:this.roundInfo[e].round_id};Object(a["d"])(t).then((function(){n.$message({type:"success",message:"删除成功！"}),n.roundInfo.splice(e,1)})).catch((function(){n.$message({type:"error",message:"删除失败，请联系管理员!"})}))},clearForm:function(){this.newRoundInfo=this.newRoundInfoDemo},submitForm:function(){var e=this,n=this.newRoundInfo;Object(a["b"])(n).then((function(t){e.$message({type:"success",message:"新建成功！"}),n.round_index=e.roundInfo.length+1,n.round_id=t.data.round_id,e.roundInfo.push(n)})).catch((function(){e.$message({type:"error",message:"新建失败，请联系管理员!"})}))},getData:function(){var e=this;Object(a["j"])().then((function(n){e.roundInfo=n.data.round_info}))}}},F=S,O=Object(f["a"])(F,o,i,!1,null,"cc6c5d7e",null);n["default"]=O.exports},a434:function(e,n,t){"use strict";var o=t("23e7"),i=t("23cb"),a=t("a691"),l=t("50c4"),u=t("7b0b"),s=t("65f0"),d=t("8418"),r=t("1dde"),c=r("splice"),f=Math.max,m=Math.min,p=9007199254740991,g="Maximum allowed length exceeded";o({target:"Array",proto:!0,forced:!c},{splice:function(e,n){var t,o,r,c,b,I,_=u(this),v=l(_.length),h=i(e,v),y=arguments.length;if(0===y?t=o=0:1===y?(t=0,o=v-h):(t=y-2,o=m(f(a(n),0),v-h)),v+t-o>p)throw TypeError(g);for(r=s(_,o),c=0;c<o;c++)b=h+c,b in _&&d(r,c,_[b]);if(r.length=o,t<o){for(c=h;c<v-o;c++)b=c+o,I=c+t,b in _?_[I]=_[b]:delete _[I];for(c=v;c>v-o+t;c--)delete _[c-1]}else if(t>o)for(c=v-o;c>h;c--)b=c+o-1,I=c+t-1,b in _?_[I]=_[b]:delete _[I];for(c=0;c<t;c++)_[c+h]=arguments[c+2];return _.length=v-o+t,r}})}}]);
//# sourceMappingURL=chunk-04219064.9a234af7.js.map