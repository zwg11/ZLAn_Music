<template>
  <div class="leaderboard">
    <list-header
      title="新碟上架"
      :hasMore='true'
      @to='toMore'
    ></list-header>
    <div class="boards">
      <dl>
        <dt></dt>
        <dd class="m-board">
          <ol>
            <li class="m-num" v-for="(bd,index) in boards" :key="index" :class="{'top':index<3}"></li>
          </ol>
          <div class="more">
            <a href="javascript:;">查看全部></a>
          </div>
        </dd>
      </dl>
    </div>
  </div>
</template>
<script>
import ListHeader from 'components/common/ListHeader.vue'
export default {
  name: 'leaderboard',
  components:{
    ListHeader,
  },
  props:{
    boards:{
      type:Array,
      default:()=>[[],[],[]]
    }
  },
  data(){
    return{
    }
  },
  methods:{
    toMore(){
      this.$bus.$emit('discoverToChild',1)
    }
  }
}
</script>
<style lang="scss">
@import 'assets/css/base.scss';
@import 'assets/css/config.scss';
  .leaderboard{
    .m-board ol{
      margin-left: 50px;
      line-height: 32px;
      height: 32px;
      

    }
    .m-num,.more{
      height: 32px;
    }
    .top{
      color: #c10d0c;
    }
    .more{
      padding-right: 32px;
      text-align: right;
    }
    .ply,.add.fv{
      background-image: url("~assets/img/index.png");
    }
    .ply{
      background-position: -267px -268px;
      &:hover{
        background-position: -267px -268px;
      }
    }
    .add{
      background-position: 0 -700px;
      &:hover{
        background-position: -267px -268px;
      }
    }
    .fv{
      background-position: -297px -268px;
      &:hover{
        background-position: -267px -268px;
      }
    }
  }
</style>