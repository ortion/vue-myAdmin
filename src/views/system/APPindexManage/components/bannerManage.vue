<template>
  <div>
    <h3>banner管理</h3>
    <el-table :data="bannerUpdateList" style="width: 100%" empty-text="暂无数据">
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
          <el-input v-model="scope.row.linkUrl" size="small" placeholder="请输入内容" suffix-icon="el-icon-edit"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250px">
        <template slot-scope="scope">
          <div style="text-align:left">
            <el-button size="mini" type="success" plain @click="upTr(scope.$index)">上移</el-button>
            <el-button size="mini" type="success" plain @click="downTr(scope.$index)">下移</el-button>
            <el-button size="mini" type="danger" plain @click="deleteBanner(scope.$index)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="add-button">
      <el-button @click="addBanner" size="small" type="primary" plain>添加</el-button>
      <span v-if="tipShow">最多只能添加5组</span>
    </div>
    <div class="save-button">
      <el-button type="primary" @click="onSave">保存</el-button>
    </div>
    <!-- 图片弹出层 -->
    <el-dialog title="图片库" :visible.sync="isImgDialog" @close="isClose" @open="isOpen">
      <photo-album :photoType="'banner'" :photoList="picList" @updatedata="updateData" @selectImg="selectImg" :closeDialog="isCloseStatus"></photo-album>
    </el-dialog>

  </div>
</template>
<script>
import exmple from '@/assets/timg.jpeg'
import PhotoAlbum from '@/components/PhotoAlbum'
import { getBannerPic } from '@/api/picManage'
import { addBanner } from '@/api/appIndexManage'
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
      isImgDialog: false,
      tipShow: false,
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
      this.bannerUpdateList.forEach((item, index) => {
        this.$set(item, 'id', index)
      })
      addBanner(this.bannerUpdateList).then(response => {
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
        this.$store.commit('UPDATEBANNER_STATUS', true)
      })
    },
    selectImg(url) {
      this.isImgDialog = false
      this.bannerUpdateList[this.selectEditIndex].imageUrl = url
    },
    isClose() {
      this.isCloseStatus = true
    },
    isOpen() {
      this.isCloseStatus = false
    },
    updateData(boot) {
      if (boot) {
        this.getPicList()
      }
    },
    // 图片管理
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    // 加载图片库
    getPicList() {
      this.listLoading = true
      getBannerPic().then(response => {
        var data = response.data
        this.picList = data.reverse()
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
      if (length > 5) {
        this.tipShow = true
      } else {
        this.bannerUpdateList.push(
          {
            imageUrl: exmple,
            linkUrl: ''
          }
        )
      }
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
}
.picture-img .tag-button {
  position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   transform: translate(-50%, -50%);˝
  bottom: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.8);
}
.picture-img img {
  width: 150px;
  height: 80px;
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