<template>
  <div class="app-container">
    <h3>企业详情</h3>
    <p class="content-title">企业信息</p>
    <ul>
      <li>企业名称：{{companydetail.name}}</li>
      <li>企业类型：{{companydetail.type}}</li>
      <li>所属地区：{{companydetail.province}}{{companydetail.city}}{{companydetail.town}}</li>
      <li>营业执照代码：{{companydetail.licence}}</li>
      <li>企业法人：{{companydetail.corporation}}</li>
      <li>法人联系方式：{{companydetail.corporationPhone}}</li>
      <li>上传营业执照：
        <div style="width:150px">
          <img :src="companydetail.licencePicUrl" alt="">
        </div>
      </li>
    </ul>
    <p class="content-title">负责人信息</p>
    <ul>
      <li>负责人姓名：{{companydetail.charge}}</li>
      <li>负责人性别：{{companydetail.chargeSex}}</li>
      <li>负责人电话：{{companydetail.chargePhone}}</li>
    </ul>
    <p class="content-title">财务信息</p>
    <ul>
      <h3>银行卡</h3>
      <li>开户行：{{companydetail.accountBank}}</li>
      <li>账号：{{companydetail.accountNo}}</li>
      <li>开户名称：{{companydetail.accountName}}</li>
      <h3>微信</h3>
      <li>账号：{{companydetail.wechatNo}}</li>
      <h3>支付宝</h3>
      <li>账号：{{companydetail.alipayNo}}</li>
    </ul>
  </div>
</template>

<script>
import logo from '@/assets/logo.png'
import { getCompanyDetail } from '@/api/company/company'
export default {
  name: 'companyDetail',
  data() {
    return {
      logo,
      id: this.$route.query.id,
      companydetail: Object

    }
  },
  created() {
    this.companyDetail()
  },
  methods: {
    companyDetail() {
      this.listLoading = true
      getCompanyDetail(this.id).then(response => {
        this.companydetail = response.data
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped lang="scss">
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
</style>
