(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{516:function(a,s,n){},525:function(a,s,n){"use strict";var e=n(516);n.n(e).a},536:function(a,s,n){"use strict";n.r(s);var e=function(){var a=this,s=a.$createElement,n=a._self._c||s;return n("div",{staticClass:"admin-setting"},[n("main-title",{attrs:{title:"管理员信息"}}),a._v(" "),n("div",{staticClass:"setting-panel"},[n("ul",[n("li",[n("span",[a._v("用 户 名 ：")]),n("span",[a._v(a._s(a.adminInfo.user_name))])]),a._v(" "),n("li",[n("span",[a._v("注册城市：")]),n("span",[a._v(a._s(a.adminInfo.city))])]),a._v(" "),n("li",[n("span",[a._v("注册时间：")]),n("span",[a._v(a._s(a.adminInfo.create_time))])]),a._v(" "),n("li",[n("span",[a._v("管理权限：")]),n("span",[a._v(a._s(a.adminInfo.admin))])]),a._v(" "),n("li",[n("span",[a._v("管理员ID：")]),n("span",[a._v(a._s(a.adminInfo.id))])]),a._v(" "),n("li",{staticClass:"clearfix"},[n("span",[a._v("更换头像：")]),a._v(" "),n("el-upload",{staticClass:"avatar-uploader",attrs:{action:a.baseURL+"/admin/update/avatar/"+a.adminInfo.id,"show-file-list":!1,"on-success":a.handleSuccess,"before-upload":a.beforeUpload}},[n("img",{staticClass:"avatar",attrs:{src:a.imgBaseURL+a.adminInfo.avatar}})])],1)])])],1)};e._withStripped=!0;var t=n(155),i=n(62),o=n(50),r={name:"AdminSetting",components:{MainTitle:t.a},data:function(){return{baseURL:i.a,imgBaseURL:i.b}},computed:Object(o.b)(["adminInfo"]),methods:{handleSuccess:function(a){this.adminInfo.avatar=a.image_path},beforeUpload:function(a){var s="image/jpeg"===a.type||"image/png",n=a.size/1024/1024<.5;return s||this.$message({type:"error",message:"上传头像图片只能是JPG或PNG格式!"}),n||this.$message({type:"error",message:"上传头像图片大小不能超过 500KB!"}),s&&n}}},l=(n(525),n(16)),p=Object(l.a)(r,e,[],!1,null,null,null);p.options.__file="src/views/AdminSetting.vue";s.default=p.exports}}]);