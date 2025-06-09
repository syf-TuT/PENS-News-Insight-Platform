<template>
    <div class="categorylist-box">
        <el-tabs v-model="activeTab" type="border-card">
            <el-tab-pane label="新闻类别统计" name="categoryCount">
                <div class="table-wrapper">
                    <el-table :data="categoryList" border stripe class="table-list">
                        <el-table-column prop="category" label="新闻类别" header-align="center" align="center"
                            min-width="200">
                        </el-table-column>
                        <el-table-column prop="count" label="新闻数量" header-align="center" align="center" min-width="200">
                        </el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
module.exports = {
    data() {
        return {
            activeTab: "categoryCount",
            categoryList: []
        };
    },
    mounted() {
        this.initCategoryList();
    },
    methods: {
        initCategoryList() {
            // 假设有个 newsApi.categoryCount() 方法返回 [{category: '社会', count: 12}, {category: '娱乐', count: 8}]
            newsApi.categoryCount().then(response => {
                this.categoryList = response;
            });
        }
    }
};
</script>

<style>
.categorylist-box {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    font-size: 16px;
}

.categorylist-box .table-wrapper {
    padding: 10px 10px 20px 10px;
}

.categorylist-box .table-list {
    width: 100%;
    font-size: 15px;
}
</style>
