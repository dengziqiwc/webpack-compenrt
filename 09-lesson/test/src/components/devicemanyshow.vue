<template>
    <div>
      <DeviceManyDetail v-for="(device,index) in devices" :key="index" :message="device"></DeviceManyDetail>
    </div>
</template>

<script>
  import DeviceManyDetail from '@/components/devicemanydetail'
    export default {
        name: "devicemanyshow",
        data(){
          return{
              devices:[]
          }
        },
        methods:{

        },
        components:{
          DeviceManyDetail
        },
        mounted() {
          // console.log('数据传递成功',this.$route.params.msg)
          console.log('数据传递成功',this.$store.state.manydevice)
          // this.devices = this.$route.params.msg
          this.devices = this.$store.state.manydevice
          // console.log('数据传递成功',this.devices)
        }
    }
</script>

<style scoped>

</style>
