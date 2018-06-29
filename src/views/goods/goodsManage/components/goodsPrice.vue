<template>
  <div class="price-content">
    <el-form class="priceForm" :rules="priceRules" ref="priceForm" :model="priceForm" label-width="120px">
      <el-form-item label="宠物品类">
        <el-select v-model="priceForm.category" @change="firstChange" placeholder="请选择宠物品类">
          <el-option v-for="item in petsTypeData.firstList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="宠物品种">
        <el-select v-model="priceForm.Varieties" @change="secondChange" placeholder="请选择宠物品种">
          <el-option v-for="item in petsTypeData.secondList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="宠物体型">
        <el-row>
          <el-col :span="8">
            <el-form-item prop="shoulderHeightMin">
              <span>肩高区间</span>
              <el-input type="number" v-model.number="priceForm.shoulderHeightMin" :min="0" :max="999" size="small" style="width:90px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <span>-</span>
          </el-col>
          <el-col :span="15">
            <el-form-item prop="shoulderHeightMin">
              <el-input type="number" v-model.number="priceForm.shoulderHeightMax" :min="0" :max="999" size="small" style="width:90px"></el-input>
              <span>厘米</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item prop="bodyLengthMin">
              <span>体长区间</span>
              <el-input type="number" v-model.number="priceForm.bodyLengthMin" :min="0" :max="999" size="small" style="width:90px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <span>-</span>
          </el-col>
          <el-col :span="15">
            <el-form-item prop="bodyLengthMax">
              <el-input type="number" v-model.number="priceForm.bodyLengthMax" :min="0" :max="999" size="small" style="width:90px"></el-input>
              <span>厘米</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item prop="weightMin">
              <span>体重区间</span>
              <el-input type="number" v-model.number="priceForm.weightMin" :min="0" :max="999" size="small" style="width:90px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <span>-</span>
          </el-col>
          <el-col :span="15">
            <el-form-item prop="weightMax">
              <el-input type="number" v-model.number="priceForm.weightMax" :min="0" :max="999" size="small" style="width:90px"></el-input>
              <span>千克</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="宠物毛长">
        <el-select v-model="priceForm.woolLength" placeholder="请选择宠物毛长">
          <el-option v-for="item in petsWoolList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务时长">
        <el-input type="number" v-model.number="priceForm.duration" :min="0" placeholder="请输入服务时长" style="width:200px"></el-input>
        <span>小时</span>
        <span class="tipMessage">（服务所需的最长时间）</span>
      </el-form-item>
      <el-form-item label="商品单价(¥)">
        <el-input-number v-model="priceForm.price" :min="0" style="width:200px" size="small"></el-input-number>
      </el-form-item>
      <el-form-item label="最大接单数量" prop="order_max">
        <el-input-number v-model="priceForm.order_max" :min="0" style="width:200px" size="small"></el-input-number>
        <span class="tipMessage">以服务时长为依据，单位时间内可以接待的宠物数量</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getPetVariety } from '@/api/pet'
export default {
  name: 'goodsPrice',
  props: ['sendName'],
  data() {
    const validateInt = (rule, value, callback) => {
      if (value) {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入整数'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    const validateNum = (rule, value, callback) => {
      if (value) {
        if (value < 0 || value > 999) {
          callback(new Error('必须是0-999之间的数字'))
        } else {
          if (rule.field === 'shoulderHeightMin' || rule.field === 'shoulderHeightMax') {
            if (this.priceForm.shoulderHeightMin > this.priceForm.shoulderHeightMax) {
              callback(new Error('最小值不能大于最大值'))
            } else {
              callback()
            }
          }
          if (rule.field === 'bodyLengthMin' || rule.field === 'bodyLengthMax') {
            if (this.priceForm.bodyLengthMin > this.priceForm.bodyLengthMax) {
              callback(new Error('最小值不能大于最大值'))
            } else {
              callback()
            }
          } if (rule.field === 'weightMin' || rule.field === 'weightMin') {
            if (this.priceForm.weightMin > this.priceForm.weightMax) {
              callback(new Error('最小值不能大于最大值'))
            } else {
              callback()
            }
          }
        }
      } else {
        callback()
      }
    }
    return {
      priceForm: {
        property: '',
        category: '',
        Varieties: '',
        shoulderHeightMin: '',
        shoulderHeightMax: '',
        bodyLengthMin: '',
        bodyLengthMax: '',
        weightMin: '',
        weightMax: '',
        woolLength: '',
        duration: '',
        price: 0,
        order_max: 0
      },
      fromA: {},
      fromB: {},
      fromC: {},
      fromD: {},
      priceRules: {
        shoulderHeightMin: [
          { validator: validateNum, trigger: 'blur' }
        ],
        shoulderHeightMax: [
          { validator: validateNum, trigger: 'blur' }
        ],
        bodyLengthMin: [
          { validator: validateNum, trigger: 'blur' }
        ],
        bodyLengthMax: [
          { validator: validateNum, trigger: 'blur' }
        ],
        weightMin: [
          { validator: validateNum, trigger: 'blur' }
        ],
        weightMax: [
          { validator: validateNum, trigger: 'blur' }
        ],
        order_max: [
          { validator: validateInt, trigger: 'blur' }
        ]
      },

      // 宠物种类
      petsTypeData: {
        firstList: [],
        secondList: []
      },
      // 宠物毛长
      petsWoolList: [
        {
          id: 0,
          name: '不限'
        },
        {
          id: 1,
          name: '短毛'
        },
        {
          id: 2,
          name: '长毛'
        }
      ]

    }
  },
  created() {
    this.getPetsType()
  },
  watch: {
    priceForm: { // 深度监听
      handler(newValue, oldValue) {
        this.$refs.priceForm.validate(valid => {
          if (valid) {
            if (this.sendName === 'A') {
              this.fromA = newValue
              this.$emit('priceMessage', { value: this.fromA, name: this.sendName })
            } else if (this.sendName === 'B') {
              this.fromB = newValue
              this.$emit('priceMessage', { value: this.fromB, name: this.sendName })
            } else if (this.sendName === 'C') {
              this.fromC = newValue
              this.$emit('priceMessage', { value: this.fromC, name: this.sendName })
            } else if (this.sendName === 'D') {
              this.fromD = newValue
              this.$emit('priceMessage', { value: this.fromD, name: this.sendName })
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      deep: true
    }

  },
  methods: {
    // 品类
    getPetsType(id) {
      getPetVariety(id).then(response => {
        if (id) {
          this.petsTypeData.secondList = response.data
        } else {
          this.petsTypeData.firstList = response.data
        }
      })
    },
    firstChange(val) {
      this.getPetsType(val)
      this.priceForm.category = val
      this.priceForm.Varieties = ''
    },
    secondChange(val) {
      this.priceForm.Varieties = val
    }
  }

}
</script>
<style scoped lang="scss">
.price-content {
  border: 1px solid #dcdfe6;
  border-top: none;
  // height: 220px;
  padding-top: 20px;
  padding-bottom: 10px;
  .el-form-item {
    margin-bottom: 15px;
  }
}
</style>
