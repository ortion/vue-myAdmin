<template>
  <div class="app-container">
    <div class="filter-container">
      <h3>企业类型管理</h3>
      <div style="text-align:right">
        <el-button class="filter-item" style="margin-left: 10px;" @click="addType" type="primary" icon="el-icon-edit">增加</el-button>
      </div>
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号'>
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column label="分类名称" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="edit-input" size="small" v-model="scope.row.name"></el-input>
            <el-button class='cancel-btn' size="small" type="warning" @click="cancelEdit(scope.row)">取消</el-button>
          </template>
          <span v-else>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <div style="text-align:left">
            <el-button v-if="scope.row.edit" :loading="loading" size="mini" type="danger" plain @click="updateCompanyType(scope.row)">保存</el-button>
            <el-button v-else type="primary" size="mini" plain @click='scope.row.edit=!scope.row.edit'>修改</el-button>
            <el-button size="mini" type="danger" plain @click="deleteCompanyType(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 点击增加弹出层 -->
    <el-dialog title="新增分类" @close="isClose" :visible.sync="isShowDialog" :show-close="false" width="400px">
      <el-form :model="typeForm" label-width="80px">
        <el-form-item label="分类名称" prop="oldPass">
          <el-input v-model.trim="typeForm.name" auto-complete="off" placeholder="请输入分类名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancelDialog">取消</el-button>
          <el-button type="primary" @click.native.prevent="submitType" :loading="loading">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { getTypelist, addType, updateType, deleteType } from '@/api/company/company'
export default {
  name: 'companyType',
  data() {
    return {
      list: null,
      listLoading: true,
      loading: false,
      isShowDialog: false,
      typeForm: {
        name: '',
        id: ''
      }
    }
  },
  created() {
    this.getCompanyType()
  },
  methods: {
    cancelEdit(row) {
      row.name = row.originalTitle
      row.edit = false
      this.typeForm = {
        name: ''
      }
    },
    getCompanyType() {
      this.listLoading = true
      getTypelist().then(response => {
        if (response.data) {
          const items = response.data
          this.list = items.map(v => {
            this.$set(v, 'edit', false)
            v.originalTitle = v.name
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
    addType() {
      this.isShowDialog = true
    },
    cancelDialog() {
      this.isShowDialog = false
      this.typeForm = {
        name: ''
      }
    },
    submitType() {
      if (this.typeForm.name) {
        this.loading = true
        addType(this.typeForm.name).then(() => {
          this.loading = false
          this.$message({
            message: '企业分类添加成功',
            type: 'success'
          })
          this.isShowDialog = false
          this.getCompanyType()
        }).catch(() => {
          this.loading = false
        })
      } else {
        this.$message({
          type: 'warning',
          message: '名称不能为空'
        })
      }
    },
    updateCompanyType(row) {
      if (row.name) {
        this.loading = true
        row.originalTitle = row.name
        this.typeForm.id = row.id
        this.typeForm.name = row.name
        updateType(this.typeForm).then(() => {
          this.loading = false
          this.$message({
            message: '修改企业分类成功',
            type: 'success'
          })
          row.edit = false
          this.typeForm = {
            name: ''
          }
        }).catch(() => {
          this.loading = false
        })
      } else {
        this.$message({
          type: 'warning',
          message: '名称不能为空'
        })
      }
    },
    deleteCompanyType(row) {
      deleteType(row.id).then(() => {
        this.$message({
          message: '删除分类成功',
          type: 'success'
        })
        this.getCompanyType()
      }).catch(() => {
      })
    },

    isClose() {
      this.typeForm = {
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