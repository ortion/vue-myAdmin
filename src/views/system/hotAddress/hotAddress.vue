<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row type="flex" justify="space-between">
        <el-col :span="12">
          <div style="line-height:32px">热门地址管理</div>
        </el-col>
        <el-col :span="12">
          <div style="text-align:right">
            <el-button type="primary" @click="isShowDialog = true" icon="el-icon-edit">添加热门地址</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号'>
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column label="地址" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="edit-input" size="small" v-model.trim="scope.row.cityName"></el-input>
            <el-button class='cancel-btn' size="small" type="warning" @click="cancelEdit(scope.row)">取消</el-button>
          </template>
          <span v-else>{{ scope.row.cityName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <div style="text-align:left">
            <el-button v-if="scope.row.edit" :loading="loading" size="mini" type="danger" plain @click="updateAddress(scope.row)">保存</el-button>
            <el-button v-else type="primary" size="mini" plain @click='scope.row.edit=!scope.row.edit'>修改</el-button>
            <el-button :disabled="scope.row.id==1" size="mini" type="success" plain @click="moveAddress(scope.row,'up')">上移</el-button>
            <el-button :disabled="scope.row.id==list.length" size="mini" type="success" plain @click="moveAddress(scope.row,'down')">下移</el-button>
            <el-button size="mini" type="danger" plain @click="deleteAddress(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 点击增加弹出层 -->
    <el-dialog title="增加热门地址" @close="isClose" :visible.sync="isShowDialog" :show-close="false" width="400px" center>
      <el-form :model="cityForm" label-width="80px">
        <el-form-item label="城市名">
          <el-input v-model.trim="cityForm.name" auto-complete="off" placeholder="请输入城市名"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowDialog = false">取消</el-button>
        <el-button type="primary" @click.native.prevent="submitCitys" :loading="loading">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getHCityList, addHCity, updateHCity, deleteHCity, upMoveHCity, downMoveHCity } from '@/api/system/hotManage'
export default {
  name: 'hotAddress',
  data() {
    return {
      list: null,
      listLoading: true,
      loading: false,
      isShowDialog: false,
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
    cancelEdit(row) {
      row.cityName = row.originalTitle
      row.edit = false
      this.cityForm = {
        name: ''
      }
    },
    getHotCityList() {
      this.listLoading = true
      getHCityList().then(response => {
        if (response.data) {
          const items = response.data
          this.list = items.map(v => {
            this.$set(v, 'edit', false)
            v.originalTitle = v.cityName
            return v
          })
        } else {
          this.list = []
        }
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
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
        }).catch(() => {
          this.loading = false
        })
      } else {
        this.$message({
          type: 'warning',
          message: '地址不能为空'
        })
      }
    },
    updateAddress(row) {
      if (row.cityName) {
        this.loading = true
        row.originalTitle = row.cityName
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
        }).catch(() => {
          this.loading = false
        })
      } else {
        this.$message({
          type: 'warning',
          message: '地址不能为空'
        })
      }
    },
    deleteAddress(row) {
      deleteHCity(row.cityId).then(() => {
        this.$message({
          message: '删除地址成功',
          type: 'success'
        })
        this.getHotCityList()
      })
    },
    moveAddress(row, status) {
      if (status === 'up') {
        if (row.id === 1) {
          return
        } else {
          upMoveHCity(row.cityId).then(() => {
            this.getHotCityList()
          })
        }
      } else if (status === 'down') {
        if (row.id === this.list.length) {
          return
        } else {
          downMoveHCity(row.cityId).then(() => {
            this.getHotCityList()
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
</style>