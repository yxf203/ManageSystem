<template>
    <!-- 调拨框 -->
    <el-dialog
        v-model="dialogAdjustVisible"
        width="500"
    >
        <ContentHeader content="调拨货品"></ContentHeader>
        <div class="info-message">
            <el-form>
                <el-form-item label="调去仓库">
                    <el-select
                    v-model="adjustData.storeId"
                    filterable
                    clearable
                    placeholder="请选择要调到哪个仓库"
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
                <el-form-item label="调拨数量">
                    <el-input v-model="adjustData.number" placeholder="请输入要调拨的数量"/>
                </el-form-item>
            </el-form>
        </div>
        <template #footer>
        <div class="dialog-footer">
            <el-button type="primary" @click="confirmAdjust()">
                确定
            </el-button>
            <el-button @click="dialogAdjustVisible = false">取消</el-button>
        </div>
        </template>
    </el-dialog>
    <!-- 批量删除确认框 -->
    <el-dialog
        v-model="dialogBatchVisible"
        width="500"
    >
        <ContentHeader content="批量删除货品"></ContentHeader>
        <div class="info-message">您确定要批量删除这些货品的信息吗 ?</div>
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
        <ContentHeader content="删除货品"></ContentHeader>
        <div class="info-message">您确定要删除该货品的信息吗 ?</div>
        <template #footer>
        <div class="dialog-footer">
            <el-button type="primary" @click="confirmDelete(0)">
                确定
            </el-button>
            <el-button @click="dialogVisible = false">取消</el-button>

        </div>
        </template>
    </el-dialog>
    <!-- 表格弹出框 -->
    <el-dialog v-model="dialogFormVisible" width="500">
        <ContentHeader :content="dialogContent"></ContentHeader>
        <el-form :model="form" style="margin-top: 15px;" ref="ruleFormRef" :rules="rules">
            <el-form-item label="货品名称" :label-width="formLabelWidth" prop="name">
                <el-input v-model="form.name" placeholder="请输入货品名称" style="width: 280px;"/>
            </el-form-item>
            <!-- <el-form-item label="货品编号" :label-width="formLabelWidth" prop="goodsId">
                <el-input v-model="form.id" placeholder="请输入货品编号" style="width: 280px;" />
            </el-form-item> -->
            <el-form-item label="包装规格" :label-width="formLabelWidth" prop="decri">
                <el-input v-model="form.decri" placeholder="请输入货品规格" style="width: 280px;" />
            </el-form-item>
            <el-form-item label="进货价" :label-width="formLabelWidth" prop="jhPri">
                <el-input v-model="form.jhPri" placeholder="请输入货品进货单价" style="width: 280px;" />
            </el-form-item>
            <el-form-item label="批发价" :label-width="formLabelWidth" prop="pfPri">
                <el-input v-model="form.pfPri" placeholder="请输入货品批发单价" style="width: 280px;"  />
            </el-form-item>
            <el-form-item label="零售价" :label-width="formLabelWidth" prop="lsPri">
                <el-input v-model="form.lsPri" placeholder="请输入货品零售单价" style="width: 280px;" />
            </el-form-item>
            <el-form-item label="库存" :label-width="formLabelWidth" prop="storage">
                <el-input v-model="form.storage" placeholder="请输入库存数目" style="width: 280px;" />
            </el-form-item>
        </el-form>
        <template #footer>
        <div class="dialog-footer">
            <el-button type="primary" @click="handleSave(ruleFormRef)">
            保存
            </el-button>
            <el-button @click="dialogFormVisible = false">取消</el-button>
        </div>
        </template>
    </el-dialog>
    <div class="wholeWrapper">
        <ContentHeader :content="props.store"></ContentHeader>

        <div class="query">
            <!-- 查询表单 -->
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <!-- <el-form-item label="选择仓库">
                    <el-select
                    v-model="formInline.storeId"
                    filterable
                    clearable
                    placeholder="请选择"
                    style="width: 180px;"
                    >
                        <el-option
                        v-for="item in storeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        />
                    </el-select>
                </el-form-item> -->
                <el-form-item label="货品名称">
                    <el-input v-model="formInline.name" placeholder="请输入货品名称" style="width: 180px;" clearable />
                </el-form-item>
                <el-form-item label="货品规格">
                    <el-input v-model="formInline.decri" placeholder="请输入货品规格" style="width: 180px;" clearable />
                </el-form-item>
                <el-form-item label="选择状态">
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
                <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 新增按钮 -->
        <el-button type="primary" @click="handleAdd">+ 新增货品</el-button>
        <el-button type="danger" @click="handleBatchDel">- 批量删除</el-button>

        <div class="info-table">
            <el-table 
            :data="tableData" 
            :fit="true"
            style="width: 100%;height: calc(100vh - 300px);"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="40" align="center" />
            <el-table-column prop="id" label="货品编号" max-width="180" align="center" />
            <el-table-column prop="name" label="货品名称" align="center" />
            <el-table-column prop="decri" label="包装规格" max-width="180" align="center" />
            <el-table-column prop="jhPri" label="进货价" max-width="100" align="center"/>
            <el-table-column prop="pfPri" label="批发价" max-width="100" align="center"/>
            <el-table-column prop="lsPri" label="零售价" max-width="100" align="center"/>
            <el-table-column prop="storage" label="库存" max-width="180" align="center"/>
            <!-- <el-table-column prop="store" label="所属仓库" max-width="180" align="center"/> -->
            <el-table-column label="货品状态" max-width="180" align="center">
                <template #default="scope">
                    <p :class="[ scope.row.state === 1? 'stateColor1' : 'stateColor2' ]">{{ scope.row.stateName }}</p>
                </template>
            </el-table-column>
            <el-table-column property="createTime" label="创建时间" :formatter="dateFormatter"  align="center"/>
            <el-table-column label="操作" min-width="150" align="center">
                <template #default="scope" class="opStyle">
                    <el-button 
                        size="small" 
                        type="primary"
                        @click="handleState(scope.$index, scope.row)">
                        {{ scope.row.state === 1? '下架': '上架' }}
                    </el-button>
                    <el-button 
                        size="small" 
                        type="warning"
                        @click="handleAdjust(scope.$index, scope.row)">
                        调拨
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
                        @click="handleDelete(scope.$index, scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        </div>

        <!-- 翻页器 -->
        <div class="foot-pagination">
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
    </div>
</template>

<script setup>
import ContentHeader from '@/components/ContentHeader.vue';
import baseAxios from '@/api/baseAxios';
import { ElMessage, ElMessageBox } from 'element-plus';
import { reactive, ref } from 'vue';
import moment from 'moment';
const props = defineProps(["store", "storeId"]);
console.log(props.storeId);



// 校验规则
function validateId(rule, value) {
  // 使用正则表达式验证用户名是否只包含数字和字母
  const pattern = /^[A-Za-z0-9]+$/;
  if (!pattern.test(value)) {
    return Promise.reject('货品编号只能包含数字和字母');
  } else {
    return Promise.resolve();
  }
}

function validateName(rule, value) {
  // 使用正则表达式验证姓名是否只包含汉字
  const pattern = /^[\u4e00-\u9fa5]+$/;
  if (!pattern.test(value)) {
    return Promise.reject('姓名只能包含汉字');
  } else {
    return Promise.resolve();
  }
}
function validateInput(rule, value) {
  // 使用正则表达式验证输入是否只包含数字
  const pattern = /^[0-9]+$/;
  if (!pattern.test(value)) {
    return Promise.reject('输入只能包含数字');
  } else {
    return Promise.resolve();
  }
}
const handleChange = (value) => {
  // 判断输入是否为小数或整数
    if (!/^\d+(\.\d+)?$/.test(value) && value != '') {
        ElMessage.error('请输入小数或整数！');
        // 移除非数字字符
        form.value.price = value.replace(/[^\d.]/g, '');
    }
}
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
        { validator: validateInput, trigger: 'blur' }
    ],
    jhPri: [
        { required: true, message: '请输入进货价', trigger: 'blur' },
    ],
    pfPri: [
        { required: true, message: '请输入批发价', trigger: 'blur' },
    ],
    lsPri: [
        { required: true, message: '请输入零售', trigger: 'blur' },
    ],
})
// 日期格式化显示
const dateFormatter = (row) => {
  const createTime = row.createTime;
  const date = moment(createTime);
  return date.format("YYYY-MM-DD HH:mm:ss");
}

// 翻页器变量
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(1);
// 选项变量们
let stateOptions = [
    {
        label: "已上架",
        value: 1,
    },
    {
        label: "未上架",
        value: 2,
    }
];
let stateMap = {
    1: "已上架",
    2: "未上架"
};
const storeOptions = ref([]);
const storeMap = ref({});
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
                storeMap.value[x.id] = x.name;
            })
        } else {
            ElMessage.error(res.data.msg);
        }
    }).catch(err => {
        console.log(err.message);
    })
}
getStoreList();
// 这里是查询表单部分
const formInline = reactive({
    name: "",
    decri: "",
    state: null,
})
// 这里是获取班级表格数据部分
// const tableData = ref([]);
const tableData = ref([]);
function getGoodsList(){
    let params = {
        page: currentPage.value,
        pageSize: pageSize.value,
        name: formInline.name,
        storeId: props.storeId,
        decri: formInline.decri,
        state: formInline.state
    }
    console.log(params);
    baseAxios({
        url: '/goods',
        method: 'get',
        params
    }).then(res => {
        console.log(res.data);
        tableData.value = res.data.data.rows;
        tableData.value.forEach(x => {
            x.stateName = stateMap[x.state];
            // x.store = storeMap.value[x.storeId];
        });
        total.value = res.data.data.total;
    }).catch(err => {
        console.log(err.message);
    })
}
getGoodsList();

// 批量删除框部分
const dialogBatchVisible = ref(false)
// 确认删除框部分
const dialogVisible = ref(false)


// 弹出框部分
    // 用于标记dialog处于新增还是修改状态
const state = 0; //0表示新增，1表示修改
const dialogContent = ref("新增货品"); 
    // 新增/修改表格内信息
const form = ref({});
    // 设置弹出框是否可见以及内部输入框的width
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
function addNewGood(method, tip){
    baseAxios({
        url: "/goods",
        method: method,
        data: form.value,
    }).then(res => {
        console.log(res.data);
        if(res.data.code){
            dialogFormVisible.value = false;
            if(tip){
                ElMessage({
                    message: tip,
                    type: 'success',
                })
            }
            getGoodsList();
        } else {
            ElMessage.error(res.data.msg);
        }
    }).catch(err => {
        console.log(err.message);
    })
}
    // 对按钮的处理
async function handleSave(formEl){
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
            let method = '';
            if(dialogContent.value == "新增货品"){
                method = 'post';
                form.value["state"] = 2;
            } else if(dialogContent.value == "编辑货品"){
                method = 'put';
            }
            form.value["storeId"] = props.storeId;
            console.log(form.value);
            addNewGood(method, '保存成功！');
        } else {
            console.log('error submit!', fields)
        }
    })
    
}


const onSubmit = () => {
  console.log('submit!')
  getGoodsList();
}
// 新增货品按钮
function handleAdd(){
    form.value = {
        name: '',
        decri: '',
        jhPri: null,
        pfPri: null,
        lsPri: null,
        storage: null,
    }
    dialogContent.value = "新增货品";
    dialogFormVisible.value = true;
}
// 批量删除按钮
function handleBatchDel(){
    dialogBatchVisible.value = true;
}

    // 处理多选 用于批量删除
const multipleSelection = ref([])
const handleSelectionChange = (val) => {
    multipleSelection.value = val;
}
const handleEdit = (index, row) => {
    console.log(index, row)
    baseAxios({
        url: "/goods/" + row.id,
        method: 'get',
    }).then(res => {
        console.log(res.data);
        form.value = res.data.data;
    }).catch(err => {
        console.log(err.message);
    })
    dialogContent.value = "编辑货品";
    dialogFormVisible.value = true;
}
async function checkExist(name, decri, storeId){
    console.log(name, decri)
    const response = await baseAxios({
        url: '/goods/list',
        method: 'get',
        params:{
            name,
            decri,
            storeId
        }
    });
    console.log(response);
    if(response.data.data.length === 0) return null;
    else return response.data.data[0];
}
// 调拨
const dialogAdjustVisible = ref(false);
const adjustData = ref({
    goodDetail: null,
    storeId: null,
    number: null,
});
const handleAdjust = (index, row) => {
    dialogAdjustVisible.value = true;
    adjustData.value.storeId = null;
    adjustData.value.number = null;
    adjustData.value.goodDetail = row;
}
async function confirmAdjust(){
    console.log(1);
    const adjust = await checkExist(adjustData.value.goodDetail.name,adjustData.value.goodDetail.decri, adjustData.value.storeId);
    let method;
    console.log(adjust);
    if(!adjust){
        method = 'post';
        form.value = {...adjustData.value.goodDetail};
        form.value['id'] = null;
        form.value['storeId'] = adjustData.value.storeId;
        form.value['storage'] = adjustData.value.number;
        form.value['state'] = 2;
    } else {
        method = 'put';
        form.value = {...adjust};
        console.log(adjust);
        form.value['storage'] = Number(adjustData.value.number) + Number(adjust.storage);
    }
    addNewGood(method, null);
    form.value = {...adjustData.value.goodDetail};
    form.value['storage'] = Number(adjustData.value.goodDetail.storage) - Number(adjustData.value.number);
    addNewGood('put', '调拨成功');
    dialogAdjustVisible.value = false;
    getGoodsList();
}
const temp_id = ref(0);
const handleDelete = (index, row) => {
    console.log(index, row)
    temp_id.value = row.id;
    dialogVisible.value = true;
}
const handleState = (index, row) => {
    let tip = row.state === 1? '下架': '上架';
    let state = row.state === 1? 2 : 1;
    if(row.state === 2){
        if(row.pfPri === 0 || row.lsPri === 0){
            ElMessage.error("批发价和零售价皆为空时无法上架！");
            return;
        }
    }
    console.log(state);
    ElMessageBox.confirm(
        '确认' + tip + '该货品吗？',
        tip + '货品',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'info',
        }
    ).then(() => {
        baseAxios({
            url: "/goods",
            method: 'put',
            data: {
                id: row.id,
                storeId: props.storeId,
                state: state,
            },
        }).then(res => {
            console.log(res.data);
            if(res.data.code){
                ElMessage({
                    type: 'success',
                    message: tip + '成功',
                })
                getGoodsList();
            } else {
                ElMessage.error(res.data.msg);
            }
        }).catch(err => {
            console.log(err.message);
        })

    })
}
function confirmDelete(type){
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
        url: "/goods/" + ids,
        method: "delete",
    }).then(res => {
        console.log(res.data);
        if(res.data.code){
            ElMessage({
                message: '删除成功！',
                type: 'success',
            })
            getGoodsList();
            dialogVisible.value = false;
            dialogBatchVisible.value = false;
        }
    })
}
// 翻页器
const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
  getGoodsList();
}
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
    getGoodsList();
}

</script>

<style scoped>
.wholeWrapper {
    position: relative;
    width: 100%;
    height: 100%;
}
.info-message {
    font-size: 18px;
    margin: 20px 20px 10px;
}

.query {
    height: 60px;
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

.info-table {
    margin-top: 20px;
}

.stateColor1 {
    color: green;
}
.stateColor2 {
    color: red;
}

.foot-pagination {
    position: absolute;
    bottom: 5px;
    right: 10px;
}
</style>