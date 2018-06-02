<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :span="9">
                <preview></preview>
            </el-col>
            <el-col :span="15">
                <div class="bg-purple"></div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import preview from './components/preview'
export default {
  name: 'APPindexManage',
  components: { preview },
  data() {
    return {

    }
  }

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>