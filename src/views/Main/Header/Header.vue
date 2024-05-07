<template>
    <div class="wrapper">
        <div class="headerWrapper">
            <h1>通用批发零售业务管理系统</h1>
        </div>
        <el-dropdown>
            <span class="el-dropdown-link">
                <el-icon><Avatar /></el-icon>
                <el-icon class="el-icon--right">
                    <arrow-down />
                </el-icon>
            </span>
            <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item>个人资料</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup>
import { ArrowDown,Avatar } from '@element-plus/icons-vue';

</script>

<style scoped>
.el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
    font-size: 22px;
}
.wrapper{
    display: flex;
    width: 100%;
    height: 100%;
    padding-right: 50px;
    justify-content: flex-end;
}
.headerWrapper {
    flex: 1;
    display: flex;
    align-items: center;
}
.headerWrapper h1 {
    padding-left: 20px;
}
</style>