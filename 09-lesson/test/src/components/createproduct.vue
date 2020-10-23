<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="产品名" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: "createproduct",
    data() {
      return {
        ruleForm: {
          name: '',
        },
        rules: {
          name: [
            {required: true, message: '请输入产品名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        let that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(that.ruleForm.name);
            this.$axios.post('http://192.168.1.30:8000/api/product/create',{productname:that.ruleForm.name})
            .then(function (res) {
                console.log(res)
                that.$router.push({path:'/'})
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
.demo-ruleForm{
  width: 30%;
}
</style>
