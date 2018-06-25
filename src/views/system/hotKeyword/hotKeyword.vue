<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row type="flex" justify="space-between">
        <el-col :span="12">
          <div style="line-height:32px">热门搜索管理</div>
        </el-col>
        <el-col :span="12">
          <div style="text-align:right">
            <el-button type="primary" @click="isShowDialog = true" icon="el-icon-edit">添加热门搜索词</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号'>
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column label="热搜词" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="edit-input" size="small" v-model.trim="scope.row.wordText"></el-input>
            <el-button class='cancel-btn' size="small" type="warning" @click="cancelEdit(scope.row)">取消</el-button>
          </template>
          <span v-else>{{ scope.row.wordText }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <div style="text-align:left">
            <el-button v-if="scope.row.edit" :loading="loading" size="mini" type="danger" plain @click="updateWords(scope.row)">保存</el-button>
            <el-button v-else type="primary" size="mini" plain @click='scope.row.edit=!scope.row.edit'>修改</el-button>
            <el-button :disabled="scope.row.id==1" size="mini" type="success" plain @click="moveWords(scope.row,'up')">上移</el-button>
            <el-button :disabled="scope.row.id==list.length" size="mini" type="success" plain @click="moveWords(scope.row,'down')">下移</el-button>
            <el-button size="mini" type="danger" plain @click="deleteWords(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 点击增加弹出层 -->
    <el-dialog title="增加热搜词" @close="isClose" :visible.sync="isShowDialog" :show-close="false" width="400px" center>
      <el-form :model="wordsForm" label-width="80px">
        <el-form-item label="热搜词">
          <el-input v-model.trim="wordsForm.name" auto-complete="off" placeholder="请输入热搜词"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowDialog = false">取消</el-button>
        <el-button type="primary" @click.native.prevent="submitWords" :loading="loading">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getWordsList, addWords, deleteWords, updateWords, upMoveWords, downMoveWords } from '@/api/system/hotManage'
export default {
  name: 'hotKeyword',
  data() {
    return {
      list: null,
      listLoading: true,
      loading: false,
      isShowDialog: false,
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
    cancelEdit(row) {
      row.wordText = row.originalTitle
      row.edit = false
      this.wordsForm = {
        name: ''
      }
    },
    gethotKwordsList() {
      this.listLoading = true
      getWordsList().then(response => {
        if (response.data) {
          const items = response.data
          this.list = items.map(v => {
            this.$set(v, 'edit', false)
            v.originalTitle = v.wordText
            return v
          })
        } else {
          this.list = []
        }
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    submitWords() {
      if (!this.wordsForm.name) {
        this.$message({
          type: 'warning',
          message: '热搜词不能为空'
        })
      } else if (this.wordsForm.name.length >= 15) {
        this.$message({
          type: 'warning',
          message: '热搜词字数超过最大长度'
        })
      } else {
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
      if (!row.wordText) {
        this.$message({
          type: 'warning',
          message: '热搜词不能为空'
        })
      } else if (row.wordText.length >= 15) {
        this.$message({
          type: 'warning',
          message: '热搜词字数超过最大长度'
        })
      } else {
        this.loading = true
        row.originalTitle = row.wordText
        this.wordsForm.id = row.wordId
        this.wordsForm.name = row.wordText
        updateWords(this.wordsForm).then(() => {
          this.loading = false
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          row.edit = false
          this.wordsForm = {
            name: ''
          }
        }).catch(() => {
          this.loading = false
        })
      }
    },
    deleteWords(row) {
      deleteWords(row.wordId).then(() => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.gethotKwordsList()
      })
    },
    moveWords(row, status) {
      if (status === 'up') {
        if (row.id === 1) {
          return
        } else {
          upMoveWords(row.wordId).then(() => {
            this.gethotKwordsList()
          })
        }
      } else if (status === 'down') {
        if (row.id === this.list.length) {
          return
        } else {
          downMoveWords(row.wordId).then(() => {
            this.gethotKwordsList()
          })
        }
      }
    },
    isClose() {
      this.wordsForm = {
        name: ''
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>