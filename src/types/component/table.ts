// UserTable 组件展示配置
// 行配置
export type Column = {
    title: string,
    key: string,
    style: any, // 表头样式
    cellStyle: any, // 单元格样式
    renderBody?: Function, // body 自定义标签
    renderHead?: Function // head 自定义标签
};

// render 参数
export type Params = {
    column: Column,
    columnIndex: number,
    row: any,
    rowIndex: number
};
