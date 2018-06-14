<template>
    <div>
        <div v-for="(category,index) in selectType" class="goodsCategory">
            <div class="inlint">
                <el-select v-model="category.pcat" @change="pcatChange(category.pcat,index)" placeholder="一级类目">
                    <el-option v-for="item in categoryData.firstList" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
                <el-select v-model="category.cat" @change="catChange(category.cat,index)" placeholder="全部">
                    <el-option v-for="item in categoryData.secondList" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="inlint">
                <el-input v-model="category.rate" placeholder="佣金" class="commission"></el-input>
                <span>%</span>
                <el-button v-if="index==0" type="primary" @click="addCategory" size="medium">添加</el-button>
                <el-button v-else type="primary" @click="deleteCategory(index)" size="medium">删除</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { getCategory } from '@/api/goods'
export default {
  name: 'goodsCategory',
  data() {
    return {
      // 商品类目
      categoryData: {
        firstList: [],
        secondList: []
      },
      selectType: [
        {
          pcat: '',
          cat: '',
          rate: ''
        }
      ]
    }
  },
  watch: {
    selectType: {
      handler(newValue, oldValue) {
        this.$emit('typeList', newValue)
      },
      deep: true
    }
  },
  created() {
    this.getGoodsCategory()
  },
  methods: {
    // 商品类目
    getGoodsCategory(id) {
      getCategory(id).then(response => {
        if (id) {
          this.categoryData.secondList = response.data
        } else {
          this.categoryData.firstList = response.data
        }
      })
    },
    addCategory() {
      this.selectType.push(
        {
          pcat: '',
          cat: '',
          rate: ''
        }
      )
    },
    deleteCategory(index) {
      this.selectType.splice(index, 1)
    },
    pcatChange(val, index) {
      this.getGoodsCategory(val)
      this.selectType[index].pcat = val
      this.selectType[index].cat = ''
    },
    catChange(val, index) {
      this.selectType[index].cat = val
    }
  }
}
</script>
<style scoped lang="scss">
.goodsCategory {
  margin-bottom: 15px;
}
.commission {
  width: 100px;
}
</style>
