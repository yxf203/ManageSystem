<template>
    <div class="check-bill">
        <div class="title">库存盘点与统计</div>
        <div class="filter">
            <!-- 搜索框 -->
            <el-form
                class="demo-form-inline"
                :inline="true"
                v-model="filterForm"
            >
                <el-form-item>
                    <el-input v-model="filterForm.goodsId" placeholder="货品编号" />
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filterForm.name" placeholder="货品名称" />
                </el-form-item>
                <el-form-item>
                    <el-select v-model="filterForm.status" clearable class="m-2" placeholder="出库数量" >
                        <el-option
                            v-for="item in ['大于0', '大于等于0']"
                            :key="item"
                            :label="item"
                            :value="item"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSearch">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>     
        <el-table 
            :data="currentPageData" 
            fit
            height="500px"
        >   
            <el-table-column type="index" width="80" label="序号" align="center"/>
            <el-table-column prop="goodsId" label="货品编号" max-width="180" align="center"/>
            <el-table-column prop="name" label="产品名称" max-width="180" align="center"/>
            <el-table-column prop="specification" label="包装规格" align="center"/>
            <el-table-column prop="price" label="单价" max-width="180" align="center"/>
            <el-table-column prop="repertory" label="当前库存量" max-width="180" align="center"/>
            <el-table-column prop="sale" label="今日出库" max-width="180" align="center"/>
            <el-table-column label="今日销量" max-width="180" align="center">
                <template #default="scope">
                    {{ scope.row.sale * scope.row.price }}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
    import { ref, reactive, computed } from 'vue'
    import { ElMessage, ElMessageBox, dayjs } from 'element-plus'
    // import { useBillListStore } from '../../../stores/billList';
    import { useTableDataStore } from '../../../stores/tableData';
    const tableDataStore = useTableDataStore();
    const filterForm = reactive({
        goodsId: '',
        name: '',
        status: '',
    })
    const goodsData = computed(() => tableDataStore.tableData);
    const currentPageData = ref([]);
    currentPageData.value = goodsData.value;
    // 查询
    const queryData = () => {
        currentPageData.value = goodsData.value.filter(item => {
            if (
                item.goodsId.includes(filterForm.goodsId) &&
                (item.name.includes(filterForm.name) || filterForm.name === '') 
            ) {
                if((filterForm.status === '大于0' && item.sale > 0) || filterForm.status === '大于等于0' || filterForm.status === '') return true;
            }
        })
    }
    // 查询按钮
    const handleSearch = () => {
        queryData();
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
    .filter {
        padding: 10px 20px 0;
        box-sizing: border-box;
    }

}
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

</style>