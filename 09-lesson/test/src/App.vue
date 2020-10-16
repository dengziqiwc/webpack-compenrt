<template>
  <el-container>
  <el-header style="height:100px">物联网管理平台</el-header>
  <el-container>
    <el-aside width="200px">
      <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">
        <router-link to="/">产品</router-link>
      </span>
      </el-menu-item>
      
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">
        <router-link to="/deviceshow">设备</router-link>   
      </span>
      </el-menu-item>
      
   
    </el-menu>
    </el-aside>
    <el-container>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer style="height:30px">Footer</el-footer>
    </el-container>
  </el-container>
</el-container>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
  },
  components:{
  
  }
}
</script>

<style>
  html,body,#app,.el-container{
    margin: 0px;
    padding:0px;
    height: 100%;
}

  .el-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: left;
    line-height: 80px;
    font-size:20px;
    fonr-weight:bold;
  }
  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 30px;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 20px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
