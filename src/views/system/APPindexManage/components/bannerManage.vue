<template>
  <div>
    <h3>banner管理</h3>
    <el-table :data="bannerUpdateList" style="width: 100%">
      <el-table-column label="图片地址">
        <template slot-scope="scope">
          <div class="picture-img" @click="openImgs(scope.$index)">
            <el-tag class="tag-button">编辑</el-tag>
            <img :src="scope.row.imageUrl">
          </div>
        </template>
      </el-table-column>
      <el-table-column label="链接地址">
        <template slot-scope="scope">
          <el-input v-model.trim="scope.row.linkUrl" size="small" placeholder="请输入内容" suffix-icon="el-icon-edit"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250px">
        <template slot-scope="scope">
          <div style="text-align:left">
            <el-button size="mini" :disabled="scope.$index==0" type="success" plain @click="upTr(scope.$index)">上移</el-button>
            <el-button size="mini" :disabled="scope.$index==bannerUpdateList.length-1" type="success" plain @click="downTr(scope.$index)">下移</el-button>
            <el-button size="mini" type="danger" plain @click="deleteBanner(scope.$index)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="add-button">
      <el-button @click="addBanner" :disabled="this.bannerUpdateList.length>5" size="small" type="primary" plain>添加</el-button>
      <span class="tipMessage">(最多只能添加6组)</span>
    </div>
    <div class="save-button">
      <el-button type="primary" @click="onSave" :loading="loading">保存</el-button>
    </div>
    <!-- 图片弹出层 -->
    <el-dialog title="图片库" :visible.sync="isImgDialog" @close="isCloseStatus = true" @open="isCloseStatus = false">
      <photo-album :photoType="'banner'" :photoList="picList" @updatedata="updateData" @selectImg="selectImg" :closeDialog="isCloseStatus" :listLoading="listLoading"></photo-album>
    </el-dialog>

  </div>
</template>
<script>
import exmple from '@/assets/timg.jpeg'
import PhotoAlbum from '@/components/PhotoAlbum'
import { getBannerPic } from '@/api/picManage'
import { addBanner } from '@/api/system/appIndexManage'
import { mapGetters } from 'vuex'
export default {
  name: 'bannerManage',
  components: {
    PhotoAlbum
  },
  computed: {
    ...mapGetters([
      'bannerlist'
    ])
  },
  data() {
    return {
      exmple,
      loading: false,
      listLoading: false,
      isImgDialog: false,
      bannerUpdateList: [],
      backgroundDiv: {},
      picList: [],
      isCloseStatus: false,
      selectEditIndex: Number
    }
  },
  watch: {
    bannerlist() {
      var arr = []
      this.bannerlist.forEach(item => {
        arr.push(
          {
            'imageUrl': item.imageUrl,
            'linkUrl': item.linkUrl
          }
        )
      })
      this.bannerUpdateList = arr
    }
  },
  methods: {
    onSave() {
      if (this.bannerUpdateList.length > 0) {
        this.loading = true
        this.bannerUpdateList.forEach((item, index) => {
          this.$set(item, 'id', index)
        })
        addBanner(this.bannerUpdateList).then(response => {
          this.loading = false
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
          this.$store.commit('UPDATEBANNER_STATUS', true)
        }).catch(() => {
          this.loading = false
        })
      } else {
        this.$message({
          type: 'warning',
          message: '您未添加banner图!'
        })
      }
    },
    selectImg(url) {
      this.isImgDialog = false
      if (url) {
        this.bannerUpdateList[this.selectEditIndex].imageUrl = url
      }
    },
    updateData(boot) {
      if (boot) {
        this.getPicList()
      }
    },
    // 加载图片库
    getPicList() {
      this.listLoading = true
      getBannerPic().then(response => {
        var data = response.data
        this.picList = data.reverse()
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    // banner管理操作
    openImgs(index) {
      this.selectEditIndex = index
      this.isImgDialog = true
      this.getPicList()
    },
    addBanner() {
      var length = this.bannerUpdateList.length
      if (length > 5) return
      this.bannerUpdateList.push(
        {
          imageUrl: exmple,
          linkUrl: ''
        }
      )
    },
    deleteBanner(index) {
      this.bannerUpdateList.splice(index, 1)
    },
    upTr(index) {
      if (index === 0) {
        return
      }
      this.bannerUpdateList[index] = this.bannerUpdateList.splice(index - 1, 1, this.bannerUpdateList[index])[0]
    },
    downTr(index) {
      if (index === this.bannerUpdateList.length - 1) {
        return
      }
      this.bannerUpdateList[index] = this.bannerUpdateList.splice(index + 1, 1, this.bannerUpdateList[index])[0]
    }

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.picture-img {
  position: relative;
  cursor: pointer;
  .tag-button {
    position: absolute;
    //   top: 50%;
    //   left: 50%;
    //   transform: translate(-50%, -50%);˝
    bottom: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.8);
  }
  img {
    width: 150px;
    height: 80px;
  }
}
.add-button {
  padding: 10px;
  text-align: left;
}
.save-button {
  padding: 10px;
  border-top: solid 1px #e6e6e6;
  text-align: center;
}
</style>