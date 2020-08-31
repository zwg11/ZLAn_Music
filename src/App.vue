<template>
  <div id="app">
    <nav-header></nav-header>
    <keep-alive>

      <router-view></router-view>
    </keep-alive>
    <nav-footer></nav-footer>
    <!-- <audio-bar></audio-bar> -->
  </div>
</template>

<script>
// import AudioBar from 'components/content/audio/AudioBar'
import NavHeader from 'components/common/NavHeader'
import NavFooter from 'components/common/NavFooter'
export default {
  name: 'App',
  components: {
    // AudioBar,
    NavHeader,
    NavFooter
  }
}
</script>

<style lang="scss">
@import "assets/css/reset.scss";
@import "assets/css/base.scss";
body,html{
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  // background-color: #f7f7f7;
  /* margin-top: 60px; */
}
</style>
