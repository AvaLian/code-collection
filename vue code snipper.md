### 1、element-ui的table，切换路由后高度变小

描述：单页面组件中，用到element-ui的el-table组件。一开始进入这个包含这个组件的页面时，el-table渲染正常；当切换出去另一个路由再回来时，el-table的height和el-table_body-wrapper的height不一致，el-table_body-wrapper的height要比el-table的height减去el-table_header-wrapper的height的值还要小。

**解决方法1：** `定死表头的高度，body_wrapper使用calc来减去表头高度`
```css
.fixed-table{
    .el-table__header-wrapper{
        height: 48px;
    }
    .el-table__body-wrapper{
        height: calc(100% - 48px) !important;
    }
}
```
**解决方法2：** `更新表格数据后重载`
```js
this.$nextTick(() => {
     this.$refs.multipleTable.doLayout();
     // el-table加ref="multipleTable"
 });
```