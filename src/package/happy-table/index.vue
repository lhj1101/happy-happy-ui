<template>
	<div class="ce-table">
		<el-config-provider :locale="locale">
			<el-table
				:data="tableData"
				:height="tableHeight"
				style="width: 100%;"
				:header-cell-style="props.headerCellStyle"
				:cell-style="props.cellStyle"
				v-bind="$attrs"
			>
				<slot></slot>
			</el-table>
		</el-config-provider>
	</div>
</template>

<script lang="ts">
export default {
  name: 'happy-table'
}
</script>

<script setup lang="ts">
import { defineProps, defineEmits, PropType } from 'vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

const locale = zhCn
let emit = defineEmits(['handleSelectionChange'])

const props = defineProps({
	tableData:{
	//   type: Array as PropType<any[]>,
	type: Array,
	default: () => []
	},
	tableHeight: {
		type: [String, Number],
		default: () => '300px'
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
	}
})

console.log('props', props);
console.log('tableHeight', props.tableHeight);
console.log('tableData', props.tableData);


const handleSelectionChange = (e: number) => {
  emit('handleSelectionChange', e)
}

</script>

<style scoped lang="scss">
.el-table{
	transition: height 0.2s ease 0s;
}
</style>
