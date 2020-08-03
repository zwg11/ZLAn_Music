<template>
  <div class="board">
    <list-header
      title="榜单"
      :hasMore='true'
      @to='toMore'
    ></list-header>
    <div class="bds">

      <div class="bd" v-for="(rk,ind) in rkList" :key="ind">
        <simple-list :title="rk.name" :rankId='String(rk.id)'></simple-list>
      </div>
    </div>
  </div>
</template>
<script>
import ListHeader from 'components/common/ListHeader.vue'

import SimpleList from 'components/common/board/SimpleList.vue'
import {_getRankList} from 'network/discover.js'
export default {
  name: 'board',
  props:{

  },
  data(){
    return{
      rkList:[]
    }
  },
  components:{
    SimpleList,
    ListHeader
  },
  created(){
    // 获取榜单
    _getRankList().then(res=>{
      console.log(res);
      this.rkList = res.list.slice(0,3)
      console.log(typeof this.rkList[0].id);
    }).catch(err=>{
      console.log(err);
    })
  },
  methods:{
    toMore(){
      console.log('to more');
    }
  }
}
</script>
<style lang="scss">
.board{
  margin-bottom: 50px;
  .bds{
    display: flex;
    flex-direction: row;
    align-items: center;
    .bd{
      width: 33%;
      // flex: 1;
    }
  }
}
</style>