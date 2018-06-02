<template>
  <div class="app-container">
    <h3 v-if="roleId">修改权限</h3>
    <h3 v-else>新增权限</h3>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="角色名称">
        <el-input v-model="form.name" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="角色权限">
        <permission-tree :dataList="dataList" border v-loading.body="listLoading" element-loading-text="Loading"></permission-tree>
      </el-form-item>
      <el-form-item label="角色机构">
        <el-select v-model="form.region" placeholder="请选择机构">
          <el-option label="总公司" value="shanghai"></el-option>
          <el-option label="门店" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" v-if="roleId">修改</el-button>
        <el-button type="primary" @click="onSubmit" v-else>保存</el-button>
        <!-- <el-button @click="onCancel">取消</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import PermissionTree from './components/PermissionTree'
import { loadRolesUpate, loadRoles } from '@/api/rolesManage'
export default {
  name: 'rolesAdd',
  components: { PermissionTree },
  data() {
    return {
      roleId: this.$route.query.roleId,
      form: {
        name: '',
        region: ''
      },
      dataList: [],
      listLoading: true
    }
  },
  created() {
    if (this.roleId) {
      this.loadRolesUpateList(this.roleId)
    } else {
      this.loadRolesList()
    }
  },
  methods: {
    loadRolesList() {
      this.listLoading = true
      loadRoles().then(response => {
        this.dataList = response.data.authList
        this.listLoading = false
      })
    },
    loadRolesUpateList(roleId) {
      this.listLoading = true
      loadRolesUpate(roleId).then(response => {
        this.dataList = response.data.authList
        this.listLoading = false
      })
    },
    onSubmit() {
      this.$message('submit!')
    }
  }
}
</script>

<style scoped>
</style>

