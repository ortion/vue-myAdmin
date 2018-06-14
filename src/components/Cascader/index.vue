<template>
  <div>
    <div class="cascaderSelect">
      <el-select v-model="cityData.firstValue" @change="firstChange" placeholder="请选择省">
        <el-option v-for="item in dataList.provinceList" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <el-select v-model="cityData.secondValue" @change="secondChange" placeholder="请选择市">
        <el-option v-for="item in dataList.cityList" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <el-select v-model="cityData.thirdValue" @change="thirdChange" placeholder="请选择区">
        <el-option v-for="item in dataList.districtList" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  props: ['dataList', 'dataType'],
  data() {
    return {
      cityData: {
        firstValue: '',
        secondValue: '',
        thirdValue: ''
      }
    }
  },
  methods: {
    firstChange(val) {
      this.cityData.firstValue = val
      this.cityData.secondValue = ''
      this.cityData.thirdValue = ''
      this.$emit('selectData', this.cityData)
      this.$emit('clearData', 1)
    },
    secondChange(val) {
      this.cityData.secondValue = val
      this.cityData.thirdValue = ''
      this.$emit('selectData', this.cityData)
      this.$emit('clearData', 2)
    },
    thirdChange(val) {
      this.cityData.thirdValue = val
      this.$emit('selectData', this.cityData)
    }
  }
}
</script>

<style scoped lang="scss">
.cascaderSelect {
  margin-bottom: 15px;
}
.cascaderSelect .el-select {
  margin-right: 10px;
}
</style>
