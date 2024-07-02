# happy-ui

## 安装
```
npm install happy-happy-ui
```

## npm 地址
```
https://www.npmjs.com/package/happy-happy-ui
```

## 按钮
```
<happy-button :text="'happyui测试按钮'"></happy-button>
```

## 列表
```
<happy-table :tableData="tableData"></happy-table>
```

## 台账
```
<happy-parameter
  class="happyParameter"
  ref="ceTablePaginations"
  :queryList="queryList"
  :tableData="tableData"
  :tableLoading="tableLoading"
  :tableTitle="tableTitle"
  v-model:currentPage="pageContent.pageNumber"
  v-model:page-size="pageContent.pageSize"
  v-model:total="pageContent.totalRecord"
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange"
  @search="search"
  @reload="reload"
>
</happy-parameter>
```


