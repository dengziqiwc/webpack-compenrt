<template>
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">产品</span>
      </el-menu-item>
      
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">设备</span>
      </el-menu-item>
      
   
  	</el-menu>
</template>
<script>
	export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style>
	
</style>