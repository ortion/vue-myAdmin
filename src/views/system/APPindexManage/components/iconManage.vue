<template>
  <div>
    <h3>宫格管理</h3>
    <div class="preview-img">
      <img :src="updateIcon.picUrl" class="avatar" v-if="updateIcon.picUrl">
      <img :src="logo" class="avatar" v-else>
    </div>
    <div class="avatar-uploader" @click="openPhotos">
      <i class="el-icon-plus avatar-uploader-icon"></i>
    </div>
    <div class="submit-button">
      <el-button type="info" plain @click="returnPhone">还原</el-button>
      <el-button type="primary" @click="onSave" :loading="loading">确认</el-button>
    </div>
    <el-dialog title="图片库" :visible.sync="isPhotosDialog" @close="isCloseStatus = true" @open="isCloseStatus = false">
      <photo-album :photoType="'icon'" :photoList="picList" @updatedata="updateData" @selectImg="selectImg" :closeDialog="isCloseStatus" :listLoading="listLoading"></photo-album>
    </el-dialog>
  </div>
</template>
<script>
import logo from '@/assets/logo.png'
import PhotoAlbum from '@/components/PhotoAlbum'
import { getIconPic } from '@/api/picManage'
import { addIcon } from '@/api/system/appIndexManage'
export default {
  name: 'iconManage',
  components: {
    PhotoAlbum
  },
  props: ['nowIcon'],
  data() {
    return {
      logo,
      loading: false,
      listLoading: false,
      imageUrl: '',
      isPhotosDialog: false,
      picList: [],
      isCloseStatus: false,
      updateIcon: {
        id: '',
        picUrl: ''
      }
    }
  },
  watch: {
    nowIcon() {
      this.updateIcon.id = this.nowIcon.id
      this.updateIcon.picUrl = this.nowIcon.picUrl
    }
  },
  methods: {
    onSave() {
      this.loading = true
      addIcon(this.updateIcon).then(response => {
        this.loading = false
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
        this.$store.commit('UPDATEICON_STATUS', true)
      }).catch(() => {
        this.loading = false
      })
    },
    // 还原
    returnPhone() {
      this.updateIcon.picUrl = this.nowIcon.picUrl
    },
    openPhotos() {
      this.isPhotosDialog = true
      this.getPicList()
    },
    // 加载图片库
    getPicList() {
      this.listLoading = true
      getIconPic().then(response => {
        var data = response.data
        this.picList = data.reverse()
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    selectImg(url) {
      this.isPhotosDialog = false
      if (url) {
        this.updateIcon.picUrl = url
      } else {
        this.updateIcon.picUrl = this.nowIcon.picUrl
      }
    },
    updateData(boot) {
      if (boot) {
        this.getPicList()
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 250px;
  height: 250px;
  margin: 0 auto;
  &:hover {
    border-color: #409eff;
  }
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  // text-align: center;
}
.preview-img {
  width: 100px;
  height: 100px;
  margin-bottom: 15px;
}
.avatar {
  border-radius: 50%;
  width: 100px;
  height: 100px;
}
.submit-button {
  padding: 15px 0;
  text-align: center;
}
</style>