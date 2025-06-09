<template>
    <div class="user-interest-app">
        <header class="app-header">
            <h1>用户兴趣分析仪表板</h1>
            <p>输入用户ID进行搜索，下方展示该用户点击最多的4个新闻类别及数量。</p>
        </header>

        <section class="dashboard-container">
            <div class="search-section">
                <el-input v-model="searchKeyword" placeholder="请输入用户ID" clearable @clear="handleClear"
                    @keyup.enter.native="handleSearch" class="search-box">
                    <template #append>
                        <el-button icon="el-icon-search" @click="handleSearch" class="search-btn"></el-button>
                    </template>
                </el-input>
            </div>

            <div v-if="userInfo" class="user-info">
                <div class="avatar">{{ userInitial }}</div>
                <div class="user-details">
                    <div class="user-name">{{ userInfo.name }}</div>
                    <div class="user-stats">
                        <div class="stat-item">
                            <div class="stat-value">{{ userInfo.clickCount }}</div>
                            <div>总点击数</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">{{ userInfo.categoryCount }}</div>
                            <div>新闻类别数</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="chart-container" v-if="chartData.length">
                <div class="chart-title">用户兴趣柱状图</div>
                <div ref="chart" class="chart-wrapper"></div>
            </div>
        </section>
    </div>
</template>

<script>
const echarts = require('echarts')

module.exports = {
    data() {
        return {
            searchKeyword: '',
            userInfo: null,
            chartData: [],
            chartInstance: null
        }
    },
    computed: {
        userInitial() {
            if (!this.userInfo || !this.userInfo.name) return ''
            return this.userInfo.name.charAt(0).toUpperCase()
        }
    },
    watch: {
        chartData() {
            this.$nextTick(() => {
                this.drawChart()
            })
        }
    },
    methods: {
        handleSearch() {
            if (!this.searchKeyword) {
                this.$message.warning('请输入用户ID')
                return
            }

            // 模拟异步请求用户数据
            this.fetchUserData(this.searchKeyword)
        },
        handleClear() {
            this.userInfo = null
            this.chartData = []
            if (this.chartInstance) {
                this.chartInstance.clear()
            }
        },
        fetchUserData(userId) {
            // 这里你替换成真实的API请求
            // 这里是模拟数据
            const mockUserData = {
                id: userId,
                name: '张三',
                clickCount: 1580,
                categoryCount: 7,
                interests: [
                    { category: '体育', clicks: 520 },
                    { category: '娱乐', clicks: 430 },
                    { category: '科技', clicks: 370 },
                    { category: '财经', clicks: 260 }
                ]
            }

            // 模拟延时
            setTimeout(() => {
                this.userInfo = mockUserData
                this.chartData = mockUserData.interests
            }, 500)
        },
        drawChart() {
            if (!this.chartInstance) {
                this.chartInstance = echarts.init(this.$refs.chart)
            }

            const option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { type: 'shadow' }
                },
                xAxis: {
                    type: 'category',
                    data: this.chartData.map(item => item.category),
                    axisTick: { alignWithLabel: true }
                },
                yAxis: {
                    type: 'value',
                    name: '点击次数'
                },
                series: [
                    {
                        name: '点击次数',
                        type: 'bar',
                        data: this.chartData.map(item => item.clicks),
                        itemStyle: {
                            color: '#409EFF' // Element UI 主色调
                        }
                    }
                ]
            }

            this.chartInstance.setOption(option)
        }
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Helvetica Neue', Arial, sans-serif;
}

.search-btn .el-icon-search {
    position: relative;
    top: 18px;
    /* 往下移动2px，按需调整 */
}

.user-interest-app {
    max-width: 1200px;
    margin: 0 auto;
}

.app-header {
    text-align: center;
    margin-bottom: 30px;
    padding: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.app-header h1 {
    color: #2c3e50;
    font-size: 2.5rem;
    margin-bottom: 10px;
    background: linear-gradient(90deg, #3498db, #2c3e50);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

.app-header p {
    color: #7f8c8d;
    font-size: 1.1rem;
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.6;
}

.dashboard-container {
    background: white;
    border-radius: 12px;
    box-shadow: 0 6px 30px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    padding: 25px;
}

.search-section {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    position: relative;
}

.search-box {
    width: 100%;
    max-width: 600px;
    display: flex;
    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.2);
    border-radius: 30px;
    overflow: hidden;
}

.search-box .el-input {
    flex: 1;
}

.search-box .el-input__inner {
    height: 50px;
    border: none;
    padding: 0 25px;
    font-size: 16px;
    border-radius: 30px 0 0 30px;
}

.search-box .el-input-group__append {
    background: #3498db;
    border: none;
    border-radius: 0 30px 30px 0;
    padding: 0 25px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.search-box .el-input-group__append:hover {
    background: #2980b9;
}

.search-box .el-button {
    color: white;
    font-size: 18px;
}

.chart-container {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    padding: 20px;
    transition: all 0.3s ease;
}

.chart-container:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.chart-title {
    text-align: center;
    font-size: 1.4rem;
    color: #2c3e50;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 2px solid #f0f5f9;
    position: relative;
}

.chart-title::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, #3498db, #2ecc71);
    border-radius: 3px;
}

.chart-wrapper {
    height: 400px;
    width: 100%;
}

.user-info {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
    padding: 15px;
    background: #f8fafc;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
}

.avatar {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: linear-gradient(135deg, #3498db, #2ecc71);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 28px;
    font-weight: bold;
    margin-right: 20px;
}

.user-details {
    flex: 1;
}

.user-name {
    font-size: 1.5rem;
    color: #2c3e50;
    margin-bottom: 5px;
}

.user-stats {
    display: flex;
    gap: 20px;
}

.stat-item {
    text-align: center;
    padding: 10px 15px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.stat-value {
    font-size: 1.3rem;
    font-weight: bold;
    color: #3498db;
}
</style>
