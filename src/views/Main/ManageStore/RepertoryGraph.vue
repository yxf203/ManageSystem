<template>
    <div class="check-bill">
        <div class="title">库存盘点与统计(图像统计)</div>
        <div ref="main" class="graphSty"></div>
    </div>
</template>

<script setup>
import * as echarts from 'echarts';
import { ref, onMounted, computed } from 'vue';
import { useTableDataStore } from '../../../stores/tableData';
const main = ref();
const tableDataStore = useTableDataStore();
const tableData = computed(() => tableDataStore.tableData);
onMounted(() => {
    init();
})
function init(){
    let myChart = echarts.init(main.value);
    let data = [];
    let sale = [];
    tableData.value.forEach(x => {
        if(x.sale > 0){
            data.push(x.name + ' ' + x.specification);
            sale.push(x.sale);
        }
    })
    var option = {
        tooltip: {},
        legend: {
            data: ['销量']
        },
        xAxis: {
            data: data,
        },
        yAxis: {},
        series: [
        {
            name: '销量',
            type: 'bar',
            data: sale,
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