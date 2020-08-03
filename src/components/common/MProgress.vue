<template>
  <div class="m-progress" ref="tolPg">
    <div class="cur" ref="curPg">
      <div id="btn"></div>
    </div>
  </div>
</template>
<script>
import {getStyle} from 'assets/Tools.js'
export default {
  name: 'MProgress',
  props:{
    scale:{ // 当前进度
      type:Number,
      default: 0.0
    },
    isDragEnable:{
      type:Boolean,
      default: false
    }
  },
  data(){
    return{
      sx:0, // 记录鼠标按住btn的起点
      sw:0, // 记录拖拽时的
      isOnDrag:false
    }
  },
  mounted(){
    console.log(document.querySelector('.cur'));
    document.querySelector('.cur').style.width = (this.scale * 100) + '%'
  },
  methods:{
    changeScale(e){
      this.isOnDrag = true;
      this.sx = e.clientX;
      this.sw = parseInt(window.getComputedStyle(document.querySelector('.cur')).width, 10);
      
      document.documentElement.addEventListener('mousemove', this.onDrag)
      document.documentElement.addEventListener('mouseup', this.stopDrag)
      
    },
    onDrag(e){
      let newWidth = this.sw + e.clientX - this.sx;
      document.querySelector('.cur').style.width = newWidth + 'px';
    },
    stopDrag(){
      document.documentElement.removeEventListener('mousemove', this.onDrag);
      document.documentElement.removeEventListener('mouseup', this.stopDrag);
      // 更新scale为当前宽度除以总宽度
      const scale = parseInt(getStyle('.cur').width)/parseInt(getStyle('.m-progress').width);
      // 通知父组件
      this.$emit('scaleChange', scale);
      this.isOnDrag = false;
    }
  },
  watch:{
    scale(newVal){
      // 如果新值大于0且按钮没有被拖拽
      if(parseFloat(newVal) > 0 && !this.isOnDrag){
        // 设置当前进度条长度
        // console.log(`scale:${newVal}`);
        document.querySelector('.cur').style.width = `${newVal * 100}%`
      }
    },
    isDragEnable:{
      handler(newVal){
        let btn = document.getElementById('btn');
        // console.log(newVal);
        if(newVal){
          btn.addEventListener('mousedown', this.changeScale)
        }else{
          btn.removeEventListener('mousedown', this.changeScale)
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.m-progress{
  width: 100%;
  height: 100%;
}
.cur{
  position: relative;
  max-width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #c20c0c;
  border-radius: 4px;
}
#btn{
  position: absolute;
  box-sizing: border-box;
  height: 12px;
  width: 12px;
  background-color: #c20c0c;
  border: 4px solid whitesmoke;
  border-radius: 50%;
  right: -5px;
  cursor: pointer;

}
</style>