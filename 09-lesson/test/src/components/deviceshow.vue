<template>
	<div>
      <el-button  type="primary" class="bt">
      <router-link to="/device/create">添加设备</router-link>
      </el-button>
			<el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
		    <el-table-column v-for="(key,index) in key_list"
		      fixed
		      :prop="key"
          :key="index"
		      :label="key"
		      width="180">
		    </el-table-column>

		    <el-table-column
		      label="操作"
		      width="180">
		      <template slot-scope="scope">
		        <el-button @click="handleClick(scope.row)" type="text" size="small" :cc="scope.row">
		        	查看
		        </el-button>
		      </template>
		    </el-table-column>
		  </el-table>
      <div style="margin-top: 20px;float: left">
        <el-button @click="toggleSelection(tableData)">全选</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
        <el-button @click="showmanydevice">
          批量查看
        </el-button>

        <el-popover
          placement="right"
          width="550"
          trigger="click">
          <div class="block">
            <el-date-picker
              v-model="value2"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right">
            </el-date-picker>
            <el-button @click="ExportMany()"type="primary">导出EXCEL</el-button>
          </div>
          <el-button slot="reference">批量导出</el-button>
        </el-popover>
      </div>
	</div>
</template>
<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import $ from 'jquery'
	export default{
		name:'deviceshow',
		data(){
			return{
          key_list:[],
					tableData:null,
          multipleSelection: [],
           pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value2: ''

			}
		},
		methods:{
		  ExportMany(){
		    console.log(this.value2);
		    console.log(this.multipleSelection)
        this.$axios.post('http://192.168.1.30:8000/api/exportmany/',{start_time:this.value2[0],end_time:this.value2[1],data_list:this.multipleSelection})
        .then(function (res) {
            console.log('000000000000',res.data.name)
            $.each(res.data.name,function (key,value) {
                let url = 'http://192.168.1.30:8000/media/'+ value
                window.open(url)
            })
        })
        .catch(function (error) {
            console.log(error)
        })
      },
			handleClick(row) {
        	console.log(row);
        	console.log('只要。。。。。。。。。。。。。。。',row.产品名,row.设备名)
        	this.$router.push({name:'detail',params:{id:row.产品名,pkey:row.设备名}})
      		},
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      showmanydevice(){
		    // alert(11111111)
        this.$store.state.manydevice=this.multipleSelection
		    console.log('成功',)
		    this.$router.push({name:'showdevices'})
		    // this.$router.push({name:'showdevices',params:{msg:['1','2']}})
        // this.$router.push({name:'showdevices',params:{msg:['1','2']}})
        // this.$router.push({path:'/devices/many/',query:{msg:['1','2']}})
        console.log(this.multipleSelection)

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
				$.each(that.tableData[0],function (key,value) {
				  if (key!=='pk'){
				    that.key_list.push(key)
          }

        })
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
.bt{
  float: left;
}
</style>
