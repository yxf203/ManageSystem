<template>
    <!-- 批量删除确认框 -->
    <el-dialog
        v-model="dialogBatchVisible"
        width="500"
    >
        <ContentHeader content="批量删除用户"></ContentHeader>
        <div class="info-message">您确定要批量删除这些用户的信息吗 ?</div>
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
        <ContentHeader content="删除用户"></ContentHeader>
        <div class="info-message">您确定要删除该用户吗 ?</div>
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
            <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
                <el-input v-model="form.username" :disabled="username_disabled"  placeholder="请输入用户名，2-20字符，不可重复" style="width: 280px;"/>
            </el-form-item>
            <el-form-item label="用户姓名" :label-width="formLabelWidth" prop="name">
                <el-input v-model="form.name" placeholder="请输入用户姓名，2-10个字" style="width: 280px;"/>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth" prop="gender">
                <el-select
                    v-model="form.gender"
                    filterable
                    clearable
                    placeholder="请选择"
                    style="width: 280px;"
                >
                    <el-option
                    v-for="item in genderOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    />
                </el-select>
            </el-form-item>

            <el-form-item label="职位" :label-width="formLabelWidth" prop="kind">
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
        <ContentHeader content="用户管理"></ContentHeader>

        <div class="query">
            <!-- 查询表单 -->
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="姓名">
                    <el-input v-model="formInline.name" placeholder="请输入用户姓名" style="width: 150px;" clearable />
                </el-form-item>
                <el-form-item label="性别">
                    <el-select
                    v-model="formInline.gender"
                    filterable
                    clearable
                    placeholder="请选择"
                    style="width: 200px;"
                    >
                        <el-option
                        v-for="item in genderOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="职位">
                    <el-select
                    v-model="formInline.kind"
                    filterable
                    clearable
                    placeholder="请选择"
                    style="width: 200px;"
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
        <el-button type="primary" @click="handleAdd">+ 新增用户</el-button>
        <el-button type="danger" @click="handleBatchDel">- 批量删除</el-button>

        <div class="info-table">
            <!-- 表格 -->
            <el-table :data="tableData" style="width: 100%;height: calc(100vh - 300px);" :fit="true"  @selection-change="handleSelectionChange" >
                <el-table-column type="selection" width="55"  align="center"/>
                <el-table-column property="name" label="姓名" align="center"/>
                <el-table-column property="genderName" label="性别"  align="center"/>
                <el-table-column property="kindName" label="职位"  align="center"/>
                <el-table-column property="createTime" label="创建时间" :formatter="dateFormatter"  align="center"/>
                <el-table-column label="操作"  align="center" width="250">
                <template #default="scope">
                    <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
            >
                <template #default>
                    <span class="el-pagination__total">共{{ total }}条数据</span>
                </template>
                <!-- <template #jumper>
                    <span>前往{{ jumper }}页</span>
                </template> -->
            </el-pagination>
        </div>
    </div>
</template>

<script setup>
import ContentHeader from '@/components/ContentHeader.vue';
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import baseAxios from '@/api/baseAxios';
import moment from 'moment';
// 校验规则
function validateUsername(rule, value) {
  // 使用正则表达式验证用户名是否只包含数字和字母
  const pattern = /^[A-Za-z0-9]+$/;
  if (!pattern.test(value)) {
    return Promise.reject('用户名只能包含数字和字母');
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
const ruleFormRef = ref()
const rules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 2, max: 10, message: '用户名长度应为2-10', trigger: 'blur' },
        { validator: validateUsername, trigger: 'blur' }
    ],
    name: [
        { required: true, message: '请输入姓名', trigger: 'blur' },
        { min: 2, max: 10, message: '姓名长度应为2-10', trigger: 'blur' },
        { validator: validateName, trigger: 'blur' }
    ],
    gender: [
        { required: true, message: '请选择性别'}
    ],
    kind: [
        { required: true, message: '请选择职位'}
    ],
})
// 操作dom
const fileInput = ref();
const username_disabled = ref(true);
// const baseUrl = "http://localhost:8080/upload/";
// 翻页器变量
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(1);
// 日期格式化显示
const dateFormatter = (row) => {
  const createTime = row.createTime;
  const date = moment(createTime);
  return date.format("YYYY-MM-DD HH:mm:ss");
}
// 选项变量们
let genderOptions = [
    {
        label: "男",
        value: 1,
    },
    {
        label: "女",
        value: 2,
    }
];
let genderMap = {
    1: "男",
    2: "女"
}
let kindOptions = [
    {
        label: "经理",
        value: 1,
    },
    {
        label: "店长",
        value: 2,
    },
    {
        label: "店员",
        value: 3,
    },
    {
        label: "仓库管理员",
        value: 4,
    }
];
let kindMap = {
    1: "经理",
    2: "店长",
    3: "店员",
    4: "仓库管理员",
}

// 这里是查询表单部分
const formInline = reactive({
    name: null,
    gender: null,
    kind: null,
})

// 这里是获取用户表格数据部分
const tableData = ref([]);
function getUserList(){
    let params = {
        page: currentPage.value,
        pageSize: pageSize.value,
        name: formInline.name,
        gender: formInline.gender,
        kind: formInline.kind
    }
    console.log(params);
    baseAxios({
        url: '/users',
        method: 'get',
        params
    }).then(res => {
        console.log(res.data);
        tableData.value = res.data.data.rows;
        tableData.value.forEach(x => {
            x.genderName = genderMap[x.gender];
            x.kindName = kindMap[x.kind];
        });
        total.value = res.data.data.total;
    }).catch(err => {
        console.log(err.message);
    })
}
getUserList();

// 批量删除框部分
const dialogBatchVisible = ref(false)
// 确认删除框部分
const dialogVisible = ref(false)


// 弹出框部分
const dialogContent = ref("新增用户"); 
    // 新增/修改表格内信息
const form = ref();
    // 设置弹出框是否可见以及内部输入框的width
const dialogFormVisible = ref(false);
const formLabelWidth = '140px';
    // 对按钮的处理
async function handleSave(formEl){
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
            let method = '';
            if(dialogContent.value == "新增用户"){
                method = 'post';
            } else if(dialogContent.value == "修改用户"){
                method = 'put';
            }
            baseAxios({
                url: "/users",
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
                    getUserList();
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
    console.log(formInline.value);
    getUserList();
}
// 添加学院按钮
function handleAdd(){
    form.value = {
        "id": null,
        "username": "",
        "password": "",
        "name": "",
        "gender": null,
        "kind": null,
        "createTime": null
    }
    username_disabled.value = false;
    dialogContent.value = "新增用户";
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
  console.log(multipleSelection.value);
}
//处理编辑
const handleEdit = (index, row) => {
    console.log(index, row)
    form.value = row;
    baseAxios({
        url: "/users/" + row.id,
        method: 'get',
    }).then(res => {
        console.log(res.data);
        form.value = res.data.data;
    }).catch(err => {
        console.log(err.message);
    })
    username_disabled.value = true;
    dialogContent.value = "修改用户";
    dialogFormVisible.value = true;
}
// 处理单个删除
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
        url: "/users/" + ids,
        method: "delete",
    }).then(res => {
        console.log(res.data);
        if(res.data.code){
            ElMessage({
                message: '删除成功！',
                type: 'success',
            })
            getUserList();
            dialogVisible.value = false;
            dialogBatchVisible.value = false;
        } else {
            ElMessage.error(res.data.msg);
        }
    })
}
// 翻页器
const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
  getUserList();
}
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
    getUserList();
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

.img-style {
    width: 150px;
    height: 150px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    cursor: pointer;
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