<template>
  <div class="app-container">
    <div class="filter-container">
      <h3>商品分类</h3>
      <div style="text-align:right">
        <el-button class="filter-item" style="margin-left: 10px;" @click="addType" type="primary" icon="el-icon-edit">新建分类</el-button>
      </div>
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
    <!-- 点击增加弹出层 -->
    <el-dialog :title="textMap[dialogStatus]" @close="isClose" :visible.sync="isShowDialog" :show-close="false" center>
      <el-form :model="cityForm" label-width="80px">
        <el-form-item label="一级类目">
          <el-input style="width:70%" v-model.trim="cityForm.name" auto-complete="off" placeholder="请输入城市名"></el-input>
          <el-button type="primary" size="medium" @click="">增加一级分类</el-button>
        </el-form-item>
        <el-form-item label="二级类目">
          <el-input style="width:70%" v-model.trim="cityForm.name" auto-complete="off" placeholder="请输入二级类目"></el-input>
        </el-form-item>
        <div class="filterShop">
          <div>
            <span>
              <strong>添加可用门店:</strong>
            </span>
            <span>门店编码</span>
            <el-input style="width:20%" v-model.trim="cityForm.name" auto-complete="off"></el-input>
            <span>门店名称</span>
            <el-input style="width:20%" v-model.trim="cityForm.name" auto-complete="off"></el-input>
            <el-button type="primary" size="medium" @click="">筛选</el-button>
          </div>
          <el-table v-if="shopData.length>0" :data="shopData" style="width: 100%" height="250" border>
            <el-table-column fixed prop="date" label="选择" width="50">
            </el-table-column>
            <el-table-column prop="name" label="门店编号">
            </el-table-column>
            <el-table-column prop="province" label="门店名称">
            </el-table-column>
            <el-table-column prop="city" label="门店类别">
            </el-table-column>
            <el-table-column prop="address" label="佣金">
            </el-table-column>
          </el-table>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowDialog = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="">确定</el-button>
        <el-button v-else type="primary" @click="">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getGoodsCList } from '@/api/goods'
export default {
  name: 'goodsCategory',
  data() {
    return {
      typeList: [],
      listLoading: true,
      loading: false,
      isShowDialog: false,
      dialogStatus: '',
      textMap: {
        update: '修改商品分类',
        create: '新增分类'
      },
      cityForm: {
        name: '',
        id: ''
      },
      shopData: []
    }
  },
  created() {
    this.getTypeList()
  },
  methods: {
    updateType(row) {
      this.dialogStatus = 'update'
      this.isShowDialog = true
    },
    deleteType(row) {

    },
    addType() {
      this.dialogStatus = 'create'
      this.isShowDialog = true
    },
    getTypeList() {
      this.listLoading = true
      getGoodsCList().then(response => {
        if (response.data) {
          this.typeList = response.data
        } else {
          this.typeList = []
        }
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    isClose() {
      this.cityForm = {
        name: ''
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.edit-input {
  width: 120px;
}
</style>