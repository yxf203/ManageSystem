<template>
    <!-- 管理货品 -->
    <el-dialog v-model="dialogGoodsVisible" width="90%" top="2vh" destroy-on-close >
        <ManageGoods :store="store" :store-id="storeId"></ManageGoods>
    </el-dialog>
    <!-- 批量删除确认框 -->
    <el-dialog
        v-model="dialogBatchVisible"
        width="500"
    >
        <ContentHeader content="批量删除仓库"></ContentHeader>
        <div class="info-message">您确定要批量删除这些仓库的信息吗 ?</div>
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
        <ContentHeader content="删除仓库"></ContentHeader>
        <div class="info-message">您确定要删除该仓库的信息吗 ?</div>
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
            <el-form-item label="仓库名称" :label-width="formLabelWidth" prop="name">
                <el-input v-model="form.name" placeholder="请输入仓库名称" style="width: 280px;"/>
            </el-form-item>
            <el-form-item label="仓库类型" :label-width="formLabelWidth" prop="kind">
                <el-select
                    v-model="form.kind"
                    filterable
                    clearable
                    placeholder="请选择"
                    style="width: 280px;"
                >
                    <el-option
                    v-for="item in kindOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    />
                </el-select>
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
        <ContentHeader content="仓库管理"></ContentHeader>

        <div class="query">
            <!-- 查询表单 -->
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="仓库名称">
                    <el-input v-model="formInline.name" placeholder="请输入仓库名称" style="width: 150px;" clearable />
                </el-form-item>
                <el-form-item label="仓库类型">
                    <el-select
                    v-model="formInline.kind"
                    filterable
                    clearable
                    placeholder="请选择"
                    style="width: 280px;"
                    >
                        <el-option
                        v-for="item in kindOptions"
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
        <el-button type="primary" @click="handleAdd">+ 添加仓库</el-button>
        <el-button type="danger" @click="handleBatchDel">- 批量删除</el-button>

        <div class="info-table">
            <!-- 表格 -->
            <el-table :data="tableData" style="width: 100%;height: calc(100vh - 300px);" :fit="true"  @selection-change="handleSelectionChange" >
                <el-table-column type="selection" width="55"  align="center"/>
                <el-table-column property="name" label="仓库名称" align="center"/>
                <el-table-column property="kindName" label="仓库类型"  align="center"/>
                <el-table-column property="createTime" label="创建时间" :formatter="dateFormatter"  align="center"/>
                <el-table-column label="操作"  align="center" width="250">
                <template #default="scope">
                    <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button 
                        size="small" 
                        type="warning"
                        @click="handleManage(scope.$index, scope.row)">
                        管理
                    </el-button>
                    <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button
                    >
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
            layout="slot, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            />
        </div>
    </div>
</template>

<script setup>
import ContentHeader from '@/components/ContentHeader.vue';
import baseAxios from '@/api/baseAxios';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import moment from 'moment';
import ManageGoods from '../ManageGoods/ManageGoods.vue';
// 管理货品
const store = ref("");
const storeId = ref(null);
const dialogGoodsVisible = ref(false);
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
const ruleFormRef = ref()
const rules = reactive({
    name: [
        { required: true, message: '请输入仓库名称', trigger: 'blur' },
        { min: 2, max: 20, message: '仓库名称应为2-20位', trigger: 'blur' },
        { validator: validateName, trigger: 'blur' }
    ],
    kind: [
        { required: true, message: '请选择仓库类型', trigger: 'change' },
    ],
})
// 日期格式化显示
const dateFormatter = (row) => {
  const createTime = row.createTime;
  const date = moment(createTime);
  return date.format("YYYY-MM-DD hh:mm:ss");
}
// 翻页器变量
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(1);
// 选项变量们
let kindOptions = [
    {
        label: "大库",
        value: 1,
    },
    {
        label: "门店",
        value: 2,
    }
];
let kindMap = {
    1: "大库",
    2: "门店"
};



// 这里是查询表单部分
const formInline = reactive({
    name: "",
    kind: null,
})
// 这里是获取仓库表格数据部分
const tableData = ref([]);
function getStoreList(){
    let params = {
        page: currentPage.value,
        pageSize: pageSize.value,
        name: formInline.name,
        kind: formInline.kind
    }
    console.log(params);
    baseAxios({
        url: '/stores',
        method: 'get',
        params
    }).then(res => {
        console.log(res.data);
        tableData.value = res.data.data.rows;
        tableData.value.forEach(x => {
            x.kindName = kindMap[x.kind];

        });
        total.value = res.data.data.total;
    }).catch(err => {
        console.log(err.message);
    })
}
getStoreList();

// 批量删除框部分
const dialogBatchVisible = ref(false)
// 确认删除框部分
const dialogVisible = ref(false)


// 弹出框部分
const dialogContent = ref("添加仓库"); 
const form = ref({});
    // 设置弹出框是否可见以及内部输入框的width
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
    // 对按钮的处理
async function handleSave(formEl){
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
            let method = '';
            if(dialogContent.value == "添加仓库"){
                method = 'post';
            } else if(dialogContent.value == "编辑仓库"){
                method = 'put';
            }
            console.log(form.value);
            baseAxios({
                url: "/stores",
                method: method,
                data: form.value,
            }).then(res => {
                console.log(res.data);
                if(res.data.code){
                    dialogFormVisible.value = false;
                    ElMessage({
                        message: '保存成功！',
                        type: 'success',
                    })
                    getStoreList();
                } else {
                    ElMessage.error(res.data.msg);
                }
            }).catch(err => {
                console.log(err.message);
            })
        } else {
            console.log('error submit!', fields)
        }
    })
    
}


const onSubmit = () => {
  console.log('submit!')
  getStoreList();
}
// 添加仓库按钮
function handleAdd(){
    form.value = {
        name: "",
        kind: null,
    }
    dialogContent.value = "添加仓库";
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
        url: "/stores/" + row.id,
        method: 'get',
    }).then(res => {
        console.log(res.data);
        form.value = res.data.data;
    }).catch(err => {
        console.log(err.message);
    })
    dialogContent.value = "编辑仓库";
    dialogFormVisible.value = true;
}
// 管理货品
const handleManage = (index, row) => {
    store.value = row.name;
    storeId.value = row.id;
    console.log(storeId.value);
    dialogGoodsVisible.value = true;
}
const temp_id = ref(0);
const handleDelete = (index, row) => {
    console.log(index, row)
    temp_id.value = row.id;
    dialogVisible.value = true;
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
        url: "/stores/" + ids,
        method: "delete",
    }).then(res => {
        console.log(res.data);
        if(res.data.code){
            ElMessage({
                message: '删除成功！',
                type: 'success',
            })
            getStoreList();
            dialogVisible.value = false;
            dialogBatchVisible.value = false;
        }
    })
}
// 翻页器
const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
  getStoreList();
}
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
    getStoreList();
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



.foot-pagination {
    position: absolute;
    bottom: 5px;
    right: 10px;
}
</style>