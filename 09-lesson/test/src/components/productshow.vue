<template>
	<div>
		  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="productkey"
      label="productkey"
      width="180">
    </el-table-column>
    <el-table-column
      prop="productname"
      label="productname"
      width="180">
    </el-table-column>
    <el-table-column
      prop="productsecret"
      label="productsecret">
    </el-table-column>
	</el-table>
	</div>
</template>
<script>
	export default{
		name:'prouctshow',
		data(){
			return{

					tableData:null
					// [{
			  //         date: '2016-05-02',
			  //         name: '王小虎',
			  //         address: '上海市普陀区金沙江路 1518 弄'
			  //       }, {
			  //         date: '2016-05-04',
			  //         name: '王小虎',
			  //         address: '上海市普陀区金沙江路 1517 弄'
			  //       }, {
			  //         date: '2016-05-01',
			  //         name: '王小虎',
			  //         address: '上海市普陀区金沙江路 1519 弄'
			  //       }, {
			  //         date: '2016-05-03',
			  //         name: '王小虎',
			  //         address: '上海市普陀区金沙江路 1516 弄'
			  //       }]
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
			})
		}
	}
</script>
<style>
	
</style>