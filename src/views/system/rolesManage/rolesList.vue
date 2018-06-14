<template>
  <div class="app-container">
    <div class="filter-container">
      <h3>权限管理</h3>
      <div style="text-align:right">
        <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">增加</el-button>
      </div>
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row empty-text="暂无数据">
      <el-table-column align="center" label='序号'>
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column label="角色" align="center">
        <template slot-scope="scope">
          {{scope.row.roleName}}
        </template>
      </el-table-column>
      <el-table-column label="所属机构" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.merchantTypeName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <div style="text-align:left">
            <el-button size="mini" type="success" plain @click="handleModifyStatus(scope.row,'published')">分配</el-button>
            <el-button v-if="scope.row.roleId!==superRoleId" type="primary" size="mini" plain @click="handleUpdate(scope.row)">修改</el-button>
            <el-button v-if="scope.row.roleId!==superRoleId" size="mini" type="danger" plain @click="deleteRoles(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getRoleList, deleteRoles } from '@/api/system/rolesManage'
export default {
  name: 'rolesList',
  computed: {
    ...mapGetters([
      'superRoleId'
    ])
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getRoleList().then(response => {
        if (response.data) {
          this.list = response.data
        } else {
          this.list = []
        }
        this.listLoading = false
      })
    },
    handleCreate() {
      this.$router.push({ name: 'rolesAdd' })
    },
    handleUpdate(row) {
      this.$router.push({ name: 'rolesAdd', query: { roleId: row.roleId }})
    },
    deleteRoles(row) {
      this.$confirm('是否确定删除角色:' + row.roleName, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRoles(row.roleId).then(res => {
          this.fetchData()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
      })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>