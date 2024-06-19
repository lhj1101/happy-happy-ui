<template>
  <div>
    <el-button class="btn">{{props.text}}</el-button>
  </div>
</template>


<script lang="ts">
export default {
  name: 'happy-button'
}
</script>

<script setup lang='ts'>
import { ref, reactive, defineOptions, defineProps } from 'vue'
const props = defineProps({
	text: {
    type: String,
    default: () => 'happy-button'
	}
})

</script>

<style scoped lang="scss">
.btn {
  color: red;
}
</style>
