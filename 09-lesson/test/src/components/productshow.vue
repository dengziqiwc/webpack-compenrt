<template>
	<div>

    <el-button  type="primary" class="bt">
      <router-link to="/createproduct">添加产品</router-link>
    </el-button>
    <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column v-for="(key,index) in key_list"
      :prop="key"
      :key="index"
      :label="key"
      width="180">
    </el-table-column>
	</el-table>
	</div>
</template>
<script>
  import $ from 'jquery'
	export default{
		name:'prouctshow',
		data(){
			return{
					tableData:null,
          key_list:[]
			}
		},
		mounted(){
			console.log(12)
			let that = this
			this.$axios.get('http://192.168.1.30:8000/api/productshow/').then(function(res){
				that.cc = res
				console.log(that.cc.data.code)
				if(that.cc.data.code = 1){
					console.log(that.cc.data.data)
					that.tableData = that.cc.data.data
				}
				$.each(that.tableData[0],function (key,value) {
          that.key_list.push(key)
        })
			})
		}
	}
</script>
<style>
.bt{
  float: left;
}
</style>
