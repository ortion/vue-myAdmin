<template>
  <div class="App-carousel">
    <div @click="goChange('banner')" class="border" :class="{'editing-status':showStatus == 'banner'}">
      <!-- <el-tag class="editing-button">编辑</el-tag> -->
      <el-carousel v-if="bannerList.length>0" :interval="5000" arrow="never" height="180px" :autoplay="false">
        <el-carousel-item v-for="item in bannerList" :key="item.id">
          <img :src="item.imageUrl" alt="">
        </el-carousel-item>
      </el-carousel>
      <img :src="exmple" alt="" v-else>
    </div>
    <div class="icon-manage">
      <el-row>
        <el-col :span="6" class="border" v-for="iconItem in iconList" :key="iconItem.id" :class="{'editing-status':showStatus ==iconItem.id}">
          <div class="grid-content" @click="goChange(iconItem)">
            <img :src="iconItem.picUrl" alt="" v-if="iconItem.picUrl">
            <img :src="logo" alt="" v-else> 
            <p>{{iconItem.name}}</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="recommend">
      <div slot="header" class="card-header clearfix">
        <span>推荐商家</span>
      </div>
      <div class="business-list">
        <div class="media">
          <div class="media-left">
            <a href="#">
              <img :src="logo" alt="">
            </a>
          </div>
          <div class="media-body">
            <h4 class="media-heading">Media heading</h4>
            信息
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import exmple from '@/assets/timg.jpeg'
import logo from '@/assets/logo.png'
import { getBannerList, getIconList } from '@/api/appIndexManage'
import { mapGetters } from 'vuex'
export default {
  name: 'preview',
  computed: {
    ...mapGetters([
      'updatebannerStatus',
      'updateiconStatus'
    ])
  },
  data() {
    return {
      exmple,
      logo,
      bannerList: [],
      iconList: [],
      showStatus: 'banner'
    }
  },
  watch: {
    updatebannerStatus() {
      if (this.updatebannerStatus) {
        this.getAppbannerList()
      }
    },
    updateiconStatus() {
      if (this.updateiconStatus) {
        this.getAppIconList()
      }
    }
  },
  created() {
    this.getAppbannerList()
    this.getAppIconList()
  },
  methods: {
    goChange(states) {
      if (states === 'banner') {
        this.showStatus = states
      } else {
        this.showStatus = states.id
      }
      this.$emit('openStatus', states)
    },
    // 预览banner
    getAppbannerList() {
      getBannerList().then(response => {
        this.bannerList = response.data
        this.$store.commit('SET_BANNERLIST', this.bannerList)
      })
    },
    //  预览宫格
    getAppIconList() {
      getIconList().then(response => {
        this.iconList = response.data
      })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.App-carousel {
  max-width: 350px;
  background: #f1f1f1;
}
.icon-manage {
  margin-top: 10px;
}
.grid-content {
  width: 100%;
  padding-bottom: 100%; /* padding百分比相对父元素宽度计算 */
  height: 0; //避免被内容撑开多余的高度
  overflow: hidden;
  text-align: center;
  font-size: 12px;
  background: #ffffff;
  img {
    width: 45px;
    height: 45px;
    margin: 10px auto;
  }
}
.recommend {
  margin-top: 10px;
  background: #ffffff;
}
.card-header {
  padding: 10px;
}
.business-list {
  padding: 5px;
  .media {
    margin-bottom: 10px;
    padding: 5px;
    border-bottom: 1px solid #f6f6f6;
  }
}
.media-body,
.media-left,
.media-right {
  display: table-cell;
  vertical-align: top;
}
.border {
  border: 3px solid #ffffff;
}
.editing-status {
  border: 3px solid #4823ee;
  position: relative;
}
.editing-button {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 4;
}
</style>