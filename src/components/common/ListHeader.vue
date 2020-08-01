<template>
  <div class="list-header">
    <a class="v-hd">{{title}}</a>
    <div class="l-tab">
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
  name: "listHeader",
  props: {
    title: {
      type: String,
      default: "歌单列表",
    },
    hasMore: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    toUrl() {
      this.$emit("to");
    },
  },
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
  .l-tab {
    float: left;
  }
  .v-hd,.icon {
    background-image: url("~assets/img/index.png");
    vertical-align: middle;
  }
  .v-hd {
    float: left;
    height: 33px;
    font-size: 20px;
    padding: 0 10px 0 34px;
    background-position: -225px -156px;
  }
  .more {
    float: right;
    a {
      color: black;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .icon {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-left: 4px;
    background-position: 0 -240px;
  }
}
</style>