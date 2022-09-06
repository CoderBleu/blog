<!--
@author Lauy
@date 创建时间：2022年09月06日
@description 分页table 查询通用组件
 -->
<template>
  <div>
    <el-form
      :model="formData"
      :rules="rules"
      ref="ruleForm"
      :inline="true"
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
      </el-form-item>
      <el-form-item>
        <!-- 操作按钮 -->
        <el-button type="primary" @click="submitForm('ruleForm')">
          查询
        </el-button>
<!--        暂时不需要，只查询吧-->
<!--        <el-button @click="resetForm('ruleForm')">重置</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'MblogSelect',
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
          this.$emit('submitForm', this.formData)
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
form.el-form.el-form--label-right.el-form--inline{
  margin-top: 2rem;
}
</style>

