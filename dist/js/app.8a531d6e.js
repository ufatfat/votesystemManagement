(function(e){function t(t){for(var r,a,u=t[0],s=t[1],c=t[2],l=0,d=[];l<u.length;l++)a=u[l],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&d.push(o[a][0]),o[a]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);m&&m(t);while(d.length)d.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,a=1;a<n.length;a++){var u=n[a];0!==o[u]&&(r=!1)}r&&(i.splice(t--,1),e=s(s.s=n[0]))}return e}var r={},a={app:0},o={app:0},i=[];function u(e){return s.p+"js/"+({}[e]||e)+"."+{"chunk-1b101daa":"1af130eb","chunk-2d0e576f":"24269a2a","chunk-2d21e30b":"9e8395d9","chunk-2d21f87a":"f9552335","chunk-2d22d0a1":"a907f712","chunk-35932dfc":"1e8e53e2","chunk-c5c5bd1e":"84615428"}[e]+".js"}function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(e){var t=[],n={"chunk-35932dfc":1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-1b101daa":"31d6cfe0","chunk-2d0e576f":"31d6cfe0","chunk-2d21e30b":"31d6cfe0","chunk-2d21f87a":"31d6cfe0","chunk-2d22d0a1":"31d6cfe0","chunk-35932dfc":"db4ed8a4","chunk-c5c5bd1e":"31d6cfe0"}[e]+".css",o=s.p+r,i=document.getElementsByTagName("link"),u=0;u<i.length;u++){var c=i[u],l=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(l===r||l===o))return t()}var d=document.getElementsByTagName("style");for(u=0;u<d.length;u++){c=d[u],l=c.getAttribute("data-href");if(l===r||l===o)return t()}var m=document.createElement("link");m.rel="stylesheet",m.type="text/css",m.onload=t,m.onerror=function(t){var r=t&&t.target&&t.target.src||o,i=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=r,delete a[e],m.parentNode.removeChild(m),n(i)},m.href=o;var f=document.getElementsByTagName("head")[0];f.appendChild(m)})).then((function(){a[e]=0})));var r=o[e];if(0!==r)if(r)t.push(r[2]);else{var i=new Promise((function(t,n){r=o[e]=[t,n]}));t.push(r[2]=i);var c,l=document.createElement("script");l.charset="utf-8",l.timeout=120,s.nc&&l.setAttribute("nonce",s.nc),l.src=u(e);var d=new Error;c=function(t){l.onerror=l.onload=null,clearTimeout(m);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",d.name="ChunkLoadError",d.type=r,d.request=a,n[1](d)}o[e]=void 0}};var m=setTimeout((function(){c({type:"timeout",target:l})}),12e4);l.onerror=l.onload=c,document.head.appendChild(l)}return Promise.all(t)},s.m=e,s.c=r,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/",s.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=t,c=c.slice();for(var d=0;d<c.length;d++)t(c[d]);var m=l;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";n("85ec")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},o=[],i={name:"App",components:{}},u=i,s=(n("034f"),n("2877")),c=Object(s["a"])(u,a,o,!1,null,null,null),l=c.exports,d=n("1da1"),m=(n("96cf"),n("d3b7"),n("3ca3"),n("ddb0"),n("b64b"),n("8c4f")),f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"sl-body"},[n("el-header",[n("Header")],1),n("el-container",{staticStyle:{position:"absolute",top:"60px",left:"0",width:"100%"}},[n("el-main",[n("router-view")],1)],1)],1)},p=[],g=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"header"}},[n("div",{staticClass:"leftTitle"},[n("img",{staticClass:"logo",attrs:{src:e.headerRes.logo}}),n("span",{staticClass:"contestName"},[e._v(e._s(e.headerRes.contestName))]),n("el-menu",{staticStyle:{"margin-left":"20px"},attrs:{"default-active":e.$router.currentRoute.name,mode:"horizontal",router:!0}},[n("el-menu-item",{attrs:{index:"index"}},[n("span",{attrs:{slot:"title"},slot:"title"},[e._v("首页")])]),n("el-submenu",{attrs:{index:"stats"}},[n("template",{slot:"title"},[n("span",[e._v("当前竞赛")])]),n("el-menu-item-group",[n("template",{slot:"title"},[e._v("投稿")]),n("el-menu-item",{staticStyle:{"text-align":"center"},attrs:{index:"enroll_stats"}},[e._v("投稿情况")]),n("el-menu-item",{staticStyle:{"text-align":"center"},on:{click:e.getFileData}},[e._v("下载投稿数据")])],2),n("el-menu-item-group",[n("template",{slot:"title"},[e._v("评审")]),n("el-menu-item",{staticStyle:{"text-align":"center"},attrs:{index:"vote_stats"}},[e._v("投票统计")]),n("el-menu-item",{staticStyle:{"text-align":"center"},attrs:{index:"round_info"}},[e._v("轮次信息")])],2)],2),n("el-submenu",{attrs:{index:"config"}},[n("template",{slot:"title"},[n("span",[e._v("设置")])]),n("el-menu-item-group",[n("template",{slot:"title"},[e._v("系统")]),n("el-menu-item",{staticStyle:{"text-align":"center"},attrs:{index:"system_config"}},[e._v("系统设置")])],2),n("el-menu-item-group",[n("template",{slot:"title"},[e._v("比赛")]),n("el-menu-item",{staticStyle:{"text-align":"center"},attrs:{index:"contest_config"}},[e._v("比赛设置")])],2)],2)],1)],1),e.userInfo?n("div",{staticClass:"rightBtn"},[n("div",{staticStyle:{display:"flex","align-items":"center"}},[n("span",[e._v("欢迎，"+e._s(e.userInfo.username))]),n("el-button",{staticStyle:{"margin-left":"20px"},attrs:{size:"small"},on:{click:e.signOutHandler}},[e._v("登出")])],1)]):e._e()])},h=[],v=n("5530"),b=(n("159b"),n("2f62")),_=n("f8c8"),y={name:"Header",data:function(){return{headerRes:{logo:"https://ivillages-images.oss-cn-qingdao.aliyuncs.com/1/static/imgs/logo.png"},eduBG:["中职中专","高职高专","本科","硕士","博士","其它"],IDType:["身份证","护照","港澳居民来往内地通行证"],msgSource:["乡村复兴论坛","知识雷锋","其它"]}},computed:Object(v["a"])({},Object(b["b"])(["userInfo"])),watch:{$route:function(){}},mounted:function(){},methods:Object(v["a"])(Object(v["a"])({},Object(b["c"])(["signOut"])),{},{signOutHandler:function(){this.signOut(),this.$router.push({path:"/sign-in"})},getFileData:function(){var e=this,t="序号,姓名,作品名称,图纸张数,报名表,设计说明,性别,学历层次,学校,学院,专业,指导教师,团队成员,入学时间,毕业时间,学号,电话号码,电子邮箱,证件类型,证件号码,消息来源\n",n=["username","work_name","img_num","is_enroll_form_uploaded","is_design_desc_uploaded","sex","edu_bg","univ","school","major","teacher","teammates","in_time","out_time","stu_id","phone","email","id_type","id_no","msg_source"];Object(_["b"])().then((function(r){var a=r.data;a.forEach((function(r,a){for(var o in t+=a+"\t,",n)switch(n[o]){case"img_num":t+=void 0===r[n[o]]?"0,":"".concat(r[n[o]]+"\t",",");break;case"sex":t+=1===r[n[o]]?"男,":"女,";break;case"edu_bg":t+="".concat(e.eduBG[r[n[o]]-1]+"\t",",");break;case"msg_source":t+="".concat(e.msgSource[r[n[o]]-1]+"\t",",");break;case"id_type":t+="".concat(e.IDType[[r[n[o]]]-1]+"\t",",");break;case"is_enroll_form_uploaded":r[n[o]]?t+="https://ivillages-images.oss-cn-qingdao.aliyuncs.com/1/"+r["user_id"]+"/enroll_form.docx\t,":t+="暂未上传,";break;case"is_design_desc_uploaded":r[n[o]]?t+="https://ivillages-images.oss-cn-qingdao.aliyuncs.com/1/"+r["user_id"]+"/design_desc.docx\t,":t+="暂未上传,";break;default:t+="".concat(r[n[o]]+"\t",",")}t+="\n"}));var o="data:text/csv;charset=utf-8,\ufeff"+encodeURIComponent(t),i=document.createElement("a");i.href=o,i.download="数据.csv",document.body.appendChild(i),i.click(),document.body.removeChild(i)}))}})},k=y,I=(n("8b80"),Object(s["a"])(k,g,h,!1,null,"287c077e",null)),x=I.exports,S={name:"MainContainer",components:{Header:x}},O=S,j=Object(s["a"])(O,f,p,!1,null,"4219bf97",null),w=j.exports,C=n("d4ec"),T=n("bee2"),q=(n("b0c0"),function(){function e(){Object(C["a"])(this,e),this.name="storage"}return Object(T["a"])(e,[{key:"setItem",value:function(e){var t={name:"",value:"",expires:"",startTime:(new Date).getTime()},n={};Object.assign(n,t,e),n.expires?sessionStorage.setItem(n.name,JSON.stringify(n)):("[object Object]"==Object.prototype.toString.call(n.value)&&(n.value=JSON.stringify(n.value)),"[object Array]"==Object.prototype.toString.call(n.value)&&(n.value=JSON.stringify(n.value)),sessionStorage.setItem(n.name,n.value))}},{key:"getItem",value:function(e){var t=sessionStorage.getItem(e);try{t=JSON.parse(t)}catch(r){}if(null!=t){if(t.startTime){var n=(new Date).getTime();return n-t.startTime>t.expires?(sessionStorage.removeItem(e),!1):t.value}return t}}},{key:"removeItem",value:function(e){sessionStorage.removeItem(e)}},{key:"clear",value:function(){sessionStorage.clear()}}]),e}()),E=new q,N=E;r["default"].use(m["a"]);var P=new m["a"]({mode:"history",routes:[{path:"/sign-in",name:"sign-in",component:function(){return n.e("chunk-35932dfc").then(n.bind(null,"ab23"))},meta:{title:"登录"}},{path:"/",redirect:"/index",component:w,meta:{title:"首页",requireSignIn:!0},children:[{path:"enroll_stats",name:"enroll_stats",component:function(){return n.e("chunk-1b101daa").then(n.bind(null,"d5d9"))},meta:{title:"报名统计",requireSignIn:!0}},{path:"index",name:"index",component:function(){return n.e("chunk-2d21e30b").then(n.bind(null,"d504"))},meta:{title:"首页",requireSignIn:!0}},{path:"vote_stats",name:"vote_stats",component:function(){return n.e("chunk-c5c5bd1e").then(n.bind(null,"0ea4"))},meta:{title:"投票统计",requireSignIn:!0}},{path:"system_config",name:"system_config",component:function(){return n.e("chunk-2d22d0a1").then(n.bind(null,"f694"))},meta:{title:"系统设置",requireSignIn:!0}},{path:"contest_config",name:"contest_config",component:function(){return n.e("chunk-2d0e576f").then(n.bind(null,"9530"))},meta:{title:"比赛设置",requireSignIn:!0}},{path:"round_info",name:"round_info",component:function(){return n.e("chunk-2d21f87a").then(n.bind(null,"d9e4"))},meta:{title:"轮次信息",requireSignIn:!0}}]}]});P.beforeEach(function(){var e=Object(d["a"])(regeneratorRuntime.mark((function e(t,n,r){var a,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:a=N.getItem("userInfo"),t.meta.title&&(document.title=t.meta.title),"/sign-in"===t.path&&a&&r({path:"/index"}),t.meta.requireSignIn?a?0===Object.keys(n.query).length?r():(o=n.query.redirect,t.path===o?r():r({path:o})):r({path:"/sign-in",query:{redirect:t.fullPath}}):r();case 4:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}());var A=P,D={userInfo:function(e){return e.user.userInfo}},R=D,U=864e5,$={state:{userInfo:N.getItem("userInfo")},mutations:{updateUserInfo:function(e,t){var n={name:"userInfo",value:t,expires:U};N.setItem(n),e.userInfo=t},signOut:function(e){N.removeItem("token"),N.removeItem("userInfo"),N.removeItem("voteInfo"),N.removeItem("votedWorks"),N.removeItem("contestConfig"),N.removeItem("totalWorkNum"),e.userInfo=null}},actions:{updateUserInfo:function(e,t){var n=e.commit;n("updateUserInfo",t)},signOut:function(e){var t=e.commit;t("signOut")}}},B=$;r["default"].use(b["a"]);var H=new b["a"].Store({modules:{user:B},getters:R}),J=H,L=n("5c96"),M=n.n(L);n("0fae");r["default"].config.productionTip=!1,r["default"].use(M.a),new r["default"]({router:A,store:J,render:function(e){return e(l)}}).$mount("#app")},"85ec":function(e,t,n){},"8b80":function(e,t,n){"use strict";n("8c73")},"8c73":function(e,t,n){},f8c8:function(e,t,n){"use strict";n.d(t,"h",(function(){return u})),n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return c})),n.d(t,"c",(function(){return l})),n.d(t,"f",(function(){return d})),n.d(t,"d",(function(){return m})),n.d(t,"e",(function(){return f})),n.d(t,"g",(function(){return p}));var r=n("bc3a"),a=n.n(r),o=a.a.create({baseURL:"/",timeout:6e5,headers:{"Content-Type":"application/json;charset=UTF-8",ContestId:"1"}}),i=o;function u(e){return i.post("/manageapi/auth/sign-in",e)}function s(e){return i.get("/manageapi/stats/enroll",{params:e})}function c(){return i.get("/manageapi/stats/data")}function l(){return i.get("/manageapi/stats/judge")}function d(e){return i.get("/manageapi/stats/votes",{params:e})}function m(e){return i.get("/manageapi/round/stats",{params:e})}function f(){return i.get("/manageapi/round/info")}function p(){return i.post("/manageapi/round/next")}}});
//# sourceMappingURL=app.8a531d6e.js.map