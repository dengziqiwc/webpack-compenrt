<template>
  <div>
    <el-card class="box-card" style="float:left">
      <div slot="header" class="clearfix">
        <span style="font-size:25px">当前温度</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="dataHander(t)">
          查看数据
        </el-button>
      </div>
      <div>
		  		<span class="length0_9_2h1PN" aria-haspopup="true" aria-expanded="false" style="font-size:28px">{{currentT}}
		  			<span style="color: rgb(51, 51, 51); margin-left: 4px;">°C</span>
		  		</span>
      </div>
      <time class="time">{{ currentTDate }}</time>
    </el-card>

    <el-card class="box-card" style="float:right">
      <div slot="header" class="clearfix">
        <span style="font-size:25px">当前湿度</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="dataHander(h)">
          查看数据
        </el-button>
      </div>
      <div>
		  		<span class="length0_9_2h1PN" aria-haspopup="true" aria-expanded="false" style="font-size:28px">{{currentH}}
		  			<span style="color: rgb(51, 51, 51); margin-left: 4px;">%</span>
		  		</span>
      </div>
      <time class="time">{{ currentHDate }}</time>
    </el-card>

    <div class="model" v-show="isShowMultiple">
      <div class="modelFixed" ref="child">
        <el-form :inline="true" style="margin-top:30px;">
          <el-row>
            <el-col :span="12">
              <el-form-item label="请输入查询条件：">
                <div class="block">
                  <span class="demonstration">开始时间</span>
                  <el-date-picker
                    v-model="start_time"
                    type="datetime"
                    placeholder="选择日期时间"
                    align="right"
                    :picker-options="pickerOptions">
                  </el-date-picker>
                </div>
                <div class="block">
                  <span class="demonstration">结束时间</span>
                  <el-date-picker
                    v-model="end_time"
                    type="datetime"
                    placeholder="选择日期时间"
                    align="right"
                    :picker-options="pickerOptions">
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="2" style="text-align: right;padding-right:10px;">
              <el-button-group>
                <el-button type="primary" size="small" icon="el-icon-search" @click="queryDeviceData()">查询
                </el-button>
              </el-button-group>
            </el-col>

            <el-col :span="3">
              <el-popover
                placement="top"
                width="160"
                v-model="visible">
                <p>选择导出的格式</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="primary"  @click="exportToExcel(mxls)">xls</el-button>
                  <el-button type="primary" size="mini" @click="exportToExcel(mxlsx)">xlsx</el-button>
                </div>
                <el-button slot="reference" type="primary" size="small">导出Excel</el-button>
              </el-popover>

<!--              <el-button type="primary" size="small" @click="exportToExcel()">导出Excel</el-button>-->
            </el-col>
            <el-col :span="3">
              <el-button type="primary" size="small" @click="exportchart()">导出图表</el-button>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" size="small" @click="closeHander">关闭</el-button>
            </el-col>
          </el-row>
        </el-form>
        <el-table
          v-show="tablestatu"
          :data="tableData"
          height="250"
          border
          style="width: 100%">
          <el-table-column v-for="(key,index) in key_list" :key="index" :prop="key" :label="key" width="180">
          </el-table-column>
        </el-table>
        <highcharts v-show="chartstatu" :options="chartOptions" :callback="myCallback"></highcharts>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'

  export default {
    name: 'devicedetail',
    data() {
      return {
        mxls:'xls',
        mxlsx:'xlsx',
        t: 1,
        h: 2,
        tablestatu:false,
        chartstatu:false,
        currentAim: null,
        tableData: null,
        end_time: '',
        start_time: '',
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value1: '',
        value2: '',
        value3: '',

        // currentT:'--',
        // currentH:'--',
        // currentHDate:'--',
        // currentTDate:'--',
        currentT: null,
        currentH: null,
        currentHDate: null,
        currentTDate: null,
        isShowMultiple: false,
        baseURL: 'http://192.168.1.30:8000/',
        key_list: [],
        chartOptions: {
          title: {
            text: "物联网数据"
          },
          subtitle: {
            text: "数据来源：物联网平台"
          },
          xAxis: {

            categories: []
          },
          yAxis: {
            title: {
              text: "湿度"
            }
          },
          legend: {
            layout: "vertical",
            align: "right",
            verticalAlign: "middle"
          },

          series: [
            {
              name: "湿度",
              data: []
            },

          ],
          responsive: {
            rules: [
              {
                condition: {
                  maxWidth: 500
                },
                chartOptions: {
                  legend: {
                    layout: "horizontal",
                    align: "center",
                    verticalAlign: "bottom"
                  }
                }
              }
            ]
          }
        },
        sethum:null,
        settem:null

      }
    },
    mounted() {
      // console.log(this.$)
      // this.axios.get('http://127.0.0.1:8000')
      // this.$route.params.id
      // console.log(this.$route.params.pkey)
      console.log(this.$route.params.id)
      this.sethum = setInterval(this.getCurrentH, 5000)
      this.settem = setInterval(this.getCurrentT, 5000)

    },
    methods: {
      getCurrentH() {
        var that = this
        this.$axios.get('http://192.168.1.30:8000/api/getcurrenth')
          .then(function (res) {
            // console.log(res)
            // console.log(res)
            that.currentH = res.data.currenth
            // console.log(res.data.currentTime)
            that.currentHDate = res.data.currentTime.replace('T', ' ')
            // console.log('11111111111', that.currentHDate, typeof (that.currentHDate))
          })
      },
      getCurrentT() {
        var that = this
        this.$axios.get('http://192.168.1.30:8000/api/getcurrentt')
          .then(function (res) {
            // console.log(res.data.currentTime)
            that.currentT = res.data.currentt
            console.log(that.currentT)
            that.currentTDate = null
            that.currentTDate = res.data.currentTime.replace('T', ' ')


          })
      },
      queryDeviceData() {
        this.chartstatu=false
        this.tablestatu=true
        console.log('开始了')
        var that = this
        if (this.currentAim === 2) {
          console.log('是湿度')
          this.$axios.post('http://192.168.1.30:8000/api/querydevicedata/humidity', {
            id: that.$route.params.id,
            start_time: that.start_time,
            end_time: that.end_time,
          })
            .then(function (res) {
              var cc = res.data.data
              let hum_list = []
              console.log(typeof (cc), cc)
              $.each(cc, function (key, value) {
                // console.log(1111)
                // console.log(key,value)
                hum_list.push(value)
              })
              that.tableData = hum_list
              let kk = []
              $.each(hum_list[0], function (key, value) {
                kk.push(key)
              })
              that.key_list = kk
              console.log(that.key_list)
              // var data = JSON.parse(res.data.data)

              // let cc = []
              //  $.each(data,function(key,val){
              //      //回调函数有两个参数,第一个是元素索引,第二个为当前值
              // 	    // console.log(key,val)
              // 	    console.log(val.fields)
              // 	    cc.push(val.fields)
              // 	});
              //  that.tableData = cc
            })
            .catch(function (error) {
              console.log(error)
            })
        } else {
          this.$axios.post('http://192.168.1.30:8000/api/querydevicedata/temperature', {

            start_time: that.start_time,
            end_time: that.end_time,
          })
            .then(function (res) {
              var tem = res.data.data
              let tem_list = []
              $.each(tem, function (key, value) {
                // console.log(1111)
                // console.log(key,value)
                tem_list.push(value)
              })
              that.tableData = tem_list
              console.log(tem_list[0])
              let kk = []
              $.each(tem_list[0], function (key, value) {
                console.log(key, value)
                kk.push(key)
              })
              that.key_list = kk
              console.log(that.key_list)
            })
            .catch(function (error) {
              console.log(error)
            })
        }


      },
      dataHander(res) {
        console.log('hello', res)
        this.currentAim = res
        // if(this.currentAim===2){
        // 	console.log('是湿度')
        // }
        this.isShowMultiple = true
      },
      closeHander() {
        this.isShowMultiple = false
      },
      setMaskShow(e) {
        if (!this.$refs.child.contains(e.target)) {
          this.isShowMultiple = false;
        }
      },
      getHT() {
        this.$axios.get('127.0.0.1')
      },
      exportToExcel(msg)
      {
        console.log(msg)
        console.log('开始导出')
        console.log(this.currentAim)
        let that = this
        let purl = null
        if (this.currentAim === 2) {
          purl = 'http://192.168.1.30:8000/excel/export/humidity'
        }else {
          purl = 'http://192.168.1.30:8000/excel/export/temperature'
        }
        this.$axios.post(purl, {
          msg:msg,
          // id: that.$route.params.id,
          start_time: that.start_time,
          end_time: that.end_time,
        })
          .then(res => {
            if (res.data.code === 1) {
              //拼接excel 的完整URL
              let url = that.baseURL + 'media/' + res.data.name;
              //下载
              console.log('只要',url)
              window.open(url);
            } else {
              that.$message.error("导出Excel出现异常！");
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      exportchart(){
        this.tablestatu=false
        this.chartstatu=true
         console.log('开始了')
      let that = this
        let hum_list = []
        let time_list = []
      this.$axios.post('http://192.168.1.30:8000/api/chart/test',{

          start_time: that.start_time,
          end_time: that.end_time,
        })
        .then(function (res) {
          var devices_data = res.data.data
          $.each(devices_data, function (key, value) {
            console.log(key, value)
            // console.log(that.chartOptions.series)
            hum_list.push(value.t0_CurrentHumidity)
            time_list.push(value.t0_time_before.replace('T', ' '))

          })
          that.chartOptions.series[0].data = hum_list
          that.chartOptions.xAxis.categories = time_list
        })
        .catch(function (error) {
          console.log(error)
        })
      },
      myCallback() {
        console.log("this is callback function");
      },
    },
    destroyed() {
      console.log('结束了')
      clearInterval(this.sethum)
      clearInterval(this.settem)
    }
  }
</script>

<style>

  .model {
    width: 1000px;
    height: 1000px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    margin-bottom: 200px;
  }

  .modelFixed {
    position: absolute;
    top: 120px;
    left: 200px;
    padding: 5px;
    background: #ffffff;
    box-shadow: 3px 2px 5px #7777;
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }

  .el-table .cell {
    line-height: 14px;
  }

  .highcharts-container {
    width: 600px;
    height: 400px;
    border: 1px solid #ddd;
    margin: auto;
  }
</style>
