<template>
  <div class="app-container">
    <h3>门店详情</h3>
    <ul>
      <li>所属企业：{{shopdetail.companyName}}</li>
      <li>企业名称：{{shopdetail.name}}</li>
      <li>企业分类：{{shopdetail.shopType}}</li>
      <li>企业描述：{{shopdetail.introdcution}}</li>
      <li>门店地址：{{shopdetail.province}}{{shopdetail.city}}{{shopdetail.town}}{{shopdetail.address}}</li>
      <li>周边地铁：
        <span v-for="(item,index) in shopdetail.subways" :key="index">
          {{item.name}}
        </span>
      </li>
      <!-- <li>周边商圈：</li> -->
      <li>门店图标：
        <div style="width:150px">
        <img :src="shopdetail.imageUrl" alt="">
        </div>
      </li>
      <li>可用商品类别：
        <div v-for="(item,index) in shopdetail.shopCats" :key="index">
          {{item.pcat}} {{item.cat}} 佣金：{{item.rate}}%
        </div>

      </li>
      <li>联系电话：{{shopdetail.phone1}} {{shopdetail.phone2}}</li>
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

</style>
