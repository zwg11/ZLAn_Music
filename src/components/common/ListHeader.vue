<template>
  <div class="list-header">
    <a class="v-hd fl" :class="{'plt':hasplt}">{{title}}</a>
    <div class="fl">
      <slot></slot>
    </div>
    <span class="fr">
      <slot name="more"></slot>
    </span>
  </div>
</template>
<script>
export default {
  name: "listHeader",
  props: {
    title: {
      type: String,
      default: "歌单列表",
    },
    hasplt: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    
  }
};
</script>
<style lang="scss" scoped>
@import 'assets/css/base.scss';
@import 'assets/css/config.scss';
.list-header {
  height: 35px;
  width: 100%;
  line-height: 35px;
  border-bottom: 2px solid $colorA;
  margin-bottom: 20px;
  .plt,.icon {
    background-image: url("~assets/img/index.png");
    vertical-align: middle;
  }
  .plt{
    padding: 0 10px 0 34px;
    background-position: -225px -156px;
  }
  .v-hd {
    height: 33px;
    font-size: 20px;
  }
  .more {
    float: right;
  }

}
</style>