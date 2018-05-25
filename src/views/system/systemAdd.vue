<template>
  <div class="app-container">
    <h3>新增权限</h3>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="角色名称">
        <el-input v-model="form.name" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="角色权限">
        <el-table :data="data" :row-style="showRow" v-bind="$attrs">
          <el-table-column v-if="columns.length===0" width="150">
            <template slot-scope="scope">
              <span v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
              <span class="tree-ctrl" v-if="iconShow(0,scope.row)" @click="toggleExpanded(scope.$index)">
                <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
                <i v-else class="el-icon-minus"></i>
              </span>
              {{scope.$index}}
            </template>
          </el-table-column>
          <el-table-column v-else v-for="(column, index) in columns" :key="column.value" :label="column.text" :width="column.width">
            <template slot-scope="scope">
              <span v-if="index === 0" v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
              <span class="tree-ctrl" v-if="iconShow(index,scope.row)" @click="toggleExpanded(scope.$index)">
                <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
                <i v-else class="el-icon-minus"></i>
              </span>
              {{scope.row[column.value]}}
            </template>
          </el-table-column>
          <slot></slot>
        </el-table>
        <ul class="role-table col-xs-offset-2 col-md-offset-1 col-sm-offset-2">
          <li class="header">
            <div class="left">菜单列表</div>
            <div class="right">功能权限</div>
          </li>
          <div class="vertical-line"></div>
          <li v-for="(item,index) in dataList" :key="item.id">
            <div class="left h40" @click="fold(item)">
              <i :class="{'el-icon-caret-right':item.folded,'el-icon-caret-bottom':!item.folded}" v-cloak v-if="item.second" class="item-icon"></i>
              <el-checkbox @click.native="handleOneCheckAll($event,item)" v-cloak v-if="!item.second" :indeterminate="item.isIndeterminate" v-model="item.checkAll"> {{item.title}}</el-checkbox>
              <span v-if="item.second" v-cloak>{{item.title}}</span>
            </div>
            <div class="right h40">
              <el-checkbox v-if="item.second" :indeterminate="item.isIndeterminate" @change="checkSecondAll(item)" v-model="item.firstCheckAll"> 所有</el-checkbox>

              <el-checkbox-group v-model="item.checkedCities" @change="handleOneCheckedCitiesChange(item)" v-else>
                <el-checkbox v-for="m in item.list" :label="m.id" :key="m.id" v-cloak> {{m.name}}</el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="line"></div>
            <ul v-show="item.second&&!item.folded">
              <li class="h40" v-for="(second,cur) in item.second" :key="second.id">
                <div class="left">
                  <el-checkbox v-model="second.checkAll" @change="handleCheckAllChange($event,item,second)" v-cloak>
                    {{second.title}}
                  </el-checkbox>
                </div>
                <div class="right">
                  <el-checkbox-group v-model="second.checkedCities" @change="handleCheckedCitiesChange(item,second)">
                    <el-checkbox v-for="p in second.list" :label="p.id" :key="p.id" v-cloak>
                      {{p.name}}
                    </el-checkbox>
                  </el-checkbox-group>
                </div>
                <div class="line"></div>
              </li>
            </ul>
          </li>
        </ul>
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="Online activities" name="type"></el-checkbox>
          <el-checkbox label="Promotion activities" name="type"></el-checkbox>
          <el-checkbox label="Offline activities" name="type"></el-checkbox>
          <el-checkbox label="Simple brand exposure" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Resources">
        <el-radio-group v-model="form.resource">
          <el-radio label="Sponsor"></el-radio>
          <el-radio label="Venue"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Activity form">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'systemAdd',
  data() {
    return {
      columns: [
        {
          text: '事件',
          value: 'event',
          width: 200
        },
        {
          text: 'ID',
          value: 'id'
        },
        {
          text: '时间线',
          value: 'timeLine'
        },
        {
          text: '备注',
          value: 'comment'
        }
      ],
      data: [
        {
          id: 0,
          event: '事件1',
          timeLine: 50,
          comment: '无'
        },
        {
          id: 1,
          event: '事件1',
          timeLine: 100,
          comment: '无',
          children: [
            {
              id: 2,
              event: '事件2',
              timeLine: 10,
              comment: '无'
            },
            {
              id: 3,
              event: '事件3',
              timeLine: 90,
              comment: '无',
              children: [
                {
                  id: 4,
                  event: '事件4',
                  timeLine: 5,
                  comment: '无'
                },
                {
                  id: 5,
                  event: '事件5',
                  timeLine: 10,
                  comment: '无'
                },
                {
                  id: 6,
                  event: '事件6',
                  timeLine: 75,
                  comment: '无',
                  children: [
                    {
                      id: 7,
                      event: '事件7',
                      timeLine: 50,
                      comment: '无',
                      children: [
                        {
                          id: 71,
                          event: '事件71',
                          timeLine: 25,
                          comment: 'xx'
                        },
                        {
                          id: 72,
                          event: '事件72',
                          timeLine: 5,
                          comment: 'xx'
                        },
                        {
                          id: 73,
                          event: '事件73',
                          timeLine: 20,
                          comment: 'xx'
                        }
                      ]
                    },
                    {
                      id: 8,
                      event: '事件8',
                      timeLine: 25,
                      comment: '无'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      dataList: [
        {
          title: '概况',
          id: '0',
          checkedCities: [],
          list: [
            {
              name: '浏览',
              id: '10001'
            },
            {
              name: '修改',
              id: '11111'
            }
          ]
        },
        {
          title: '会员管理',
          id: '1',
          second: [
            {
              title: '会员列表',
              id: '11',
              list: [
                {
                  name: '新增',
                  id: '10002'
                },
                {
                  name: '修改',
                  id: '10003'
                }
              ],
              checkedCities: []
            },
            {
              title: '会员等级',
              id: '12',
              list: [
                {
                  name: '新增',
                  id: '10004'
                },
                {
                  name: '修改',
                  id: '10005'
                },
                {
                  name: '删除',
                  id: '1006'
                }

              ],
              checkedCities: []
            }
          ]
        },
        {
          title: '菜品管理',
          id: '2',
          second: [
            {
              title: '菜品列表',
              id: '21',
              list: [
                {
                  name: '新增',
                  id: '10007'
                },
                {
                  name: '修改',
                  id: '10008'
                }
              ],
              checkedCities: []
            },
            {
              title: '会员等级',
              id: '22',
              list: [
                {
                  name: '浏览',
                  id: '10009'
                },
                {
                  name: '新增',
                  id: '10010'
                },
                {
                  name: '修改',
                  id: '10011'
                },
                {
                  name: '删除',
                  id: '10012'
                }
              ],
              checkedCities: []
            }
          ]
        }
      ]
    }
  },

  methods: {
    onSubmit() {
      console.log(this.dataList)
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
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

<style scoped>
.line {
  text-align: center;
}
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
  left: 30%;
  top: 0;
}

.left {
  width: 30%;
  float: left;
  padding-left: 10px;
  user-select: none;
  cursor: pointer;
}

.one {
  padding-left: 20px;
}

.right {
  width: 70%;
  float: left;
  padding-left: 10px;
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
.h40 {
  height: 39px;
  line-height: 39px;
}
[v-cloak] {
  display: none;
}
</style>

