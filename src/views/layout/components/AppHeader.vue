<template>
  <div class="header-wrapper">
    <el-row type="flex" justify="space-between">
      <el-col :span="6">
        <div class='logo-container'>
          <img :src="logo" class='logo' alt="">
          <span class='title'>轻松宠物后台管理系统</span>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="userinfo">
          <div class="notify">
            <el-badge class="item one">
              <i class="el-icon-message"></i>
            </el-badge>
          </div>
          <div class='welcome'>
            <!-- <el-badge :value="6" class="item one">
              <i class="el-icon-message"></i>
            </el-badge> -->
            <span class='name'>
              <svg-icon icon-class="user"></svg-icon>
              {{realName}}</span>
            <span class='name'>
              <svg-icon icon-class="home"></svg-icon>
              {{merchantName}}</span>
          </div>
          <span class='username'>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <i class="el-icon-setting"></i>
                <span>设置</span>
                <i class="el-icon-caret-bottom"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <span @click="openDialog('userInfo')">用户信息</span>
                </el-dropdown-item>
                <el-dropdown-item>
                  <span @click="openDialog('updatePwd')">修改密码</span>
                </el-dropdown-item>
                <el-dropdown-item divided>
                  <span @click="logout" style="display:block;">退出登录</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </el-col>
    </el-row>

  </div>
</template>
<script>
import logo from '@/assets/logo.png'
import { mapGetters } from 'vuex'

export default {
  name: 'AppHeader',
  computed: {
    ...mapGetters([
      'merchantName',
      'realName'

    ])
  },
  data() {
    return {
      logo
      // dialogUpdateForm: false

    }
  },
  methods: {
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    openDialog(info) {
      this.$emit('changeStatus', info)
    }
    // openUserInfoDialog() {
    //   this.$emit('changeStatus', true)
    // }

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header-wrapper {
  padding: 0 10px;
}
.logo-container {
  padding: 7px 0;
  min-width: 400px;
  .logo {
    width: 45px;
    margin: 0 5px;
    vertical-align: middle;
    display: inline-block;
  }
  .title {
    vertical-align: middle;
    font-size: 22px;
    letter-spacing: 3px;
  }
}
.userinfo {
  text-align: right;
  padding: 20px 0;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  display: inline-block;
  width: auto;
  padding: 0 5px;
  .name {
    text-align: center;
    color: #606266;
    font-size: 14px;
  }
}
.notify {
  display: inline-block;
}
.username {
  cursor: pointer;
  margin-right: 5px;
}
</style>