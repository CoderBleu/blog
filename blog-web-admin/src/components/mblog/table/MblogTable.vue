<!--
@author Lauy
@date 创建时间：2022年09月04日
@description 分页table通用组件
 -->
<template>
  <div>
    <el-table
      v-loading="columnNames.loading"
      size="medium"
      :data="tableData"
      :stripe="true"
      :border="false"
      :fit="true"
      :show-header="true"
      :highlight-current-row="true"
      :row-class-name="tableRowClassName"
      @row-click="rowClick"
    >
      <!-- 选择框是否开启，selectable控制是否单行禁用 -->
      <el-table-column v-if="columnNames.selection === true" type="selection" :selectable="columnNames.selectable" />
      <!-- 普通列 -->
      <el-table-column
        v-for="(column,columnIndex) in columnNames.columnData"
        :key="columnIndex"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
        :fixed="column.fixed"
        :align="column.align || 'center'"
        :sortable="column.sortable === true"
        :index="columnIndex"
        :show-overflow-tooltip="column.overflowTooltip"
      >
        <template slot-scope="{row,$index}">
          <!-- 默认展示  && column.editRow !== $index-->
          <span v-if="column.text">{{ row[column.prop] }}</span>
          <!-- 状态对象展示 -->
          <span v-if="column.status && row[column.prop]">{{ row[column.prop].msg }}</span>
          <!-- 自定义内容 -->
          <span v-if="column.ownDefined">{{ column.ownDefinedReturn(row,$index) }}</span>
          <!-- switch开关 -->
          <el-switch
            v-if="column.switch"
            v-model="row[column.prop]"
            :active-text="row[column.prop] ? column.openText:column.closeText"
            @change="switchChange(row,$index,column.prop)"
          />
          <!-- 图片展示 -->
          <el-image v-if="column.image" :src="row[column.prop]" />
          <el-tag
            v-if="column.tag"
            :type="row['tagType']"
            disable-transitions
          >{{ row[column.prop] }}</el-tag>
          <!-- 操作按钮 -->
          <div v-if="column.isOperation">
            <span v-for="(operationInfo, index) in column.operations" :key="index">
              <!--  使用v-model="visible"失效，暂未解决 https://github.com/ElemeFE/element/issues/1763       -->
              <el-popover
                v-if="operationInfo.isShow !== false && operationInfo.operation === 'delete'"
                placement="top"
                :visible="visible"
                width="160"
              >
                <p>这是一段内容这是一段内容确定删除吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="cancelPopover(row,$index,operationInfo.operation)">取消</el-button>
                  <el-button type="primary" size="mini" @click="confirmPopover(row,$index,operationInfo.operation)">确定</el-button>
                </div>
                <el-button slot="reference" :size="operationInfo.size">{{ operationInfo.label }}</el-button>
              </el-popover>
              <el-button
                v-else-if="operationInfo.isShow !== false"
                :icon="operationInfo.icon"
                :type="operationInfo.type"
                :style="{color: operationInfo.color}"
                :size="operationInfo.size ? operationInfo.size : 'mini'"
                @click="rowOperation(row,$index,operationInfo.operation)"
              >{{ operationInfo.label }}</el-button>
            </span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="page_div" :style="{textAlign: pageInfo.position || 'center'}">
      <el-pagination
        :hide-on-single-page="false"
        :current-page="pageInfo.pageNumber"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageInfo.pageSize"
        background
        layout="total,sizes,prev, pager, next"
        :total="pageInfo.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MblogTable',
  directives: {
    // 自定义指令,用于可编辑input自动获取焦点
    focus: {
      inserted: function(e) {
        e.querySelector('input').focus()
      }
    }
  },
  props: {
    tableData: {
      type: Array,
      required: true
    },
    columnNames: {
      type: Object,
      required: true
    },
    // columObj.type(如果为""空，就不会加载多选框，或者index编号),lazy(是否支持懒加载)
    // columnData.columType(列类型,可选text(默认为普通文字模式),input(input可编辑框),switch(switch开关),image(图片),operation(操作按钮))
    // prop(参数),label(列名),width(宽度),align(对齐方式),sortable(是否支持排序)
    // 如果为操作列,则需要填写需要的操作按钮,类型为Object。operation(操作类型,可选edit,delete,see),type(按钮样式,参考el—botton类型),label(按钮文字)icon(参考el-icon),color(字体颜色)
    pageInfo: {
      type: Object,
      required: true
    },
    formInfo: {
      required: false
    }
  },
  data() {
    return {
      visible: false,
      formInline: {
        user: '',
        region: ''
      }
    }
  },
  methods: {
    onSearch(formName) {
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
    // 行操作
    rowOperation(row, $index, now) {
      this.$emit('rowOperation', row, $index, now)
    },
    // switchChange调用
    switchChange(row, $index, prop) {
      this.$emit('switchChange', row, $index, prop)
    },
    // 取消
    cancelPopover(row, $index, now) {
      this.visible = false
      console.log(row)
    },
    // 删除确定
    confirmPopover(row, $index, now) {
      this.visible = false
      this.$emit('rowOperation', row, $index, now)
    },
    // 帮助点击行，获取点击的下标
    tableRowClassName({
      row,
      rowIndex
    }) {
      row.rowIndex = rowIndex
    },
    // 点击行触发事件
    rowClick(row, column, event) {
      // this.$emit('rowClick', row, column, event)
    },
    /**
     * 先执行当前组件MblogTable方法，然后通过this.$emit('handleCurrentChange', e)调用子组件
     * 再执行当前组件的后续方法
     * @param e
     */
    // 条数变化
    handleSizeChange(e) {
      this.$emit('handleSizeChange', e)
    },
    // 页码变化
    handleCurrentChange(e) {
      this.$emit('handleCurrentChange', e)
    }
  }
}
</script>
<style lang="scss" scoped>
.el-button {
  margin: 0 6px;
}

::v-deep .el-input__inner {
  border: none;
}

::v-deep .el-image__inner {
  height: 50px;
}

// switch左边文字颜色
::v-deep .el-switch__label--left {
  color: #606266;
}

img {
  height: 400px;
}

.page_div {
  padding: 15px 0;
}
</style>
