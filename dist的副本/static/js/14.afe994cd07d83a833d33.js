webpackJsonp([14],{"3KgV":function(a,e,t){(a.exports=t("FZ+f")(!1)).push([a.i,"\n.goodsForm[data-v-64b78636] {\n  width: 750px;\n}\n.price-content[data-v-64b78636] {\n  border: 1px solid #dcdfe6;\n  border-top: none;\n  height: 220px;\n  padding-top: 20px;\n}\n.price-content .el-form-item[data-v-64b78636] {\n    margin-bottom: 15px;\n}\n.goodsPic[data-v-64b78636] {\n  width: 150px;\n  height: 150px;\n  vertical-align: bottom;\n}\n",""])},BXKh:function(a,e,t){var o=t("3KgV");"string"==typeof o&&(o=[[a.i,o,""]]),o.locals&&(a.exports=o.locals);t("rjj0")("e36a500c",o,!0)},i5Ht:function(a,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=t("7Otq"),n=t.n(o),r=t("PmpH"),c=t("CCUp"),i=t("xuzd"),l=t("E4LH"),s={name:"goodsAdd",components:{CityCascader:r.a},data:function(){var a=function(a,e,t){e?Object(l.b)(e)?t():t(null):t()};return{logo:n.a,loading:!1,companyForm:{companyname:"",companyType:"",provinceId:"",cityId:"",districtId:"",licence:"",corporation:"",corporationPhone:"",licencePicUrl:"",charge:"",chargePhone:"",chargeSex:"",accountBank:"",accountNo:"",accountName:"",wechatNo:"",alipayNo:""},companyTypeList:[],accountInfo:"first",companyRules:{districtId:[{required:!0,message:"请输入门店地址",trigger:"change"}],companyname:[{required:!0,message:"请输入企业名称",trigger:"blur"}],companyType:[{required:!0,message:"请选择企业类型",trigger:"change"}],corporationPhone:[{validator:a,message:"法人手机号填写格式不正确",trigger:"blur"}],charge:[{required:!0,message:"请输入负责人姓名",trigger:"blur"}],chargeSex:[{required:!0,message:"请选择负责人性别",trigger:"change"}],chargePhone:[{required:!0,message:"请输入负责人电话",trigger:"blur"},{validator:a,message:"负责人手机号填写格式不正确",trigger:"blur"}],account:[{required:!0,message:"银行卡、微信、支付宝信息至少有一个",trigger:"blur"}]}}},created:function(){this.getcompanyType()},methods:{onSave:function(){var a=this;this.$refs.companyForm.validate(function(e){if(!e)return console.log("error submit!!"),!1;a.companyForm.accountNo||a.companyForm.wechatNo||a.companyForm.alipayNo?(a.loading=!0,Object(c.a)(a.companyForm).then(function(e){a.$message({type:"success",message:"保存成功!"}),a.loading=!1,a.$router.push({name:"goodsManage"})}).catch(function(){a.loading=!1})):a.$message({message:"银行卡、微信、支付宝信息至少填写一个",type:"error"})})},uploadLicence:function(a){var e=this,t="licence"+a.file.uid;Object(i.a)().put(t,a.file).then(function(a){e.companyForm.licencePicUrl=a.url}).catch(function(a){console.log(a)})},getcompanyType:function(){var a=this;Object(c.f)().then(function(e){e.data?a.companyTypeList=e.data:a.companyTypeList=[]})},selectData:function(a){a.firstValue&&(this.companyForm.provinceId=a.firstValue),a.secondValue&&(this.companyForm.cityId=a.secondValue),a.thirdValue&&(this.companyForm.districtId=a.thirdValue)},clearData:function(a){1===a?(this.companyForm.cityId="",this.companyForm.districtId=""):2===a&&(this.companyForm.districtId="")}}},m={render:function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{staticClass:"app-container"},[t("div",{staticClass:"third-header"},[t("router-link",{attrs:{to:{name:"goodsManage"}}},[t("span",{staticClass:"backPrev"},[t("svg-icon",{attrs:{"icon-class":"back"}})],1)]),a._v(" "),t("span",[a._v("新建商品")])],1),a._v(" "),t("el-form",{ref:"companyForm",staticClass:"goodsForm",attrs:{rules:a.companyRules,model:a.companyForm,"label-width":"120px"}},[t("el-form-item",{attrs:{label:"商品名称",prop:"companyname"}},[t("el-input",{attrs:{placeholder:"请输入企业名称"},model:{value:a.companyForm.companyname,callback:function(e){a.$set(a.companyForm,"companyname","string"==typeof e?e.trim():e)},expression:"companyForm.companyname"}})],1),a._v(" "),t("el-form-item",{attrs:{label:"商品分类",prop:"companyType"}}),a._v(" "),t("el-form-item",{attrs:{label:"商品定价",prop:"companyname"}},[t("el-tabs",{attrs:{type:"card"},model:{value:a.accountInfo,callback:function(e){a.accountInfo="string"==typeof e?e.trim():e},expression:"accountInfo"}},[t("el-tab-pane",{attrs:{label:"A级美容师",name:"first"}},[t("div",{staticClass:"price-content"},[t("el-form-item",{attrs:{label:"服务时长"}},[t("el-input",{staticStyle:{width:"50%"},attrs:{placeholder:"请输入服务时长"},model:{value:a.companyForm.companyname,callback:function(e){a.$set(a.companyForm,"companyname","string"==typeof e?e.trim():e)},expression:"companyForm.companyname"}}),a._v(" "),t("span",[a._v("服务所需的最长时间")])],1),a._v(" "),t("el-form-item",{attrs:{label:"商品单价"}},[t("el-input-number",{attrs:{size:"small",min:1,max:10,label:"商品单价"},on:{change:a.handleChange},model:{value:a.num1,callback:function(e){a.num1=e},expression:"num1"}})],1),a._v(" "),t("el-form-item",{attrs:{label:"最大接单数量"}},[t("el-input-number",{attrs:{size:"small",min:1,max:10,label:"最大接单数量"},on:{change:a.handleChange},model:{value:a.num1,callback:function(e){a.num1=e},expression:"num1"}}),a._v(" "),t("span",[a._v("以服务时长为依据，单位时间内可以接待的宠物数量")])],1)],1)]),a._v(" "),t("el-tab-pane",{attrs:{label:"B级美容师",name:"second"}},[t("div",{staticClass:"tabs-content"},[t("el-form-item",{attrs:{label:"账号"}},[t("el-input",{attrs:{placeholder:"请输入微信账号"},model:{value:a.companyForm.wechatNo,callback:function(e){a.$set(a.companyForm,"wechatNo","string"==typeof e?e.trim():e)},expression:"companyForm.wechatNo"}})],1)],1)]),a._v(" "),t("el-tab-pane",{attrs:{label:"C级美容师",name:"third"}},[t("div",{staticClass:"tabs-content"},[t("el-form-item",{attrs:{label:"账号"}},[t("el-input",{attrs:{placeholder:"请输入支付宝账号"},model:{value:a.companyForm.alipayNo,callback:function(e){a.$set(a.companyForm,"alipayNo","string"==typeof e?e.trim():e)},expression:"companyForm.alipayNo"}})],1)],1)]),a._v(" "),t("el-tab-pane",{attrs:{label:"无美容师",name:"four"}},[t("div",{staticClass:"tabs-content"},[t("el-form-item",{attrs:{label:"账号"}},[t("el-input",{attrs:{placeholder:"请输入支付宝账号"},model:{value:a.companyForm.alipayNo,callback:function(e){a.$set(a.companyForm,"alipayNo","string"==typeof e?e.trim():e)},expression:"companyForm.alipayNo"}})],1)],1)])],1)],1),a._v(" "),t("el-form-item",{attrs:{label:"商品缩略图片"}},[t("div",{staticClass:"inlint goodsPic"},[a.companyForm.licencePicUrl?t("img",{attrs:{src:a.companyForm.licencePicUrl,alt:""}}):t("img",{attrs:{src:a.logo,alt:""}})]),a._v(" "),t("div",{staticClass:"inlint"},[t("el-upload",{attrs:{"http-request":a.uploadLicence,"show-file-list":!1,action:""}},[t("el-button",{attrs:{size:"small",type:"primary"}},[a._v("选择")])],1)],1)]),a._v(" "),t("el-form-item",{attrs:{label:"商品描述"}},[t("div",{staticClass:"inlint goodsPic"},[a.companyForm.licencePicUrl?t("img",{attrs:{src:a.companyForm.licencePicUrl,alt:""}}):t("img",{attrs:{src:a.logo,alt:""}})]),a._v(" "),t("div",{staticClass:"inlint"},[t("el-upload",{attrs:{"http-request":a.uploadLicence,"show-file-list":!1,action:""}},[t("el-button",{attrs:{size:"small",type:"primary"}},[a._v("选择")])],1)],1),a._v(" "),t("div",{staticStyle:{"margin-top":"15px"}},[t("el-input",{attrs:{type:"textarea",placeholder:"请输入商品描述"},model:{value:a.companyForm.ltextarea3,callback:function(e){a.$set(a.companyForm,"ltextarea3",e)},expression:"companyForm.ltextarea3"}})],1)]),a._v(" "),t("el-form-item",[t("el-button",{directives:[{name:"loading",rawName:"v-loading",value:a.loading,expression:"loading"}],attrs:{type:"primary"},on:{click:a.onSave}},[a._v("保存")])],1)],1)],1)},staticRenderFns:[]};var p=t("VU/8")(s,m,!1,function(a){t("BXKh")},"data-v-64b78636",null);e.default=p.exports}});