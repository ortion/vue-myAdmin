<template>
  <div>
    <h3>宫格管理</h3>
    <div class="preview-img">
      <img :src="logo" class="avatar">
    </div>
    <div class="avatar-uploader">
      <el-upload action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">

        <i class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <div class="submit-button">
      <el-button type="info" plain>还原</el-button>
      <el-button type="primary">确认</el-button>
    </div>
  </div>
</template>
<script>
import logo from '@/assets/logo.png'
export default {
  name: 'iconManage',
  data() {
    return {
      logo,
      imageUrl: ''
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
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
}
.avatar-uploader:hover {
  border-color: #409eff;
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
}
.submit-button{
  padding: 15px 0;
  text-align: center

}
</style>