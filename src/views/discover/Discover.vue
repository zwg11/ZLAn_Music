<template>
  <div class="discover">
    <keep-alive>

    </keep-alive>
      <router-view></router-view>
  </div>
</template>
<script>

export default {
  name: 'discover',
  data(){
    return{
      banners:[]
    }
  },
  watch:{
    'route'(to,from){
      this.$router.go(0)
      // console.log('路由变了');
      // let that = this;
      // if(to.params.id != from.params.id){
      //   initContent(to.params.id)
      // }
    }
  }
}
</script>
