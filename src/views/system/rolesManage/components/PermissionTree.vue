<template>

  <ul class="role-table">
    <li class="header">
      <div class="left">菜单列表 </div>
      <div class="right">功能权限</div>
    </li>
    <li v-for="(item,index) in dataList" :key="item.id">
      <div class="left">
        <!-- <i :class="{'el-icon-caret-right':item.folded,'el-icon-caret-bottom':!item.folded}" v-cloak v-if="item.second" class="item-icon"></i> -->
        <el-checkbox @click.native="handleOneCheckAll($event,item)" v-cloak v-model="item.isSelect"> {{isMapName(item.level,item.authSign)}}</el-checkbox>
        <!-- <span v-if="item.second" v-cloak>{{item.title}}</span> -->
        <!-- <el-checkbox v-if="item.children" @change="checkSecondAll(item)" v-model="item.firstCheckAll">{{item.title}}</el-checkbox> -->
      </div>
      <div class="right" v-if="item.authSign=='1'">
        <el-checkbox v-for="p in item.children[0].children" :label="p.id" :key="p.id" v-cloak v-model="p.isSelect">
          {{isMapName(p.level,p.authSign)}}
        </el-checkbox>
      </div>
      <div class="line"></div>
      <ul v-show="item.children" class="second-ul" v-if="item.authSign!='1'">
        <li class="h40" v-for="(second,cur) in item.children" :key="second.id">
          <div class="left">
            <el-checkbox v-model="second.checkAll" @change="handleCheckAllChange($event,item,second)" v-cloak>
              {{isMapName(second.level,second.authSign)}}
            </el-checkbox>
          </div>
          <div class="right">
            <el-checkbox v-for="p in second.children" :label="p.id" :key="p.id" v-cloak v-model="p.isSelect">
              {{isMapName(p.level,p.authSign)}}
            </el-checkbox>
          </div>
          <div class="line"></div>
        </li>
      </ul>
    </li>
  </ul>

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
      checkedID: []
    }
  },
  methods: {
    isMapName,
    // 切换下级是否展开
    toggleExpanded: function(trIndex) {
      const record = this.formatData[trIndex]
      record._expanded = !record._expanded
    },
    // 图标显示
    iconShow(index, record) {
      return (index === 0 && record.children && record.children.length > 0)
    },
    fold: function(item) {
      if (typeof item.folded === 'undefined') {
        this.$set(item, 'folded', true)
      } else {
        item.folded = !item.folded
      }
    },
    // 全选一项
    handleCheckAllChange(event, item, second) {
      const arr = []
      for (let a = 0; a < second.list.length; a++) {
        arr.push(second.list[a].id)
      }
      if (typeof second.checkedCities === 'undefined') {
        this.$set(second, 'checkedCities', arr)
      }
      second.checkedCities = event.target.checked ? arr : []
      // if (typeof second === "undefined") {
      //     this.$set(second, "isIndeterminate", false)
      // }
      // second.isIndeterminate = false;
      if (typeof second.checkAll === 'undefined') {
        this.$set(second, 'checkAll', true)
      }
      if (typeof item.isIndeterminate === 'undefined') {
        this.$set(item, 'isIndeterminate', true)
      }
      for (let a = 0; a < item.second.length; a++) {
        if (!item.second[a].checkAll) {
          item.isIndeterminate = true
          for (let a = 0; a < item.second.length; a++) {
            if (item.second[a].checkAll) {
              break
            } else {
              item.isIndeterminate = false
              item.firstCheckAll = false
            }
          }
          break
        } else {
          item.isIndeterminate = false
          item.firstCheckAll = true
        }
      }
    },
    // 单选
    handleCheckedCitiesChange(item, second) {
      const checkedCount = second.checkedCities.length
      if (typeof second.checkAll === 'undefined') {
        this.$set(second, 'checkAll', false)
      }
      if (typeof second.isIndeterminate === 'undefined') {
        this.$set(second, 'isIndeterminate', false)
      }
      if (typeof item.isIndeterminate === 'undefined') {
        this.$set(item, 'isIndeterminate', true)
      }
      second.isIndeterminate = checkedCount > 0 && checkedCount < second.list.length
      second.checkAll = checkedCount === second.list.length
      if (checkedCount === 0) {
        second.isIndeterminate = false
      }
      for (let a = 0; a < item.second.length; a++) {
        if (!item.second[a].checkAll) {
          item.isIndeterminate = true
          for (let b = 0; b < item.second.length; b++) {
            if (item.second[b].checkedCities.length > 0) {
              break
            } else {
              item.isIndeterminate = false
              item.firstCheckAll = false
            }
          }
          break
        } else {
          item.isIndeterminate = false
          item.firstCheckAll = true
        }
      }
    },
    // 点击所有
    checkSecondAll: function(item) {
      if (typeof item.firstCheckAll === 'undefined') {
        this.$set(item, 'firstCheckAll', true)
      }
      for (let a = 0; a < item.second.length; a++) {
        this.checkItemAll(item.firstCheckAll, item.second[a])
      }
      item.isIndeterminate = false
    },
    checkItemAll: function(flag, item) {
      const arr = []
      for (let a = 0; a < item.list.length; a++) {
        arr.push(item.list[a].id)
      }
      if (typeof item.checkedCities === 'undefined') {
        this.$set(item, 'checkedCities', arr)
      }
      item.checkedCities = flag ? arr : []
      item.checkAll = flag
    },

    // 没有二级菜单
    handleOneCheckedCitiesChange: function(item) {
      const checkedCount = item.checkedCities.length
      if (typeof item.isIndeterminate === 'undefined') {
        this.$set(item, 'isIndeterminate', false)
      }
      if (typeof item.checkAll === 'undefined') {
        this.$set(item, 'checkAll', false)
      }
      item.isIndeterminate = checkedCount > 0 && checkedCount < item.list.length
      item.checkAll = checkedCount === item.list.length
    },
    handleOneCheckAll: function(event, item) {
      const arr = []
      for (let a = 0; a < item.list.length; a++) {
        arr.push(item.list[a].id)
      }

      item.checkedCities = event.target.checked ? arr : []
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
  border-bottom: 1px solid #e7e7e7;
  background: #f8f8f9;
  text-align: center;
}

.vertical-line {
  width: 1px;
  height: 100%;
  background: #ddd;
  position: absolute;
  left: 20%;
  top: 0;
}
.first-th {
  padding-left: 10px;
}
.left {
  width: 20%;
  float: left;
  padding-left: 10px;
  user-select: none;
  cursor: pointer;
  border-right: 1px solid #e7e7e7;
  line-height: 40px;
}

.one {
  padding-left: 20px;
}

.right {
  width: 80%;
  float: right;
  padding-left: 10px;
  line-height: 40px;
  height: 40px;
}

.item-icon {
  margin-left: -5px;
  padding: 5px;
}

.line {
  clear: both;
  width: 100%;
  height: 1px;
  background: #e0e0e0;
}
/* .h40 {
  height: 39px;
  line-height: 39px;
} */
[v-cloak] {
  display: none;
}

.second-ul .left {
  padding-left: 35px;
}
</style>
