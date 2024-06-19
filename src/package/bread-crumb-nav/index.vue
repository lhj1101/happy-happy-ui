<script setup lang="ts">
import { defineProps, onMounted, reactive, nextTick, ref, defineEmits } from 'vue';
import type { PropType } from 'vue'
import type { breadCrumbNavListType, navListType } from './types'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
const route = useRoute()

let emit = defineEmits(['backUpper'])
const props = defineProps({
  showBack: {
    type: Boolean,
    default: () => false,
  },
  breadCrumbNavList:{
    type: Array as PropType<breadCrumbNavListType[]>,
    default: () => []
  }
})

const backUpper = () => {
  emit('backUpper')
}

// 根据路由生成
let arr = ref<navListType[]>([])

onMounted(()  => {
  nextTick(() => {
    if(route?.matched.length > 1){
      if(route?.matched[0]?.meta?.title==route?.matched[1]?.meta?.title){
        arr.value = [{
          title: route?.matched[1]?.meta?.title,
          path: route?.matched[1]?.path,
        }]
      }else{
        arr.value = [{
          title: route?.matched[0]?.meta?.title,
          path: route?.matched[0]?.path,
        },{
          title: route?.matched[1]?.meta?.title,
          path: route?.matched[1]?.path,
        }]
      }
    }else{
      arr.value = [{
        title: route?.matched[0]?.meta?.title,
        path: route?.matched[0]?.path,
      }]
    }
  })
  
})  

</script>

<template>
  <div class="breadCrumbNav">
    <el-button v-show="showBack" :icon="ArrowLeft" circle @click="backUpper"/>
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item
        v-for="(item, index) in breadCrumbNavList.length?breadCrumbNavList:arr"
        :key="index"
        :to="{ path: item.path }">
        {{item.title}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style scoped lang="scss">
.breadCrumbNav{
  display: flex;
  align-items: center;
  align-content: center;
  .el-breadcrumb{
    margin-left: 10px;
    font-size: 16px;
    :deep(.el-breadcrumb__item:nth-child(1)){
      .el-breadcrumb__inner{
        font-weight: 700;
        color: #000;
        font-size: 20px;
        margin-top: -2px;
      }
      .el-breadcrumb__inner:hover{
        font-weight: 700;
        color: #409eff;
        cursor: pointer;
      }
    }
  }
}

</style>
