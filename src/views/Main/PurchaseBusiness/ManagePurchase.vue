<template>
    <!-- 批量删除确认框 -->
    <el-dialog
        v-model="dialogBatchVisible"
        width="500"
    >
        <ContentHeader content="批量删除采购单"></ContentHeader>
        <div class="info-message">您确定要批量删除这些采购单的信息吗 ?</div>
        <template #footer>
        <div class="dialog-footer">
            <el-button type="primary" @click="confirmDelete(1)">
                确定
            </el-button>
            <el-button @click="dialogBatchVisible = false">取消</el-button>
        </div>
        </template>
    </el-dialog>
    <!-- 删除确认框 -->
    <el-dialog
        v-model="dialogVisible"
        width="500"
    >
        <ContentHeader content="删除采购单"></ContentHeader>
        <div class="info-message">您确定要删除该采购单的信息吗 ?</div>
        <template #footer>
        <div class="dialog-footer">
            <el-button type="primary" @click="confirmDelete(0)">
                确定
            </el-button>
            <el-button @click="dialogVisible = false">取消</el-button>

        </div>
        </template>
    </el-dialog>
    <!-- 增加/编辑货品 -->
    <el-dialog v-model="addGoodsVis" width="500">
    <ContentHeader :content="dialogContent"></ContentHeader>
    <el-form :model="goodsForm" style="margin-top: 15px;" ref="ruleFormRef" :rules="rules">
        <el-form-item label="货品名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="goodsForm.name" placeholder="请输入货品名称" style="width: 280px;"/>
        </el-form-item>
        <!-- <el-form-item label="货品编号" :label-width="formLabelWidth" prop="goodsId">
            <el-input v-model="form.id" placeholder="请输入货品编号" style="width: 280px;" />
        </el-form-item> -->
        <el-form-item label="包装规格" :label-width="formLabelWidth" prop="decri">
            <el-input v-model="goodsForm.decri" placeholder="请输入货品规格" style="width: 280px;" />
        </el-form-item>
        <el-form-item label="进货价" :label-width="formLabelWidth" prop="jhPri">
            <el-input v-model="goodsForm.jhPri" placeholder="请输入货品进货单价" style="width: 280px;" />
        </el-form-item>
        <!-- <el-form-item label="批发价" :label-width="formLabelWidth" prop="pfPri">
            <el-input v-model="goodsForm.pfPri" placeholder="请输入货品批发单价" style="width: 280px;"  />
        </el-form-item>
        <el-form-item label="零售价" :label-width="formLabelWidth" prop="lsPri">
            <el-input v-model="goodsForm.lsPri" placeholder="请输入货品零售单价" style="width: 280px;" />
        </el-form-item> -->
        <el-form-item label="数量" :label-width="formLabelWidth" prop="storage">
            <el-input v-model="goodsForm.storage" placeholder="请输入进货数目" style="width: 280px;" />
        </el-form-item>
    </el-form>
    <template #footer>
    <div class="dialog-footer">
        <el-button type="primary" @click="handleSave(ruleFormRef)">
        保存
        </el-button>
        <el-button @click="addGoodsVis = false">取消</el-button>
    </div>
    </template>
</el-dialog>
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
                <el-form-item label="状态">
                    <el-select
                    v-model="formInline.state"
                    filterable
                    clearable
                    placeholder="请选择"
                    style="width: 150px;"
                    >
                        <el-option
                        v-for="item in stateOptions"
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
        <div class="operate">
            <el-button type="primary" @click="createBill">+ 新增采购单</el-button>
            <el-button type="danger" @click="handleBatchDel">- 批量删除</el-button>
        </div>
        <!-- 内容表格 -->
        <el-table 
            :data="tableData" 
            :fit="true"
            style="width: 100%;height: calc(100vh - 350px);"
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="80" align="center" />
            <!-- <el-table-column type="index" :index="indexMethod" width="80" label="序号" align="center"/> -->
            <el-table-column prop="id" label="采购单编号" max-width="100" align="center"/>
            <el-table-column prop="cust" label="供应商" align="center"/>
            <el-table-column prop="phone" label="供应商电话" max-width="180" align="center"/>
            <el-table-column prop="address" label="收货地址" max-width="180" align="center"/>
            <el-table-column prop="kindName" label="类型" max-width="180" align="center"/>
            <el-table-column prop="store" label="所属仓库" max-width="180" align="center"/>
            <el-table-column label="采购单状态" max-width="150" align="center">
                <template #default="scope">
                    <p :class="scope.row.stateClass">{{ scope.row.stateName }}</p>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" max-width="150" align="center"/>
            <el-table-column label="操作" min-width="150" align="center">
                <template #default="scope">
                    <el-button 
                        v-if="scope.row.state === 3"
                        size="small" 
                        type="warning"
                        @click="handleEdit(scope.$index, scope.row)">
                        编辑
                    </el-button>
                    <el-button 
                        size="small" 
                        type="primary"
                        v-if="scope.row.state === 3 || scope.row.state === 4 || scope.row.state === 6"
                        @click="handleEdit(scope.$index, scope.row, 1)">
                        查看
                    </el-button>
                    <el-button 
                        size="small" 
                        type="warning"
                        v-if="scope.row.state === 3"
                        @click="handlePay(scope.$index, scope.row)">
                        采购付款
                    </el-button>
                    <el-button
                        size="small"
                        type="danger"
                        v-if="scope.row.state != 4 && scope.row.state != 5"
                        @click="handleDelete(scope.$index, scope.row)">
                        删除
                    </el-button>
                    <el-button 
                        size="small" 
                        type="danger"
                        v-if="scope.row.state === 4"
                        @click="handleRefund(scope.$index, scope.row)">
                        退货
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
        <!-- 新建/编辑采购单内容 -->
        <el-dialog v-model="editGoodsDialogVisible" :title="dialogContent" width="1000px" :close-on-click-modal="false" >
            <el-table :data="billData.billDetail" style="width: 100%" max-height="500">
                <el-table-column fixed prop="goodId" label="货品编号" width="100"  align="center" />
                <el-table-column prop="name" label="货品名称" width="120"  align="center"/>
                <el-table-column prop="decri" label="包装规格" width="120"  align="center"/>
                <el-table-column prop="number" label="数量" width="120" align="center" />
                <el-table-column prop="singlePrice" label="进货价" width="120" align="center" />
                <el-table-column prop="total" label="金额" width="120" :formatter="totalFormatter" align="center" />
                <el-table-column prop="notes" label="备注" width="120" align="center" />
                <el-table-column fixed="right" label="操作" width="120" align="center">
                <template #default="scope">
                    <el-button link type="warning" size="small" @click="handleDeleteGoods(scope.$index)">删除</el-button>
                    <el-button link type="primary" size="small" @click="editGoods(scope.$index)">编辑</el-button>
                </template>
                </el-table-column>
            </el-table>
            <el-button class="mt-4" style="width: 100%" @click="onAddItem" >新增货品</el-button>
            
            <!-- 采购单信息 -->
            <el-form class="billStyle">
                <el-form-item label="所属仓库">
                    <el-select
                    v-model="billData.storeId"
                    filterable
                    clearable
                    @change="updateStore"
                    placeholder="请选择所属仓库"
                    style="width: 200px;"
                    >
                        <el-option
                        v-for="item in storeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="供应商">
                    <el-select
                    v-model="billData.custId"
                    filterable
                    clearable
                    :disabled="billData.storeId === null || billData.storeId === ''"
                    @change="updateDetail"
                    placeholder="请选择"
                    style="width: 200px;"
                    >
                        <el-option
                        v-for="item in custOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="供应商电话:">
                    <el-input v-model="billData.phone" :disabled="true" />
                </el-form-item>
                <el-form-item label="收货地址:">
                    <el-input v-model="billData.address" :disabled="true"/>
                </el-form-item>
            </el-form>
            <div class="billBtns">
                <p @click="previewBill">生成采购单预览</p>
                <div>
                    <el-button class="mt-4" type="primary" @click="onChangeItem">{{dialogContent == "新增采购单"? '创建' :'保存'}}</el-button>
                    <el-button class="mt-4" @click="editGoodsDialogVisible = false">取消</el-button>
                </div>
            </div>
        </el-dialog>
        <!-- 采购单预览 -->
        <el-dialog v-model="previewBillVis" title="采购单预览" width="1100px">
            <div class="billPreview">
                <h2>采购单</h2>
                <p>单号：{{ billData.id }}</p>
                <table width="1000px" class="tableStyle">
                    <tr class="consigneeLine">
                        <td :colspan="2">供应商名称:{{ billData.consigneeName }}</td>
                        <td :colspan="2">联系方式:{{ billData.phone }}</td>
                        <td :colspan="2">供应商地址:{{ billData.address }}</td>
                        <td :colspan="2">日期: {{ dayjs().format('YYYY-MM-DD') }}</td>
                    </tr>
                    <tr>
                        <th>序号</th>
                        <th>货品编号</th>
                        <th>货品名称</th>
                        <th>包装规格</th>
                        <th>数量</th>
                        <th>进货价</th>
                        <th>批发价</th>
                        <th>零售价</th>
                        <th>金额</th>
                        <th>备注</th>
                    </tr>
                    <tr v-for="(item, index) in billData.billDetail">
                        <th>{{ index + 1 }}</th>
                        <th>{{ item.goodId }}</th>
                        <th>{{ item.name }}</th>
                        <th>{{ item.decri }}</th>
                        <th>{{ item.number }}</th>
                        <th>{{ item.jhPri }}</th>
                        <th>{{ item.total.toFixed(2) }}</th>
                        <th>{{ item.notes }}</th>
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
    import { digitUppercase } from "pixiu-number-toolkit";
    import ContentHeader from '../../../components/ContentHeader.vue';
    import baseAxios from '../../../api/baseAxios.js';
    import moment from 'moment';
    const formLabelWidth = '140px'
    const ruleFormRef = ref()
    const rules = reactive({
        name: [
            { required: true, message: '请输入货品名称', trigger: 'blur' },
            { min: 1, max: 20, message: '货品名称长度应为1-20', trigger: 'blur' },
        ],
        decri: [
            { required: true, message: '请输入规格', trigger: 'blur' },
            { min: 1, max: 20, message: '规格应为1-20位', trigger: 'blur' },
        ],
        storage: [
            { required: true, message: '请输入货品库存数量', trigger: 'blur' },
        ],
        jhPri: [
            { required: true, message: '请输入进货价', trigger: 'blur' },
        ],
    })
    // 批量删除框部分
    const dialogBatchVisible = ref(false)
    // 确认删除框部分
    const dialogVisible = ref(false)
    // 当前页数
    // 翻页器变量
    const currentPage = ref(1);
    const pageSize = ref(10);
    const total = ref(1);
    // 弹出框部分
    const dialogContent = ref("新增采购单"); 
    const totalFormatter = (row) => {
        console.log(typeof row.total);
        return row.total.toFixed(2);
    }
    // 新建编辑采购单页面可见性
    const editGoodsDialogVisible = ref(false);
    const formInline = reactive({
        // kind: null,
        state: null,
        // custId: null,
        storeId: null,
        createTime: [null, null],
    })

    // 记录当前采购单内采购单编辑是什么模式，goodsFlag 为0时为新增，为1时为编辑
    let goodsFlag = ref(0);
    let goodsIndex = 0;
    // 新增采购单信息
        // 新增采购单可见
    const addGoodsVis = ref(false);
    const goodsForm = ref({
        // goodId: '',
        name: '',
        decri: '',
        storage: '',
        jhPri: '',
        notes: '',
    });
    // 采购单信息
    // 查找信息
    // 常量部分
    const stateOptions = [
        {
            label: "未采购",
            value: 3,
        },
        {
            label: "已采购",
            value: 4,
        },
        {
            label: "已退货",
            value: 6
        }
    ];
    const stateMap = {
        3: "未采购",
        4: "已采购",
        6: "已退货"
    }
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
                    if(x.kind == 3){
                        custOptions.value.push({
                            label: x.name,
                            value: x.id
                        });
                        custMap[x.id] = x.name;
                        custDetail[x.id] = x;
                    }

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
                state: 1,
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
    // 增加新增采购单按钮
    const onSubmit = () => {
        let flag = true;
        for(let i = 0; i < goodsForm.value.number.length; i++){
            if(!(goodsForm.value.storage[i] >= '0' && goodsForm.value.storage[i] <= '9')){
                flag = false;
                break;
            }
        }
        if(flag){
            if(goodsForm.value.goodId === '') ElMessage.error("采购单信息不可为空");
            else {
                if(!goodsForm.value.number) ElMessage.error("数量不能为空");
                else if(parseInt(goodsForm.value.number) === 0) ElMessage.error("数量不能为0");
                else {
                    goodsForm.value.number = parseInt(goodsForm.value.number)
                    goodsForm.value.total = goodsForm.value.singlePrice * goodsForm.value.number;
                    let temp = Object.assign({}, goodsForm.value);
                    if(goodsFlag.value === 0) billData.value.billDetail.push(temp);
                    else {
                        for(let key in goodsForm.value){
                            billData.value.billDetail[goodsIndex][key] = goodsForm.value[key];
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
    // 取消添加采购单
    const onCancel = () => {
       addGoodsVis.value = false;
    }
    // 获取所有采购单信息
    const tableData = ref([]);
    function getBillList(){
        if(formInline.createTime == null){
            formInline.createTime = [null, null];
        }
        let params = {
            page: currentPage.value,
            pageSize: pageSize.value,
            kind: 3,
            state: formInline.state,
            storeId: formInline.storeId,
            custId: formInline.custId,
            begin: formInline.createTime[0],
            end: formInline.createTime[1],
        }
        console.log(params);
        baseAxios({
            url: '/slips',
            method: 'get',
            params
        }).then(res => {
            console.log(res.data);
            tableData.value = res.data.data.rows;
            tableData.value.forEach(x => {
                x.stateName = stateMap[x.state];
                x.stateClass = "stateColor" + x.state;
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
    // 采购单信息
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
    // 实时更新供应商信息
    function updateDetail(){
        if(billData.value.custId){
            billData.value.consigneeName = custDetail[billData.value.custId].name;
            billData.value.phone = custDetail[billData.value.custId].phone;
            billData.value.address = custDetail[billData.value.custId].address;
        } else {
            billData.value.consigneeName = "";
            billData.value.phone = "";
            billData.value.address = "";
        }
    }
    // 更新所属仓库
    function updateStore(){
        console.log(billData.value.storeId);
        getGoodsList();
        
    }
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
    // 处理采购单的提交
    const handleSumbit = (index, row) => {
        ElMessageBox.confirm( 
            '确认要提交吗？提交后将不能再修改',
            '提交采购单',
            {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
        }).then(() => {
            changeState(row.id, 2, "提交成功！");
        })
    }
    const handlePay = (index, row) => {
        changeState(row.id, 4, "付款成功！");
    }
    const handleRefund = (index, row) => {
        ElMessageBox.confirm(
            '确认要退货吗？',
            '退货',
            {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            }
        ).then(() => {
            baseAxios({
                url: "/slipDetails/reject/" + row.id,
                method: 'put',
            }).then(res => {
                console.log(res.data);
                if(res.data.code){
                    changeState(row.id, 6, '退货成功！退款将在24小时内返回您的账户！');
                } else {
                    ElMessage.error(res.data.msg);
                }
            })
        })
    }
    // 处理采购单的编辑
    let originIds = [];
    const handleEdit = (index, row, type=0) => {
        console.log(index, row)
        baseAxios({
            url: "/slipDetails",
            method: 'get',
            params: {
                slipId: row.id,
            }
        }).then(res => {
            console.log("编辑采购单");
            console.log(res.data);
            billData.value = row;
            billData.value.billDetail = [];
            originIds = [];
            res.data.data.forEach(x => {
                originIds.push(x.id);
                let goodDetail = goodsDetail[x.goodId];
                let temp = {
                    ...x,
                    ...goodDetail
                }
                temp.id = x.id;
                if(row.kind === 1) temp.singlePrice = goodDetail.pfPri;
                else if(row.kind === 2) temp.singlePrice = goodDetail.lsPri;
                temp.total = Number(x.number) * Number(temp.singlePrice);
                billData.value.billDetail.push(temp);
            });
            console.log("billData");
            console.log(billData.value);
            getGoodsList();
            dialogContent.value = "编辑采购单";
            if(!type) editGoodsDialogVisible.value = true;
            else {
                previewBill();
            }
            // form.value = res.data.data;
        }).catch(err => {
            console.log(err.message);
        })

    }
    // 处理采购单内采购单的编辑
    const editGoods = (index) => {
        // goodsForm.value = billData.billDetail.value[index];
        for(let key in goodsForm.value){
            goodsForm.value[key] = billData.value.billDetail[index][key];
        }
        addGoodsVis.value = true;
        goodsFlag.value = 1;
        goodsIndex = index;

    }
    // 处理采购单内采购单的删除
    const handleDeleteGoods = (index) => {
        ElMessageBox.confirm(
            '确认要删除该采购单？',
            '删除采购单',
            {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            }
        ).then(() => {
            billData.value .billDetail= billData.value.billDetail.filter((x, i) => i !== index);
            // ElMessage.success("删除成功");
        })
    }
    // 删除采购单
        // 处理多选 用于批量删除
    const multipleSelection = ref([])
    const handleSelectionChange = (val) => {
        multipleSelection.value = val;
    }
    const temp_id = ref(null);
    const handleDelete = (index, row) => {
        console.log(index, row)
        temp_id.value = row.id;
        dialogVisible.value = true;
    }
    function confirmDelete(type, tip="删除成功！"){
        // type为0说明是单个，为1说明是多个。
        let ids = "";
        if(type){
            multipleSelection.value.forEach(x => {
                console.log(x.id);
                if(ids == "") ids = x.id;
                else ids += "," + x.id;
            })
        }else{
            ids = temp_id.value;
        }
        baseAxios({
            url: "/slips/" + ids,
            method: "delete",
        }).then(res => {
            console.log(res.data);
            if(res.data.code){
                ElMessage({
                    message: tip,
                    type: 'success',
                })
                getBillList();
                dialogVisible.value = false;
                dialogBatchVisible.value = false;
            }
        })
    }
    // 创建采购单
    const createBill = () => {
        dialogContent.value = "新增采购单";
        editGoodsDialogVisible.value = true;
        billData.value.billDetail = [];
        billData.value.custId = null;
        billData.value.storeId = null;
        billData.value.kind = null;
        billData.value.consigneeName = '';
        billData.value.phone = '';
        billData.value.address = '';
    }
    // 批量删除按钮
    function handleBatchDel(){
        dialogBatchVisible.value = true;
    }

    // 点击增加采购单按钮
    const onAddItem = () => {
        addGoodsVis.value = true;
        goodsFlag.value = 0;//置为新增
        for(let key in goodsForm.value){
            goodsForm.value[key] = '';
        }
    }
    // 点击新增或者保存采购单
    const onChangeItem = () => {
        if(billData.value.custId === '' || billData.value.custId === null) ElMessage.error("供应商不可为空");
        else {
            let method = '';
            if(dialogContent.value == "新增采购单"){
                method = 'post';
            } else if(dialogContent.value == "编辑采购单"){
                method = 'put';
            }
            let data = {
                kind: billData.value.kind,
                state: 1,
                storeId: billData.value.storeId,
                custId: billData.value.custId,
            }
            if(method == 'put') data['id'] = billData.value.id;
            baseAxios({
                url: "/slips",
                method: method,
                data: data
            }).then(res => {
                console.log(res.data);
                let slipId;
                let t_data = [];
                let url;
                if(method === 'post'){
                    slipId = res.data.data;
                    url = '/slipDetails';
                    billData.value.billDetail.forEach(x => {
                        t_data.push({
                            "slipId": slipId,
                            "goodId": x.goodId,
                            "number": x.number,
                            "notes": x.notes
                        })
                    });
                } else if(method === 'put'){
                    slipId = billData.value.id;
                    url = '/slipDetails/' + slipId;
                    billData.value.billDetail.forEach(x => {
                        if(x.id){
                            t_data.push({
                                "id": x.id,
                                "slipId": slipId,
                                "goodId": x.goodId,
                                "number": x.number,
                                "notes": x.notes
                            })
                        } else {
                            t_data.push({
                                "slipId": slipId,
                                "goodId": x.goodId,
                                "number": x.number,
                                "notes": x.notes
                            })
                        }
                    });
                }
                if(method === 'post' && t_data.length === 0){
                    editGoodsDialogVisible.value = false;
                    ElMessage({
                        message: '保存成功！',
                        type: 'success',
                    })
                    getBillList();
                    return;
                }
                baseAxios({
                    url: url,
                    method: method,
                    data: t_data
                }).then(res => {
                    if(res.data.code){
                        editGoodsDialogVisible.value = false;
                        ElMessage({
                            message: '保存成功！',
                            type: 'success',
                        })
                        getBillList();
                    } else {
                        ElMessage.error(res.data.msg);
                    }
                }).catch(err => {
                    console.log(err.message);
                })
            }).catch(err => {
                console.log(err.message);
            })
        }
    }
    // 生成采购单预览
    const previewBillVis = ref(false);
    const totalMoney = ref(0);
    const charTotal = ref('');
    const previewBill = () => {
        totalMoney.value = 0;
        billData.value.billDetail.forEach(x => totalMoney.value += x.total);
        totalMoney.value = totalMoney.value.toFixed(2);
        charTotal.value = digitUppercase(totalMoney.value);
        previewBillVis.value = true;

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
// 采购单状态


.stateColor1 {
    color: #EF3737;
}
.stateColor2 {
    color: #E6A23C;
}
.stateColor3 {
    color: #A2C746;
}
.stateColor4 {
    color: #00763A;

}
.stateColor5 {
    // color: #E87A2B;
    color: #B28BFE

}
.foot-pagination {
    position: absolute;
    bottom: 5px;
    right: 10px;
}
</style>