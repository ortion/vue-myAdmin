<template>
  <div class="app-container">
    <h3>门店详情</h3>
    <ul>
        <li>所属企业：{{merchantName}}</li>
        <li>企业名称：{{userName}}</li>
        <li>企业分类：{{realName}}</li>
        <li>企业描述：{{realName}}</li>
        <li>门店地址：{{realName}}</li>
        <li>周边地铁：{{realName}}</li>
        <li>周边商圈：{{realName}}</li>
        <li>门店图标：{{realName}}</li>
        <li>可用商品类别：{{realName}}</li>
        <li>联系电话1：{{realName}}</li>
        <li>联系电话2：{{realName}}</li>
      </ul>
  </div>
</template>

<script>
import logo from '@/assets/logo.png'
import { getShopDetail } from '@/api/company/shop'
export default {
  name: 'shopDetail',
  data() {
    return {
      logo,
      id: this.$route.query.id,
      shopdetail: Object

    }
  },
  created() {
    this.shopDetail()
  },
  methods: {
    shopDetail() {
      this.listLoading = true
      getShopDetail(this.id).then(response => {
        this.shopdetail = response.data
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped lang="scss">
.shopForm {
  width: 750px;
  .cityInput {
    width: 613px;
    margin-bottom: 10px;
  }
  .checkboxTitle {
    vertical-align: top;
  }
  .checkboxGroup {
    width: 520px;
    text-align: left;
    .el-checkbox {
      margin-left: 20px;
    }
  }
}
.shoplogo {
  width: 150px;
  height: 150px;
  vertical-align: bottom;
}
</style>
