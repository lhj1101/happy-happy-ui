## 图片显示组件

> 引入
```
import searchQuery from '@/components/search-query/index.vue'
import type { queryItem } from "@/components/search-query/search.class";

```

> 使用
```
/**
 * 图片显示
 * @param src 当前图片源地址
 * @param previewSrcList 图片预览数组
 * @param initialIndex 	初始预览图像索引
 */
<search-query
    :queryList="queryList"
    @changeTableHeight="changeTableHeight"
    @search="search"
    @reload="reload">
</search-query>

// 配置筛选项
const queryList:Array<queryItem> = reactive([
    {
      label:'姓名',value:'',type:'input', field: 'name1'
    },{
      label:'角色标签',value:'',type:'select',options:[{label:'部门1',value:'部门1'}], field: 'role'
    },{
      label:'日期',value:'',type:'datePicker', field: 'date1'
    },{
      label:'日期',value:[],type:'daterange', field: 'date2'
    },{
      label:'级联',value:[],type:'cascader' ,
      options:[
        {
          label:'部门1',
          value:'部门1', 
          children: [{label:'部门1-1',value:'部门1-1'},{label:'部门1-2',value:'部门1-2'}]
        }
      ], 
      props: {
        emitPath: false, 
        multiple: false, 
      },
      field: 'cascade'
    },{
      label:'姓名',value:'',type:'input', field: 'name2'
    },{
      label:'姓名',value:'',type:'input', field: 'name3'
    }
])

// 获取筛选值
const search = (json: any) => {
    console.log('search-json', json)
}
// 重置筛选值
const reload = (json: any) => {
    console.log('search-reload', json)
}

// 这是搭配table的，可以自行修改
const changeTableHeight = ()=>{
    sum.value = 0
    // 计算table容器table以外的高度
    main.value.childNodes.forEach((item:any) => {
      if(item.className && item.className != 'ce-table'){
        sum.value += item.clientHeight
      }
    })
    // 因为动画延迟0.2s
    setTimeout(() => {
      // table高度 = 容器高度-标题容器高度-筛选容器高度-table容器内的padding-table容器table以外的高度
      tableHeight.value = wrap.value.clientHeight - header.value.clientHeight - queryPartDom.value.clientHeight - 65 - sum.value
    }, 210);
}