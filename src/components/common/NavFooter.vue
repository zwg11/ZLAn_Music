<template>
  <div class="nav-footer">
    <div class="container"></div>
  </div>
</template>
<script>
export default {
  name:'nav-footer',
  data(){
    return{
    }
  }
}
</script>
<style lang='scss'>
.nav-footer{
  background-color: #f2f2f2;
  border-top: 1px solid #c9c8c8;
  height: 170px;
  .container{
    background: url('~assets/img/foot.png') no-repeat;
    height: 100%;
  }
}
</style>