<template>
    <div class="newsLifeCycle-box">

        <!-- 搜索框 -->
        <el-input v-model="searchKeyword" placeholder="请输入新闻ID" clearable @clear="handleClear"
            @keyup.enter.native="handleSearch" style="width: 300px; margin-bottom: 15px;">
            <template #append>
                <el-button icon="el-icon-search" @click="handleSearch"></el-button>
            </template>
        </el-input>

        <el-tabs v-model="activeTab" type="border-card">
            <el-tab-pane label="新闻生命周期分析" name="lifeCycle">
                <div class="chart-wrapper">
                    <div id="lifeCycleChart" style="width: 100%; height: 400px;"></div>
                </div>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
module.exports = {
    data() {
        return {
            activeTab: 'lifeCycle',
            chartInstance: null,
            searchKeyword: '', // 搜索关键词
        }
    },
    mounted() {
        this.initChart()
    },
    methods: {
        initChart() {
            this.chartInstance = echarts.init(document.getElementById('lifeCycleChart'))
            const option = {
                title: {
                    text: '新闻生命周期曲线',
                    left: 'center',     // 标题居中（可选）
                    top: 10             // 距离上方 10px，可调大点让下面多留空
                },
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    top: 100,   // 数值越大，图表越往下，跟 title.top 配合调节间距
                    left: '10%',
                    right: '10%',
                    bottom: '10%'
                },
                xAxis: {
                    name: '时间',
                    type: 'category',
                    data: ['10:00', '12:00', '14:00', '16:00', '18:00']
                },
                yAxis: {
                    name: '点击量',
                    type: 'value'
                },
                series: [
                    {
                        name: '点击量',
                        type: 'line',
                        data: [120, 200, 150, 80, 70]
                    }
                ]
            }
            this.chartInstance.setOption(option)
        },
        handleSearch() {
            console.log('搜索关键词:', this.searchKeyword)
            // 这里写你搜索逻辑，比如刷新图表数据，调用接口等
        },
        handleClear() {
            console.log('搜索框清空了')
            // 清空后处理逻辑
        }
    }
}
</script>

<style>
.newsLifeCycle-box {
    padding: 10px;
}

.chart-wrapper {
    padding: 20px;
}
</style>
