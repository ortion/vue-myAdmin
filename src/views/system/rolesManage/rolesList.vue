<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row type="flex" justify="space-between">
        <el-col :span="12">
          <div style="line-height:32px">权限管理</div>
        </el-col>
        <el-col :span="12">
          <div style="text-align:right">
            <router-link :to="{name: 'rolesAdd'}">
              <el-button type="primary" icon="el-icon-edit">添加权限</el-button>
            </router-link>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="60">
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column prop="roleName" label="角色" align="center">
      </el-table-column>
      <el-table-column prop="merchantTypeName" label="所属机构" align="center">
      </el-table-column>
      <el-table-column align="center" label="操作" width="220">
        <template slot-scope="scope">
          <div style="text-align:left">
            <el-button size="mini" type="success" plain @click="handleModifyStatus(scope.row,'published')">分配</el-button>
            <router-link :to="{name: 'rolesAdd', query: { roleId: scope.row.roleId }}">
              <el-button v-if="scope.row.roleId!==superRoleId" type="primary" size="mini" plain>修改</el-button>
            </router-link>
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
      }).catch(() => {
        this.listLoading = false
      })
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