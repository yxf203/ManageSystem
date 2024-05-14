<template>
    <div class="check-bill">
        <ContentHeader content="库存盘点与统计"></ContentHeader>
        <div class="query">
            <!-- 查询表单 -->
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <!-- <el-form-item label="类型">
                    <el-select
                    v-model="formInline.kind"
                    filterable
                    clearable
                    placeholder="请选择"
                    style="width: 150px;"
                    >
                        <el-option
                        v-for="item in kindOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        />
                    </el-select>
                </el-form-item> -->
                <el-form-item label="所属仓库">
                    <el-select
                    v-model="formInline.storeId"
                    filterable
                    clearable
                    @change="handleSubmit"
                    placeholder="请选择"
                    style="width: 150px;"
                    >
                        <el-option
                        v-for="item in storeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <!-- <el-form-item>
                    <el-button type="primary" @click="handleSubmit">查询</el-button>
                </el-form-item> -->
            </el-form>
        </div>
        <p v-show="!formInline.storeId" class="tip">请选择仓库查看库存！</p>
        <div ref="main" class="graphSty" v-show="formInline.storeId"></div>
    </div>
</template>

<script setup>
import * as echarts from 'echarts';
import { ref, onMounted, computed, reactive } from 'vue';
import { useTableDataStore } from '../../../stores/tableData';
import ContentHeader from '../../../components/ContentHeader.vue';
import baseAxios from '../../../api/baseAxios';
// 横轴商品名
const data1 = ref([]);
// 纵轴商品数量
const data2 = ref([]);
// 获取仓库
const formInline = reactive({
    storeId: null,
})
function handleSubmit(){
    baseAxios({
        url: '/goods/list',
        method: 'get',
        params: {
            storeId: formInline.storeId,
        }
    }).then(res => {
        console.log(res.data);
        if(res.data.code){
            data1.value = [];
            data2.value = [];
            res.data.data.forEach(x => {
                data1.value.push(x.name + ' ' + x.decri);
                data2.value.push(x.storage);
            });
            init();
        }
    })
}
const storeOptions = ref([]);
let storeMap = {};
function getStoreList(){
    baseAxios({
        url: '/stores/all',
        method: 'get',
    }).then(res => {
        console.log(res.data);
        if(res.data.code){
            let temp_data = res.data.data;
            temp_data.forEach(x => {
                storeOptions.value.push({
                    label: x.name,
                    value: x.id
                });
                storeMap[x.id] = x.name;
            })
        } else {
            ElMessage.error(res.data.msg);
        }
    }).catch(err => {
        console.log(err.message);
    })
}
getStoreList();
const main = ref();
// const tableDataStore = useTableDataStore();
// const tableData = computed(() => tableDataStore.tableData);
// onMounted(() => {
//     init();
// })
function init(){
    let myChart = echarts.init(main.value);
    // let data = [];
    // let sale = [];
    // tableData.value.forEach(x => {
    //     if(x.sale > 0){
    //         data.push(x.name + ' ' + x.specification);
    //         sale.push(x.sale);
    //     }
    // })
    var option = {
        tooltip: {},
        legend: {
            data: ['库存']
        },
        xAxis: {
            data: data1.value,
        },
        yAxis: {},
        series: [
        {
            name: '库存',
            type: 'bar',
            data: data2.value,
        }
        ]
    };
    myChart.setOption(option);
}
</script>

<style lang="scss" scoped>

.check-bill {
    padding: 10px 0px;
    box-sizing: border-box;
    .query {
        display: flex;
        height: 50px;
        margin-top: 2rem;
        align-items: center;
    }
    .tip {
        display: flex;
        font: 700 3rem 'Microsoft YaHei';
        justify-content: center;
    }
    .title {
        padding: 10px 20px;
        font-size: 26px;
        font-weight: bold;
    }
    .graphSty {
        width: 100%;
        height: 400px;
    }
}
</style>