<template>
  <div class="discover">
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
  }
}
</script>
