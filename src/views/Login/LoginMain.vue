<template>
    <div class="wholeWrapper">
        <div class="boxWrapper">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
</script>

<style scoped>
.wholeWrapper {
    display: flex;
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.3) no-repeat center;
    background-size: cover;
    justify-content: flex-end;
    align-items: center;
}

.boxWrapper {
    display: flex;
    width: 550px;
    height: 450px;
    margin-right: 300px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 30px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
}
</style>