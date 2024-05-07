<template>
    <div id="container">
        <div class="headerNav">
                <Header></Header>
        </div>
        <div class="mainWrapper">
            <div class="sidebarWrapper">
                <SideBar></SideBar>
            </div>
            <div class="rightWrapper">
                <RouterView></RouterView>
            </div>
        </div>
    </div>

</template>

<script setup>
import SideBar from './Sidebar/SideBar.vue';
import Header from './Header/Header.vue';
import { RouterView } from 'vue-router';
</script>

<style scoped>
#container {
    height: 100%;
}
.sidebarWrapper {
    width: 250px;
    height: 100%;
    background-color: #fff;
    border-right: 1px solid rgba(0, 0, 0, 0.3);
    /* box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3); */
}
.mainWrapper{
    width: 100%;
    height: 100%;
    display: flex;
}
.headerNav {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: flex-end;
    background-color: #fff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
}
.rightWrapper{
    flex: 1;
}
</style>