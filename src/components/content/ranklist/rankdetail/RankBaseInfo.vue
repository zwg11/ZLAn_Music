<template>
  <div class="rk-base">
    <div class="img">
      <img src="" alt="">
    </div>
    <div class="info">
      <h3 class="title">

      </h3>
      <div class="abstract"></div>
      <div class="btns"></div>
    </div>
  </div>
</template>
<script>
export default {
  name:'rk-base',
  props:{
    baseinfo:{
      type:Object,
      default:{
        img:'',
        title:'',
        abstract:'',
        
      }
    }
  }
}
</script>