<template>
  <div>
    <MblogSelect
      ref="ruleForm"
      label-width="150px"
      :form-config="formConfig"
      :form-data="formData"
      :rules="rules"
      @submitForm="submitForm"
    >
    </MblogSelect>
    <!--
    * 扩展事件：
    * @rowClick="rowClick"
          :form-info="formInfo"
    -->
    <MblogTable
      :table-data="tableData"
      :column-names="columnNames"
      :page-info="pageInfo"
      :form-config="formConfig"
      :form-data="formData"
      :rules="rules"
      @rowOperation="rowOperation"
      @switchChange="switchChange"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    />
  </div>
</template>
<script>
import MblogTable from '@/components/mblog/table/MblogTable'
import MblogSelect from '@/components/mblog/table/MblogSelect'
export default {
  components: { MblogTable, MblogSelect },
  data() {
    return {
      visible: false,
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
        }
      ],
      // 表单数据
      formData: {
        name: '',
        region: ''
      },
      // 表单规则
      rules: {
        // name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        // region: [
        //   { required: true, message: '请选择活动区域', trigger: 'change' }
        // ]
      },
      // 分页参数信息
      pageInfo: {
        position: 'left', // 分页组件位置
        total: 0,
        pageNumber: 1,
        pageSize: 10
      },
      tableData: [{
        id: 1,
        date: '2016-05-02',
        tag: '王小虎',
        // tagType：定义tag的颜色，默认为primary
        tagType: 'success',
        address: '上海市普陀区金沙江路 1518 弄',
        switches: true,
        img: 'https://pic.qqtn.com/up/2019-9/15690311636958128.jpg',
        status: false,
        json: {
          msg: '啊啊啊啊啊啊啊啊'
        }
      }, {
        id: 2,
        date: '2016-05-04',
        tag: '王小虎',
        tagType: 'danger',
        address: '上海市普陀区金沙江路 1517 弄',
        switches: true,
        img: 'https://pic.qqtn.com/up/2019-9/15690311636958128.jpg',
        status: false,
        json: {
          msg: '<el-tag type="danger">标签五</el-tag>'
        }
      }, {
        id: 3,
        date: '2016-05-01',
        tag: '王小虎',
        tagType: 'danger',
        address: '上海市普陀区金沙江路 1519 弄',
        switches: true,
        img: 'https://pic.qqtn.com/up/2019-9/15690311636958128.jpg',
        json: {
          msg: '啊啊啊啊啊啊啊啊'
        }
      }, {
        id: 4,
        date: '2016-05-03',
        tag: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        switches: true,
        img: 'https://pic.qqtn.com/up/2019-9/15690311636958128.jpg',
        json: {
          msg: '啊啊啊啊啊啊啊啊',
          msg1: '1111啊啊啊啊啊啊啊啊'
        }
      }, {
        id: 5,
        date: '2017-05-03',
        tag: '王小虎1',
        address: '上海市普陀区金沙江路 1516 弄',
        switches: true,
        img: 'https://pic.qqtn.com/up/2019-9/15690311636958128.jpg',
        json: {
          msg: '啊啊啊啊啊啊啊啊'
        }
      }, {
        id: 6,
        date: '2018-05-03',
        tag: '王小虎',
        address: '上海市普陀区金沙江路 2516 弄',
        switches: false,
        img: 'https://pic.qqtn.com/up/2019-9/15690311636958128.jpg',
        json: {
          msg: '啊啊啊啊啊啊啊啊'
        }
      }],
      columnNames: {
        // 选择框
        // selection: true,
        // 选择框根据条件是否可选
        // selectable: (row, index) => {
        //   if (row.switches) {
        //     return true
        //   }
        // },
        lazy: 'true',
        // column列,columType(列类型,可选text(默认为普通文字模式),input(input可编辑框),
        // switch(switch开关),image(图片),operation(操作按钮))
        // prop(参数),label(列名),width(宽度),align(对齐方式),sortable(是否支持排序)
        columnData: [{
          text: true,
          prop: 'date',
          label: '默认样式',
          width: '',
          align: 'center'
        }, {
          text: true,
          prop: 'id',
          label: '可以排序',
          width: '',
          align: 'center',
          sortable: true // 开启排序
        },
        {
          status: true,
          prop: 'json',
          label: 'obj类型（mesage）',
          width: '',
          align: 'center',
          // 字段长度溢出提示
          overflowTooltip: true
        },
        {
          ownDefined: true,
          prop: 'address',
          label: '自定义返回内容',
          width: '',
          align: 'center',
          ownDefinedReturn: (row, $index) => {
            return row.address
          }
        },
        {
          switch: true,
          prop: 'switches',
          label: 'switch开关',
          width: '',
          align: 'center'
          // openText: '打开',
          // closeText: '关闭'
        },
        {
          image: true,
          prop: 'img',
          label: '图片',
          width: '',
          align: 'center'
        },
        {
          tag: true,
          prop: 'tag',
          tagType: 'primary',
          label: '标签',
          width: '',
          align: 'center'
        },
        // 如果为操作列,则需要填写需要的操作按钮,类型为Object。operation(操作类型,可选edit,delete,see),type(按钮样式,参考el—botton类型),label(按钮文字)icon(参考el-icon),color(字体颜色)
        {
          isOperation: true,
          label: '操作',
          width: '180',
          align: 'center',
          fixed: 'right',
          operations: [{
            operation: 'edit',
            type: 'text',
            label: '编辑',
            icon: '',
            color: 'blue',
            // isShow默认显示,隐藏可改成false
            isShow: true
          }, {
            operation: 'delete',
            type: 'danger',
            label: '删除',
            size: 'mini'
          }, {
            operation: 'select',
            type: 'primary',
            label: '查看',
            size: 'small'
          }]
        }

        ]
      }
    }
  },
  watch: { // 监听
  },
  beforeCreate() {},
  // 在模板渲染成html前调用
  created: function() {
    this.pageInfo.total = this.tableData.length
  },
  beforeMount() {

  },
  mounted() { // 在模板渲染成html后调用

  },
  beforeUpdate() {

  },
  updated() {

  },
  destroyed() { // 销毁后
  },
  methods: {
    submitForm(formData) {
      debugger
      console.log(formData)
    },
    resetForm(formData) {
      console.log(formData)
    },
    cancel(r, s) {
      console.log(this.visible)
      console.log(r)
      this.visible = false
    },
    submit(r) {
      this.visible = false
      console.log(this.visible)
      console.log(r)
    },
    rowOperation(row, $index, now) {
      console.log(row, $index, now)
    },
    switchChange(row, $index, prop) {
      console.log(row, $index, prop)
    },
    // 点击行触发，编辑点击的所在列，排除selection选择框
    // rowClick(row, column, event) {
    // if (column.type !== 'selection') {
    //   this.columObj.columnData[column.index].editRow = row.rowIndex
    //   }
    // },
    // 页码变化
    handleCurrentChange(pageNumber) {
      this.pageInfo.pageNumber = pageNumber
    },
    // 条数变化
    handleSizeChange(pageSize) {
      this.pageInfo.pageSize = pageSize
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
