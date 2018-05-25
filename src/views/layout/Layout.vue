<template>
  <el-container class="app-wrapper" :class="classObj">
    <el-header style="padding:0;">
      <app-header>header</app-header>
    </el-header>
    <el-container>
      <el-aside style="width:0;">
        <sidebar class="sidebar-container"></sidebar>
      </el-aside>
      <el-container>
        <el-main class="main-container" style="padding:0;">
          <navbar></navbar>
          <app-main></app-main>
        </el-main>
        <el-footer style="padding:0;margin-left: 180px;">Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
  <!-- <div class="app-wrapper" :class="classObj">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <sidebar class="sidebar-container"></sidebar>
    <app-header>header</app-header>
    <div class="main-container">
      <navbar></navbar>
      <app-main></app-main>
    </div>
  </div> -->
</template>

<script>
import { Navbar, Sidebar, AppMain, AppHeader } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    AppHeader
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
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
