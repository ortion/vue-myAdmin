<template>
  <div class="app-container">
    <div class="filter-container">
      <el-card shadow="never">
        <div slot="header" class="clearfix">
          <el-row type="flex" justify="space-between">
            <el-col :span="24">
              <div style="line-height:32px">
                选项
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="filter-main">
          <el-row :gutter="20">
            <el-col :span="12">
              <label>商品编码：</label>
              <el-input @keyup.enter.native="handleFilter" style="width:70%" placeholder="请输入商品编号" v-model="query.goodsNo">
              </el-input>
            </el-col>
            <el-col :span="12">
              <label>商品名称：</label>
              <el-input @keyup.enter.native="handleFilter" style="width:70%" placeholder="请输入商品名称" v-model="query.name">
              </el-input>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <label>创建时间：</label>
              <el-date-picker style="width:70%" type="date" placeholder="选择日期" v-model="query.creatDate" value-format="timestamp">
              </el-date-picker>
            </el-col>
            <el-col :span="12">
              <label>单价：</label>
              <el-input @keyup.enter.native="handleFilter" style="width:70%" placeholder="请输入单价" v-model="query.price">
              </el-input>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <label>商品分类：</label>
              <el-input @keyup.enter.native="handleFilter" style="width:40%" placeholder="请输入商品分类" v-model="query.cat">
              </el-input>
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
    <el-table :data="goodsList" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号'>
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column label="图标" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.masterPicUrl" alt="" v-if="scope.row.masterPicUrl">
          <img :src="logo" alt="" v-else>
        </template>
      </el-table-column>
      <el-table-column label="商品编码" align="center">
        <template slot-scope="scope">
          <router-link :to="{name: 'goodsDetail', query: {id: scope.row.goodsNo}}">
            <el-button type="text">{{scope.row.goodsNo}}</el-button>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" align="center">
      </el-table-column>
      <el-table-column prop="catName" label="分类" align="center">
      </el-table-column>
      <el-table-column prop="price" label="单价" align="center">
      </el-table-column>
      <el-table-column prop="checkDate" label="审核时间" align="center">
      </el-table-column>
      <el-table-column label="商品状态" align="center">
        <template slot-scope="scope">
          {{getStatus(scope.row.status)}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <div style="text-align:left">
            <el-button v-if="scope.row.status==1" @click="offGood(scope.row.goodsNo)" size="mini" type="primary" plain>下架</el-button>
            <router-link :to="{name: 'goodsDetail', query: {id: scope.row.goodsNo,status:'review'}}">
              <el-button v-if="scope.row.status==4" size="mini" type="warning" plain>审核</el-button>
            </router-link>
            <el-button v-if="scope.row.status==2||scope.row.status==5" @click="switchGoods('stop',scope.row.goodsNo)" size="mini" type="success" plain>停用</el-button>
            <el-button v-if="scope.row.status==7" size="mini" @click="switchGoods('open',scope.row.goodsNo)" type="success" plain>启用</el-button>
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
import logo from '@/assets/logo.png'
import { getGoodsList, stopGoods, openGoods, offGoods } from '@/api/goods'
export default {
  name: 'goodsReview',
  data() {
    return {
      logo,
      loading: false,
      goodsList: [],
      query: {
        curPage: 1,
        pageSize: 10,
        goodsNo: '',
        name: '',
        creatDate: '',
        price: '',
        cat: ''
      },
      totelCount: 1,
      // 商品状态
      goodsStatus: [
        {
          id: 1,
          name: '已上架'
        },
        {
          id: 2,
          name: '已下架'
        },
        {
          id: 3,
          name: '已添加'
        },
        {
          id: 4,
          name: '审核中'
        },
        {
          id: 5,
          name: '已审核'
        },
        {
          id: 6,
          name: '审核未通过'
        },
        {
          id: 7,
          name: '已停用'
        }
      ]
    }
  },
  created() {
    this.getGoodList()
  },
  methods: {
    // 状态
    getStatus(id) {
      let name
      this.goodsStatus.map(item => {
        if (item.id === id) {
          name = item.name
        }
      })
      return name
    },
    selectionGoods(val) {
      this.multipleSelection = val
    },
    offGood(id) {
      const selectList = []
      if (id) {
        selectList.push(id)
      }

      offGoods(selectList).then(res => {
        this.getGoodList()
        this.$message({
          type: 'success',
          message: '下架成功'
        })
      })
    },
    switchGoods(status, id) {
      if (status === 'stop') {
        stopGoods(id).then(res => {
          this.getGoodList()
          this.$message({
            type: 'success',
            message: '已停用'
          })
        })
      } else if (status === 'off') {
        openGoods(id).then(res => {
          this.getGoodList()
          this.$message({
            type: 'success',
            message: '已启用'
          })
        })
      }
    },
    clearFilter() {
      this.query = {
        curPage: 1,
        pageSize: 10,
        goodsNo: '',
        name: '',
        creatDate: '',
        price: '',
        cat: ''
      }
      this.getGoodList()
    },
    handleFilter() {
      this.query.curPage = 1
      this.getGoodList()
    },
    handleCurrentChange(val) {
      this.query.curPage = val
      this.getGoodList()
    },
    getGoodList() {
      this.listLoading = true
      getGoodsList(this.query).then(response => {
        if (response.data) {
          this.goodsList = response.data.rows
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