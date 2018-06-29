<template>
  <div class="app-container">
    <h3>商品详情</h3>
    <ul>
      <li>商品编号：{{goodsdetail.goodsNo}}</li>
      <li>商品名称：{{goodsdetail.name}}</li>
      <li>商品分类：{{goodsdetail.pcat}} {{goodsdetail.cat}}</li>
      <li>商品定价：
        <ul v-for="(skus,index) in goodsdetail.skus" :key="index">
          <h3>{{skus.property}}</h3>
          <li>宠物品种：{{skus.category}}</li>
          <li>宠物品类：{{skus.variety}}</li>
          <li>宠物肩宽：{{skus.shoulderHeightMin||0}}-{{skus.shoulderHeightMax}}</li>
          <li>宠物体长：{{skus.bodyLengthMin||0}}-{{skus.bodyLengthMax}}</li>
          <li>宠物体重：{{skus.weightMin||0}}-{{skus.weightMin}}</li>
          <li>宠物毛长：{{skus.woolLength}}</li>
          <li>服务时长：{{skus.duration}}</li>
          <li>价格：{{skus.woolLength}}</li>
          <li>最大接单数量：{{skus.orderMax}}</li>
        </ul>
      </li>
      <li>商品缩略图片：
        <div style="width:150px">
          <img :src="goodsdetail.masterPicUrl" alt="">
        </div>
      </li>
      <li>商品描述：
        <div v-for="(pic,index) in goodsdetail.pics" :key="index">
          <div style="width:150px">
            <img :src="pic" alt="">
          </div>
        </div>
        <p>{{goodsdetail.orderMax}}</p>
      </li>
    </ul>
    <div style="text-align:left" v-if="this.status=='review'">
      <el-button :loading="loading"  @click="rewiewGood(6)" type="primary" plain>审核通过</el-button>
      <el-button :loading="loading"  @click="rewiewGood(5)" type="warning" plain>审核不通过</el-button>
    </div>
  </div>

</template>

<script>
import logo from '@/assets/logo.png'
import { getGoodsDetail, reviewGoods } from '@/api/goods'
export default {
  name: 'goodsDetail',
  data() {
    return {
      logo,
      loading: false,
      id: this.$route.query.id,
      status: this.$route.query.status,
      goodsdetail: Object
    }
  },
  created() {
    this.goodsDetail()
  },
  methods: {
    rewiewGood(statues) {
      this.loading = true
      reviewGoods(this.id, statues).then(response => {
        this.$message({
          type: 'success',
          message: '已审核!'
        })
        this.loading = false
        this.$router.push({ name: 'goodsReview' })
      }).catch(() => {
        this.loading = false
      })
    },
    goodsDetail() {
      this.listLoading = true
      getGoodsDetail(this.id).then(response => {
        this.goodsdetail = response.data
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
