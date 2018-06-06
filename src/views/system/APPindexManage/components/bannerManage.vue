<template>
    <div>
        <h3>banner管理</h3>
        <el-table :data="bannerData" style="width: 100%" empty-text="暂无数据">
            <el-table-column label="图片地址">
                <template slot-scope="scope">
                    <el-upload list-type="picture" action="https://httpbin.org/post">
                        <div v-if="exmple" class="picture-img">
                            <el-tag class="tag-button">编辑</el-tag>
                            <img :src="exmple">
                        </div>
                    </el-upload>
                </template>
            </el-table-column>
            <el-table-column label="链接地址">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.name" size="small" placeholder="请输入内容" suffix-icon="el-icon-edit"></el-input>
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
        </div>
        <div class="save-button">
            <el-button type="primary" @click="onSave">保存预览</el-button>
        </div>
    </div>
</template>
<script>
import exmple from '@/assets/timg.jpeg'
export default {
  name: 'home',
  data() {
    return {
      exmple,
      bannerData: [{
        date: '',
        name: '1',
        address: ''
      },
      {
        date: '',
        name: '2',
        address: ''
      }]
    }
  },
  methods: {
    addBanner() {
      this.bannerData.push(
        {
          date: '',
          name: '',
          address: ''
        }
      )
    },
    deleteBanner(index) {
      this.bannerData.splice(index, 1)
    },
    upTr(index) {
      if (index === 0) {
        return
      }
      this.bannerData[index] = this.bannerData.splice(index - 1, 1, this.bannerData[index])[0]
    },
    downTr(index) {
      if (index === this.bannerData.length - 1) {
        return
      }
      this.bannerData[index] = this.bannerData.splice(index + 1, 1, this.bannerData[index])[0]
    },
    onSave() {

    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.picture-img {
  position: relative;
}
.picture-img .tag-button {
  position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   transform: translate(-50%, -50%);˝
  bottom: 0;
  right: 0;
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