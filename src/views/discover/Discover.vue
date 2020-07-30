<template>
  <div class="discover">
    <keep-alive>

      <router-view></router-view>
    </keep-alive>
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
