<template>
  <div class="app-container">
    <div class="third-header">
      <router-link :to="{name: 'companyManage'}">
        <span class="backPrev">
          <svg-icon icon-class="back" />
        </span>
      </router-link>
      <span>新建企业</span>
    </div>
    <div class="companyForm">
      <el-form :rules="companyRules" ref="companyForm" :model="companyForm" label-width="120px">
        <p class="content-title">企业信息</p>
        <el-form-item label="企业名称" prop="companyname">
          <el-input v-model.trim="companyForm.companyname" placeholder="请输入企业名称"></el-input>
        </el-form-item>
        <el-form-item label="企业类型" prop="companyType">
          <el-select v-model="companyForm.companyType" placeholder="请选择企业类型">
            <el-option v-for="typeItem in companyTypeList" :key="typeItem.id" :label="typeItem.name" :value="typeItem.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属地区" prop="districtId">
          <city-cascader @selectData="selectData" @clearData="clearData"></city-cascader>
        </el-form-item>
        <el-form-item label="营业执照代码">
          <el-input v-model.trim="companyForm.licence" placeholder="请输入营业执照代码"></el-input>
        </el-form-item>
        <el-form-item label="企业法人">
          <el-input v-model.trim="companyForm.corporation" placeholder="请输入企业法人"></el-input>
        </el-form-item>
        <el-form-item label="法人联系方式" prop="corporationPhone">
          <el-input v-model.trim="companyForm.corporationPhone" placeholder="请输入法人联系方式"></el-input>
        </el-form-item>
        <el-form-item label="上传营业执照">
          <div class="inlint licencePic">
            <img :src="companyForm.licencePicUrl" alt="" v-if="companyForm.licencePicUrl">
            <img :src="logo" alt="" v-else>
          </div>
          <div class="inlint">
            <el-upload :http-request="uploadLicence" :show-file-list="false" action="">
              <el-button size="small" type="primary">选择</el-button>
            </el-upload>
          </div>
        </el-form-item>
        <p class="content-title">负责人信息</p>
        <el-form-item label="负责人姓名" prop="charge">
          <el-input v-model.trim="companyForm.charge" placeholder="请输入负责人姓名"></el-input>
        </el-form-item>
        <el-form-item label="负责人性别" prop="chargeSex">
          <el-radio-group v-model="companyForm.chargeSex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="负责人电话" prop="chargePhone">
          <el-input v-model.trim="companyForm.chargePhone" placeholder="请输入负责人电话"></el-input>
        </el-form-item>
        <p class="content-title" prop="account"><span style="color:red">*</span>财务信息</p>
        <el-tabs v-model="accountInfo" type="card" class="accountInfo">
          <el-tab-pane label="银行卡" name="first">
            <div class="tabs-content">
              <el-form-item label="开户行">
                <el-input v-model.trim="companyForm.accountBank" placeholder="请输入开户行"></el-input>
              </el-form-item>
              <el-form-item label="账号">
                <el-input v-model.trim="companyForm.accountNo" placeholder="请输入账号"></el-input>
              </el-form-item>
              <el-form-item label="开户名称">
                <el-input v-model.trim="companyForm.accountName" placeholder="请输入开户名称"></el-input>
              </el-form-item>
            </div>
          </el-tab-pane>
          <el-tab-pane label="微信" name="second">
            <div class="tabs-content">
              <el-form-item label="账号">
                <el-input v-model.trim="companyForm.wechatNo" placeholder="请输入微信账号"></el-input>
              </el-form-item>
            </div>
          </el-tab-pane>
          <el-tab-pane label="支付宝" name="third">
            <div class="tabs-content">
              <el-form-item label="账号">
                <el-input v-model.trim="companyForm.alipayNo" placeholder="请输入支付宝账号"></el-input>
              </el-form-item>
            </div>
          </el-tab-pane>
        </el-tabs>
        <el-form-item>
          <el-button v-loading="loading" type="primary" @click="onSave">保存</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
import logo from '@/assets/logo.png'
import CityCascader from '@/components/CityCascader'
import { getTypelist, addCompany } from '@/api/company/company'
import { client } from '@/utils/alioss'
import { validatePhone } from '@/utils/validate'
export default {
  name: 'companyAdd',
  components: {
    CityCascader
  },
  data() {
    const validateCall = (rule, value, callback) => {
      if (value) {
        if (validatePhone(value)) {
          callback()
        } else {
          callback(null)
        }
      } else {
        callback()
      }
    }
    return {
      logo,
      loading: false,
      companyForm: {
        companyname: '',
        companyType: '',
        provinceId: '',
        cityId: '',
        districtId: '',
        licence: '',
        corporation: '',
        corporationPhone: '',
        licencePicUrl: '',
        charge: '',
        chargePhone: '',
        chargeSex: '',
        accountBank: '',
        accountNo: '',
        accountName: '',
        wechatNo: '',
        alipayNo: ''

      },
      companyTypeList: [],
      accountInfo: 'first',
      companyRules: {
        districtId: [
          { required: true, message: '请输入门店地址', trigger: 'change' }
        ],
        companyname: [
          { required: true, message: '请输入企业名称', trigger: 'blur' }
        ],
        companyType: [
          { required: true, message: '请选择企业类型', trigger: 'change' }
        ],
        corporationPhone: [
          { validator: validateCall, message: '法人手机号填写格式不正确', trigger: 'blur' }
        ],
        charge: [
          { required: true, message: '请输入负责人姓名', trigger: 'blur' }
        ],
        chargeSex: [
          { required: true, message: '请选择负责人性别', trigger: 'change' }
        ],
        chargePhone: [
          { required: true, message: '请输入负责人电话', trigger: 'blur' },
          { validator: validateCall, message: '负责人手机号填写格式不正确', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '银行卡、微信、支付宝信息至少有一个', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getcompanyType()
  },
  methods: {
    onSave() {
      this.$refs.companyForm.validate(valid => {
        if (valid) {
          if (this.companyForm.accountNo || this.companyForm.wechatNo || this.companyForm.alipayNo) {
            this.loading = true
            addCompany(this.companyForm).then(response => {
              this.$message({
                type: 'success',
                message: '保存成功!'
              })
              this.loading = false
              this.$router.push({ name: 'companyManage' })
            }).catch(() => {
              this.loading = false
            })
          } else {
            this.$message({
              message: '银行卡、微信、支付宝信息至少填写一个',
              type: 'error'
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    // 营业执照
    uploadLicence(file) {
      var fileName = 'licence' + file.file.uid
      client().put(fileName, file.file).then(result => {
        this.companyForm.licencePicUrl = result.url
      }).catch(err => {
        console.log(err)
      })
    },
    getcompanyType() {
      getTypelist().then(response => {
        if (response.data) {
          this.companyTypeList = response.data
        } else {
          this.companyTypeList = []
        }
      })
    },
    // 联动选择器
    selectData(data) {
      if (data.firstValue) {
        this.companyForm.provinceId = data.firstValue
      }
      if (data.secondValue) {
        this.companyForm.cityId = data.secondValue
      }
      if (data.thirdValue) {
        this.companyForm.districtId = data.thirdValue
      }
    },
    clearData(num) {
      if (num === 1) {
        this.companyForm.cityId = ''
        this.companyForm.districtId = ''
      } else if (num === 2) {
        this.companyForm.districtId = ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
.companyForm {
  .el-input {
    width: 550px;
  }
}
.content-title {
  background: rgba(73, 98, 211, 0.1);
  border-radius: 2px;
  padding: 16px;
  padding: 0.7rem 1rem;
  // line-height: 1.4rem;
  word-spacing: 0.05rem;
  color: #657de7;
  font-weight: 600;
}
.licencePic {
  width: 150px;
  height: 150px;
  vertical-align: bottom;
}
.accountInfo {
  margin-bottom: 20px;
}
// .accountInfo .el-tabs__nav {
//   float: right;
// }
.tabs-content {
  border: 1px solid #dcdfe6;
  border-top: none;
  height: 220px;
  padding-top: 20px;
}
</style>
