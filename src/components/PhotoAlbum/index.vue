<template>
  <div v-loading.body="listLoading">
    <div class="nodata" v-if="photoList.length<=0">
      暂无图片
    </div>
    <div class="photoGallery" v-else>
      <el-scrollbar style="height:100%;">
        <div @click="selectPhoto(item,index)" v-for="(item,index) in photoList" :key="index" class="photoGallery-item" :style="'background-image: url(' + item.imageUrl + ')'">
          <div class="photoGallery-operate">
            <i class="el-icon-success" v-if="multipleStatus&&!isDeleteStatus&&item.isSelect"></i>
            <i class="el-icon-success" v-if="!multipleStatus&&!isDeleteStatus&&(index==isIndex)"></i>
            <el-checkbox-group v-model="checkedImg" @change="handleChange" v-if="isDeleteStatus">
              <el-checkbox :label="item.imageUrl"></el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div class="photobotton">
      <div v-if="!isDeleteStatus">
        <el-button @click="isDeleteStatus = true" size="small" type="primary">删除</el-button>
        <el-button @click="submitPhoto" size="small" type="primary">确定</el-button>
      </div>
      <div v-if="isDeleteStatus">
        <el-button @click="DeletePhoto" size="small" type="primary">批量删除</el-button>
        <el-button @click="isDeleteStatus = false" size="small" type="primary">取消</el-button>
      </div>
    </div>
    <div class="photobotton" style="float:right">
      <el-upload :http-request="Upload" :multiple="true" :show-file-list="false" action="">
        <el-button size="small" type="primary" :loading="loading">点击上传</el-button>
      </el-upload>
    </div>
  </div>
</template>

<script>
import { uploadBannerPic, deleteBannerPic, uploadIconPic, deleteIconPic, uploadBasePic, deleteBasePic } from '@/api/picManage'
import { client } from '@/utils/alioss'
export default {
  props: ['photoType', 'photoList', 'closeDialog', 'multipleStatus'],
  watch: {
    closeDialog(val) {
      if (val) {
        this.checkedImg = []
        this.selectImgList = []
        this.isIndex = -1
        this.isDeleteStatus = false
      }
    }
  },
  created() {
    if (this.multipleStatus) {
      this.photoList.forEach(item => {
        this.$set(item, 'isSelect', false)
      })
    }
  },
  data() {
    return {
      listLoading: false,
      fileList: [],
      checkedImg: [],
      isDeleteStatus: false,
      selectImgList: [],
      isIndex: -1,
      selectImgUrl: '',
      // 防止重复提交
      loading: false
    }
  },
  methods: {
    submitPhoto() {
      if (this.multipleStatus) {
        this.$emit('selectImg', this.selectImgList)
      } else {
        this.$emit('selectImg', this.selectImgUrl)
      }
    },
    // 选择图片
    selectPhoto(data, index) {
      if (this.multipleStatus) {
        data.isSelect = !data.isSelect
        if (data.isSelect) {
          this.selectImgList.push(data.imageUrl)
        } else {
          if (this.selectImgList.indexOf(data.imageUrl) >= 0) {
            this.selectImgList.splice(this.selectImgList.indexOf(data.imageUrl), 1)
          }
        }
      } else {
        this.isIndex = index
        this.selectImgUrl = data.imageUrl
      }
    },
    // 图片管理
    Upload(file) {
      var fileName = ''
      if (this.photoType === 'banner') {
        fileName = 'banner' + file.file.uid
      } else if (this.photoType === 'icon') {
        fileName = 'icon' + file.file.uid
      } else if (this.photoType === 'shop') {
        fileName = 'shop' + file.file.uid
      }
      this.loading = true
      this.listLoading = true
      // uploadAli().then(response => {
      //   console.log(response)
      client().put(fileName, file.file).then(result => {
        this.fileList[0] = { 'name': result.name, 'url': result.url }
        if (this.photoType === 'banner') {
          uploadBannerPic(this.fileList).then(res => {
            this.$emit('updatedata', true)
          })
        } else if (this.photoType === 'icon') {
          uploadIconPic(this.fileList).then(res => {
            this.$emit('updatedata', true)
          })
        } else if (this.photoType === 'shop') {
          uploadBasePic(6, this.fileList).then(res => {
            this.$emit('updatedata', true)
          })
        } else if (this.photoType === 'goods') {
          uploadBasePic(7, this.fileList).then(res => {
            this.$emit('updatedata', true)
          })
        }
        this.loading = false
        this.listLoading = false
      }).catch(err => {
        console.log(err)
        this.loading = false
        this.listLoading = false
      })
      // })
    },
    DeletePhoto() {
      var imgList = []
      if (this.checkedImg.length > 0) {
        this.checkedImg.forEach(item => {
          imgList.push({ 'url': item })
        })
        if (this.photoType === 'banner') {
          deleteBannerPic(imgList).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.checkedImg = []
            this.$emit('updatedata', true)
          })
        } else if (this.photoType === 'icon') {
          deleteIconPic(imgList).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.checkedImg = []
            this.$emit('updatedata', true)
          })
        } else if (this.photoType === 'shop' || this.photoType === 'goods') {
          deleteBasePic(imgList).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.checkedImg = []
            this.$emit('updatedata', true)
          })
        }
      } else {
        this.$message({
          type: 'warning',
          message: '您未选择要删除的图片!'
        })
      }
    },
    handleChange(value) {
      this.checkedImg = value
    }
  }
}
</script>

<style scoped lang="scss">
/* 图片库 */
.photoGallery {
  height: 350px;
  margin-bottom: 15px;
}
.photoGallery-item {
  display: inline-block;
  position: relative;
  width: 150px;
  height: 150px;
  background-position: center;
  background-size: auto 100%;
  margin: 0 15px 15px 0;
  border-radius: 5px;
  border: 5px solid #f7f5f5;
}
.photoGallery-operate {
  position: absolute;
  right: 8px;
  top: 5px;
  width: 15px;
  overflow: hidden;
}
.photoGallery-operate i {
  color: #39f778;
}
.photobotton {
  display: inline-block;
}
.nodata {
  text-align: center;
  min-height: 80px;
}
</style>
