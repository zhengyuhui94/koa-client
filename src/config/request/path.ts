let REQUEST_PATH: any = {
    'adminGetInfoById': '/admin/getInfoById',
    'adminLogin': '/admin/login',
    'messageUserList': '/admin/message/userList',
    'messageListById': '/admin/message/listById',
    'orderList': '/admin/order/list',
    'updateAvatar': '/admin/updateAvatar',
    'updateInfo': '/admin/updateInfo',
    'register': '/admin/register',
    'logout': '/admin/logout',
    'categoryDel': '/goodManage/category/del',
    'categoryList': '/goodManage/category/list',
    'categoryAdd': '/goodManage/category/add',
    'evaluateByGoodIdList': '/user/evaluate/queryByGoodId/list',
    'goodInfoAdd': '/goodManage/info/add',
    'categoryAllList': '/goodManage/category/allList',
    'goodInfoDel': '/goodManage/info/del',
    'goodInfoChangeStatu': '/goodManage/info/changeStatu',
    'goodInfoList': '/goodManage/info/list',
    'getMessageId': '/admin/message/getMessageId',
};

if(process.env.NODE_ENV === 'development'){
    for(let key in REQUEST_PATH){
        REQUEST_PATH[key] = `http://127.0.0.1:8081${REQUEST_PATH[key]}`;
    }
}else{
    for(let key in REQUEST_PATH){
        REQUEST_PATH[key] = `http://81.70.15.16:8081${REQUEST_PATH[key]}`;
    }
}

export default REQUEST_PATH;