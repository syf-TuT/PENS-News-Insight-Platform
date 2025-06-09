window.myrouter = {

    routes: [

        // 当访问根路径 `/` 时，加载 'stu/list.vue' 组件
        //{ path: '/', component: httpVueLoader('stu/list.vue') },

        { path: '/', component: httpVueLoader('news/AllNews.vue') },

        { path: '/stuMng/stuList', component: httpVueLoader('stu/list.vue') },
        { path: '/stuMng/createStu', component: httpVueLoader('stu/create.vue') },
        { path: '/News/AllNews', component: httpVueLoader('news/AllNews.vue') },
        { path: '/News/NewsLife', component: httpVueLoader('news/NewsLife.vue') },
        { path: '/News/NewsCategory', component: httpVueLoader('news/NewsCategory.vue') },
        { path: '/News/UserInterest', component: httpVueLoader('news/UserInterest.vue') },

    ],

    menuList: [

        //{
        //    title: '学生管理', path: '/stuMng', index: 'stuMng', icon: 'el-icon-s-order', children: [
        //        { title: '学生列表', path: '/stuMng/stuList', index: 'stuList', children: [], role: 1, },
        //        { title: '创建学生', path: '/stuMng/createStu', index: 'createStu', children: [], role: 1, },
        //    ], role: 1,
        //},
        {
            title: '新闻', path: '/News', index: 'News', icon: 'el-icon-s-order', children: [
                { title: '所有新闻', path: '/AllNews', index: 'AllNews', children: [], role: 1, },
                { title: '新闻生命周期', path: '/NewsLife', index: 'NewsLife', children: [], role: 1, },
                { title: '新闻类别统计', path: '/NewsCategory', index: 'NewsCategory', children: [], role: 1, },
                { title: '用户兴趣', path: '/UserInterest', index: 'UserInterest', children: [], role: 1, },
            ], role: 1,
        },

    ]
}
