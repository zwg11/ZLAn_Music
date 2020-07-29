<template>
  <div id="app">
    <nav-header></nav-header>
    <router-view></router-view>
    <audio-bar></audio-bar>
  </div>
</template>

<script>
import AudioBar from 'components/content/AudioBar'
import NavHeader from 'components/common/NavHeader'
export default {
  name: 'App',
  components: {
    AudioBar,
    NavHeader
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
  /* margin-top: 60px; */
}
</style>
