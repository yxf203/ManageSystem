<template>
    <div class="look-bill">
        <ContentHeader content="查看采购单"></ContentHeader>
        <div class="query">
           <!-- 查询表单 -->
           <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="对应仓库">
                    <el-select
                    v-model="formInline.storeId"
                    filterable
                    clearable
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
                <el-form-item label="创建时间 从">
                    <el-date-picker
                        v-model="formInline.createTime"
                        type="daterange"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        :default-value="[new Date(), new Date()]"
                        value-format="YYYY-MM-DD"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getBillList()">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 内容表格 -->
        <el-table 
            :data="tableData" 
            :fit="true"
            style="width: 100%;height: calc(100vh - 350px);"
        >
            <!-- <el-table-column type="index" :index="indexMethod" width="80" label="序号" align="center"/> -->
            <el-table-column prop="id" label="订单编号" max-width="100" align="center"/>
            <el-table-column prop="cust" label="供应商" align="center"/>
            <el-table-column prop="phone" label="供应商电话" max-width="180" align="center"/>
            <el-table-column prop="address" label="供应商地址" max-width="180" align="center"/>
            <el-table-column prop="store" label="所属仓库" max-width="180" align="center"/>
            <!-- <el-table-column label="订单状态" max-width="150" align="center">
                <template #default="scope">
                    <p :class="scope.row.stateClass">{{ scope.row.stateName }}</p>
                </template>
            </el-table-column> -->
            <el-table-column prop="createTime" label="创建时间"  max-width="150" align="center"/>
            <el-table-column label="操作" min-width="150" align="center">
                <template #default="scope">
                    <el-button 
                        size="small" 
                        type="primary"
                        v-if="scope.row.state === 2"
                        @click="handleEdit(scope.$index, scope.row)">
                        审核
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 翻页器 -->
        <div class="pagination">
            <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 50, 100]"
            layout="tota;, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            >
            </el-pagination>
        </div>
            <!-- 采购单预览 -->
        <el-dialog v-model="previewBillVis" title="采购单预览" width="1100px">
            <div class="billPreview">
                <h2>采购单</h2>
                <p>单号：</p>
                <table width="1000px" class="tableStyle">
                    <tr class="consigneeLine">
                        <td :colspan="2">供应商名称:{{ billData.consigneeName }}</td>
                        <td :colspan="2">联系方式:{{ billData.phone }}</td>
                        <td :colspan="2">供应商地址:{{ billData.address }}</td>
                        <td :colspan="2">日期: {{ billData.createTime.slice(0,10) }}</td>
                    </tr>
                    <tr>
                        <th>序号</th>
                        <th>货品名称</th>
                        <th>包装规格</th>
                        <th>数量</th>
                        <th>进货价</th>
                        <th>金额</th>
                        <th>备注</th>
                    </tr>
                    <tr v-for="(item, index) in billData.billDetail">
                        <th>{{ index + 1 }}</th>
                        <th>{{ item.name }}</th>
                        <th>{{ item.decri }}</th>
                        <th>{{ item.number }}</th>
                        <th>{{ item.jhPri }}</th>
                        <th>{{ item.total.toFixed(2) }}</th>
                        <th>{{ item.notes }}</th>
                    </tr>
                    <tr>
                        <th :colspan="5" style="text-align: left;padding-left: 7px;">总金额（大写）：{{ charTotal }}</th>
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
                <el-button type="primary" @click="checkBill(3)">通过</el-button>
                <el-button type="danger" @click="checkBill(5)">拒绝</el-button>
                <el-button @click="previewBillVis = false">取消</el-button>
            </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
    import { ref, reactive, computed, watch } from 'vue'
    import { ElMessage, ElMessageBox, dayjs } from 'element-plus'
    import { digitUppercase } from "pixiu-number-toolkit";
    import ContentHeader from '../../../components/ContentHeader.vue';
    import baseAxios from '../../../api/baseAxios.js';
    import moment from 'moment';
    // 当前页数
    // 翻页器变量
    const currentPage = ref(1);
    const pageSize = ref(10);
    const total = ref(1);
    // 弹出框部分
    const dialogContent = ref("新增订单"); 

    // 新建编辑订单页面可见性
    const editGoodsDialogVisible = ref(false);
    const formInline = reactive({
        kind: null,
        state: null,
        custId: null,
        storeId: null,
        createTime: [null, null],
    })

    const custMap = {};
    const custOptions = ref([]);
    const custDetail = {};
    function getcustList(){
        baseAxios({
            url: '/custs/all',
            method: 'get',
        }).then(res => {
            console.log(res.data);
            if(res.data.code){
                let temp_data = res.data.data;
                temp_data.forEach(x => {
                    custOptions.value.push({
                        label: x.name,
                        value: x.id
                    });
                    custMap[x.id] = x.name;
                    custDetail[x.id] = x;
                })
            } else {
                ElMessage.error(res.data.msg);
            }
        }).catch(err => {
            console.log(err.message);
        })
    }
    getcustList();
    const goodsDetail = {};
    function getAllGoodsList(){
        baseAxios({
            url: '/goods/all',
            method: 'get',
        }).then(res => {
            console.log(res.data);
            if(res.data.code){
                let temp_data = res.data.data;
                temp_data.forEach(x => {
                    goodsDetail[x.id] = x;
                })
            } else {
                ElMessage.error(res.data.msg);
            }
        }).catch(err => {
            console.log(err.message);
        })
    }
    getAllGoodsList();
    const goodsList = ref([]);
    const idOptions = ref([]);
    const goodsOptions = ref(null);
    function getGoodsList(){
        baseAxios({
            url: '/goods/list',
            method: 'get',
            params: {
                storeId: billData.value.storeId
            }
        }).then(res => {
            console.log(res.data);
            if(res.data.code){
                idOptions.value = [];
                goodsList.value = res.data.data;
                let t_goodsOptions = goodsList.value.map(x => x.name);
                t_goodsOptions = t_goodsOptions.filter((item, index) => {
                    return t_goodsOptions.indexOf(item) === index;
                })
                t_goodsOptions = t_goodsOptions.map(x => ({value: x, label: x}));
                goodsOptions.value = t_goodsOptions;
                let temp_data = res.data.data;
                temp_data.forEach(x => {
                    idOptions.value.push({
                        label: x.id,
                        value: x.id
                    });
                })
            } else {
                ElMessage.error(res.data.msg);
            }
        }).catch(err => {
            console.log(err.message);
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
    // 获取所有采购单信息
    const tableData = ref([]);
    function getBillList(){
        if(formInline.createTime == null){
            formInline.createTime = [null, null];
        }
        let params = {
            page: currentPage.value,
            pageSize: pageSize.value,
            state: 2,
            storeId: formInline.storeId,
            custId: formInline.custId,
            begin: formInline.createTime[0],
            end: formInline.createTime[1],
        }
        console.log(params);
        baseAxios({
            url: '/slips/buy',
            method: 'get',
            params
        }).then(res => {
            console.log(res.data);
            tableData.value = res.data.data.rows;
            tableData.value.forEach(x => {
                x.cust = custDetail[x.custId].name;
                x.phone = custDetail[x.custId].phone;
                x.address = custDetail[x.custId].address;
                x.store = storeMap[x.storeId];
            });
            total.value = res.data.data.total;
        }).catch(err => {
            console.log(err.message);
        })
    }
    getBillList();

    // 订单信息
    const billData = ref({
        id: null,
        kind: null,
        storeId: null,
        custId: null,
        consigneeName: '',
        phone: '',
        address: '',
        billDetail: [],
    })
    
    function changeState(id, state, tip){
        baseAxios({
            url: '/slips',
            method: 'put',
            data: {
                id: id,
                state: state
            }
        }).then(res => {
            console.log(res.data);
            if(res.data.code){
                ElMessage.success(tip);
                getBillList();
            } else {
                ElMessage.error(res.data.msg);
            }
        })
    }
    // 处理订单的编辑
    const currentId = ref(null);
    // 处理采购单的编辑
    const handleEdit = (index, row) => {
        console.log(index, row)
        currentId.value = row.id;
        baseAxios({
            url: "/billDetails",
            method: 'get',
            params: {
                slipId: row.id,
            }
        }).then(res => {
            console.log("编辑采购单");
            console.log(res.data);
            billData.value = row;
            billData.value.billDetail = [];
            billData.value.consigneeName = custDetail[billData.value.custId].name;
            res.data.data.forEach(x => {
                let goodDetail = goodsDetail[x.goodId];
                let temp = {
                    ...x,
                    ...goodDetail
                }
                temp.id = x.id;
                // if(row.kind === 1) temp.singlePrice = goodDetail.pfPri;
                // else if(row.kind === 2) temp.singlePrice = goodDetail.lsPri;
                temp.total = Number(x.number) * Number(temp.jhPri);
                billData.value.billDetail.push(temp);
            });
            console.log("billData");
            console.log(billData.value);
            getGoodsList();
            dialogContent.value = "编辑采购单";
            previewBill();
            // form.value = res.data.data;
        }).catch(err => {
            console.log(err.message);
        })
    }
    
    // 审核采购单
    function checkBill(flag){
        changeState(currentId.value, flag, "审核完成！");
        previewBillVis.value = false;
        getBillList();
    }
    
    // 生成采购单预览
    const previewBillVis = ref(false);
    const totalMoney = ref(0);
    const charTotal = ref('');
    const previewBill = () => {
        previewBillVis.value = true;
        totalMoney.value = 0;
        billData.value.billDetail.forEach(x => totalMoney.value += x.total);
        totalMoney.value = totalMoney.value.toFixed(2);
        charTotal.value = digitUppercase(totalMoney.value);
    }

    // 翻页器
    const handleSizeChange = (val) => {
        console.log(`${val} items per page`)
        getBillList();
    }
    const handleCurrentChange = (val) => {
        console.log(`current page: ${val}`)
        getBillList();
    }
</script>

<style lang="scss" scoped>
.info-message {
    font-size: 18px;
    margin: 20px 20px 10px;
}
.look-bill {
    padding: 10px 0;
    box-sizing: border-box;
    .query {
        display: flex;
        height: 50px;
        margin-top: 0.5rem;
        align-items: center;
    }
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
.demo-form-inline {
    display: flex;
    padding-top: 20px;
}

.demo-form-inline .el-input {
    --el-input-width: 100px;
}

.demo-form-inline .el-select {
    --el-select-width: 100px;
}
// 采购单样式
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
.foot-pagination {
    position: absolute;
    bottom: 5px;
    right: 10px;
}
</style>