<template>
  <div class="app-container">
    <div class="third-header">
      <router-link :to="{name: 'shopManage'}">
        <span class="backPrev">
          <svg-icon icon-class="back" />
        </span>
      </router-link>
      <span>新建门店</span>
    </div>
    <el-form :rules="companyRules" ref="shopForm" :model="shopForm" label-width="120px" class="shopForm">
      <el-form-item label="所属企业" prop="companyId">
        <span v-if="companyStatus">{{cname}}</span>
        <el-select v-else v-model="shopForm.companyId" placeholder="请选择企业">
          <el-option v-for="item in companysList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="门店名称" prop="shopname">
        <el-input v-model.trim="shopForm.shopname" placeholder="请输入门店名称"></el-input>
      </el-form-item>
      <el-form-item label="门店分类" prop="shopType">
        <el-select v-model="shopForm.shopType" placeholder="请选择">
          <el-option v-for="typeItem in shopTypeList" :key="typeItem.id" :label="typeItem.name" :value="typeItem.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="门店介绍">
        <el-input type="textarea" :rows="2" placeholder="请输入门店介绍" v-model="shopForm.introdcution">
        </el-input>
      </el-form-item>
      <el-form-item label="门店地址">
        <ul>
          <li>
            <city-cascader @selectData="selectData" @clearData="clearData"></city-cascader>
          </li>
          <li style="margin-top:15px">
            <el-input v-model.trim="shopForm.address" placeholder="请输入详细地址" class="cityInput"></el-input>
          </li>
          <li v-if="subwayList.length>0">
            <div class="inlint checkboxTitle">
              <span>周边地铁：</span>
              <p>已选中
                <span>{{shopForm.subways.length}}</span>个</p>
            </div>
            <div class="inlint">
              <el-checkbox-group v-model="shopForm.subways" @change="subwaysChange" class="checkboxGroup" :max="5">
                <el-checkbox :disabled="disabledHandle(subway.id)" v-for="subway in subwayList" :label="subway.id" :key="subway.id" v-cloak>
                  {{subway.name}}
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </li>
          <li v-if="businessCircle.length>0">
            <div class="inlint">
              <p>周边商圈：</p>
              <p>已选中
                <span>1</span>个</p>
            </div>
            <div class="inlint">
              <!-- <el-checkbox-group>
                <el-checkbox label="复选框 A"></el-checkbox>
                <el-checkbox label="复选框 B"></el-checkbox>
                <el-checkbox label="复选框 C"></el-checkbox>
                <el-checkbox label="禁用" disabled></el-checkbox>
                <el-checkbox label="选中且禁用" disabled></el-checkbox>
              </el-checkbox-group> -->
            </div>
          </li>
        </ul>
      </el-form-item>
      <el-form-item label="门店图标">
        <div class="inlint shoplogo">
          <img :src="shopForm.shoplogoUrl" alt="" v-if="shopForm.shoplogoUrl">
          <img :src="logo" alt="" v-else>
        </div>
        <div class="inlint">
          <el-button type="primary" @click="openPhotos" size="medium">选择</el-button>
        </div>
      </el-form-item>

      <el-form-item label="可用商品类目" required>
        <div v-for="(domain, index) in shopForm.goodsType" :key="index">
          <el-row>
            <el-col :span="16">
              <el-form-item style="margin-bottom:25px;" :prop="'goodsType.' + index + '.pcat'" :rules="[
      {required: true, message: '一级类目不能为空', trigger: 'change'},
    ]">
                <el-select v-model="domain.pcat" @change="pcatChange(domain.pcat,index)" placeholder="一级类目">
                  <el-option v-for="item in categoryData.firstList" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
                <el-select v-model="domain.cat" @change="catChange(domain.cat,index)" placeholder="全部">
                  <el-option v-for="item in categoryData.secondList" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item style="margin-bottom:25px;" :prop="'goodsType.' + index + '.rate'" :rules="[
      {required: true, message: '佣金不能为空', trigger: 'blur'},

      {type:'number',min:0,max:100,  message: '佣金必须为0-100之间的数字', trigger: 'blur'}
    ]">
                <el-input v-model.number="domain.rate" class="commission" placeholder="请输入佣金"></el-input>
                <span>%</span>

                <el-button v-if="index==0" type="primary" @click="addCategory" size="medium">添加</el-button>
                <el-button v-else type="primary" @click="deleteCategory(key)" size="medium">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form-item>

      </el-form-item>
      <el-form-item label="联系电话1" prop="phone1">
        <el-input placeholder="请输入联系电话" v-model.trim="shopForm.phone1">
        </el-input>
      </el-form-item>
      <el-form-item label="联系电话2" prop="phone2">
        <el-input placeholder="请输入联系电话" v-model.trim="shopForm.phone2">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button v-loading="loading" type="primary" @click="onSave">保存</el-button>
      </el-form-item>

    </el-form>
    <!-- 图片库 -->
    <el-dialog title="图片库" :visible.sync="isPhotosDialog" @close="isCloseStatus = true" @open="isCloseStatus = false">
      <photo-album :photoType="'shop'" :photoList="picList" @selectImg="selectImg" @updatedata="updateData" :closeDialog="isCloseStatus"></photo-album>
    </el-dialog>
  </div>
</template>

<script>
import logo from '@/assets/logo.png'
import CityCascader from '@/components/CityCascader'
import PhotoAlbum from '@/components/PhotoAlbum'
import { getSubway } from '@/api/city'
import { getCategory } from '@/api/goods'
import { addShop, getCompanyAll } from '@/api/company/shop'
import { getShopPic } from '@/api/picManage'
import { validateMPhone } from '@/utils/validate'
export default {
  name: 'shopAdd',
  components: {
    CityCascader,
    PhotoAlbum
  },
  data() {
    const validateAllCall = (rule, value, callback) => {
      if (value) {
        if (validateMPhone(value)) {
          callback()
        } else {
          callback(null)
        }
      } else {
        callback()
      }
    }
    return {
      logo,
      loading: false,
      companyStatus: false,
      cname: this.$route.query.name,
      shopForm: {
        companyId: '',
        shopname: '',
        shopType: '',
        introdcution: '',
        provinceId: '',
        cityId: '',
        districtId: '',
        address: '',
        subways: [],
        shoplogoUrl: '',
        goodsType: [
          {
            pcat: '',
            cat: '',
            rate: ''
          }
        ],
        phone1: '',
        phone2: ''
      },
      pcatFirstValue: '',
      // 门店分类
      shopTypeList: [
        {
          id: 1,
          name: '直营店'
        },
        {
          id: 2,
          name: '加盟店'
        }
      ],
      // 商品类目
      categoryData: {
        firstList: [],
        secondList: []
      },
      subwayList: [],
      companysList: [],
      // 图片库
      businessCircle: [],
      isPhotosDialog: false,
      isCloseStatus: false,
      picList: [],
      companyRules: {
        companyId: [
          { required: true, message: '请选择企业', trigger: 'change' }
        ],
        shopname: [
          { required: true, message: '请输入门店名称', trigger: 'blur' }
        ],
        shopType: [
          { required: true, message: '请选择门店分类', trigger: 'change' }
        ],
        phone1: [
          { validator: validateAllCall, message: '联系电话格式不正确', trigger: 'blur' }
        ],
        phone2: [
          { validator: validateAllCall, message: '联系电话格式不正确', trigger: 'blur' }
        ]
      }

    }
  },
  computed: {
    cid: function() {
      if (this.$route.query.id) {
        return this.$route.query.id
      } else {
        return ''
      }
    }
  },
  mounted() {
    this.getGoodsCategory()
    if (this.$route.query.id) {
      this.companyStatus = true
      this.shopForm.companyId = this.$route.query.id
    } else {
      this.companyStatus = false
      this.getCompanysList()
    }
  },
  methods: {
    onSave() {
      this.$refs.shopForm.validate(valid => {
        if (valid) {
          this.loading = true
          addShop(this.shopForm).then(response => {
            this.$message({
              type: 'success',
              message: '保存成功!'
            })
            this.loading = false
            if (this.companyStatus) {
              this.$router.push({ name: 'companyManage' })
            } else {
              this.$router.push({ name: 'shopManage' })
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 所属企业
    getCompanysList() {
      getCompanyAll().then(response => {
        if (response.data) {
          this.companysList = response.data
        } else {
          this.companysList = []
        }
      })
    },
    // 商品类目
    addCategory() {
      this.shopForm.goodsType.push(
        {
          pcat: '',
          cat: '',
          rate: ''
        }
      )
    },
    deleteCategory(index) {
      this.shopForm.goodsType.splice(index, 1)
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
    pcatChange(val, index) {
      this.getGoodsCategory(val)
      this.shopForm.goodsType[index].pcat = val
      this.shopForm.goodsType[index].cat = ''
    },
    catChange(val, index) {
      this.shopForm.goodsType[index].cat = val
    },
    // 门店图标
    openPhotos(index) {
      this.isPhotosDialog = true
      this.getPicList()
    },
    selectImg(url) {
      this.isPhotosDialog = false
      this.shopForm.shoplogoUrl = url
    },
    updateData(boot) {
      if (boot) {
        this.getPicList()
      }
    },
    // 加载图片库
    getPicList() {
      this.listLoading = true
      getShopPic().then(response => {
        var data = response.data
        this.picList = data.reverse()
        this.listLoading = false
      })
    },
    // 地铁选择
    getSubwayList(id) {
      getSubway(id).then(response => {
        this.subwayList = response.data
      })
    },
    disabledHandle(index) {
      if (this.shopForm.subways.length >= 5) {
        if (this.shopForm.subways.indexOf(index) < 0) {
          return true
        } else {
          return false
        }
      }
    },
    subwaysChange(val) {
      this.shopForm.subways = val
    },
    // 联动选择器
    selectData(data) {
      if (data.firstValue) {
        this.shopForm.provinceId = data.firstValue
      }
      if (data.secondValue) {
        this.getSubwayList(data.secondValue)
        this.shopForm.cityId = data.secondValue
      }
      if (data.thirdValue) {
        this.shopForm.districtId = data.thirdValue
      }
    },
    clearData(num) {
      if (num === 1) {
        this.shopForm.cityId = ''
        this.shopForm.districtId = ''
        this.subwayList = []
      } else if (num === 2) {
        this.shopForm.districtId = ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
.shopForm {
  width: 750px;
  .cityInput {
    width: 613px;
    margin-bottom: 10px;
  }
  .checkboxTitle {
    vertical-align: top;
  }
  .checkboxGroup {
    width: 520px;
    text-align: left;
    .el-checkbox {
      margin-left: 20px;
    }
  }
}
.shoplogo {
  width: 150px;
  height: 150px;
  vertical-align: bottom;
}
.commission {
  width: 100px;
}
</style>
