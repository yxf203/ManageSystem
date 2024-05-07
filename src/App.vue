<script setup>
import {RouterView} from 'vue-router';
</script>

<template>
  <div class="wrapper">
    <router-view></router-view>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  position: relative;
  flex-direction: column;
  /* justify-content: center; */
  width: 100vw;
  height: 100vh;
  /* background-color: antiquewhite; */
  overflow: hidden;
}
</style>
