<template>
  <div class="new-record">
    <list-header
      title="新碟上架"
      :hasMore='true'
      @to='toMore'
    ></list-header>
    <div class="rds-block">
      <a href="javascript:;" class="pre"></a>
      <ul class="rd-list">
        <li v-for="(rd,ind) in rdsList" :key="ind">
          <record :rdInfo='rd'></record>
        </li>
      </ul>
      <a href="javascript:;" class="next"></a>
    </div>
  </div>
</template>
<script>
import ListHeader from 'components/common/ListHeader.vue'
import Record from 'components/common/album/Record.vue'
export default {
  name: 'newRecord',
  components:{
    ListHeader,
    Record
  },
  props:{
    rdsList:{
      type:Array,
      default:()=>[]
    }
  },
  data(){
    return{
      rds:[],
    }
  },
  methods:{
    toMore(){
      this.$bus.$emit('discoverToChild',5)
    }
  }
}
</script>
<style lang="scss">
@import 'assets/css/base.scss';
@import 'assets/css/config.scss';
  .new-record{
    margin-bottom: 50px;
    .rds-block{
      position: relative;
      background-color: $colorBg;
      border: 1px solid $colorD;
      padding: 20px 35px 20px 20px;
    }
    .pre, .next{
      background-image:  url('~assets/img/index.png');
      
      width: 17px;
      height: 17px;
    }
    .pre{
      position: absolute;
      top: 40%;
      left: 0;
      background-position: -260px -75px;
      &:hover{
        background-position: -280px -75px;
      }
    }
    .next{
      position: absolute;
      top: 40%;
      right: 0;
      background-position: -300px -75px;
      &:hover{
        background-position: -320px -75px;
      }
    }
    .rd-list{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>