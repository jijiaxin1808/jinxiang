# jinxiang
近享app的后台管理系统(参加大创作品) 后期会部署上线  
### 需求
* 三级权限, 根据不同权限展示不同的页面, 路由级权限验证.
* 配置app的开屏页、轮播图、主题等app配置
* app的热门搜索管理、推送(富文本编辑器)、以及账号管理等
* 数据分析、使用图表展示app使用数据
### bug
* 使用react.lazy后出现闪屏(因为异步加载速度很快)(使用async实现了一个sleep函数 在Loading中先sleep一波)
* antd中tabs初始化时请求了数据, 但是相同tabs下的页面修改了这个数据, 也不会触发更新数据(使用eventemmit解决)
* 因为用了antd?所以说感觉没什么可以拆的组件(觉得可以优化一波)
* 上线后可能会有未知bug
* 富文本编辑器无法复制从word中复制内容发布,不支持emoji(未解决)

### 依赖
* ui框架: dvajs & React:antd 4.0
* 路由: React-router4
* 状态管理: React & React Hooks
* JS: ES6+
* 样式: less
* 网络请求: axios
* 打包构建: roadhog
* 包管理: yarn

### 应用到的jjx的新技术
* react.lazy路由级别懒加载
* roadhog配置了hash+ejs(太懒了) 优化了浏览器缓存
* 配置了主题(dvajs好像只能支持less)
* 使用eventemitt来处理bug
* 实现了一个privateRoute

### 期待
* 实现项目自动打包上线-可能会学着做一个cli
* 使用高阶组件优化一波
* 陆续更新到antd4.0
* 学会docker, 学了一次后面一步到位




