<template>
  <div class="app-container">
    <h3>新建企业</h3>
    <el-form ref="shopForm" :model="shopForm" label-width="120px" class="shopForm">
      <!-- <el-form-item label="所属企业">
        <el-select v-model="value" placeholder="请选择企业">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="门店名称">
        <el-input v-model="shopForm.shopname" placeholder="请输入门店名称"></el-input>
      </el-form-item>
      <el-form-item label="门店分类">
        <el-select v-model="shopForm.shopType" placeholder="请选择">
          <el-option v-for="typeItem in shopTypeList" :key="typeItem.id" :label="typeItem.name" :value="typeItem.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="门店介绍">
        <el-input type="textarea" :rows="2" placeholder="请输入门店介绍" v-model="shopForm.introdcution">
        </el-input>
      </el-form-item>
      <el-form-item label="门店地址">
        <ul>
          <li>
            <cascader @selectData="selectData" :dataList="cityData" @clearData="clearData" :dataType="'city'"></cascader>
          </li>
          <li>
            <el-input v-model="shopForm.address" placeholder="请输入详细地址" class="cityInput"></el-input>
          </li>
          <li v-if="subwayList.length>0">
            <div class="inlint checkboxTitle">
              <span>周边地铁：</span>
              <p>已选中
                <span>{{shopForm.subways.length}}</span>个</p>
            </div>
            <div class="inlint">
              <el-checkbox-group v-model="shopForm.subways" @change="subwaysChange" class="checkboxGroup" :max="5">
                <el-checkbox v-for="subway in subwayList" :label="subway.id" :key="subway.id" v-cloak>
                  {{subway.name}}
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </li>
          <li v-if="businessCircle.length>0">
            <div class="inlint">
              <p>周边商圈：</p>
              <p>已选中
                <span>1</span>个</p>
            </div>
            <div class="inlint">
              <!-- <el-checkbox-group>
                <el-checkbox label="复选框 A"></el-checkbox>
                <el-checkbox label="复选框 B"></el-checkbox>
                <el-checkbox label="复选框 C"></el-checkbox>
                <el-checkbox label="禁用" disabled></el-checkbox>
                <el-checkbox label="选中且禁用" disabled></el-checkbox>
              </el-checkbox-group> -->
            </div>
          </li>
        </ul>
      </el-form-item>
      <el-form-item label="门店图标">
        <div class="inlint shoplogo">
          <img :src="shopForm.shoplogoUrl" alt="" v-if="shopForm.shoplogoUrl">
          <img :src="logo" alt="" v-else>
        </div>
        <div class="inlint">
          <el-button type="primary" @click="openPhotos" size="medium">选择</el-button>
        </div>
      </el-form-item>
      <el-form-item label="可用商品类目">
        <goods-category @typeList="goodsTypeList"></goods-category>
      </el-form-item>
      <el-form-item label="联系电话1">
        <el-input placeholder="请输入联系电话" v-model="shopForm.phone1">
        </el-input>
      </el-form-item>
      <el-form-item label="联系电话2">
        <el-input placeholder="请输入联系电话" v-model="shopForm.phone2">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSave">保存</el-button>
        <!-- <el-button @click="onCancel">取消</el-button> -->
      </el-form-item>

    </el-form>
    <!-- 图片库 -->
    <el-dialog title="图片库" :visible.sync="isPhotosDialog" @close="isClose" @open="isOpen">
      <photo-album :photoType="'shop'" :photoList="picList" @selectImg="selectImg" @updatedata="updateData" :closeDialog="isCloseStatus"></photo-album>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'companyAdd',
  components: {
  },
  data() {
    return {

    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">

</style>
