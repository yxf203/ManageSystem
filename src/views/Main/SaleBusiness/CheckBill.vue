<template>
    <div class="check-bill">
        <div class="title">审核销售单</div>
        <div class="filter">
            <!-- 搜索框 -->
            <el-form
                class="demo-form-inline"
                :inline="true"
                v-model="filterForm"
            >
                <el-form-item>
                    <el-input v-model="filterForm.orderId" placeholder="订单编号" />
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filterForm.name" placeholder="收货人" />
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
                    <el-button type="primary" @click="handleSearch">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 内容表格 -->
        <el-table 
            :data="currentPageData" 
            fit
        >
            <!-- <el-table-column type="selection" width="80" align="center" /> -->
            <el-table-column type="index" :index="indexMethod" width="80" label="序号" align="center"/>
            <el-table-column prop="orderId" label="订单编号" max-width="180" align="center"/>
            <el-table-column prop="consigneeName" label="收货人" align="center"/>
            <el-table-column prop="telephone" label="收货人电话" max-width="180" align="center"/>
            <el-table-column prop="address" label="收货地址" max-width="180" align="center"/>

            <el-table-column prop="date" label="创建时间" max-width="180" align="center"/>
            <el-table-column label="操作" min-width="90" align="center">
                <template #default="scope">
                    <el-button 
                        size="small" 
                        type="primary"
                        @click="handleEdit(scope.$index)">
                        审核
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
         <div class="pagination">
            <el-pagination background layout="prev, pager, next" :total="filterTableData.length" v-model:current-page="currentPage" @current-change="pageSizeChange" />
         </div>
         <!-- 销售单 -->
         <el-dialog v-model="previewBillVis" title="销售单审核" width="1100px" :close-on-click-modal="false">
            <div class="billPreview">
                <h2>销售单</h2>
                <p>单号：{{ billDetail.orderId}}</p>
                <table width="1000px" class="tableStyle">
                    <tr class="consigneeLine">
                        <td :colspan="2">客户名称:{{ billDetail.consigneeName }}</td>
                        <td :colspan="2">联系方式:{{ billDetail.telephone }}</td>
                        <td :colspan="2">客户地址:{{ billDetail.address }}</td>
                        <td :colspan="2">日期: {{ billDetail.date.slice(0,10) }}</td>
                    </tr>
                    <tr>
                        <th>序号</th>
                        <th>货品编号</th>
                        <th>货品名称</th>
                        <th>包装规格</th>
                        <th>数量</th>
                        <th>单价</th>
                        <th>金额</th>
                        <th>备注</th>
                    </tr>
                    <tr v-for="(item, index) in billDetail.billDetail">
                        <th>{{ index + 1 }}</th>
                        <th>{{ item.goodsId }}</th>
                        <th>{{ item.name }}</th>
                        <th>{{ item.specification }}</th>
                        <th>{{ item.amount }}</th>
                        <th>{{ item.singlePrice }}</th>
                        <th>{{ item.total.toFixed(2) }}</th>
                        <th>{{ item.extra }}</th>
                    </tr>
                    <tr>
                        <th :colspan="6" style="text-align: left;padding-left: 7px;">总金额（大写）：{{ charTotal }}</th>
                        <th>{{ totalMoney }}</th>
                        <th></th>
                    </tr>
                    <tr style="text-align: left;">
                        <th :colspan="5" style="padding-left: 7px;">审核人：</th>
                        <th :colspan="3" style="padding-left: 7px;">审核日期：</th>
                    </tr>
                </table>
            </div>
            <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="checkBill(1)">通过</el-button>
                <el-button type="danger" @click="checkBill(0)">拒绝</el-button>
                <el-button @click="previewBillVis = false">取消</el-button>
            </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
    import { ref, reactive, computed } from 'vue'
    import { ElMessage, ElMessageBox, dayjs } from 'element-plus'
    import { useBillListStore } from '../../../stores/billList';
    import { digitUppercase } from "pixiu-number-toolkit";
    // 当前页数
    const currentPage = ref(1);
    // 搜索
    const filterForm = reactive({
        orderId: '',
        name: '',
        // orderStatus: '',
        date: ''
    })
    // 订单信息
    const billListStore = useBillListStore();
    const billList = computed(() => billListStore.billList.filter(x => x.orderStatus === '待审核'));
    // 查找信息
    const filterTableData = ref([])
    filterTableData.value = billList.value;
    const currentPageData = ref([]);
    currentPageData.value = filterTableData.value.slice(0,10);
    // 处理序号
    const indexMethod = (index) => {
        return (currentPage.value - 1) * 10 + index + 1;
    }
    // 页数改变更新数据
    function pageSizeChange(){
        currentPageData.value = filterTableData.value.slice((currentPage.value - 1) * 10, currentPage.value * 10)
    }
    // 查询
    const queryData = () => {
        filterTableData.value = billList.value.filter(item => {
            if (
                item.orderId.includes(filterForm.orderId) &&
                (item.consigneeName.includes(filterForm.name) || filterForm.name === '') &&
                (item.date.includes(filterForm.date) || !filterForm.date)
            ) {
                return true;
            }
        })
    }
    // 查询按钮
    const handleSearch = () => {
        queryData();
        currentPage.value = 1;
        pageSizeChange();
    }
    // 生成销售单预览
    const previewBillVis = ref(false);
    const totalMoney = ref(0);
    const charTotal = ref('');
    const billDetail = ref({});
    const currentId = ref(0);
    const handleEdit = (index) => {
        currentId.value = currentPageData.value[index].orderId;
        billDetail.value = currentPageData.value[index];
        previewBillVis.value = true;
        totalMoney.value = 0;
        billDetail.value.billDetail.forEach(x => totalMoney.value += x.total);
        totalMoney.value = totalMoney.value.toFixed(2);
        charTotal.value = digitUppercase(totalMoney.value);
    }
    // 审核销售单
    function checkBill(flag){
        billListStore.checkBill(currentId.value, flag);
        ElMessage.success("审核完成！");
        previewBillVis.value = false;
        queryData();
        pageSizeChange();
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
.demo-form-inline .el-input {
  --el-input-width: 220px;
}
// 销售单样式
.billPreview {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #000;
    font-size: 18px;
    padding: 20px 0 50px;
    border: 1px solid #000;border: 1px solid #000;
    p {
        align-self: flex-end;
        margin-right: 50px;
    }
    table {
        border-collapse: collapse;
        .consigneeLine {
            td {
                padding-left: 7px;
            }
        }
        th,
        td {
            border: 1px solid #000;
            border-collapse: collapse;
        }
    }
}
// 订单状态
// .stateColor1 {
//     color: #409EFF;
// }
// .stateColor2 {
//     color: #E6A23C;
// }
// .stateColor3 {
//     color: red;
// }
</style>