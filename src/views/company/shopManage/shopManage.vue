<template>
  <div class="app-container">
    <div class="filter-container">
      <el-card shadow="never">
        <div slot="header" class="clearfix">
          <el-row type="flex" justify="space-between">
            <el-col :span="12">
              <div style="line-height:32px">
                选项
              </div>
            </el-col>
            <el-col :span="12">
              <div style="text-align:right">
                <router-link :to="{name: 'shopAdd'}">
                  <el-button size="small" type="primary" icon="el-icon-edit">新增门店</el-button>
                </router-link>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="filter-main">
          <el-row :gutter="20">
            <el-col :span="12">
              <label>门店编号：</label>
              <el-input @keyup.enter.native="handleFilter" style="width:70%" placeholder="请输入企业编号" v-model="query.id">
              </el-input>
            </el-col>
            <el-col :span="12">
              <label>门店名称：</label>
              <el-input @keyup.enter.native="handleFilter" style="width:70%" placeholder="请输入企业名称" v-model="query.name">
              </el-input>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <label>门店负责人：</label>
              <el-input @keyup.enter.native="handleFilter" style="width:70%" placeholder="请输入门店负责人" v-model="query.linkman">
              </el-input>
            </el-col>
            <el-col :span="12">
              <label>负责人电话：</label>
              <el-input @keyup.enter.native="handleFilter" style="width:70%" placeholder="请输入负责人电话" v-model="query.phone">
              </el-input>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <label>门店状态：</label>
              <el-select style="width:40%" v-model="query.status" placeholder="请选择企业状态">
                <el-option v-for="item in shopStatus" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div style="text-align:center;margin-top:10px;">
                <el-button type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
                <el-button type="primary" @click="clearFilter">清空</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </div>
    <el-table :data="shopList" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号'>
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column prop="id" label="门店编号" align="center">
      </el-table-column>
      <el-table-column prop="name" label="门店名称" align="center">
      </el-table-column>
      <el-table-column prop="linkman" label="门店负责人" align="center">
      </el-table-column>
      <el-table-column prop="phone" label="负责人电话" align="center">
      </el-table-column>
      <el-table-column prop="creatDate" label="添加日期" align="center">
      </el-table-column>
      <el-table-column prop="" label="绑定店员" align="center">
      </el-table-column>
      <el-table-column label="门店状态" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.status==1">可用</div>
          <div v-if="scope.row.status==2">关店</div>
        </template>
      </el-table-column>
      <el-table-column prop="whyStop" label="操作原因" align="center">
      </el-table-column>
      <el-table-column align="center" label="操作" width="350px">
        <template slot-scope="scope">
          <div style="text-align:left">
            <router-link :to="{name: 'shopDetail', query: {id: scope.row.id}}">
              <el-button size="mini" type="success" plain>详情</el-button>
            </router-link>

            <el-button @click="delShop(scope.row)" size="mini" type="danger" plain>删除</el-button>
            <el-button size="mini" type="primary" plain>商品管理</el-button>
            <el-button v-if="scope.row.status==1" @click="switchShop(scope.row,'off')" size="mini" type="warning" plain>临时关店</el-button>
            <el-button v-if="scope.row.status==2" @click="switchShop(scope.row,'on')" size="mini" type="warning" plain>取消临时关店</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination @current-change="handleCurrentChange" :current-page="query.curPage" :page-size="query.pageSize" layout="total,prev, pager, next, jumper" :total="totelCount">
      </el-pagination>
    </div>

  </div>
</template>
<script>
import { getShops, deleteShop, stopShop } from '@/api/company/shop'
export default {
  name: 'shopManage',
  data() {
    return {
      shopList: [],
      query: {
        curPage: 1,
        pageSize: 10,
        id: '',
        name: '',
        status: '',
        linkman: '',
        phone: ''
      },
      totelCount: 1,
      //  门店状态
      shopStatus: [
        {
          id: 1,
          name: '可用'
        },
        {
          id: 2,
          name: '关店'
        }
      ]
    }
  },
  created() {
    this.getShopList()
  },
  methods: {
    delShop(row) {
      this.$confirm('是否确定删除' + row.name, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteShop(row.id).then(res => {
          this.getShopList()
          this.$message({
            type: 'success',
            message: row.name + '已删除'
          })
        })
      }).catch(() => {
      })
    },
    switchShop(row, val) {
      if (val === 'off') {
        this.$prompt('请填写临时关店原因:', '您确定需要临时关闭"' + row.name + '"？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputType: 'textarea',
          inputPattern: /\S/,
          inputErrorMessage: '内容不能为空'
        }).then(({ value }) => {
          if (value) {
            stopShop(row.id, value).then(res => {
              this.getShopList()
              this.$message({
                type: 'success',
                message: row.name + '已临时关店'
              })
            })
          }
        }).catch(() => {
        })
      } else if (val === 'on') {
        this.$confirm('确定需要取消临时关闭' + row.name, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          stopShop(row.id).then(res => {
            this.getShopList()
            this.$message({
              type: 'success',
              message: row.name + '已取消临时关店'
            })
          })
        }).catch(() => {
        })
      }
    },
    clearFilter() {
      this.query = {
        curPage: 1,
        pageSize: 10,
        id: '',
        name: '',
        status: '',
        linkman: '',
        phone: ''
      }
      this.getShopList()
    },
    handleFilter() {
      this.query.curPage = 1
      this.getShopList()
    },
    handleCurrentChange(val) {
      this.query.curPage = val
      this.getShopList()
    },
    getShopList() {
      this.listLoading = true
      getShops(this.query).then(response => {
        if (response.data) {
          this.shopList = response.data.shops
          this.totelCount = response.data.tolCount
          this.query.pageSize = response.data.pageSize
          this.query.curPage = response.data.curPage
        } else {
          this.shopList = []
        }
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    }

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>