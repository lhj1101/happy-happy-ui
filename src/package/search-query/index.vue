<script setup lang="ts">
import { nextTick,onMounted, ref, reactive, defineProps, defineEmits } from "vue";
import type { Ref } from "vue";
import type { queryItem, heightContentType } from "./search.class";
import './searchQuery.scss'
const props = defineProps({
  queryList: {
    type: Array,
    default: () => []
  }
})
const emits = defineEmits(['changeTableHeight', 'search', 'reload'])
let queryOptionList:Ref<any> = ref(null)// queryOptionList容器
const heightContent = reactive<heightContentType>({
  queryHeight: 0,
  queryRow: 0,
  rowHeight: 46,
  showHiddenBtn: false,
  tableHeight: 300,
  sum: 0,
})
const showMoreQuery = () => {
  heightContent.showHiddenBtn = !heightContent.showHiddenBtn
  // 控制更多筛选
  if(heightContent.showHiddenBtn){
    heightContent.queryHeight = heightContent.queryRow * heightContent.rowHeight + 'px'
  } else {
    if (heightContent.queryRow == 1) {
      heightContent.queryHeight = heightContent.rowHeight + 'px'
    } else {
      heightContent.queryHeight = 2 * heightContent.rowHeight + 'px'  
    }
  }
  setTimeout(() => {
    emits('changeTableHeight')
  }, 250);
}
const initHeight = () => {
  // 计算高度(后期优化)
  // 选项行数
  heightContent.queryRow = Math.ceil(queryOptionList.value.length / 3)
  // 选项容器高度
  heightContent.queryHeight = heightContent.queryRow * heightContent.rowHeight + 'px'
  // 根据选项行数匹配选项容器高度
  if(heightContent.queryRow == 1){
    heightContent.queryHeight = 'auto'
  }else{
    // 第一次打开，最多2行
    heightContent.queryHeight = 2 * heightContent.rowHeight + 'px'
  }
  // emits('changeTableHeight')

}
const saveQueryList = JSON.parse(JSON.stringify(props.queryList))
const getQueryJson = (type:string) => {
  let obj:any = {}
  if(type=='search'){
    for(let key of props.queryList!){
      obj[key.field] = key.value
    }
  }else{
    for(let key of saveQueryList!){
      obj[key.field] = saveQueryList[saveQueryList.findIndex(x => x.field == key.field)].value
    }
  }
  return obj
}
const search = () => {
  let json = getQueryJson('search')
  emits('search', json)
}
const reload = () => {
  let json = getQueryJson('reload')
  emits('reload', json)
}
onMounted(() => {
  nextTick(()=>{
    initHeight()
  })
})
</script>

<template>
  <div class="query-part" >
    <el-row type="flex" :gutter="60" class="query-options" :style="{height:heightContent.queryHeight}">
      <el-col class="option" :span="8"  v-for="(query, index) in props.queryList" :key="index" ref="queryOptionList">
        <div class="name">{{query.label}}</div>
        <div class="value">
          <!-- 输入框 -->
          <el-input
            v-if="query.type==='input'"
            v-model="query.value"
            clearable>
          </el-input>
          <!-- 下拉框 -->
          <el-select
            v-if="query.type==='select'"
            :multiple="query?.multiple?query?.multiple:false"
            :filterable="query?.filterable?query?.filterable:false"
            clearable
            v-model="query.value">
            <el-option v-for="(option, index) in query?.options" :label="option.label" :value="option.value" :key="index"></el-option>
          </el-select>
          <!-- 日期 -->
          <el-date-picker
              v-if="query.type==='datePicker'"
              v-model="query.value"
              :type="query?.datePickerType"
              value-format="YYYY-MM-DD"
              clearable
              placeholder="选择日期">
          </el-date-picker>
          <!-- 日期范围 -->
          <el-date-picker
            v-if="query.type==='daterange'"
            v-model="query.value"
            type="daterange"
            value-format="YYYY-MM-DD HH:mm:ss"
            clearable
            range-separator="~"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择日期">
          </el-date-picker>
          <!-- 级联下拉框 -->
          <el-cascader
            v-if="query.type==='cascader'"
            v-model="query.value"
            :options="query.options"
            :props="query.props"
            :show-all-levels="false"
            clearable
          />
        </div>
      </el-col>

    </el-row>
    <div class="query-btn">
      <div class="show-hidden-btn" @click="showMoreQuery" v-if="heightContent.queryRow > 2">
        更多筛选
        <img v-show="!heightContent.showHiddenBtn" class="column-btn" src="//localhost:9100/src/assets/img/sys/down.png" alt="" />
        <img v-show="heightContent.showHiddenBtn" class="column-btn" src="//localhost:9100/src/assets/img/sys/up.png" alt="" />
      </div>
      <div v-else></div>
      <div class="search-btns">
        <el-button type="primary" round @click="search">查询</el-button>
        <el-button round @click="reload">重置</el-button>
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">
  :deep(.el-cascader){
    width: 100%;
  }
</style>
