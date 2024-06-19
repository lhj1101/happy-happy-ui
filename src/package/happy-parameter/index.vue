<template>
  <div class="wrap"  ref="wrap">
    <div class="header" v-show="props.showModules.includes('nav')">
      <div class="title">
        <bread-crumb-nav />
      </div>
      <div class="header-btns">
        <slot name="headerBtn"></slot>
      </div>
    </div>
    <search-query
      :queryList="queryList"
      @changeTableHeight="initHeight"
      @search="search"
      @reload="reload">
    </search-query>
    <div class="main" v-show="props.showModules.includes('tableTitleLine')">
      <div class="main-table-title">
        <div class="title">{{props.tableTitle}}</div>
        <div class="table-btns">
          <slot name="mainBtn"></slot>
        </div>
      </div>
    </div>
    <div class="ce-table-pagination">
      <el-config-provider :locale="locale">
        <div class="ce-table">
          <el-table
            :data="tableData"
            :height="tableHeight"
            style="width: 100%;"
            :header-cell-style="headerCellStyle"
            :cell-style="cellStyle"
            v-loading="tableLoading"
            v-bind="$attrs"
          >
            <slot name="tableColumn"></slot>
          </el-table>
        </div>
        <div class="pagination" v-show="needPagination">
            
            <!-- v-model:currentPage="pageContent.pageNumber"
            v-model:page-size="pageContent.pageSize" -->
          <el-pagination
            :currentPage="pageContent.pageNumber"
            :page-size="pageContent.pageSize"
            :page-sizes="pageContent.pageSizes"
            :small="pageContent.small"
            :disabled="pageContent.disabled"
            :background="pageContent.background"
            :layout="pageContent.layout"
            :total="pageContent.totalRecord"
            v-bind="$attrs"
          />
        </div>
      </el-config-provider>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'happy-parameter'
}
</script>

<script setup lang="ts">
import { Ref, ref, reactive, onMounted, nextTick, toRefs, defineProps, defineExpose, defineEmits } from "vue";
import type { PropType } from 'vue'
import type { pageContentType } from './types'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import breadCrumbNav from '../bread-crumb-nav/index.vue'
import searchQuery from "../search-query/index.vue";
import type { queryItem } from "../search-query/search.class";

const locale = zhCn
let emits = defineEmits(['search', 'reload'])
const props = defineProps({
  // 表格
  tableData:{
    type: Array,
    default: () => []
  },
  needPagination:{
    type: Boolean,
    default: () => true
  },
  tableLoading:{
    type: Boolean,
    default: () => false
  },
  showModules:{
    type: Array,
    default: () => ['nav', 'tableTitleLine']
  },
  tableTitle:{
    type: String,
    default: () => ''
  },
  headerCellStyle: {
    type: Object,
    default: () => {
			return {
				'backgroundColor': '#f3f5f7',
				'fontSize': '16px',
				'font-weight': 'bolder',
				'text-align': 'center',
				'color': '#242424'
			}
		}
  },
  cellStyle: {
    type: Object,
    default: () => {
			return {
				'text-align': 'center',
				'height': '56px'
			}
		}
  },
  // 页面
  pageContent:{
    type: Object as PropType<pageContentType>,
    default: () => {
			return {
				pageNumber: 1,
				pageSize: 10,
				pageSizes: [5, 10, 20, 40],
				totalRecord: 0,
				small: false,
				background: true,
				disabled: false,
				layout: 'prev, pager, next, total, sizes, jumper'
			}
    }
  },
  // 页面
  queryList:{
    // type: Array as PropType<queryItem>,
    type: Array,
    default: () => []
  }
})


const wrap:Ref<any> = ref(null)// wrap容器
let tableHeight = ref<number|string>(0)// tableHeight
let sum = ref<number>(0)// 容器去除el-table高度
let marginTotal = ref<number>(0)// 计算元素margin总数
let tablePadding = ref<number>(40)// tablePadding

const initHeight = () => {
  console.log('wrap', wrap)
  sum.value = 0
  marginTotal.value = 0
  wrap?.value.childNodes.forEach((item:any) => {
    if(item.nodeName!='#comment' && item.className != 'ce-table-pagination'){
      if(item.style?.marginTop?.split('px')[0]*1){
        marginTotal.value += item.style.marginTop.split('px')[0]*1
      }else {
        marginTotal.value += window.getComputedStyle(item)['margin-top'].split('px')[0]*1
      }
      if(item.style?.marginBottom?.split('px')[0]*1){
        marginTotal.value += item.style.marginBottom.split('px')[0]*1
      }else {
        marginTotal.value += window.getComputedStyle(item)['margin-bottom'].split('px')[0]*1
      }
      sum.value += item.offsetHeight
    }
  })
  tableHeight.value = wrap?.value.offsetHeight - sum.value - tablePadding.value - marginTotal.value
  if(props.needPagination){
    tableHeight.value -= 60
  }
}
const search = (json: any) => {
  emits('search', json)
}
const reload = (json: any) => {
  emits('reload', json)
}

defineExpose({
  initHeight
})

onMounted(() => {
  nextTick(()=>{
    // console.log('props.wrap1', props.wrap)
    // initHeight()
  })
})

</script>


<style scoped lang="scss">
@import './index.scss';

</style>
