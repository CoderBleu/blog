<template>
  <div class="form">
    <MblogForm
      ref="ruleForm"
      :label-width="labelWidth"
      :form-config="formConfig"
      :form-data="formData"
      :rules="rules"
      :options="options"
      @uploadFileChange="uploadFileChange"
      @uploadbefore="uploadbefore"
    >
      <template slot="upload">
        <img v-if="formData.sfz" :src="formData.sfz" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon" />
      </template>
    </MblogForm>
  </div>
</template>

<script>
import MblogForm from '@/components/mblog/table/MblogForm'

export default {
  components: { MblogForm },
  data() {
    // const validatePassword = (rule, value, callback) => {
    //   // if (value === '') {
    //   //   callback(new Error('请输入密码'));
    //   // } else {
    //   //   if ((this).formData.rePwd !== '') {
    //   //     (this.$refs as any).ruleForm.validateField('rePwd');
    //   //   }
    //   //   callback();
    //   // }
    // };
    // const validaterePwd = (rule: any, value: string, callback: any) => {
    //   if (value === '') {
    //     callback(new Error('请再次输入密码'));
    //   } else if (value !== (this as any).formData.newPwd) {
    //     callback(new Error('两次输入密码不一致!'));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      // 表单域标签的宽度
      labelWidth: '150px',
      // 表单配置
      formConfig: [
        {
          label: '活动名称',
          prop: 'name',
          type: 'input',
          width: '150px'
        },
        {
          label: '活动区域',
          prop: 'region',
          type: 'select',
          width: '200px',
          options: [
            {
              label: '区域一',
              value: 'shanghai'
            },
            {
              label: '区域二',
              value: 'beijing'
            }
          ]
        },
        {
          label: '即时配送',
          prop: 'delivery',
          type: 'switch'
        },
        {
          label: '活动性质',
          prop: 'type',
          type: 'checkbox',
          checkboxs: [
            {
              label: '线上品牌商赞助'
            },
            {
              label: '线下场地免费'
            }
          ]
        },
        {
          label: '特殊资源',
          prop: 'resource',
          type: 'radio',
          radios: [
            {
              label: '线上品牌商赞助'
            },
            {
              label: '线下场地免费'
            }
          ]
        },
        {
          label: '身份证正面照',
          prop: 'sfz',
          type: 'upload',
          action: '/',
          limit: 1
        },
        {
          label: '活动形式',
          prop: 'desc',
          type: 'textarea',
          width: '200px',
          rows: '5',
          maxlength: '30',
          showWordLimit: true
        },
        {
          label: '密码',
          prop: 'newPwd',
          type: 'password',
          width: '200px'
        },
        {
          label: '确认密码',
          prop: 'rePwd',
          type: 'password',
          width: '200px'
        },
        {
          label: '地址',
          prop: 'selectedOptions',
          type: 'cascader',
          width: '300px'
          // change: (data: any) => {
          //   (self as any).changAddress(data);
          // }
        },
        {
          type: 'slotName',
          slotName: 'button'
        }
      ],
      // 表单数据
      formData: {
        name: '',
        region: '',
        delivery: false,
        type: [],
        resource: '',
        sfz: '',
        desc: '',
        rePwd: '',
        newPwd: '',
        selectedOptions: []
      },
      // 表单规则
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        type: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个活动性质',
            trigger: 'change'
          }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        sfz: [{ required: true, message: '请上传身份证' }],
        desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }],
        newPwd: [
          { required: true, validator: '', trigger: 'blur' }
        ],
        rePwd: [{ required: true, validator: '', trigger: 'blur' }],
        selectedOptions: [{ required: true, message: '地址' }]
      }
      // 省市区三级联动数据
      // options: regionData
    }
  },
  mounted() {
    console.log('form')
  },
  methods: {
    // 转化省市区为汉字
    changAddress(value) {
    },
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
    resetForm() {

    },
    uploadFileChange(localUrl) {

    },
    uploadbefore(file) {
      const isJPG = file.type === 'image/jpeg'
      if (!isJPG) {
        this.$tipMessage('error', '上传头像图片只能是 JPG 格式!')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  height: 100%;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
</style>

