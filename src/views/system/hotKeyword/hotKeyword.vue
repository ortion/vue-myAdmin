<template>
  <div class="app-container">
    <div class="filter-container">
      <h3>热门搜索管理</h3>
      <div style="text-align:right">
        <el-button class="filter-item" style="margin-left: 10px;" @click="addWords" type="primary" icon="el-icon-edit">增加</el-button>
      </div>
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row empty-text="暂无数据">
      <el-table-column align="center" label='序号'>
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column label="热搜词" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="edit-input" size="small" v-model="scope.row.wordText"></el-input>
          </template>
          <span v-else>{{ scope.row.wordText }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <div style="text-align:left">
            <el-button v-if="scope.row.edit" size="mini" type="danger" plain @click="updateWords(scope.row)">保存</el-button>
            <el-button v-else type="primary" size="mini" plain @click='scope.row.edit=!scope.row.edit'>修改</el-button>
            <el-button size="mini" type="success" plain @click="moveWords(scope.row,'up')">上移</el-button>
            <el-button size="mini" type="success" plain @click="moveWords(scope.row,'down')">下移</el-button>
            <el-button size="mini" type="danger" plain @click="deleteWords(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 点击增加弹出层 -->
    <el-dialog title="增加热搜词" :visible.sync="isShowDialog" :show-close="false" width="400px">
      <el-form :model="wordsForm" label-width="80px">
        <el-form-item label="热搜词" prop="oldPass">
          <el-input type="text" v-model="wordsForm.name" auto-complete="off" placeholder="请输入热搜词"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancelDialog">取消</el-button>
          <el-button type="primary" @click.native.prevent="submitWords" :loading="loading">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { getWordsList, addWords, deleteWords, updateWords, upMoveWords, downMoveWords } from '@/api/hotManage'
export default {
  name: 'hotKeyword',
  data() {
    return {
      list: null,
      listLoading: true,
      isShowDialog: false,
      loading: false,
      wordsForm: {
        name: '',
        id: ''
      }
    }
  },
  created() {
    this.gethotKwordsList()
  },
  methods: {
    gethotKwordsList() {
      this.listLoading = true
      getWordsList().then(response => {
        const items = response.data
        this.list = items.map(v => {
          this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
          return v
        })
        this.listLoading = false
      })
    },
    addWords() {
      this.isShowDialog = true
    },
    cancelDialog() {
      this.isShowDialog = false
      this.wordsForm = {
        name: ''
      }
    },
    submitWords() {
      if (this.wordsForm.name) {
        this.loading = true
        addWords(this.wordsForm.name).then(() => {
          this.loading = false
          this.$message({
            message: '热搜词添加成功',
            type: 'success'
          })
          this.isShowDialog = false
          this.gethotKwordsList()
        }).catch(() => {
          this.loading = false
        })
      }
    },
    updateWords(row) {
      if (row.wordText) {
        this.loading = true
        this.wordsForm.id = row.wordId
        this.wordsForm.name = row.wordText
        updateWords(this.wordsForm).then(() => {
          this.loading = false
          this.$message({
            message: '修改地址成功',
            type: 'success'
          })
          row.edit = false
          this.wordsForm = {
            name: ''
          }
        }).catch(err => {
          console.log(err)
          this.$message({
            message: err,
            type: 'error'
          })
          this.loading = false
        })
      }
    },
    deleteWords(row) {
      this.loading = true
      deleteWords(row.wordId).then(() => {
        this.loading = false
        this.$message({
          message: '删除地址成功',
          type: 'success'
        })
        this.gethotKwordsList()
      }).catch(err => {
        console.log(err)
        this.$message({
          message: err,
          type: 'error'
        })
        this.loading = false
      })
    },
    moveWords(row, status) {
      if (status === 'up') {
        if (row.id === 1) {
          return
        } else {
          upMoveWords(row.wordId).then(() => {
            this.loading = false
            this.gethotKwordsList()
          }).catch(err => {
            console.log(err)
            this.$message({
              message: err,
              type: 'error'
            })
            this.loading = false
          })
        }
      } else if (status === 'down') {
        if (row.id === this.list.length) {
          return
        } else {
          downMoveWords(row.wordId).then(() => {
            this.loading = false
            this.gethotKwordsList()
          }).catch(err => {
            console.log(err)
            this.$message({
              message: err,
              type: 'error'
            })
            this.loading = false
          })
        }
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>