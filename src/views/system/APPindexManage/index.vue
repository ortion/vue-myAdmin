<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="9">
        <preview @openStatus="openStatus"></preview>
      </el-col>
      <el-col :span="15">
        <div class="app-manage">
          <banner-manage v-show="opening=='banner'"></banner-manage>
          <icon-manage v-show="opening=='icon'" :now-icon="nowIcon"></icon-manage>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import preview from './components/preview'
import bannerManage from './components/bannerManage'
import iconManage from './components/iconManage'

export default {
  name: 'APPindexManage',
  components: {
    preview,
    bannerManage,
    iconManage
  },
  data() {
    return {
      opening: 'banner',
      nowIcon: ''
    }
  },
  methods: {
    openStatus(status) {
      if (status === 'banner') {
        this.opening = status
      } else {
        this.opening = 'icon'
        this.nowIcon = status
      }
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