<template>
<div class="pager">

  <span class="total">共{{this.pagerCount}}页</span>
  <ul class="pager-list" @click="pagerClick">
    <li class="pre" :class="{disablePrev}">&lg;</li>
    <li 
      class="page" 
      v-for="num in pagers" 
      :key="num"
      :class="{'active':currentPage == num}"
      >{{num}}</li>
    <li class="nxt" :class="{disableNext}">&gt;</li>
  </ul>
</div>
</template>
<script>
export default {
  name:'nav-footer',
  props:{
    currentPage:Number, // 当前页
    pageCount:Number, // 显示的页数
    pagerCount:Number // 总页数
  },
  data(){
    return{
      // pages:[] // 要显示的页
    }
  },
  methods:{
    pagerClick(e){
      let el = e.target;
      let elClass = el.className;
      if(elClass.indexOf('nxt') > -1){
        this.currentPage++;
        this.$emit('toNextPage')
      }else if(elClass.indexOf('pre') > -1){
        this.currentPage--;
        this.$emit('toPrePage')
      }else{
        this.currentPage = parseInt(el.innerText);
        this.$emit('toPage',this.currentPage)
      }
    }
  },
  computed:{
    pagers(){
      const pagerCount = this.pagerCount;
      const pageCount = this.pageCount;
      const halfPageOffset = (pageCount - 1) / 2;

      const currentPage = this.currentPage;

      let showPrevMore = false;
      let showNextMore = false;

      const array = [];
      // 判断当前页在整个页范围的哪部分，是否要改array
      // 如果当前要显示的页数小于总页数
      if (pageCount < pagerCount) {
        
        const startPage = currentPage - Math.floor(halfPageOffset);
        const endPage = currentPage + Math.floor(halfPageOffset);
        // 要开始的页面num大于0且结束的页面小于最大页数
        if (startPage > 0 && endPage <= pagerCount) {
          for (let i = startPage; i <= endPage; i++) {
            array.push(i);
          }
        } else if (startPage <= 0) { 
          // 如果开始页面小于1，开始页面从1开始
          for (let i = 1; i <= pageCount; i++) {
            array.push(i);
          }
        } else if (endPage > pagerCount) {
          // 结束页面大于最大页数，结束页面固定
          for (let i = pagerCount - pageCount + 1 ; i <= pagerCount; i++) {
            array.push(i);
          }
        }
      }else{ // r
        for (let i = 1; i <= pagerCount; i++) {
            array.push(i);
          }
      }


      return array;


    },
    disablePrev(){
      return this.currentPage === 1;
    },
    disableNext(){
      return this.currentPage === this.pagerCount;
    }
  }
}
</script>
<style lang='scss'>
.pager{
  background-color: #f2f2f2;
  border-top: 1px solid #c9c8c8;
  height: 170px;
  .pager-list{
    li{
      background-color: $colorG;
      &:hover, &.active{
        background-color: $colorA;
        color: $colorK;
      }
    }
  }
  .pre.disablePrev, .nxt.disableNext{
    cursor: not-allowed;
    pointer-events: none;
    background-color: $colorG;
    color: $colorD;
  }
}
</style>