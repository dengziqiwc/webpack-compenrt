<template>
	<div>
			<el-table
		    :data="tableData"
		    border
		    style="width: 70%">
		    <el-table-column
		      fixed
		      prop="devicename"
		      label="devicename"
		      width="150">
		    </el-table-column>
		    <el-table-column
		      prop="devicesecret"
		      label="devicesecret"
		      width="120">
		    </el-table-column>
		    <el-table-column
		      prop="productname"
		      label="productname"
		      width="120">
		    </el-table-column>
		    <el-table-column
		      fixed="right"
		      label="操作"
		      width="100">
		      <template slot-scope="scope">
		        <el-button @click="handleClick(scope.row)" type="text" size="small" :cc="scope.row">
		        	查看
		        </el-button>
		      </template>
		    </el-table-column>
		  </el-table>

		  <!-- <table class="table table-hover">
		  	<tr>
		  		<th>id</th>
		  		<th>devicename</th>
		  		<th>devicesecret</th>
		  		<th>productname</th>
		  		<th>操作</th>
		  	</tr>
		  	<tr v-for="(item,value,index) in tableData[0]">
		  		<td>{{value}}</td>
		  		
		  	</tr>
		  	<!-- <tr v-for="item in tableData">
		  		<td>{{item.pk}}</td>
		  		<td>{{item.devicename}}</td>
		  		<td>{{item.devicesecret}}</td>
		  		<td>{{item.productname}}</td>
		  		<td><router-link :to="`/deviceshow/devicedetail/${item.pk}/${item.productname}`">查看</router-link></td>
		  	</tr>
		  </table> --> 
	</div>
</template>
<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import $ from 'jquery'
	export default{
		name:'deviceshow',
		data(){
			return{

					tableData:null,
					
			}
		},
		methods:{
			handleClick(row) {
			
        	console.log(row);
        	this.$router.push({name:'detail',params:{id:row.pk,pkey:row.devicename}})
      		},
      		
		},
		mounted(){

			var that = this
			this.$axios.get('http://192.168.1.30:8000/api/deviceshow/').then(function(res){
				that.cc = res
				if(that.cc.data.code = 1){
					that.tableData = that.cc.data.data
					console.log(that.tableData,typeof(that.tableData))
				}
			})
			
			// console.log('fffffffffffffff')
			//  $.each(that.tableData,function(key,val){
   //     //回调函数有两个参数,第一个是元素索引,第二个为当前值
			//     console.log(key,val)
			// });

		}
	}
</script>
<style>
	
</style>