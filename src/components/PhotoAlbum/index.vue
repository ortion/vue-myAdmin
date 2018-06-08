<template>
  <div>
    <div class="nodata" v-if="photoList.length<0">
      暂无图片
    </div>
    <div class="photoGallery" v-else>
      <el-scrollbar wrapClass="photo-scrollbar" style="height:100%;">
        <div @click="selectImg(item,index)" v-for="(item,index) in photoList" :key="index" class="photoGallery-item" :style="'background-image: url(' + item.imageUrl + ')'">
          <div class="photoGallery-operate">
            <i class="el-icon-success" v-if="!isDeleteStatus&&(index==isIndex)"></i>
            <el-checkbox-group v-model="checkedImg" @change="handleChange" v-if="isDeleteStatus">
              <el-checkbox :label="item.imageUrl"></el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div class="photobotton">
      <div v-if="!isDeleteStatus">
        <el-button @click="openCheckbox" size="small" type="primary">删除</el-button>
        <el-button @click="submitPhoto" size="small" type="primary">确定</el-button>
      </div>
      <div v-if="isDeleteStatus">
        <el-button @click="DeletePhoto" size="small" type="primary">批量删除</el-button>
        <el-button @click="cencelCheckbox" size="small" type="primary">取消</el-button>
      </div>
    </div>
    <div class="photobotton" style="float:right">
      <el-upload :http-request="Upload" :multiple="true" :show-file-list="false" action="">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </div>
  </div>
</template>

<script>
import { uploadBannerPic, deleteBannerPic, uploadAli } from '@/api/picManage'
import { client } from '@/utils/alioss'
export default {
  props: {
    photoList: {
      required: true
    },
    closeDialog: {
      required: true
    }
  },
  watch: {
    closeDialog(val) {
      if (val) {
        this.checkedImg = []
        // this.selectImgList = []
        this.isIndex = -1
      }
    }
  },
  data() {
    return {
      fileList: [],
      checkedImg: [],
      isDeleteStatus: false,
      // selectImgList: [],
      isIndex: -1,
      selectImgUrl: ''
    }
  },
  methods: {
    submitPhoto() {
      this.$emit('selectImg', this.selectImgUrl)
    },
    // 选择图片
    selectImg(data, index) {
      this.isIndex = index
      this.selectImgUrl = data.imageUrl
      // 多选
      // if (typeof data.isSelect === 'undefined') {
      //   this.$set(data, 'isSelect', true)
      // } else {
      //   data.isSelect = !data.isSelect
      // }
      // if (data.isSelect) {
      //   this.selectImgList.push(data.imageUrl)
      // } else {
      //   if (this.selectImgList.indexOf(data.imageUrl) >= 0) {
      //     this.selectImgList.splice(this.selectImgList.indexOf(data.imageUrl), 1)
      //   }
      // }
    },
    // 图片管理
    Upload(file) {
      var fileName = 'banner' + file.file.uid
      this.listLoading = true
      uploadAli().then(response => {
        console.log(response)
        client(response.data).put(fileName, file.file).then(result => {
          this.fileList[0] = { 'name': result.name, 'url': result.url }
          console.log(this.fileList)
          uploadBannerPic(this.fileList).then(res => {
            this.$emit('updatedata', true)
          })
        }).catch(err => {
          console.log(err)
        })

        this.listLoading = false
      })
    },
    openCheckbox() {
      this.isDeleteStatus = true
    },
    cencelCheckbox() {
      this.isDeleteStatus = false
    },
    DeletePhoto() {
      var imgList = []
      if (this.checkedImg.length > 0) {
        this.checkedImg.forEach(item => {
          imgList.push({ 'url': item })
        })
        deleteBannerPic(imgList).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.checkedImg = []
          this.$emit('updatedata', true)
        })
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
  height: 400px;
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
