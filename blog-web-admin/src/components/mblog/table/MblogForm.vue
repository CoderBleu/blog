<!--
@author Lauy
@date 创建时间：2022年09月06日
@description 表单通用组件
 -->
<template>
  <div>
    <el-form
      :model="formData"
      :rules="rules"
      ref="ruleForm"
      :label-width="labelWidth"
      :label-position="labelPosition"
    >
      <el-form-item
        v-for="item in formConfig"
        :label="item.label"
        :prop="item.prop"
        :key="item.label"
      >
        <!-- 输入框 -->
        <el-input
          v-if="item.type === 'input'"
          v-model="formData[item.prop]"
          :disabled="item.disabled"
          :style="{ width: item.width }"
          @change="item.change && item.change(formData[item.prop])"
          clearable
        ></el-input>

        <!-- 密码框 -->
        <el-input
          v-if="item.type === 'password'"
          type="password"
          v-model="formData[item.prop]"
          autocomplete="off"
          :style="{ width: item.width }"
          @change="item.change && item.change(formData[item.prop])"
          clearable
          show-password
        ></el-input>

        <!-- 文本域 -->
        <el-input
          v-if="item.type === 'textarea'"
          type="textarea"
          v-model="formData[item.prop]"
          :disabled="item.disabled"
          :style="{ width: item.width }"
          :maxlength="item.maxlength"
          :rows="item.rows"
          :show-word-limit="item.showWordLimit"
          @change="item.change && item.change(formData[item.prop])"
        ></el-input>

        <!-- 下拉框 -->
        <el-select
          v-if="item.type === 'select'"
          v-model="formData[item.prop]"
          :disabled="item.disabled"
          :style="{ width: item.width }"
          @change="item.change && item.change(formData[item.prop])"
          clearable
        >
          <el-option
            v-for="option in item.options"
            :label="option.label"
            :value="option.value"
            :key="option.value"
          ></el-option>
        </el-select>

        <!-- 单选框 -->
        <el-radio-group
          v-if="item.type === 'radio'"
          v-model="formData[item.prop]"
          :disabled="item.disabled"
          @change="item.change && item.change(formData[item.prop])"
        >
          <el-radio
            v-for="radio in item.radios"
            :label="radio.label"
            :key="radio.label"
          ></el-radio>
        </el-radio-group>

        <!-- 复选框 -->
        <el-checkbox-group
          v-if="item.type === 'checkbox'"
          v-model="formData[item.prop]"
          :disabled="item.disabled"
          @change="item.change && item.change(formData[item.prop])"
        >
          <el-checkbox
            v-for="checkbox in item.checkboxs"
            :label="checkbox.label"
            :key="checkbox.label"
          ></el-checkbox>
        </el-checkbox-group>

        <!-- 开关 -->
        <el-switch
          v-if="item.type === 'switch'"
          v-model="formData[item.prop]"
          :disabled="item.disabled"
          @change="item.change && item.change(formData[item.prop])"
        ></el-switch>

        <!-- 上传 -->
        <el-upload
          v-if="item.type === 'upload'"
          class="avatar-uploader"
          ref="uploadxls"
          :action="item.action"
          :limit="item.limit"
          :show-file-list="false"
          :on-success="handleSuccess"
          :on-change="handleFileChange"
          :before-upload="beforeUpload"
        >
          <slot name="upload"></slot>
        </el-upload>

        <!-- 级联 -->
        <el-cascader
          v-if="item.type === 'cascader'"
          size="large"
          v-model="formData[item.prop]"
          :options="options"
          :style="{ width: item.width }"
          @change="item.change && item.change(formData[item.prop])"
          clearable
        >
        </el-cascader>

        <!-- 操作按钮 -->
        <template v-if="item.type === 'slotName'">
          <slot :name="item.slotName"></slot>
          <el-button type="primary" @click="submitForm('ruleForm')">
            立即创建
          </el-button>
          <el-button @click.prevent="resetForm('ruleForm')">重置</el-button>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'MblogTable',
  props: {
    // 表单域标签的宽度
    labelWidth: {
      type: String,
      default: '100px'
    },
    // 表单域标签的位置
    labelPosition: {
      type: String,
      default: 'right'
    },
    // 表单配置
    formConfig: {
      type: Array,
      required: true
    },
    // 表单数据
    formData: {
      type: Object,
      required: true
    },
    // 表单规则
    rules: {
      type: Object
    },
    // 级联数据
    options: {
      type: Array
    }
  },
  methods: {
    // 上传成功的方法
    handleSuccess(file) {
      this.$emit('uploadSuccess')
      console.log('ok')
    },
    // 文件状态改变时的方法
    handleFileChange(file) {
      // URL.createObjectURL(file.raw) 一般在上传成功的函数中，这里是为了测试方便
      this.$emit('uploadFileChange', URL.createObjectURL(file.raw))
      console.log(file)
    },
    // 上传文件之前的方法
    beforeUpload(file) {
      this.$emit('uploadbefore', file)
      console.log(file)
      // return false;
    },
    // 表单字段校验方法(自定义检验)
    validateField(valid) {
      this.$refs.ruleForm.validateField(valid)
    },
    // 提交判断方法
    submitForm(formName) {
      debugger
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 重置方法
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

