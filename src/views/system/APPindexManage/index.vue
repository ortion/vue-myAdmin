<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="9">
        <preview :bannerlist="bannerList"></preview>
      </el-col>
      <el-col :span="15">
        <div class="app-manage">
          <banner-manage :bannerlist="bannerList" @updatebanner="updateBanner"></banner-manage>
          <!-- <icon-manage></icon-manage> -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import preview from './components/preview'
import bannerManage from './components/bannerManage'
import iconManage from './components/iconManage'
import { getBannerList } from '@/api/appIndexManage'
export default {
  name: 'APPindexManage',
  components: {
    preview,
    bannerManage,
    iconManage
  },
  data() {
    return {
      bannerList: [],
      listLoading: true

    }
  },
  created() {
    this.getAppbannerList()
  },
  methods: {
    updateBanner(boot) {
      if (boot) {
        this.getAppbannerList()
      }
    },
    getAppbannerList() {
      this.listLoading = true
      getBannerList().then(response => {
        this.bannerList = response.data
        this.listLoading = false
      })
    }
  }

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.app-manage {
  border: solid 1px #e6e6e6;
  padding: 10px 20px;
}
</style>