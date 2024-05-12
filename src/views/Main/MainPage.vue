<template>
    <div class="common-layout">
      <el-container>
        <el-header class="header">
            <Header></Header>
        </el-header>
        <el-container class="container">
          <el-aside width="220px" class="aside" >
            <SideBar></SideBar>
          </el-aside>
          <el-main class="main">
              <router-view />
          </el-main>
        </el-container>
      </el-container>
    </div>
  </template>
  
  <script setup>
  import Header from './Header/Header.vue';
  import SideBar from './Sidebar/SideBar.vue';
  import { RouterView } from 'vue-router'

  </script>
  
  <style scoped>
  .common-layout {
      display: flex;
      flex-direction: column;
      width: 100vw;
      height: 100vh;
  }
  
  .container {
      flex: 1;
  }
  .header {
      display: flex;
      background-color: #fff;
      box-shadow: 2px 0px 5px 0px rgba(0, 0, 0, 0.2);
      justify-content: flex-end;
      align-items: center
  }
  .log-out{
      display: flex;
      align-items: center;
      font-size: 1.5rem;
      cursor: pointer;
      margin-left: 15px;
  }
  .log-out p {
      margin: 5px;
  }
  .log-out:hover {
      color: #409EFF;
  }
  .aside {
      background-color: #fff;
      /* border-right: 1px solid rgba(0, 0, 0, 0.5); */
      box-shadow: 2px 0px 5px 0px rgba(0, 0, 0, 0.2);
  }
  
  </style>