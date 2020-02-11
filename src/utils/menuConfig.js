const menuConfig = [
    {
        title:"首页",
        url: "/manage/home",
        icon:"home"
    },
    {
        title:"功能",
        icon:"tool",
        children: [
            {
                title: "开屏页",
                url:"/manage/openPage"
            },
            {
                title: "热门搜索",
                url:"/manage/hotSearch"
            },
            {
                title: "轮播图",
                url:"/manage/carousel"
            },
            {
                title: "首页分类",
                url:"/manage/indexSort"
            },
            {
                title: "全部分类",
                url:"/manage/allSort"
            },
            {
                title: "推送",
                url:"/manage/push"
            }
        ]
    },
    {
        title:"管理",
        icon:"appstore",
        children: [
            {
                title: "学校账户",
                url:"/manage/schoolA"
            },
            {
                title: "题库",
                url:"/manage/qustionBank"
            },
            {
                title: "活动",
                url:"/manage/activity"
            },
            {
                title: "用户",
                url:"/manage/users"
            }
        ]
    },
    {
        title:"美化",
        icon:"heart",
        url:"/manage/beautify"
    },
    {
        title:"数据可视",
        icon:"table",
        children: [
            {
                title: "用户分析",
                url:"/manage/usersAnalysis"
            },
            {
                title: "功能分析",
                url:"/manage/functionAnalysis"
            },
            {
                title: "订单分析",
                url:"/manage/orderAnalysis"
            },
            {
                title: "活动分析",
                url:"/manage/activityAnalysis"
            }
        ]
    },
    {
        title: "个人中心",
        icon: "user",
        url: "/manage/user"
    },


]

export default menuConfig;