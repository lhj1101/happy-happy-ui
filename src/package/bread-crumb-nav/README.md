## 面包屑组件

> 引入
```
import breadCrumbNav from '@/components/bread-crumb-nav/index.vue'
```

> 使用
```
/**
 * 面包屑
 * @param showBack 显示返回按钮(默认否)
 * @param breadCrumbNavList 面包屑数据json(标题title，路由path)(可传可不传，不传需要路由需要父子关系参考/roleManager，不传暂时只支持2层路由)
 * @method backUpper 返回按钮方法
 */
<bread-crumb-nav :showBack="showBack" :breadCrumbNavList="breadCrumbNavList" @backUpper="backUpper" />

const showBack = ref<boolean>(false)
const breadCrumbNavList: breadCrumbNavListType[] = [
  {
    title: '功能角色管理',
    path: '/roleManager/userRoleManager',
  },
  {
    title: '新增角色管理',
    path: '',
  }
]
const backUpper = () => {
  // todo
}