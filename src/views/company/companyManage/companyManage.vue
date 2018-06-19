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

    <el-table :data="companyList" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号'>
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column prop="id" label="企业编号" align="center">
      </el-table-column>
      <el-table-column prop="name" label="企业名称" align="center">
      </el-table-column>
      <el-table-column prop="adr" label="所在地区" align="center">
      </el-table-column>
      <el-table-column prop="charge" label="企业负责人" align="center">
      </el-table-column>
      <el-table-column prop="chargePhone" label="负责人电话" align="center">
      </el-table-column>
      <el-table-column prop="status" label="企业状态" align="center">
      </el-table-column>
      <el-table-column prop="creatDate" label="添加日期" align="center">
      </el-table-column>
      <el-table-column prop="shopNum" label="分店数量" align="center">
      </el-table-column>
      <el-table-column align="center" label="操作" width="280px">
        <template slot-scope="scope">
          <div style="text-align:left">
            <el-button size="mini" type="success" plain>详情</el-button>
            <el-button size="mini" type="danger" plain v-if="!closeShop">停用</el-button>
            <el-button size="mini" type="danger" plain v-if="closeShop">开启</el-button>
            <el-button size="mini" type="primary" plain>添加下级门店</el-button>
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
import { getCompanys } from '@/api/company/company'
export default {
  name: 'companyManage',
  data() {
    return {
      companyList: [],
      query: {
        currentPage: 1,
        pageSize: 10
      },
      totelCount: 1
    }
  },
  created() {
    this.getCompanyList()
  },
  methods: {
    handleCurrentChange(val) {
      this.query.currentPage = val
      this.getCompanyList()
    },
    getCompanyList() {
      this.listLoading = true
      getCompanys(this.query).then(response => {
        if (response.data) {
          this.companyList = response.data.companies
          this.totelCount = response.data.tolCount
          this.query.pageSize = response.data.pageSize
          this.query.currentPage = response.data.curPage
        } else {
          this.companyList = []
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