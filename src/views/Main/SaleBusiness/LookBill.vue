<template>
    <div class="look-bill">
        <div class="title">查看销售单</div>
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
                    <el-select v-model="filterForm.orderStatus" clearable class="m-2" placeholder="订单状态" >
                        <el-option
                            v-for="item in ['未提交', '待审核', '已拒绝']"
                            :key="item"
                            :label="item"
                            :value="item"
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
                    <el-button type="primary" @click="handleSearch">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="operate">
            <el-button type="primary" @click="createBill">新增订单</el-button>
            <el-button type="danger" @click="deleteGoods">删除订单</el-button>
        </div>
        <!-- 内容表格 -->
        <el-table 
            :data="currentPageData" 
            fit
        >
            <el-table-column type="selection" width="80" align="center" />
            <el-table-column type="index" :index="indexMethod" width="80" label="序号" align="center"/>
            <el-table-column prop="orderId" label="订单编号" max-width="180" align="center"/>
            <el-table-column prop="consigneeName" label="收货人" align="center"/>
            <el-table-column prop="telephone" label="收货人电话" max-width="180" align="center"/>
            <el-table-column prop="address" label="收货地址" max-width="180" align="center"/>
            <el-table-column label="订单状态" max-width="180" align="center">
                <template #default="scope">
                    <p :class="[ currentPageData[scope.$index].orderStatus === '未提交'? 'stateColor1' : (currentPageData[scope.$index].orderStatus === '待审核'?'stateColor2': 'stateColor3') ]">{{ currentPageData[scope.$index].orderStatus }}</p>
                </template>
            </el-table-column>
            <el-table-column prop="date" label="创建时间" max-width="180" align="center"/>
            <el-table-column label="操作" min-width="90" align="center">
                <template #default="scope">
                    <el-button 
                        v-if="scope.row.orderStatus === '未提交'"
                        size="small" 
                        type="primary"
                        @click="handleSumbit(scope.$index)">
                        提交
                    </el-button>
                    <el-button 
                        v-if="scope.row.orderStatus === '未提交' || scope.row.orderStatus === '已拒绝'"
                        size="small" 
                        type="warning"
                        @click="handleEdit(scope.$index, scope.row)">
                        {{ scope.row.orderStatus === '未提交'? '编辑': '修改' }}
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
        <!-- 分页器 -->
         <div class="pagination">
            <el-pagination background layout="prev, pager, next" :total="filterTableData.length" v-model:current-page="currentPage" @current-change="pageSizeChange" />
         </div>
        <!-- 新建/编辑订单内容 -->
        <el-dialog v-model="editGoodsDialogVisible" :title="billFlag === 0? '新建订单' :'编辑订单'" width="1000px" :close-on-click-modal="false" >
            <el-table :data="billDetail" style="width: 100%" max-height="500">
                <el-table-column fixed prop="goodsId" label="货品编号" width="150" />
                <el-table-column prop="name" label="货品名称" width="120" />
                <el-table-column prop="specification" label="包装规格" width="120" />
                <el-table-column prop="amount" label="数量" width="120" />
                <el-table-column prop="singlePrice" label="单价" width="120" />
                <el-table-column prop="total" label="金额" width="120" />
                <el-table-column prop="extra" label="备注" width="120" />
                <el-table-column fixed="right" label="操作" width="120">
                <template #default="scope">
                    <el-button link type="warning" size="small" @click="handleDelete(scope.$index)">删除</el-button>
                    <el-button link type="primary" size="small" @click="editGoods(scope.$index)">编辑</el-button>
                </template>
                </el-table-column>
            </el-table>
            <el-button class="mt-4" style="width: 100%" @click="onAddItem">新增货品</el-button>
            <!-- 收货人信息 -->
            <el-form class="billStyle">
                <el-form-item label="收货人姓名:">
                    <el-input v-model="consigneeName" />
                </el-form-item>
                <el-form-item label="收货人电话:">
                    <el-input v-model="telephone" />
                </el-form-item>
                <el-form-item label="收货地址:">
                    <el-input v-model="address" />
                </el-form-item>
            </el-form>
            <div class="billBtns">
                <p @click="previewBill">生成销售单预览</p>
                <div>
                    <el-button class="mt-4" type="primary" @click="onChangeItem">{{billFlag === 0? '创建' :'保存'}}</el-button>
                    <el-button class="mt-4" @click="editGoodsDialogVisible = false">取消</el-button>
                </div>
            </div>
        </el-dialog>
        <!-- 增加/编辑货品 -->
        <el-dialog v-model="addGoodsVis" :title="goodsFlag === 0? '新增货品': '编辑货品'" width="500px" :close-on-click-modal="false" >
            <el-form
                label-width="100px"
                style="max-width: 500px"
            >
                <el-form-item label="货品编号">
                    <el-select 
                    v-model="goodsForm.goodsId" 
                    class="m-2" 
                    placeholder="Select"
                    clearable
                    filterable
                    >
                        <el-option
                        v-for="item in goodsIdOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="货品名称">
                    <el-select 
                    v-model="goodsForm.name" 
                    class="m-2" 
                    placeholder="Select"
                    clearable
                    filterable
                    >
                        <el-option
                        v-for="item in goodsOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="包装规格">
                    <el-select 
                    v-model="goodsForm.specification" 
                    class="m-2" 
                    placeholder="Select"
                    clearable
                    filterable
                    >
                        <el-option
                        v-for="item in specificationOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="数量">
                    <el-input v-model="goodsForm.amount"></el-input>
                </el-form-item>
                <el-form-item label="单价">
                    <el-input disabled :value="goodsForm.singlePrice"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="goodsForm.extra"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">{{ goodsFlag === 0? '新增': '保存' }}</el-button>
                    <el-button @click="onCancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 销售单预览 -->
        <el-dialog v-model="previewBillVis" title="销售单预览" width="1100px">
            <div class="billPreview">
                <h2>销售单</h2>
                <p>单号：{{ billFlag === 0? billListStore.orderId : currentOrderId}}</p>
                <table width="1000px" class="tableStyle">
                    <tr class="consigneeLine">
                        <td :colspan="2">客户名称:{{ consigneeName }}</td>
                        <td :colspan="2">联系方式:{{ telephone }}</td>
                        <td :colspan="2">客户地址:{{ address }}</td>
                        <td :colspan="2">日期: {{ dayjs().format('YYYY-MM-DD') }}</td>
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
                    <tr v-for="(item, index) in billDetail">
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
        </el-dialog>
    </div>
</template>

<script setup>
    import { ref, reactive, computed, watch } from 'vue'
    import { ElMessage, ElMessageBox, dayjs } from 'element-plus'
    import { useBillListStore } from '../../../stores/billList';
    import { useTableDataStore } from '../../../stores/tableData';
    import { digitUppercase } from "pixiu-number-toolkit";
    let orderId = 1;
    let currentOrderId = 0;
    // 当前页数
    const currentPage = ref(1);
    // 新建编辑订单页面可见性
    const editGoodsDialogVisible = ref(false);
    // const editGoodsForm = ref({})
    const currentPageData = ref([])
    // const value = ref("");
    const filterForm = reactive({
        orderId: '',
        name: '',
        orderStatus: '',
        date: ''
    })
    // 订单新建/编辑模式 0为新增 1为编辑
    let billFlag = ref(0);
    // 记录当前订单内货品编辑是什么模式，goodsFlag 为0时为新增，为1时为编辑
    let goodsFlag = ref(0);
    let goodsIndex = 0;
    // 新增货品信息
        // 新增货品可见
    const addGoodsVis = ref(false);
    const goodsForm = ref({
        goodsId: '',
        name: '',
        specification: '',
        amount: '',
        singlePrice: '',
        extra: '',
    });
    // 订单信息
    const billListStore = useBillListStore();
    const billList = computed(() => billListStore.billList.filter(x => x.orderStatus !== '已通过'));
    // 查找信息
    const filterTableData = ref([])
    filterTableData.value = billList.value;
    currentPageData.value = filterTableData.value.slice(0,10);
    // 利用已有货品信息 获取选项列表
    const goodsListStore = useTableDataStore();
    const goodsList = computed(() => goodsListStore.tableData.filter(x => x.state === '已上架'));
    const goodsIdOptions = goodsList.value.map(x => ({value:x.goodsId, label:x.goodsId}));
    let goodsOptions = goodsList.value.map(x => x.name);
    goodsOptions = goodsOptions.filter((item, index) => {
        return goodsOptions.indexOf(item) === index;
    })
    goodsOptions = goodsOptions.map(x => ({value: x, label: x}));
    let specificationOptions = ref([]);
    // 实现缺省设计
    watch(() => goodsForm.value.goodsId, (goodsId) => {
        if(goodsId != ''){
            let temp = goodsList.value.filter(x => x.goodsId === goodsId);
            goodsForm.value.name = temp[0].name;
            goodsForm.value.specification = temp[0].specification;
            goodsForm.value.singlePrice = temp[0].price;
        } else {
            goodsForm.value.name = '';
            goodsForm.value.specification = '';
            goodsForm.value.singlePrice = '';
        }
    })
    watch(() => goodsForm.value.name, (name) => {
        if(name === ''){
            specificationOptions.value = [];
            goodsForm.value.goodsId = '';
        } else {
            let temp = goodsList.value.filter(x => x.name === name);
            specificationOptions.value = temp.map(x => ({value: x.specification, label: x.specification}));
        }
    })
    watch(() => goodsForm.value.specification, (specification) => {
        if(specification !== ''){
            let temp = goodsList.value.filter(x => x.name === goodsForm.value.name && x.specification === specification);
            goodsForm.value.goodsId = temp[0].goodsId;
        }
    })
    // 增加新增货品按钮
    const onSubmit = () => {
        let flag = true;
        for(let i = 0; i < goodsForm.value.amount.length; i++){
            if(!(goodsForm.value.amount[i] >= '0' && goodsForm.value.amount[i] <= '9')){
                flag = false;
                break;
            }
        }
        if(flag){
            if(goodsForm.value.goodsId === '') ElMessage.error("货品信息不可为空");
            else {
                if(!goodsForm.value.amount) ElMessage.error("数量不能为空");
                else if(parseInt(goodsForm.value.amount) === 0) ElMessage.error("数量不能为0");
                else {
                    goodsForm.value.amount = parseInt(goodsForm.value.amount)
                    goodsForm.value.total = goodsForm.value.singlePrice * goodsForm.value.amount;
                    let temp = Object.assign({}, goodsForm.value);
                    if(goodsFlag.value === 0) billDetail.value.push(temp);
                    else {
                        for(let key in goodsForm.value){
                            billDetail.value[goodsIndex][key] = goodsForm.value[key];
                        }
                    }
                    addGoodsVis.value = false;
                    for(let key in goodsForm.value){
                        goodsForm.value[key] = '';
                    }
                }
            }
        } else {
            ElMessage.error("输入的数量需要是整数格式");
        }
    }
    // 取消添加货品
    const onCancel = () => {
       addGoodsVis.value = false;
    }
    // const tableData = [
    //     {
    //         name: '可乐',
    //         specification: '500ml',
    //         price: '3.5',
    //         repertory: '99980',
    //         type: "原味",
    //         goodsId: '98562135451020',
    //         orderId: '77542135451020',
    //         date: '2023-10-20 18:08',
    //         orderStatus: '待审核'
    //     },
    // ]

    const billDetail = ref([]);
    // 收货人信息
    const consigneeName = ref('');
    const telephone = ref('');
    const address = ref('');
    // 处理序号
    const indexMethod = (index) => {
        return (currentPage.value - 1) * 10 + index + 1;
    }
    // 处理订单的提交
    const handleSumbit = (index) => {
        ElMessageBox.confirm( 
            '确认要提交吗？提交后将不能再修改',
            '提交订单',
            {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
        }).then(() => {
            billListStore.changeState(currentPageData.value[index].orderId);
            queryData();
            pageSizeChange();
            ElMessage.success("提交成功");
        })
    }
    // 处理订单的编辑
    const handleEdit = (index, row) => {
        billFlag.value = 1;
        currentOrderId = currentPageData.value[index].orderId;
        billDetail.value = currentPageData.value[index].billDetail;
        consigneeName.value = currentPageData.value[index].consigneeName;
        telephone.value = currentPageData.value[index].telephone;
        address.value = currentPageData.value[index].address;
        // editGoodsForm.value = row
        // editGoodsForm.value.index = index
        editGoodsDialogVisible.value = true
        // queryData();
        // pageSizeChange();
    }
    // 处理订单内货品的编辑
    const editGoods = (index) => {
        // goodsForm.value = billDetail.value[index];
        for(let key in goodsForm.value){
            goodsForm.value[key] = billDetail.value[index][key];
        }
        addGoodsVis.value = true;
        goodsFlag.value = 1;
        goodsIndex = index;

    }
    // 处理订单内货品的删除
    const handleDelete = (index) => {
        ElMessageBox.confirm(
            '确认要删除该订单？',
            '删除订单',
            {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            }
        ).then(() => {
            billDetail.value = billDetail.value.filter((x, i) => i !== index);
            // ElMessage.success("删除成功");
        })
    }
    // 创建订单
    const createBill = () => {
        billFlag.value = 0;
        editGoodsDialogVisible.value = true;
        billDetail.value = [];
        consigneeName.value = '';
        telephone.value = '';
        address.value = '';
    }

    const deleteGoods = (index) => {
        ElMessageBox.confirm(
            '确认要删除该订单？',
            '删除订单',
            {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            }
        ).then(() => {
            if (index || !isNaN(index)) {
                // filterTableData.value.splice(index, 1)
                // currentPageData.value = filterTableData.value.slice(0, 10)
                billListStore.deleteBill(currentPageData.value[index].orderId);
                ElMessage({
                    type: 'success',
                    message: '删除成功',
                })
                queryData();
                pageSizeChange();
            }
        }).catch(() => {
            ElMessage({
                type: 'info',
                message: '删除失败',
            })
        })
    }
    // const confirmEditGoods = () => {
    //     filterTableData.value.splice(editGoodsForm.value.index, 1, editGoodsForm.value)
    //     editGoodsDialogVisible.value = false
    // }
    function pageSizeChange(){
        currentPageData.value = filterTableData.value.slice((currentPage.value - 1) * 10, currentPage.value * 10)
    }
    const queryData = () => {
        filterTableData.value = billList.value.filter(item => {
            if (
                item.orderId.includes(filterForm.orderId) &&
                (item.consigneeName.includes(filterForm.name) || filterForm.name === '') &&
                (item.orderStatus === filterForm.orderStatus || filterForm.orderStatus === '') &&
                (item.date.includes(filterForm.date) || !filterForm.date)
            ) {
                return true;
            }
        })
    }
    const handleSearch = () => {
        queryData();
        currentPage.value = 1;
        pageSizeChange();
    }
    // filterTableData.value = tableData.value;
    // currentPageData.value = tableData.value.slice(0, 10)
    // 点击增加货品按钮
    const onAddItem = () => {
        addGoodsVis.value = true;
        goodsFlag.value = 0;//置为新增
        for(let key in goodsForm.value){
            goodsForm.value[key] = '';
        }
    }
    // 点击新增或者保存订单
    const onChangeItem = () => {
        if(consigneeName.value === '') ElMessage.error("收货人姓名不可为空");
        else if (telephone.value === '') ElMessage.error("收货人电话不可为空");
        else if(address === '') ElMessage.error("收货地址不可为空");
        else {
            let date = dayjs().format('YYYY-MM-DD HH:mm');
            let obj = {
                consigneeName: consigneeName.value,
                telephone: telephone.value,
                address: address.value,
                orderStatus: '未提交',
                date: date,
                billDetail: billDetail.value,
            }
            if(billFlag.value === 0){
                billListStore.createBill({...obj, orderId: billListStore.orderId.toString()});
                billListStore.changeOrderId();
                ElMessage.success("创建成功");
                editGoodsDialogVisible.value = false;
            } else {
                billListStore.changeBill(currentOrderId, {...obj, orderId: currentOrderId});
                ElMessage.success("保存成功");
                editGoodsDialogVisible.value = false;
            }
            queryData();
            pageSizeChange();
        }
    }
    // 生成销售单预览
    const previewBillVis = ref(false);
    const totalMoney = ref(0);
    const charTotal = ref('');
    const previewBill = () => {
        previewBillVis.value = true;
        totalMoney.value = 0;
        billDetail.value.forEach(x => totalMoney.value += x.total);
        totalMoney.value = totalMoney.value.toFixed(2);
        charTotal.value = digitUppercase(totalMoney.value);
    }
</script>

<style lang="scss" scoped>
.look-bill {
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
.billStyle {
    width: 50%;
    margin-top: 20px;
}
.billBtns {
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
        justify-self: flex-start;
        font: 400 18px 'Microsoft YaHei';
        color: #409EFF;
        text-decoration: underline;
        cursor: pointer;
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
.stateColor1 {
    color: #409EFF;
}
.stateColor2 {
    color: #E6A23C;
}
.stateColor3 {
    color: red;
}
</style>