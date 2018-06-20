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
                <router-link :to="{name: 'companyAdd'}">
                  <el-button size="small" type="primary" icon="el-icon-edit">新增企业</el-button>
                </router-link>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="filter-main">
          <el-row :gutter="20">
            <el-col :span="12">
              企业编号：
              <el-input @keyup.enter.native="handleFilter" style="width:80%" placeholder="请输入企业编号" v-model="query.id">
              </el-input>
            </el-col>
            <el-col :span="12">
              企业名称：
              <el-input @keyup.enter.native="handleFilter" style="width:80%" placeholder="请输入企业名称" v-model="query.name">
              </el-input>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              企业负责人：
              <el-input @keyup.enter.native="handleFilter" style="width:80%" placeholder="请输入企业法人" v-model="query.charge">
              </el-input>
            </el-col>
            <el-col :span="12">
              负责人电话：
              <el-input @keyup.enter.native="handleFilter" style="width:80%" placeholder="请输入企业法人电话" v-model="query.chargePhone">
              </el-input>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              所在地区：
              <el-input @keyup.enter.native="handleFilter" style="width:80%" placeholder="请输入所在地区" v-model="query.adrName">
              </el-input>
            </el-col>
            <el-col :span="12">
              企业状态：
              <el-select style="width:80%" v-model="query.status" placeholder="请选择企业状态">
                <el-option v-for="item in companyStatus" :key="item.id" :label="item.name" :value="item.id">
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
      <el-table-column label="企业状态" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.status==1">可用</div>
          <div v-if="scope.row.status==2">停用</div>
        </template>
      </el-table-column>
      <el-table-column prop="creatDate" label="添加日期" align="center">
      </el-table-column>
      <el-table-column prop="shopNum" label="分店数量" align="center">
      </el-table-column>
      <el-table-column align="center" label="操作" width="280px">
        <template slot-scope="scope">
          <div style="text-align:left">
            <router-link :to="{name: 'companyDetail', query: {id: scope.row.id}}">
              <el-button size="mini" type="success" plain>详情</el-button>
            </router-link>
            <el-button v-if="scope.row.status==1" @click="switchCompany(scope.row,'off')" size="mini" type="danger" plain>停用</el-button>
            <el-button v-if="scope.row.status==2" @click="switchCompany(scope.row,'on')" size="mini" type="danger" plain>开启</el-button>
            <el-button size="mini" type="primary" plain>添加下级门店</el-button>
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
import { getCompanys, statusCompany } from '@/api/company/company'
export default {
  name: 'companyManage',
  data() {
    return {
      companyList: [],
      query: {
        curPage: 1,
        pageSize: 10,
        id: '',
        name: '',
        status: '',
        charge: '',
        chargePhone: '',
        adrName: ''
      },
      totelCount: 1,
      // 企业状态
      companyStatus: [
        {
          id: 1,
          name: '可用'
        },
        {
          id: 2,
          name: '停用'
        }
      ]
    }
  },
  created() {
    this.getCompanyList()
  },
  methods: {
    switchCompany(row, val) {
      let str = ''
      if (val === 'on') {
        str = '开启'
      } else if (val === 'off') {
        str = '停用'
      }
      this.$confirm('是否' + str + row.name, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        statusCompany(row.id).then(res => {
          this.getCompanyList()
          this.$message({
            type: 'success',
            message: row.name + '已' + str
          })
        })
      }).catch(() => {
      })
    },
    clearFilter() {
      this.query = {
        curPage: 1,
        pageSize: 10,
        id: '',
        name: '',
        status: '',
        charge: '',
        chargePhone: '',
        adrName: ''
      }
      this.getCompanyList()
    },
    handleFilter() {
      this.query.curPage = 1
      this.getCompanyList()
    },
    handleCurrentChange(val) {
      this.query.curPage = val
      this.getCompanyList()
    },
    getCompanyList() {
      this.listLoading = true
      getCompanys(this.query).then(response => {
        if (response.data) {
          this.companyList = response.data.companies
          this.totelCount = response.data.tolCount
          this.query.pageSize = response.data.pageSize
          this.query.curPage = response.data.curPage
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