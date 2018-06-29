<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row type="flex" justify="space-between">
        <el-col :span="12">
          <div style="line-height:32px">商品分类管理</div>
        </el-col>
        <el-col :span="12">
          <div style="text-align:right">
            <el-button type="primary" @click="addType" icon="el-icon-edit">添加商品分类</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-table :data="typeList" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号'>
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column prop="pcatName" label="一级类目" align="center">
      </el-table-column>
      <el-table-column prop="catName" label="二级类目" align="center">
      </el-table-column>
      <el-table-column prop="shopNum" label="可用门店" align="center">
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <div style="text-align:left">
            <el-button type="primary" size="mini" plain @click="updateType(scope.row)">修改</el-button>
            <el-button size="mini" type="danger" plain @click="deleteType(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination @current-change="handleCurrentChange" :current-page="query.curPage" :page-size="query.pageSize" layout="total,prev, pager, next, jumper" :total="totelCount">
      </el-pagination>
    </div>
    <!-- 点击增加弹出层 -->
    <el-dialog :title="textMap[dialogStatus]" @close="isClose" :visible.sync="isShowDialog" :show-close="false">
      <el-form v-if="dialogStatus=='create'" :model="categoryForm" ref="categoryForm" :rules="categoryRules" label-width="80px">
        <el-form-item label="一级类目" prop="pcat">
          <el-select v-model="categoryForm.pcat" placeholder="一级类目">
            <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
          <el-button type="primary" size="medium" @click="addFirstType">增加一级分类</el-button>
        </el-form-item>
        <el-form-item label="二级类目" prop="catName">
          <el-input style="width:70%" v-model.trim="categoryForm.catName" auto-complete="off" placeholder="请输入二级类目"></el-input>
        </el-form-item>
        <div class="filterShop">
          <div>
            <span>
              <strong>可用门店:</strong>
            </span>
            <span>门店编码</span>
            <el-input style="width:20%" v-model.trim="queryShops.shopId" auto-complete="off"></el-input>
            <span>门店名称</span>
            <el-input style="width:20%" v-model.trim="queryShops.shopName" auto-complete="off"></el-input>
            <el-button type="primary" size="medium" @click="getQueryShops">筛选</el-button>
          </div>
          <div v-if="openShopData">
            <el-table ref="multipleTable" :data="shopData" @select="handleSelection" style="width: 100%;margin-top:10px;" max-height="180" border @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column prop="id" label="门店名称">
              </el-table-column>
              <el-table-column prop="name" label="门店名称">
              </el-table-column>
              <el-table-column prop="type" label="门店类别">
              </el-table-column>
              <el-table-column label="佣金">
                <template slot-scope="scope">
                  <el-form v-if="scope.row.isSelect" class="checkRate" :model="scope.row" :rules="checkRate" ref="scope.row">
                    <el-form-item prop="rate">
                      <el-input type="number" v-model.number="scope.row.rate" :min="0" :max="100" style="width:80px"></el-input>
                      <span>%</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-form>
      <el-form v-if="dialogStatus=='update'" :model="updateForm" ref="updateForm" :rules="categoryRules" label-width="80px">
        <el-form-item label="一级类目" prop="pcat">
          <div>
            {{updateDate.pcatName}}
          </div>
        </el-form-item>
        <el-form-item label="二级类目" prop="catName">
          <el-input style="width:70%" v-model.trim="updateForm.catName" auto-complete="off" placeholder="请输入二级类目"></el-input>
        </el-form-item>
        <div class="filterShop">
          <div>
            <span>
              <strong>可用门店:</strong>
            </span>
            <span>门店编码</span>
            <el-input style="width:20%" v-model.trim="queryShops.shopId" auto-complete="off"></el-input>
            <span>门店名称</span>
            <el-input style="width:20%" v-model.trim="queryShops.shopName" auto-complete="off"></el-input>
            <el-button type="primary" size="medium" @click="getQueryShops">筛选</el-button>
          </div>
          <div v-if="openShopData">
            <el-table :data="shopData" style="width: 100%;margin-top:10px;" max-height="180" border>
              <el-table-column align="center" label='序号'>
                <template slot-scope="scope">
                  {{scope.$index+1}}
                </template>
              </el-table-column>
              <el-table-column prop="id" label="门店编号">
              </el-table-column>
              <el-table-column prop="name" label="门店名称">
              </el-table-column>
              <el-table-column prop="type" label="门店类别">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button v-if="!scope.row.isSelect" size="mini" type="danger" plain @click="deleteShop(scope.row)">取消</el-button>
                  <el-button v-else size="mini" type="warning" plain @click="returnShop(scope.row)">撤回取消</el-button>
                </template>
              </el-table-column>

            </el-table>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowDialog = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="onSave" :loading="loading">确定</el-button>
        <el-button v-else type="primary" @click="onUpdate">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getGoodsCList, getCategory, getValidShops, addSecondCate, UpdateGoodsCate, addFirstCate, deleteGoodsCate } from '@/api/goods'
export default {
  name: 'goodsCategory',
  data() {
    return {
      typeList: [],
      query: {
        curPage: 1,
        pageSize: 10
      },
      totelCount: 1,
      listLoading: true,
      loading: false,
      isShowDialog: false,
      dialogStatus: '',
      textMap: {
        update: '修改商品分类',
        create: '新增分类'
      },
      categoryForm: {
        pcat: '',
        catName: '',
        shops: []
      },
      categoryList: [],
      queryShops: {
        pcat: '',
        cat: '',
        shopId: '',
        shopName: ''
      },
      shopData: [],
      openShopData: false,
      multipleSelection: [],
      // 验证
      categoryRules: {
        pcat: [{ required: true, message: '请选择一级分类', trigger: 'change' }],
        catName: [{ required: true, message: '请填写二级分类', trigger: 'blur' }]

      },
      checkRate: {
        rate: [
          { required: true, message: '佣金不能为空', trigger: 'blur' },
          { type: 'number', min: 0, max: 100, message: '佣金必须为0-100之间的数字', trigger: 'blur' }
        ]
      },
      // 修改
      updateDate: {},
      cancelStatus: false,
      updateForm: {
        pcat: '',
        cat: '',
        catName: '',
        shopIds: []
      }
    }
  },
  created() {
    this.getTypeList()
  },
  methods: {
    deleteType(row) {
      if (row.shopNum === 0) {
        this.$confirm('是否确定删除类目:' + row.catName, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteGoodsCate(row.pcat, row.cat).then(res => {
            this.getTypeList()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
        }).catch(() => {
        })
      } else {
        this.$message({
          message: '存在可用门店，不能删除该类目',
          type: 'error'
        })
      }
    },
    // 增加一级分类
    addFirstType() {
      this.$prompt('类目名称', '增加一级类目', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: 'text',
        inputPattern: /\S/,
        inputErrorMessage: '内容不能为空'
      }).then(({ value }) => {
        if (value) {
          addFirstCate(value).then(res => {
            this.getGoodsCategory()
            this.$message({
              type: 'success',
              message: value + '已添加'
            })
          })
        }
      }).catch(() => {
      })
    },
    // 修改
    onUpdate() {
      this.$refs.updateForm.validate(valid => {
        if (valid) {
          this.loading = true
          UpdateGoodsCate(this.updateForm).then(response => {
            this.getTypeList()
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
            this.loading = false
            this.isShowDialog = false
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    returnShop(row) {
      row.isSelect = false
      if (this.updateForm.shopIds.indexOf(row.id) >= 0) {
        this.updateForm.shopIds.splice(this.updateForm.shopIds.indexOf(row.id), 1)
      }
    },
    deleteShop(row) {
      row.isSelect = true
      this.updateForm.shopIds.push(row.id)
    },
    updateType(row) {
      this.updateForm.cat = row.cat
      this.updateForm.pcat = row.pcat
      this.updateForm.catName = row.catName
      this.queryShops.pcat = row.pcat
      this.queryShops.cat = row.cat
      this.updateDate = row
      this.dialogStatus = 'update'
      this.isShowDialog = true
    },

    onSave() {
      this.$refs.categoryForm.validate(valid => {
        if (valid) {
          this.multipleSelection.forEach(items => {
            this.categoryForm.shops.push({ 'shopId': items.id, 'rate': items.rate })
          })
          this.loading = true
          addSecondCate(this.categoryForm).then(response => {
            this.getTypeList()
            this.$message({
              type: 'success',
              message: '保存成功!'
            })
            this.loading = false
            this.isShowDialog = false
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    addType() {
      this.dialogStatus = 'create'
      this.getGoodsCategory()
      this.isShowDialog = true
    },
    handleSelection(val, row) {
      if (val.indexOf(row) < 0) {
        row.isSelect = false
      } else {
        row.isSelect = true
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 筛选
    getQueryShops() {
      if (this.queryShops.shopId || this.queryShops.shopName) {
        // if (this.dialogStatus === 'update') {
        //   this.queryShops.pcat = this.categoryForm.pcat
        // }
        getValidShops(this.queryShops).then(response => {
          if (response.data) {
            const items = response.data
            this.shopData = items.map(v => {
              this.$set(v, 'rate', '')
              this.$set(v, 'isSelect', false)
              return v
            })
          } else {
            this.shopData = []
          }
          this.openShopData = true
        })
      } else {
        this.$message({
          message: '门店编号、门店名称至少写一个',
          type: 'error'
        })
      }
    },
    // 获得一级分类
    getGoodsCategory() {
      getCategory().then(response => {
        if (response.data) {
          this.categoryList = response.data
        } else {
          this.categoryList = []
        }
      })
    },
    handleCurrentChange(val) {
      this.query.curPage = val
      this.getTypeList()
    },
    getTypeList() {
      this.listLoading = true
      getGoodsCList(this.query).then(response => {
        if (response.data) {
          this.typeList = response.data.shopCatGroups
          this.totelCount = response.data.tolCount
          this.query.pageSize = response.data.pageSize
          this.query.curPage = response.data.curPage
        } else {
          this.typeList = []
        }
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    isClose() {
      if (this.dialogStatus === 'create') {
        if (this.$refs.categoryForm !== undefined) {
          this.$refs.categoryForm.resetFields()
        }
        this.categoryForm = {
          pcat: '',
          catName: '',
          shops: []
        }
      } else {
        if (this.$refs.updateForm !== undefined) {
          this.$refs.updateForm.resetFields()
        }
        this.updateForm = {
          pcat: '',
          cat: '',
          catName: '',
          shopIds: []
        }
      }
      this.queryShops = {
        pcat: '',
        cat: '',
        shopId: '',
        shopName: ''
      }
      this.shopData = []
      this.openShopData = false
      this.dialogStatus = ''
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>