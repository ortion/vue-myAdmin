<template>
  <el-menu class="navbar" mode="horizontal">
    <div class="hamburger-container" @click="toggleSideBar">
      <svg-icon icon-class="toggle" class="hamburger" :class="{'is-active':sidebar.opened}"></svg-icon>
    </div>
    <breadcrumb></breadcrumb>

  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
export default {
  components: {
    Breadcrumb
  },
  computed: {
    ...mapGetters([
      'sidebar'
      // 'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  position: fixed;
  top: 50px;
  height: 50px;
  line-height: 50px;
  width: 100%;
  border-radius: 0px !important;
  z-index: 99;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
    margin-left: 10px;
    .hamburger {
      display: inline-block;
      cursor: pointer;
      width: 20px;
      height: 20px;
      transform: rotate(180deg);
      transition: 0.38s;
      transform-origin: 50% 50%;
    }
    .hamburger.is-active {
      transform: rotate(0deg);
    }
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
}
</style>

