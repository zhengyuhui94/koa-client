// 左侧菜单栏依赖数据
export const data: any[] = [
    {
        key: '1',
        title: '商品管理',
        iconClass: 'report-stat',
        items: [
            {
                key: '1-1',
                text: '商品列表'
            },
            {
                key: '1-2',
                text: '商品分类'
            }
        ]
    },
    {
        key: '3',
        title: '订单管理',
        iconClass: 'report-stat'
    },
    {
        key: '2',
        title: '消息中心',
        iconClass: 'report-stat'
    }
];

// 跳转的路由 name 配置
export const nameMap: any = {
    '1': 'goodManage',
    '1-1': 'goodManageInfo',
    '1-2': 'goodManageCategory',
    '2': 'messageCenter',
    '3': 'orderManage'
};




