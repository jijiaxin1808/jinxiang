const menuConfig = [
    {
        title:"首页",
        url: "/manage/index",
        icon:"home"
    },
    {
        title:"功能",
        icon:"tool",
        children: [
            {
                title: "开屏页",
                url:""
            },
            {
                title: "热门搜索",
                url:""
            },
            {
                title: "轮播图",
                url:""
            },
            {
                title: "首页分类",
                url:""
            },
            {
                title: "全部分类",
                url:""
            },
            {
                title: "推送",
                url:""
            }
        ]
    },
    {
        title:"管理",
        icon:"appstore",
        children: [
            {
                title: "学校账户",
                url:""
            },
            {
                title: "题库",
                url:""
            },
            {
                title: "活动",
                url:""
            },
            {
                title: "用户",
                url:""
            }
        ]
    },
    {
        title:"美化",
        icon:"heart",
        url:"/beautify"
    },
    {
        title:"数据可视",
        icon:"table",
        children: [
            {
                title: "用户分析",
                url:""
            },
            {
                title: "功能分析",
                url:""
            },
            {
                title: "订单分析",
                url:""
            },
            {
                title: "活动分析",
                url:""
            }
        ]
    },


]

export default menuConfig;