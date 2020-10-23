<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="设备名" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>

    <el-form-item label="可选产品" prop="products">
      <el-select v-model="ruleForm.products" placeholder="请选择产品">
        <el-option v-for="(item,index) in product_list" :key="index" :label="item" :value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import $ from 'jquery'
  export default {
    name: "createdevice",
    data() {
      return {
        product_list:[],
        ruleForm: {
          name: '',
          products: '',

        },
        rules: {
          name: [
            {required: true, message: '请输入产品名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          products: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
        }
      };
    },
    mounted() {
      let that = this
      this.$axios.get('http://192.168.1.30:8000/api/product/all')
      .then(function (res) {
          console.log(res.data.data)
        let p_list = []
        $.each(res.data.data,function (key,value) {
              p_list.push(value.productname)
        })
        that.product_list = p_list
      })
      .catch(function (error) {
          console.log(error)
      })
    },
    methods: {
      submitForm(formName) {
        let that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(that.ruleForm.name,that.ruleForm.products);
            this.$axios.post('http://192.168.1.30:8000/api/device/create', {devicename: that.ruleForm.name,productname:that.ruleForm.products})
              .then(function (res) {
                console.log(res)
                that.$router.push({path: '/deviceshow'})
              })
              .catch(function (error) {
                console.log(error)
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        console.log(this.$refs)
        console.log(this.$refs[formName])
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
  .demo-ruleForm {
    width: 30%;
  }
</style>
