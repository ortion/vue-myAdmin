<template>
  <el-container class="app-wrapper" :class="classObj">
    <!-- <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div> -->
    <sidebar class="sidebar-container"></sidebar>
    <el-header class="app-header">
      <app-header @changeStatus="changeStatus">header</app-header>
    </el-header>
    <el-container class="main-container">
      <el-header style="height:50px">
        <navbar></navbar>
      </el-header>
      <el-main class="main">
        <app-main></app-main>
        <div class="app-footer">Footer</div>
      </el-main>
    </el-container>
    <!-- 弹出层 -->
    <el-dialog title="修改密码" @close="isClose" :visible.sync="IsUpdatepwd" :show-close="false">
      <el-form :model="passForm" label-width="100px" :rules="passRules" ref="passForm">
        <el-form-item label="旧密码" prop="oldPass">
          <el-input type="password" v-model="passForm.oldPass" auto-complete="off" placeholder="请输入旧密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
          <el-input type="password" v-model="passForm.newPass" auto-complete="off" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="passForm.checkPass" auto-complete="off" placeholder="请确认新密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="IsUpdatepwd = false">取消</el-button>
          <el-button type="primary" @click.native.prevent="submitPassword" :loading="loading">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="用户信息" :visible.sync="IsUserinfo">
      <ul>
        <li>商户名称：{{merchantName}}</li>
        <li>用户名：{{userName}}</li>
        <li>用户姓名：{{realName}}</li>
      </ul>
    </el-dialog>
  </el-container>
</template>
<script>
import { Navbar, Sidebar, AppMain, AppHeader } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { updatePassword } from '@/api/login'
import { mapGetters } from 'vuex'
export default {
  name: 'layout',
  computed: {
    ...mapGetters([
      'userName',
      'merchantName',
      'realName'
    ]),
    sidebar() {
      return this.$store.state.app.sidebar
    },
    // device() {
    //   return this.$store.state.app.device
    // },

    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  components: {
    Navbar,
    Sidebar,
    AppMain,
    AppHeader
  },

  mixins: [ResizeMixin],
  data() {
    var validateNPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        if (this.passForm.checkPass !== '') {
          this.$refs.passForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validateNPass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.passForm.newPass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      IsUserinfo: false,
      IsUpdatepwd: false,
      passForm: {
        oldPass: '',
        newPass: '',
        checkPass: ''

      },
      passRules: {
        oldPass: [
          { message: '请输入旧密码', trigger: 'blur', required: true }
        ],
        newPass: [
          { validator: validateNPass, trigger: 'blur', required: true }
        ],

        checkPass: [
          { validator: validateNPass2, trigger: 'blur', required: true }
        ]
      },
      loading: false
    }
  },

  methods: {
    changeStatus(info) {
      if (info === 'userInfo') {
        this.IsUserinfo = true
      } else if (info === 'updatePwd') {
        this.IsUpdatepwd = true
      }
    },
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    },
    submitPassword() {
      this.$refs.passForm.validate(valid => {
        if (valid) {
          this.loading = true
          updatePassword(this.passForm).then(() => {
            this.loading = false
            this.IsUpdatepwd = false
            this.$store.dispatch('FedLogOut').then(() => {
              this.$message({
                message: '密码修改成功请重新登陆',
                type: 'success'
              })
              this.$router.push('/login')
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    isClose() {
      this.passForm = {
        oldPass: '',
        newPass: '',
        checkPass: ''
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
html,
body {
  height: 100%;
}
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

</style>
