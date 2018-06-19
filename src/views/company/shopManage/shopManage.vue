<template>
  <div class="app-container">
    <div class="filter-container">
      <h3>门店管理</h3>
      <div style="text-align:right">
        <router-link :to="{name: 'shopAdd'}">
          <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">增加</el-button>
        </router-link>
      </div>
      <!-- <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('table.title')" v-model="listQuery.title">
      </el-input>
      <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.importance" :placeholder="$t('table.importance')">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.type" :placeholder="$t('table.type')">
        <el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key">
        </el-option>
      </el-select>
      <el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="listQuery.sort">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">{{$t('table.add')}}</el-button>
      <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">{{$t('table.export')}}</el-button>
      <el-checkbox class="filter-item" style='margin-left:15px;' @change='tableKey=tableKey+1' v-model="showReviewer">{{$t('table.reviewer')}}</el-checkbox> -->
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
      <el-table-column prop="status" label="门店状态" align="center">
      </el-table-column>
      <el-table-column prop="whyStop" label="操作原因" align="center">
      </el-table-column>
      <el-table-column align="center" label="操作" width="350px">
        <template slot-scope="scope">
          <div style="text-align:left">
            <router-link :to="{name: 'shopDetail', query: {id: scope.row.id}}">
              <el-button size="mini" type="success" plain>详情</el-button>
            </router-link>

            <el-button size="mini" type="danger" plain>删除</el-button>
            <el-button size="mini" type="primary" plain>商品管理</el-button>
            <el-button size="mini" type="warning" plain v-if="!closeShop">临时关店</el-button>
            <el-button size="mini" type="warning" plain v-if="closeShop">取消临时关店</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination @current-change="handleCurrentChange" :current-page="query.currentPage" :page-size="query.pageSize" layout="total,prev, pager, next, jumper" :total="totelCount">
      </el-pagination>
    </div>

  </div>
</template>
<script>
import { getShops } from '@/api/company/shop'
export default {
  name: 'shopManage',
  data() {
    return {
      shopList: [],
      query: {
        currentPage: 1,
        pageSize: 10
      },
      totelCount: 1
    }
  },
  created() {
    this.getShopList()
  },
  methods: {
    handleCurrentChange(val) {
      this.query.currentPage = val
      this.getShopList()
    },
    getShopList() {
      this.listLoading = true
      getShops(this.query).then(response => {
        if (response.data) {
          this.shopList = response.data.shops
          this.totelCount = response.data.tolCount
          this.query.pageSize = response.data.pageSize
          this.query.currentPage = response.data.curPage
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