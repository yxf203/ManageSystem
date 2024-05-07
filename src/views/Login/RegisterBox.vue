<template>
    <p class="accountIn">注册</p>
    <div class="inputBox">
        <el-input v-model="userId"  class="inputStyle" placeholder="请输入用户名" />
    </div>
    <div class="inputBox">
        <el-input type="password" v-model="password" class="inputStyle" placeholder="请输入密码" />
    </div>
    <div class="inputBox">
        <el-input type="password" v-model="confirmPass" class="inputStyle" placeholder="请再次确认密码" />
    </div>
    <div class="btnWrapper">
        <el-button type="primary" class="loginBtn" @click="registerFun()">注册</el-button>
    </div>
    <div class="bottom">
        <router-link to="/">返回</router-link>
    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import {ref} from 'vue';
import { useRouter } from 'vue-router';
import baseAxios from '../../api/baseAxios';
const router = useRouter();
let userId = ref('');
let password = ref('');
let confirmPass = ref('');
function registerFun(){
    if(userId.value === '' || password.value === ''){
        ElMessage.error('用户名和密码不可为空！');        
    }
    else if (password.value !== confirmPass.value) {
        ElMessage.error('两次输入密码不同，请重新输入！');
    }else {
        // baseAxios({
        //     url: '/register',
        //     method: 'post',
        //     data: {
        //         username: userId.value,
        //         password: password.value,
        //     },
        //     Headers:{
        //         "Content-Type": 'application/json',
        //     }
        // })
        // .then(response => {
        //     console.log(response.data);
        //     if(response.data.flag){
                ElMessage({
                    message: '注册成功！',
                    type: 'success',
                })
                router.push('/');
        //     } else {
        //         ElMessage.error(response.data.message);
        //     }
        // })
        // .catch(function(error){
        //     console.log(error);
        //     console.log('出错啦！');
        // })
    }
}
</script>

<style scoped>
/* 标题*/
.accountIn {
    height: 60px;
    font: 26px 'Microsoft YaHei';
}

/* 输入框 */
.inputBox {
    width: 450px;
    height: 80px;
}

.inputStyle {
    height: 60px;
    font: 20px 'Microsoft YaHei';
}
/* 注册按钮 */
.btnWrapper {
    height: 50px;
}

.loginBtn {
    width: 200px;
    height: 50px;
    font: 22px 'Microsoft YaHei';
    color: rgba(0, 0, 0, 0.8);
    background-color: rgba(42, 130, 228, 0.7);
}
.bottom {
    display: flex;
    width: 450px;
    justify-content: space-between;
}
.bottom a{
    color: black;
    font: 18px 'Microsoft YaHei';
    text-decoration: none;
}
</style>