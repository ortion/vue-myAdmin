<template>
  <div class="role-table">
    <el-row class="header">
      <el-col :span="6" class="left">
        <div>菜单列表 </div>
      </el-col>
      <el-col :span="18" class="right">
        <div>功能权限</div>
      </el-col>
    </el-row>
    <div v-for="(item,index) in dataList" :key="item.id">
      <el-checkbox-group v-model="checkedID" @change="handleChange">
        <el-row v-if="item.authSign=='1'">
          <el-col :span="6" class="left">
            <el-checkbox :label="item.authSign" v-cloak disabled> {{isMapName(item.level,item.authSign)}}</el-checkbox>
          </el-col>
          <el-col :span="18" class="right">
            <el-checkbox v-for="p in item.children[0].children" :label="p.authSign" :key="p.id" v-cloak>
              {{isMapName(p.level,p.authSign)}}
            </el-checkbox>
          </el-col>
        </el-row>
        <el-collapse @change="toggleChange" v-model="activeName" v-else>
          <el-collapse-item :name="item.authSign">
            <template slot="title">
              <div class="fir-title">
                <el-checkbox :label="item.authSign" v-cloak @change="checkFirstAll(item)" v-model="item.isSelect"> {{isMapName(item.level,item.authSign)}}</el-checkbox>
              </div>
            </template>
            <div v-show="item.children" class="second-ul">
              <el-row v-for="(second,cur) in item.children" :key="second.id">
                <el-col :span="6" class="left">
                  <el-checkbox @change="checkSecondAll(second,item)" v-model="second.isSelect" :label="second.authSign" v-cloak>
                    {{isMapName(second.level,second.authSign)}}
                  </el-checkbox>
                </el-col>
                <el-col :span="18" class="right">
                  <el-checkbox :disabled="checkboxInit(p.authSign)" @change="checkthird(p,second,item)" v-model="p.isSelect" v-for="p in second.children" :label="p.authSign" :key="p.id" v-cloak>
                    {{isMapName(p.level,p.authSign)}}
                  </el-checkbox>
                </el-col>
              </el-row>
            </div>
          </el-collapse-item>
        </el-collapse>

      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
import { isMapName } from '@/utils/permissionMap'
export default {
  name: 'PermissionTree',
  props: {
    dataList: {
      type: [Array, Object],
      required: true
    }
  },
  data() {
    return {
      checkedID: ['1'],
      activeName: [],
      disabledList: ['2-1-1', '2-1-3', '2-2-1', '2-2-3', '2-3-1', '2-3-3',
        '2-5-1', '2-5-3', '2-6-1', '2-7-1', '2-7-2', '2-8-1', '3-1-1', '3-2-1',
        '4-1-1', '4-1-5', '4-2-1', '4-3-1', '4-3-5', '5-1-1', '5-2-1', '5-2-2',
        '5-3-2', '5-4-1', '5-4-2', '5-5-1', '5-5-2', '5-6-1', '5-6-2', '6-1-1',
        '6-1-3', '6-2-1', '6-3-1', '6-3-2', '7-1-1', '7-2-1', '7-2-2',
        '7-3-1', '7-3-2', '7-3-3', '8-4-3', '8-6-1', '8-6-2'
      ]
    }
  },
  watch: {
    dataList: function() {
      this.dataList.map(firstitem => {
        if (firstitem.isSelect) {
          this.checkedID.push(firstitem.authSign)
          firstitem.children.map(seconditem => {
            if (seconditem.isSelect) {
              this.checkedID.push(seconditem.authSign)
              seconditem.children.map(thirditem => {
                if (thirditem.isSelect) {
                  this.checkedID.push(thirditem.authSign)
                }
              })
            }
          })
        }
      })
    }
  },
  methods: {
    isMapName,
    handleChange(value) {
      this.checkedID = value
      this.$emit('checkedID', this.checkedID)
    },
    toggleChange(value) {
      // console.log(value)
      // this.checkedID.indexOf(value)
    },
    // 初始化判断不可编辑
    checkboxInit(index) {
      if (this.disabledList.indexOf(index) < 0) {
        return false // 可勾选
      } else {
        return true // 不可勾选
      }
    },

    //  一级目录全选
    checkFirstAll(data) {
      this.activeName.push(data.authSign)
      data.isSelect = !data.isSelect
      if (data.isSelect) {
        data.children.forEach(items => {
          items.isSelect = true
          if (this.checkedID.indexOf(items.authSign) < 0) {
            this.checkedID.push(items.authSign)
          }

          items.children.forEach(item => {
            item.isSelect = true
            if (this.checkedID.indexOf(item.authSign) < 0) {
              this.checkedID.push(item.authSign)
            }
          })
        })
      } else {
        data.children.forEach(items => {
          items.isSelect = false
          if (this.checkedID.indexOf(items.authSign) >= 0) {
            this.checkedID.splice(this.checkedID.indexOf(items.authSign), 1)
          }
          items.children.forEach(item => {
            item.isSelect = false
            if (this.checkedID.indexOf(item.authSign) >= 0) {
              this.checkedID.splice(this.checkedID.indexOf(item.authSign), 1)
            }
          })
        })
      }
    },
    checkSecondAll(data, parentDate) {
      data.isSelect = !data.isSelect
      if (data.isSelect) {
        parentDate.isSelect = true
        if (this.checkedID.indexOf(parentDate.authSign) < 0) {
          this.checkedID.push(parentDate.authSign)
        }
        // const arr = []
        data.children.forEach(items => {
          items.isSelect = true
          if (this.checkedID.indexOf(items.authSign) < 0) {
            this.checkedID.push(items.authSign)
          }
        })
      } else {
        if (!this.FilterId(parentDate)) {
          if (parentDate.isSelect) {
            parentDate.isSelect = false
            this.checkedID.splice(this.checkedID.indexOf(parentDate.authSign), 1)
          }
        }
        data.children.forEach(items => {
          if (items.isSelect) {
            items.isSelect = false
            if (this.checkedID.indexOf(items.authSign) >= 0) {
              this.checkedID.splice(this.checkedID.indexOf(items.authSign), 1)
            }
          }
        })
      }
    },
    // 过滤目录
    FilterId(pdata) {
      return pdata.children.some(item => this.checkedID.indexOf(item.authSign) >= 0)
    },
    // 三级目录
    checkthird(third, second, first) {
      third.isSelect = !third.isSelect
      if (third.isSelect) {
        if (this.checkedID.indexOf(second.authSign) < 0) {
          this.checkedID.push(second.authSign)
        }
        if (this.checkedID.indexOf(first.authSign) < 0) {
          this.checkedID.push(first.authSign)
        }
      } else {
        if (this.checkedID.indexOf(third.authSign) >= 0) {
          this.checkedID.splice(this.checkedID.indexOf(third.authSign), 1)
        }
      }
      if (!this.FilterId(second)) {
        if (second.isSelect) {
          second.isSelect = false
          this.checkedID.splice(this.checkedID.indexOf(second.authSign), 1)
        }
      }
      if (!this.FilterId(first)) {
        if (first.isSelect) {
          first.isSelect = false
          this.checkedID.splice(this.checkedID.indexOf(first.authSign), 1)
        }
      }
    }

  }

}
</script>
<style rel="stylesheet/css">
.role-table {
  border: 1px solid #e0e0e0;
  border-bottom: none;
  padding: 0;
  position: relative;
}

.header {
  height: 40px;
  line-height: 40px;
  background: #f8f8f9;
  text-align: center;
  border-bottom: 1px solid #ebeef5;
}
.el-collapse {
  border-top: 1px solid #ebeef5;
  border-bottom: none;
}
.el-collapse-item__content {
  padding-bottom: 0;
}
.fir-title {
  padding-left: 10px;
}
.left {
  padding-left: 10px;
  border-right: 1px solid #e7e7e7;
}

.right {
  padding-left: 10px;
}
.second-ul {
  /* border-top: 1px solid #ebeef5; */
}
.second-ul .left {
  padding-left: 35px;
  line-height: 40px;
  height: 40px;
  border-top: 1px solid #ebeef5;
}
.second-ul .right {
  line-height: 40px;
  height: 40px;
  border-top: 1px solid #ebeef5;
}
</style>
