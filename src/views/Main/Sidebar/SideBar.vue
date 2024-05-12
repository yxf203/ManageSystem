<template>
    <div>
        <el-col :span="300">
            <h2 class="title">菜单</h2>
            <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
            >
            <router-link :to="{name: 'manageRepe'}">
                <el-menu-item index="1">
                <template #title>
                    <el-icon><icon-menu /></el-icon>
                    <span>仓库管理</span>
                </template>
                </el-menu-item>
            </router-link>
            <el-sub-menu index="2">
                <template #title>
                    <el-icon><icon-menu /></el-icon>
                    <span>业务伙伴管理</span>
                </template>
                <router-link :to="{name: 'manageSuppliers'}"><el-menu-item index="2-1">供应商管理</el-menu-item></router-link>
                <router-link :to="{name: 'manageCust'}"><el-menu-item index="2-2">客户管理</el-menu-item></router-link>
            </el-sub-menu>
            <router-link :to="{name: 'manageUser'}">
                <el-menu-item index="3">
                <template #title>
                    <el-icon><icon-menu /></el-icon>
                    <span>用户管理</span>
                </template>
                </el-menu-item>
            </router-link>
            <el-sub-menu index="4">
                <template #title>
                    <el-icon><icon-menu /></el-icon>
                    <span>销售业务</span>
                </template>
                <router-link :to="{name: 'lookBill'}"><el-menu-item index="4-1">查看销售单</el-menu-item></router-link>
                <router-link :to="{name: 'checkBill'}"><el-menu-item index="4-2">审核销售单</el-menu-item></router-link>
                <router-link :to="{name: 'passedBill'}"><el-menu-item index="4-3">已通过的销售单</el-menu-item></router-link>
            </el-sub-menu>
            <el-sub-menu index="5">
                <template #title>
                    <el-icon><icon-menu /></el-icon>
                    <span>库存管理</span>
                </template>
                <router-link :to="{name: 'repertory'}"><el-menu-item index="5-1">库存盘点与统计</el-menu-item></router-link>
                <router-link :to="{name: 'repertoryGraph'}"><el-menu-item index="5-2">库存盘点与统计(图像统计)</el-menu-item></router-link>
            </el-sub-menu>
            </el-menu>
        </el-col>
    </div>
</template>

<script setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue';
import {RouterLink} from 'vue-router';
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>

<style scoped>
a {
    text-decoration: none;
}
.title {
    text-align: center;
}

</style>