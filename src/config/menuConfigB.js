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
                title: "热门搜索",
                url:"/manage/trending"
            },
            {
                title: "轮播图",
                url:"/manage/carousel"
            }
        ]
    },
    {
        title:"管理",
        icon:"appstore",
        children: [
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
        title: "个人中心",
        icon: "user",
        url: "/manage/user"
    },
]

export default menuConfig;