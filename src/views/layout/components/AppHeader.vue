<template>
  <div class="header-wrapper">

    <el-dropdown class="avatar-container" trigger="click">
      <span>设置</span>
      <!-- <div class="avatar-wrapper">
        <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
        <i class="el-icon-caret-bottom"></i>
      </div> -->
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            <span @click="openUpateDialog">修改密码</span>
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">LogOut</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AppHeader',
  computed: {
    ...mapGetters([
    ])
  },
  // data() {
  //   return {
  //     dialogUpdateForm: false

  //   }
  // },
  methods: {
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    openUpateDialog() {
      this.$emit('changeStatus', true)
    }

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header-wrapper {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  height: 50px;
  padding: 0 12px 0 0;
  background: #fff;
  -webkit-box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
.avatar-container {
  height: 50px;
  display: inline-block;
  position: absolute;
  right: 35px;
  .avatar-wrapper {
    cursor: pointer;
    margin-top: 5px;
    position: relative;
    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }
    .el-icon-caret-bottom {
      position: absolute;
      right: -20px;
      top: 25px;
      font-size: 12px;
    }
  }
}
</style>