<template>
  <div class="app-container">
    <h3 v-if="roleId">修改权限</h3>
    <h3 v-else>新增权限</h3>
    <el-form ref="roleForm" :model="roleForm" label-width="120px">
      <el-form-item label="角色名称">
        <el-input v-model="roleForm.roleName" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="角色权限">
        <permission-tree @checkedID="checkedID" :dataList="dataList" border v-loading.body="listLoading" element-loading-text="Loading"></permission-tree>
      </el-form-item>
      <el-form-item label="角色机构">
        <el-select v-model="roleForm.merchant" placeholder="请选择机构">
          <el-option v-for="merchant in merchantList" :key="merchant.merchantTypeId" :label="merchant.merchantTypeName" :value="merchant.merchantTypeId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onUpdate" v-if="roleId">修改</el-button>
        <el-button type="primary" @click="onSave" v-else>保存</el-button>
        <!-- <el-button @click="onCancel">取消</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import PermissionTree from './components/PermissionTree'
import { loadRolesUpate, loadRoles, addRoles, updateRoles } from '@/api/rolesManage'
export default {
  name: 'rolesAdd',
  components: { PermissionTree },
  data() {
    return {
      roleId: this.$route.query.roleId,
      roleForm: {
        roleName: '',
        merchant: '',
        checkedID: []
      },
      dataList: [],
      merchantList: [],
      listLoading: true
    }
  },
  computed: {

  },
  created() {
    if (this.roleId) {
      this.loadRolesUpateList(this.roleId)
    } else {
      this.loadRolesList()
    }
  },
  methods: {
    checkedID(data) {
      this.roleForm.checkedID = data
    },
    loadRolesList() {
      this.listLoading = true
      loadRoles().then(response => {
        this.dataList = response.data.authList
        this.merchantList = response.data.orgTypeList
        this.listLoading = false
      })
    },
    loadRolesUpateList(roleId) {
      this.listLoading = true
      loadRolesUpate(roleId).then(response => {
        this.dataList = response.data.authList
        this.merchantList = response.data.orgTypeList
        this.merchantList.map(item => {
          if (item.isSelected) {
            this.roleForm.merchant = item.merchantTypeId
          }
        })
        this.roleForm.roleName = response.data.roleName
        this.listLoading = false
      })
    },
    onSave() {
      if (this.roleForm.roleName && this.roleForm.merchant && (this.roleForm.checkedID.length > 0)) {
        addRoles(this.roleForm).then(
          response => {
            this.$message({
              type: 'success',
              message: '保存成功!'
            })
            this.$router.push({ name: 'rolesList' })
          }
        )
      } else { this.$message('不可以为空') }
    },
    onUpdate() {
      console.log(this.roleForm)
      if (this.roleForm.roleName && this.roleForm.merchant && (this.roleForm.checkedID.length > 0)) {
        updateRoles(this.roleId, this.roleForm).then(
          response => {
            this.$message({
              type: 'success',
              message: '保存成功!'
            })
            this.$router.push({ name: 'rolesList' })
          }
        )
      } else { this.$message('不可以为空') }
    }
  }
}
</script>

<style scoped>
</style>

