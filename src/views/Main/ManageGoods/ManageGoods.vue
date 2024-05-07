<template>
    <div class="manage-goods">
        <div class="title">货品管理</div>
        <!-- 搜索框 -->
        <div class="filter">
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
                    <el-select v-model="filterForm.state" clearable placeholder="选择状态">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-date-picker
                        v-model="filterForm.date"
                        value-format="YYYY-MM-DD"
                        type="date"
                        placeholder="创建日期"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button @click="toQuery" type="primary">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="operate">
            <el-button type="primary" @click="addGoodsDialogVisible = true">新增货品</el-button>
            <el-button type="danger" @click="deleteGoods">删除货品</el-button>
        </div>
        <!-- 当前页面的数据 -->
        <el-table 
            :data="currentPageData" 
            fit
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="40" align="center" />
            <el-table-column prop="goodsId" label="货品编号" max-width="180" align="center" />
            <el-table-column prop="name" label="货品名称" align="center" />
            <el-table-column prop="specification" label="包装规格" max-width="180" align="center" />
            <el-table-column prop="repertory" label="库存" max-width="180" align="center"/>
            <el-table-column prop="price" label="单价" max-width="100" align="center"/>
            <el-table-column label="货品状态" max-width="180" align="center">
                <template #default="scope">
                    <p :class="[ currentPageData[scope.$index].state === '已上架'? 'stateColor1' : 'stateColor2' ]">{{ currentPageData[scope.$index].state }}</p>
                </template>
            </el-table-column>
            <el-table-column prop="date" label="创建时间" max-width="180" align="center" />
            <el-table-column label="操作" min-width="150" align="center">
                <template #default="scope" class="opStyle">
                    <el-button 
                        size="small" 
                        type="primary"
                        @click="handleState(scope.$index)">
                        {{ currentPageData[scope.$index].state === '已上架'? '下架': '上架' }}
                    </el-button>
                    <el-button 
                        size="small" 
                        type="warning"
                        @click="handleEdit(scope.$index, scope.row)">
                        编辑
                    </el-button>
                    <el-button
                        size="small"
                        type="danger"
                        @click="deleteGoods(scope.$index)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 翻页器 -->
         <div class="pagination">
            <el-pagination background layout="prev, pager, next" :total="filterTableData.length" v-model:current-page="currentPage" @current-change="pageSizeChange" />
         </div>
         <!-- 新增货品 -->
        <el-dialog v-model="addGoodsDialogVisible" title="新增货品" width="500px">
            <el-form v-model="addGoodsForm" class="demo-form-inline" label-width="100px" >
                <el-form-item label="货品名称">
                    <el-input v-model="addGoodsForm.name"/>
                </el-form-item>
                <el-form-item label="货品编号">
                    <el-input v-model="addGoodsForm.goodsId"/>
                </el-form-item>
                <el-form-item label="规格">
                    <el-input v-model="addGoodsForm.specification"/>
                </el-form-item>
                <el-form-item label="库存">
                    <el-input v-model="addGoodsForm.repertory"/>
                </el-form-item>
                <el-form-item label="单价">
                    <el-input v-model="addGoodsForm.price" />
                </el-form-item>
            </el-form>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="addGoodsDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="addGoods">确认</el-button>
            </span>
            </template>
        </el-dialog>
        <!-- 编辑货品 -->
        <el-dialog v-model="editGoodsDialogVisible" title="编辑货品" width="500px">
            <el-form v-model="editGoodsForm" class="demo-form-inline" label-width="100px" >
                <el-form-item label="货品名称">
                    <el-input v-model="editGoodsForm.name"/>
                </el-form-item>
                <el-form-item label="货品编号">
                    <el-input v-model="editGoodsForm.goodsId"/>
                </el-form-item>
                <el-form-item label="规格">
                    <el-input v-model="editGoodsForm.specification"/>
                </el-form-item>
                <el-form-item label="库存">
                    <el-input v-model="editGoodsForm.repertory"/>
                </el-form-item>
                <el-form-item label="单价">
                    <el-input v-model="editGoodsForm.price" />
                </el-form-item>
            </el-form>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="editGoodsDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="confirmEditGoods">确认</el-button>
            </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
    import { ref, reactive, computed } from 'vue'
    import { ElMessage, ElMessageBox, dayjs } from 'element-plus'
    import { useTableDataStore } from '../../../stores/tableData.js';
    const addGoodsDialogVisible = ref(false);
    const editGoodsDialogVisible = ref(false);
    const addGoodsForm = ref({})
    const editGoodsForm = ref({})
    const currentPageData = ref([])
    const filterForm = reactive({
        goodsId: '',
        name: '',
        date: '',
        price: 0,
        state: '',
    })
    const options = [
        {
            value: '已上架',
            label: '已上架',
        },
        {
            value: '未上架',
            label: '未上架',
        }
    ]
    const filterTableData = ref([])
    const currentPage = ref(1);
    const tableDataStore = useTableDataStore();
    const tableData = computed(() => tableDataStore.tableData);
    filterTableData.value = tableData.value;
    currentPageData.value = tableData.value.slice(0, 10)
    const handleEdit = (index, row) => {
        editGoodsForm.value = row
        editGoodsForm.value.index = index
        editGoodsDialogVisible.value = true
    }
    // 处理上架下架
    const handleState = (index) => {
        let tip = currentPageData.value[index].state === '已上架'? '下架': '上架';
        ElMessageBox.confirm(
            '确认' + tip + '吗？',
            tip + '货品',
            {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'info',
            }
        ).then(() => {
            tableDataStore.changeState(currentPageData.value[index].goodsId);
            queryData();
            pageSizeChange(currentPage.value);
            ElMessage({
                type: 'success',
                message: tip + '成功',
            })
        })
    }
    const deleteGoods = (index) => {
        ElMessageBox.confirm(
            '确认要删除该货品？',
            '删除货品',
            {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            }
        ).then(() => {
            if (index || !isNaN(index)) {
                // filterTableData.value.splice(index, 1)
                // currentPageData.value = filterTableData.value.slice(0, 10)
                tableDataStore.deleteGoods(currentPageData.value[index].goodsId);
                queryData();
                pageSizeChange(currentPage.value);
            }
            ElMessage({
                type: 'success',
                message: '删除成功',
            })
        }).catch(() => {
            ElMessage({
                type: 'info',
                message: '删除失败',
            })
        })
    }
    const addGoods = () => {
        addGoodsForm.value.date = dayjs().format('YYYY-MM-DD HH:mm');
        addGoodsForm.value.state = '未上架';
        addGoodsForm.value.price = parseFloat(addGoodsForm.value.price);
        addGoodsForm.value.repertory = parseInt(addGoodsForm.value.repertory);
        addGoodsForm.value.sale = 0;
        tableDataStore.addGoods(addGoodsForm.value);
        ElMessage({
                type: 'success',
                message: '添加成功',
        })
        addGoodsForm.value = {}
        queryData();
        pageSizeChange(currentPage.value);
        addGoodsDialogVisible.value = false
    }
    const confirmEditGoods = () => {
        filterTableData.value.splice(editGoodsForm.value.index, 1, editGoodsForm.value)
        editGoodsDialogVisible.value = false
    }
    const pageSizeChange = (pageSize) => {
        currentPageData.value = filterTableData.value.slice((pageSize - 1) * 10, pageSize * 10)
    }
    const queryData = () => {
        filterTableData.value = tableData.value.filter(item => {
            if (
                item.goodsId.includes(filterForm.goodsId) &&
                (item.name.includes(filterForm.name) || filterForm.name === '') &&
                (item.state === filterForm.state || filterForm.state === '')&&
                (item.date.includes(filterForm.date) || !filterForm.date)
            ) {
                return true;
            }
        })
    }
    // 点击查询按钮
    const toQuery = () => {
        queryData();
        currentPage.value = 1;
        currentPageData.value = filterTableData.value.slice(0, 10);
    }

</script>

<style lang="scss" scoped>
.manage-goods {
    padding: 10px 0;
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
    .operate {
        padding: 10px 20px;
        box-sizing: border-box;
    }
    .pagination {
        display: flex;
        justify-content: right;
        padding: 20px 20px 10px;
        box-sizing: border-box;
    }
}
.stateColor1 {
    color: green;
}
.stateColor2 {
    color: red;
}
.opStyle{
    display: flex;
}
.demo-form-inline .el-input {
  --el-input-width: 220px;
}
</style>