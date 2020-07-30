<template>
  <div class="list-header">
    <a class="v-hd">{{title}}</a>
    <div class="tab">

      <slot></slot>
    </div>
    <span class="more">
      <a href="javascript:;" v-if="hasMore" @click="toUrl">更多</a>
      <i class="icon">&nbsp;</i>
    </span>
  </div>
</template>
<script>
export default {
  name: 'listHeader',
  props:{
    title:{
      type: String,
      default:'歌单列表'
    },
    hasMore:{
      type:Boolean,
      default:true
    }
  },
  methods:{
    toUrl(){
      this.$emit('to')
    }
  }
}
</script>
<style lang="scss">
.list-header{
  height: 35px;
  line-height: 35px;
  border-bottom: 2px solid #c20c0c;
  margin-bottom: 20px;
  .tab{
    float: left;
  }
  .icon{
    vertical-align: middle;
    background-image: url('~assets/img/index.png');
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-left: 4px;
    background-position: 0 -240px;
  }
}
</style>