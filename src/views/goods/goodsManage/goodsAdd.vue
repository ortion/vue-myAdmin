<template>
  <div class="app-container">
    <div class="third-header">
      <router-link :to="{name: 'goodsManage'}">
        <span class="backPrev">
          <svg-icon icon-class="back" />
        </span>
      </router-link>
      <span>新建商品</span>
    </div>
    <el-form class="goodsForm" :rules="goodsRules" ref="goodsForm" :model="goodsForm" label-width="120px">
      <el-form-item label="商品名称" prop="name">
        <el-input v-model.trim="goodsForm.name" placeholder="请输入商品名称"></el-input>
      </el-form-item>
      <el-form-item label="商品分类" prop="pcat">
        <el-select v-model="goodsForm.pcat" @change="pcatChange" placeholder="一级类目">
          <el-option v-for="item in categoryData.firstList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <el-select v-model="goodsForm.cat" @change="catChange" placeholder="全部">
          <el-option v-for="item in categoryData.secondList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品定价">
        <el-tabs v-model="goodsPriceValue" type="card">
          <el-tab-pane v-for="(item, index) in goodsPriceTabs" :key="item.name" :label="item.title" :name="item.name">
            <goods-price :sendName="item.name" @priceMessage="goodsPriceList"></goods-price>
          </el-tab-pane>
        </el-tabs>
      </el-form-item>
      <el-form-item label="商品缩略图片">
        <div class="inlint thumbnail">
          <img :src="goodsForm.masterPicUrl" alt="" v-if="goodsForm.masterPicUrl">
          <img :src="logo" alt="" v-else>
        </div>
        <div class="inlint">
          <el-button type="primary" @click="openPhotos" size="medium">选择</el-button>
        </div>
      </el-form-item>
      <el-form-item label="商品描述">
        <div class="inlint goodsPicList">
          <div class="goodsPic" v-if="goodsForm.pics.length===0">
            <img :src="logo" alt="">
          </div>
          <div class="goodsPic inlint" v-else v-for="(item,index) in goodsForm.pics" :key="index">
            <i class="el-icon-remove" @click="removePics(item)"></i>
            <img :src="item" alt="">
          </div>
        </div>
        <div class="inlint">
          <el-button type="primary" @click="openPhotos('mul')" size="medium">选择</el-button>
        </div>
        <div style="margin-top:15px;">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="请输入商品描述" v-model="goodsForm.introduction">
          </el-input>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button v-loading="loading" type="primary" @click="onSave">保存</el-button>
      </el-form-item>
    </el-form>
    <!-- 图片库 -->
    <el-dialog title="图片库" :visible.sync="isPhotosDialog" @close="isCloseStatus = true" @open="isCloseStatus = false">
      <photo-album :photoType="'goods'" :multipleStatus="isMultiple" :photoList="picList" @selectImg="selectImg" @updatedata="updateData" :closeDialog="isCloseStatus"></photo-album>
    </el-dialog>
  </div>
</template>

<script>
import logo from '@/assets/logo.png'
import { getCategory, addGoods } from '@/api/goods'
import { getBasePic } from '@/api/picManage'
import goodsPrice from './components/goodsPrice'
import PhotoAlbum from '@/components/PhotoAlbum'
export default {
  name: 'goodsAdd',
  components: {
    goodsPrice,
    PhotoAlbum
  },
  data() {
    return {
      logo,
      loading: false,
      goodsForm: {
        name: '',
        pcat: '',
        cat: '',
        masterPicUrl: '',
        pics: [],
        introduction: '',
        skus: []

      },
      goodsRules: {
        name: [
          { required: true, message: '请填写商品名称', trigger: 'blur' }
        ],
        pcat: [
          { required: true, message: '请选择商品类目', trigger: 'change' }
        ]
      },
      // 商品类目
      categoryData: {
        firstList: [],
        secondList: []
      },
      // 商品定价
      goodsPriceValue: 'A',
      goodsPriceTabs: [{
        name: 'A',
        title: 'A级美容师',
        form: {}
      }, {
        name: 'B',
        title: 'B级美容师',
        form: {}
      }, {
        name: 'C',
        title: 'C级美容师',
        form: {}
      }, {
        name: 'D',
        title: '无美容师',
        form: {}
      }],
      // 图片库
      isPhotosDialog: false,
      isCloseStatus: false,
      picList: [],
      isMultiple: false,
      picType: 7 // 商品
    }
  },
  created() {
    this.getGoodsCategory()
  },
  methods: {
    onSave() {
      this.$refs.goodsForm.validate(valid => {
        if (valid) {
          this.goodsPriceTabs.map(item => {
            if (Object.keys(item.form).length !== 0) {
              item.form.property = item.title
              this.goodsForm.skus.push(item.form)
            }
          })
          this.loading = true
          addGoods(this.goodsForm).then(response => {
            this.$message({
              type: 'success',
              message: '保存成功!'
            })
            this.loading = false
            this.$router.push({ name: 'goodsManage' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 图片
    removePics(name) {
      this.goodsForm.pics.splice(name, 1)
    },
    openPhotos(str) {
      if (str === 'mul') {
        this.isMultiple = true
      } else {
        this.isMultiple = false
      }
      this.isPhotosDialog = true

      this.getPicList()
    },
    selectImg(url) {
      this.isPhotosDialog = false
      if (Array.isArray(url)) {
        url.forEach(item => {
          this.goodsForm.pics.push(item)
        })
      } else {
        this.goodsForm.masterPicUrl = url
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
      getBasePic(this.picType).then(response => {
        var data = response.data
        this.picList = data.reverse()
        this.listLoading = false
      })
    },
    // 定价
    goodsPriceList(data) {
      if (this.isEmpty(data.value)) {
        this.goodsPriceTabs.map(item => {
          if (data.name === item.name) {
            item.form = data.value
          }
        })
      } else {
        this.goodsPriceTabs.map(item => {
          if (data.name === item.name) {
            item.form = {}
          }
        })
      }
    },
    // 看是否为空
    isEmpty(val) {
      for (var key in val) {
        if (val[key] !== '' && val[key] !== 0) {
          return true
        }
      }
      return false
    },
    // 商品类目
    getGoodsCategory(id) {
      getCategory(id).then(response => {
        if (id) {
          this.categoryData.secondList = response.data
        } else {
          this.categoryData.firstList = response.data
        }
      })
    },
    pcatChange(val) {
      this.getGoodsCategory(val)
      this.goodsForm.pcat = val
      this.goodsForm.cat = ''
    },
    catChange(val) {
      this.goodsForm.cat = val
    }
  }
}
</script>

<style scoped lang="scss">
.goodsForm {
  width: 750px;
}
.thumbnail {
  width: 150px;
  height: 150px;
  vertical-align: bottom;
}
.goodsPic {
  width: 150px;
  height: 150px;
}
.goodsPicList {
  vertical-align: bottom;
}
</style>
