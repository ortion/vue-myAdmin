<template>
  <div class="app-container">
    <h3>新增权限</h3>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="角色名称">
        <el-input v-model="form.name" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="角色权限">
        <permission-tree :dataList="dataList" border></permission-tree>

      </el-form-item>
      <el-form-item label="角色机构">
        <el-select v-model="form.region" placeholder="请选择机构">
          <el-option label="总公司" value="shanghai"></el-option>
          <el-option label="门店" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import PermissionTree from './components/PermissionTree'
export default {
  name: 'rolesAdd',
  components: { PermissionTree },
  data() {
    return {
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
          'id': 1,
          'level': 1,
          'authSign': '1',
          'title': '首页',
          'children': [
            {
              'id': 1,
              'level': 2,
              'authSign': '1-3',
              'title': '设置',
              'children': [
                {
                  'id': 1,
                  'level': 3,
                  'authSign': '1-3-3',
                  'title': '接单设置',
                  'children': null
                }
              ]
            }
          ]
        },
        {
          'id': 2,
          'level': 1,
          'authSign': '2',
          'isSelect': false,
          'children': [
            {
              'id': 1,
              'level': 2,
              'authSign': '2-1',
              'isSelect': false,
              'children': [
                {
                  'id': 1,
                  'level': 3,
                  'authSign': '2-1-4',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 2,
                  'level': 3,
                  'authSign': '2-1-3',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 3,
                  'level': 3,
                  'authSign': '2-1-5',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 4,
                  'level': 3,
                  'authSign': '2-1-2',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 5,
                  'level': 3,
                  'authSign': '2-1-1',
                  'isSelect': false,
                  'children': null
                }
              ]
            },
            {
              'id': 2,
              'level': 2,
              'authSign': '2-2',
              'isSelect': false,
              'children': [
                {
                  'id': 1,
                  'level': 3,
                  'authSign': '2-2-6',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 2,
                  'level': 3,
                  'authSign': '2-2-3',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 3,
                  'level': 3,
                  'authSign': '2-2-2',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 4,
                  'level': 3,
                  'authSign': '2-2-5',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 5,
                  'level': 3,
                  'authSign': '2-2-4',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 6,
                  'level': 3,
                  'authSign': '2-2-1',
                  'isSelect': false,
                  'children': null
                }
              ]
            },
            {
              'id': 3,
              'level': 2,
              'authSign': '2-3',
              'isSelect': false,
              'children': [
                {
                  'id': 1,
                  'level': 3,
                  'authSign': '2-3-2',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 2,
                  'level': 3,
                  'authSign': '2-3-1',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 3,
                  'level': 3,
                  'authSign': '2-3-4',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 4,
                  'level': 3,
                  'authSign': '2-3-3',
                  'isSelect': false,
                  'children': null
                }
              ]
            },
            {
              'id': 4,
              'level': 2,
              'authSign': '2-4',
              'isSelect': false,
              'children': [
                {
                  'id': 1,
                  'level': 3,
                  'authSign': '2-4-1',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 2,
                  'level': 3,
                  'authSign': '2-4-2',
                  'isSelect': false,
                  'children': null
                }
              ]
            },
            {
              'id': 5,
              'level': 2,
              'authSign': '2-5',
              'isSelect': false,
              'children': [
                {
                  'id': 1,
                  'level': 3,
                  'authSign': '2-5-4',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 2,
                  'level': 3,
                  'authSign': '2-5-3',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 3,
                  'level': 3,
                  'authSign': '2-5-2',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 4,
                  'level': 3,
                  'authSign': '2-5-1',
                  'isSelect': false,
                  'children': null
                }
              ]
            },
            {
              'id': 6,
              'level': 2,
              'authSign': '2-6',
              'isSelect': false,
              'children': [
                {
                  'id': 1,
                  'level': 3,
                  'authSign': '2-6-6',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 2,
                  'level': 3,
                  'authSign': '2-6-3',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 3,
                  'level': 3,
                  'authSign': '2-6-2',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 4,
                  'level': 3,
                  'authSign': '2-6-5',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 5,
                  'level': 3,
                  'authSign': '2-6-4',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 6,
                  'level': 3,
                  'authSign': '2-6-1',
                  'isSelect': false,
                  'children': null
                }
              ]
            },
            {
              'id': 7,
              'level': 2,
              'authSign': '2-7',
              'isSelect': false,
              'children': [
                {
                  'id': 1,
                  'level': 3,
                  'authSign': '2-7-5',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 2,
                  'level': 3,
                  'authSign': '2-7-2',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 3,
                  'level': 3,
                  'authSign': '2-7-1',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 4,
                  'level': 3,
                  'authSign': '2-7-4',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 5,
                  'level': 3,
                  'authSign': '2-7-3',
                  'isSelect': false,
                  'children': null
                }
              ]
            },
            {
              'id': 8,
              'level': 2,
              'authSign': '2-8',
              'isSelect': false,
              'children': [
                {
                  'id': 1,
                  'level': 3,
                  'authSign': '2-8-1',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 2,
                  'level': 3,
                  'authSign': '2-8-3',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 3,
                  'level': 3,
                  'authSign': '2-8-2',
                  'isSelect': false,
                  'children': null
                }
              ]
            }
          ]
        },
        {
          'id': 3,
          'level': 1,
          'authSign': '3',
          'isSelect': false,
          'children': [
            {
              'id': 1,
              'level': 2,
              'authSign': '3-1',
              'isSelect': false,
              'children': [
                {
                  'id': 1,
                  'level': 3,
                  'authSign': '3-1-1',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 2,
                  'level': 3,
                  'authSign': '3-1-5',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 3,
                  'level': 3,
                  'authSign': '3-1-4',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 4,
                  'level': 3,
                  'authSign': '3-1-3',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 5,
                  'level': 3,
                  'authSign': '3-1-2',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 6,
                  'level': 3,
                  'authSign': '3-1-6',
                  'isSelect': false,
                  'children': null
                }
              ]
            },
            {
              'id': 2,
              'level': 2,
              'authSign': '3-2',
              'isSelect': false,
              'children': [
                {
                  'id': 1,
                  'level': 3,
                  'authSign': '3-2-4',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 2,
                  'level': 3,
                  'authSign': '3-2-3',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 3,
                  'level': 3,
                  'authSign': '3-2-2',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 4,
                  'level': 3,
                  'authSign': '3-2-1',
                  'isSelect': false,
                  'children': null
                }
              ]
            },
            {
              'id': 3,
              'level': 2,
              'authSign': '3-3',
              'isSelect': false,
              'children': [
                {
                  'id': 1,
                  'level': 3,
                  'authSign': '3-3-3',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 2,
                  'level': 3,
                  'authSign': '3-3-2',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 3,
                  'level': 3,
                  'authSign': '3-3-1',
                  'isSelect': false,
                  'children': null
                }
              ]
            }
          ]
        },
        {
          'id': 4,
          'level': 1,
          'authSign': '4',
          'isSelect': false,
          'children': [
            {
              'id': 1,
              'level': 2,
              'authSign': '4-1',
              'isSelect': false,
              'children': [
                {
                  'id': 1,
                  'level': 3,
                  'authSign': '4-1-5-2',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 2,
                  'level': 3,
                  'authSign': '4-1-5-1',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 3,
                  'level': 3,
                  'authSign': '4-1-2',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 4,
                  'level': 3,
                  'authSign': '4-1-1',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 5,
                  'level': 3,
                  'authSign': '4-1-4',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 6,
                  'level': 3,
                  'authSign': '4-1-3',
                  'isSelect': false,
                  'children': null
                }
              ]
            },
            {
              'id': 2,
              'level': 2,
              'authSign': '4-2',
              'isSelect': false,
              'children': [
                {
                  'id': 1,
                  'level': 3,
                  'authSign': '4-2-5',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 2,
                  'level': 3,
                  'authSign': '4-2-4',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 3,
                  'level': 3,
                  'authSign': '4-2-1',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 4,
                  'level': 3,
                  'authSign': '4-2-3',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 5,
                  'level': 3,
                  'authSign': '4-2-2',
                  'isSelect': false,
                  'children': null
                }
              ]
            },
            {
              'id': 3,
              'level': 2,
              'authSign': '4-3',
              'isSelect': false,
              'children': [
                {
                  'id': 1,
                  'level': 3,
                  'authSign': '4-3-2',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 2,
                  'level': 3,
                  'authSign': '4-3-1',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 3,
                  'level': 3,
                  'authSign': '4-3-5-1',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 4,
                  'level': 3,
                  'authSign': '4-3-5-2',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 5,
                  'level': 3,
                  'authSign': '4-3-3',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 6,
                  'level': 3,
                  'authSign': '4-3-4',
                  'isSelect': false,
                  'children': null
                }
              ]
            }
          ]
        },
        {
          'id': 5,
          'level': 1,
          'authSign': '5',
          'isSelect': false,
          'children': [
            {
              'id': 1,
              'level': 2,
              'authSign': '5-1',
              'isSelect': false,
              'children': [
                {
                  'id': 1,
                  'level': 3,
                  'authSign': '5-1-4',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 2,
                  'level': 3,
                  'authSign': '5-1-5',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 3,
                  'level': 3,
                  'authSign': '5-1-6',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 4,
                  'level': 3,
                  'authSign': '5-1-1',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 5,
                  'level': 3,
                  'authSign': '5-1-2',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 6,
                  'level': 3,
                  'authSign': '5-1-3',
                  'isSelect': false,
                  'children': null
                }
              ]
            },
            {
              'id': 2,
              'level': 2,
              'authSign': '5-2',
              'isSelect': false,
              'children': [
                {
                  'id': 1,
                  'level': 3,
                  'authSign': '5-2-1',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 2,
                  'level': 3,
                  'authSign': '5-2-2',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 3,
                  'level': 3,
                  'authSign': '5-2-3',
                  'isSelect': false,
                  'children': null
                }
              ]
            },
            {
              'id': 3,
              'level': 2,
              'authSign': '5-3',
              'isSelect': false,
              'children': [
                {
                  'id': 1,
                  'level': 3,
                  'authSign': '5-3-1',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 2,
                  'level': 3,
                  'authSign': '5-3-2',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 3,
                  'level': 3,
                  'authSign': '5-3-3',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 4,
                  'level': 3,
                  'authSign': '5-3-4',
                  'isSelect': false,
                  'children': null
                }
              ]
            },
            {
              'id': 4,
              'level': 2,
              'authSign': '5-4',
              'isSelect': false,
              'children': [
                {
                  'id': 1,
                  'level': 3,
                  'authSign': '5-4-1',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 2,
                  'level': 3,
                  'authSign': '5-4-2',
                  'isSelect': false,
                  'children': null
                }
              ]
            },
            {
              'id': 5,
              'level': 2,
              'authSign': '5-5',
              'isSelect': false,
              'children': [
                {
                  'id': 1,
                  'level': 3,
                  'authSign': '5-5-1',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 2,
                  'level': 3,
                  'authSign': '5-5-2',
                  'isSelect': false,
                  'children': null
                }
              ]
            },
            {
              'id': 6,
              'level': 2,
              'authSign': '5-6',
              'isSelect': false,
              'children': [
                {
                  'id': 1,
                  'level': 3,
                  'authSign': '5-6-1',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 2,
                  'level': 3,
                  'authSign': '5-6-2',
                  'isSelect': false,
                  'children': null
                }
              ]
            }
          ]
        },
        {
          'id': 6,
          'level': 1,
          'authSign': '6',
          'isSelect': false,
          'children': [
            {
              'id': 1,
              'level': 2,
              'authSign': '6-1',
              'isSelect': false,
              'children': [
                {
                  'id': 1,
                  'level': 3,
                  'authSign': '6-1-1',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 2,
                  'level': 3,
                  'authSign': '6-1-2',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 3,
                  'level': 3,
                  'authSign': '6-1-7',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 4,
                  'level': 3,
                  'authSign': '6-1-5',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 5,
                  'level': 3,
                  'authSign': '6-1-6',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 6,
                  'level': 3,
                  'authSign': '6-1-3',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 7,
                  'level': 3,
                  'authSign': '6-1-4',
                  'isSelect': false,
                  'children': null
                }
              ]
            },
            {
              'id': 2,
              'level': 2,
              'authSign': '6-2',
              'isSelect': false,
              'children': [
                {
                  'id': 1,
                  'level': 3,
                  'authSign': '6-2-1',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 2,
                  'level': 3,
                  'authSign': '6-2-2',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 3,
                  'level': 3,
                  'authSign': '6-2-3',
                  'isSelect': false,
                  'children': null
                }
              ]
            },
            {
              'id': 3,
              'level': 2,
              'authSign': '6-3',
              'isSelect': false,
              'children': [
                {
                  'id': 1,
                  'level': 3,
                  'authSign': '6-3-3',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 2,
                  'level': 3,
                  'authSign': '6-3-1',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 3,
                  'level': 3,
                  'authSign': '6-3-2',
                  'isSelect': false,
                  'children': null
                }
              ]
            }
          ]
        },
        {
          'id': 7,
          'level': 1,
          'authSign': '7',
          'isSelect': false,
          'children': [
            {
              'id': 1,
              'level': 2,
              'authSign': '7-1',
              'isSelect': false,
              'children': [
                {
                  'id': 1,
                  'level': 3,
                  'authSign': '7-1-2',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 2,
                  'level': 3,
                  'authSign': '7-1-3',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 3,
                  'level': 3,
                  'authSign': '7-1-4',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 4,
                  'level': 3,
                  'authSign': '7-1-5',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 5,
                  'level': 3,
                  'authSign': '7-1-1',
                  'isSelect': false,
                  'children': null
                }
              ]
            },
            {
              'id': 2,
              'level': 2,
              'authSign': '7-2',
              'isSelect': false,
              'children': [
                {
                  'id': 1,
                  'level': 3,
                  'authSign': '7-2-1',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 2,
                  'level': 3,
                  'authSign': '7-2-2',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 3,
                  'level': 3,
                  'authSign': '7-2-3',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 4,
                  'level': 3,
                  'authSign': '7-2-4',
                  'isSelect': false,
                  'children': null
                }
              ]
            },
            {
              'id': 3,
              'level': 2,
              'authSign': '7-3',
              'isSelect': false,
              'children': [
                {
                  'id': 1,
                  'level': 3,
                  'authSign': '7-3-1',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 2,
                  'level': 3,
                  'authSign': '7-3-2',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 3,
                  'level': 3,
                  'authSign': '7-3-3',
                  'isSelect': false,
                  'children': null
                }
              ]
            }
          ]
        },
        {
          'id': 8,
          'level': 1,
          'authSign': '8',
          'isSelect': false,
          'children': [
            {
              'id': 1,
              'level': 2,
              'authSign': '8-1',
              'isSelect': false,
              'children': [
                {
                  'id': 1,
                  'level': 3,
                  'authSign': '8-1-3',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 2,
                  'level': 3,
                  'authSign': '8-1-4',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 3,
                  'level': 3,
                  'authSign': '8-1-1',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 4,
                  'level': 3,
                  'authSign': '8-1-2',
                  'isSelect': false,
                  'children': null
                }
              ]
            },
            {
              'id': 2,
              'level': 2,
              'authSign': '8-2',
              'isSelect': false,
              'children': [
                {
                  'id': 1,
                  'level': 3,
                  'authSign': '8-2-2',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 2,
                  'level': 3,
                  'authSign': '8-2-3',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 3,
                  'level': 3,
                  'authSign': '8-2-1',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 4,
                  'level': 3,
                  'authSign': '8-2-4',
                  'isSelect': false,
                  'children': null
                }
              ]
            },
            {
              'id': 3,
              'level': 2,
              'authSign': '8-3',
              'isSelect': false,
              'children': [
                {
                  'id': 1,
                  'level': 3,
                  'authSign': '8-3-1',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 2,
                  'level': 3,
                  'authSign': '8-3-2',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 3,
                  'level': 3,
                  'authSign': '8-3-3',
                  'isSelect': false,
                  'children': null
                }
              ]
            },
            {
              'id': 4,
              'level': 2,
              'authSign': '8-4',
              'isSelect': false,
              'children': [
                {
                  'id': 1,
                  'level': 3,
                  'authSign': '8-4-6',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 2,
                  'level': 3,
                  'authSign': '8-4-1',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 3,
                  'level': 3,
                  'authSign': '8-4-4',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 4,
                  'level': 3,
                  'authSign': '8-4-5',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 5,
                  'level': 3,
                  'authSign': '8-4-2',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 6,
                  'level': 3,
                  'authSign': '8-4-3',
                  'isSelect': false,
                  'children': null
                }
              ]
            },
            {
              'id': 5,
              'level': 2,
              'authSign': '8-5',
              'isSelect': false,
              'children': [
                {
                  'id': 1,
                  'level': 3,
                  'authSign': '8-5-3',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 2,
                  'level': 3,
                  'authSign': '8-5-4',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 3,
                  'level': 3,
                  'authSign': '8-5-1',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 4,
                  'level': 3,
                  'authSign': '8-5-2',
                  'isSelect': false,
                  'children': null
                }
              ]
            },
            {
              'id': 6,
              'level': 2,
              'authSign': '8-6',
              'isSelect': false,
              'children': [
                {
                  'id': 1,
                  'level': 3,
                  'authSign': '8-6-2',
                  'isSelect': false,
                  'children': null
                },
                {
                  'id': 2,
                  'level': 3,
                  'authSign': '8-6-1',
                  'isSelect': false,
                  'children': null
                }
              ]
            }
          ]
        }
      ]
    }
  },

  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
</style>

