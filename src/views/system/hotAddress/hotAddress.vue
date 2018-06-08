<template>
  <div class="app-container">
    <div class="filter-container">
      <h3>热门地址管理</h3>
      <div style="text-align:right">
        <el-button class="filter-item" style="margin-left: 10px;" @click="addAddress" type="primary" icon="el-icon-edit">增加</el-button>
      </div>
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row empty-text="暂无数据">
      <el-table-column align="center" label='序号'>
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column label="地址" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="edit-input" size="small" v-model="scope.row.cityName"></el-input>
          </template>
          <span v-else>{{ scope.row.cityName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <div style="text-align:left">
            <el-button v-if="scope.row.edit" size="mini" type="danger" plain @click="updateAddress(scope.row)">保存</el-button>
            <el-button v-else type="primary" size="mini" plain @click='scope.row.edit=!scope.row.edit'>修改</el-button>
            <el-button size="mini" type="success" plain @click="moveAddress(scope.row,'up')">上移</el-button>
            <el-button size="mini" type="success" plain @click="moveAddress(scope.row,'down')">下移</el-button>
            <el-button size="mini" type="danger" plain @click="deleteAddress(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 点击增加弹出层 -->
    <el-dialog title="增加热门地址"  @close="isClose" :visible.sync="isShowDialog" :show-close="false" width="400px">
      <el-form :model="cityForm" label-width="80px">
        <el-form-item label="城市名" prop="oldPass">
          <el-input type="text" v-model="cityForm.name" auto-complete="off" placeholder="请输入城市名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancelDialog">取消</el-button>
          <el-button type="primary" @click.native.prevent="submitCitys" :loading="loading">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { getHCityList, addHCity, updateHCity, deleteHCity, upMoveHCity, downMoveHCity } from '@/api/hotManage'
export default {
  name: 'hotAddress',
  data() {
    return {
      list: null,
      listLoading: true,
      isShowDialog: false,
      loading: false,
      cityForm: {
        name: '',
        id: ''
      }
    }
  },
  created() {
    this.getHotCityList()
  },
  methods: {
    getHotCityList() {
      this.listLoading = true
      getHCityList().then(response => {
        const items = response.data
        this.list = items.map(v => {
          this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
          return v
        })
        this.listLoading = false
      })
    },
    addAddress() {
      this.isShowDialog = true
    },
    cancelDialog() {
      this.isShowDialog = false
      this.cityForm = {
        name: ''
      }
    },
    submitCitys() {
      if (this.cityForm.name) {
        this.loading = true
        addHCity(this.cityForm.name).then(() => {
          this.loading = false
          this.$message({
            message: '热门地址添加成功',
            type: 'success'
          })
          this.isShowDialog = false
          this.getHotCityList()
        }).catch(err => {
          console.log(err)
          this.$message({
            message: err,
            type: 'error'
          })
          this.loading = false
        })
      }
    },
    updateAddress(row) {
      if (row.cityName) {
        this.loading = true
        this.cityForm.id = row.cityId
        this.cityForm.name = row.cityName
        updateHCity(this.cityForm).then(() => {
          this.loading = false
          this.$message({
            message: '修改地址成功',
            type: 'success'
          })
          row.edit = false
          this.cityForm = {
            name: ''
          }
        }).catch(err => {
          console.log(err)
          this.$message({
            message: err,
            type: 'error'
          })
          this.loading = false
        })
      }
    },
    deleteAddress(row) {
      this.loading = true
      deleteHCity(row.cityId).then(() => {
        this.loading = false
        this.$message({
          message: '删除地址成功',
          type: 'success'
        })
        this.getHotCityList()
      }).catch(err => {
        console.log(err)
        this.$message({
          message: err,
          type: 'error'
        })
        this.loading = false
      })
    },
    moveAddress(row, status) {
      if (status === 'up') {
        if (row.id === 1) {
          return
        } else {
          upMoveHCity(row.cityId).then(() => {
            this.loading = false
            this.getHotCityList()
          }).catch(err => {
            console.log(err)
            this.$message({
              message: err,
              type: 'error'
            })
            this.loading = false
          })
        }
      } else if (status === 'down') {
        if (row.id === this.list.length) {
          return
        } else {
          downMoveHCity(row.cityId).then(() => {
            this.loading = false
            this.getHotCityList()
          }).catch(err => {
            console.log(err)
            this.$message({
              message: err,
              type: 'error'
            })
            this.loading = false
          })
        }
      }
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