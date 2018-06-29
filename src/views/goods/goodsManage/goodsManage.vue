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
                <router-link :to="{name: 'goodsAdd'}">
                  <el-button size="small" type="primary" icon="el-icon-edit">新增商品</el-button>
                </router-link>
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
              <el-input v-model.number="query.price" @keyup.enter.native="handleFilter" style="width:70%" placeholder="请输入单价">
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
    <div style="text-align:right;margin-bottom:10px;">
      <el-button :disabled="this.multipleSelection.length==0" type="primary" size="small" @click="switchGoods('on')">批量上架</el-button>
      <el-button :disabled="this.multipleSelection.length==0" type="primary" size="small" @click="switchGoods('off')">批量下架</el-button>
    </div>
    <el-table @selection-change="selectionGoods" :data="goodsList" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="55">
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column label="图标" align="center" width="80">>
        <template slot-scope="scope">
          <img :src="scope.row.masterPicUrl" alt="" v-if="scope.row.masterPicUrl">
          <img :src="logo" alt="" v-else>
        </template>
      </el-table-column>
      <el-table-column label="商品编码" align="center" width="300">
        <template slot-scope="scope">
          <router-link :to="{name: 'goodsDetail', query: {id: scope.row.goodsNo}}">
            <el-button type="text">{{scope.row.goodsNo}}</el-button>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" align="center">
      </el-table-column>
      <el-table-column prop="price" label="单价" align="center">
      </el-table-column>
      <el-table-column prop="cat" label="分类" align="center">
      </el-table-column>
      <el-table-column prop="creatDate" label="创建时间" align="center">
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          {{getStatus(scope.row.status)}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <div style="text-align:left">

            <el-button v-if="scope.row.status==1" @click="switchGoods('off',scope.row.goodsNo)" size="mini" type="primary" plain>下架</el-button>
            <el-button v-if="scope.row.status==5||scope.row.status==2" @click="switchGoods('on',scope.row.goodsNo)" size="mini" type="warning" plain>上架</el-button>
            <el-button v-if="scope.row.status==3||scope.row.status==6" @click="reviewGood(scope.row)" size="mini" type="success" plain>提交审核</el-button>
            <el-button v-if="scope.row.status==4" size="mini" type="success" plain>提醒审核</el-button>
            <el-button :loading="loading" v-if="scope.row.status==5||scope.row.status==2" @click="deleteGood(scope.row)" size="mini" type="danger" plain>删除</el-button>
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
import { getGoodsList, onGoods, offGoods, submitReviewGoods, deleteGoods } from '@/api/goods'
export default {
  name: 'goodsManage',
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
      // 企业状态
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
      ],
      multipleSelection: []
    }
  },
  created() {
    this.getGoodList()
  },
  methods: {
    deleteGood(row) {
      this.loading = true
      deleteGoods(row.goodsNo).then(res => {
        this.getGoodList()
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    reviewGood(row) {
      submitReviewGoods(row.goodsNo).then(res => {
        this.getGoodList()
        this.$message({
          type: 'success',
          message: '审核已提交'
        })
      })
    },
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
    switchGoods(status, id) {
      const selectList = []
      if (id) {
        selectList.push(id)
      } else {
        this.multipleSelection.forEach(items => {
          selectList.push(items.goodsNo)
        })
      }
      if (status === 'on') {
        onGoods(selectList).then(res => {
          this.getGoodList()
          this.$message({
            type: 'success',
            message: ' 上架成功'
          })
        })
      } else if (status === 'off') {
        offGoods(selectList).then(res => {
          this.getGoodList()
          this.$message({
            type: 'success',
            message: '下架成功'
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
          this.goodsList = response.data.data
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