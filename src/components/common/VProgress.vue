<template>
  <div class="vprogress" ref="tolPg">
    <div id="vcur" ref="curPg">
      <div id="vbtn"></div>
    </div>
  </div>
</template>
<script>
import {getStyle} from 'assets/Tools.js'
export default {
  name: 'MProgress',
  data(){
    return{
      scale:0.5,
      sx:0, // 记录鼠标按住btn的起点
      sw:0, // 记录拖拽时的
      isOnDrag:false
    }
  },
  mounted(){
    document.querySelector('#vcur').style.width = (this.scale * 100) + '%';
    let btn = document.getElementById('vbtn');
    btn.addEventListener('mousedown', this.changeScale)
  },
  methods:{
    changeScale(e){
      this.isOnDrag = true;
      this.sx = e.clientX;
      this.sw = parseInt(window.getComputedStyle(document.querySelector('#vcur')).width, 10);
      
      document.documentElement.addEventListener('mousemove', this.onDrag)
      document.documentElement.addEventListener('mouseup', this.stopDrag)
      
    },
    onDrag(e){
      let newWidth = this.sw + e.clientX - this.sx;
      document.querySelector('#vcur').style.width = newWidth + 'px';
      // 更新scale为当前宽度除以总宽度
      this.scale = parseInt(getStyle('#vcur').width)/parseInt(getStyle('.vprogress').width);
      // 通知父组件
      this.$emit('volChange', this.scale);
    },
    stopDrag(){
      document.documentElement.removeEventListener('mousemove', this.onDrag);
      document.documentElement.removeEventListener('mouseup', this.stopDrag);
      this.isOnDrag = false;
    }
  },
  // watch:{
  //   scale(newVal){
  //     // 如果新值大于0且按钮没有被拖拽
  //     if(newVal > 0 && !this.onDrag){
  //       // 设置当前进度条长度
  //       // console.log(`scale:${newVal}`);
  //       document.querySelector('#vcur').style.width = `${newVal * 100}%`
  //     }
  //   }
  // }
}
</script>
<style lang="scss" scoped>
.vprogress{
  width: 100%;
  height: 100%;
}
#vcur{
  position: relative;
  max-width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #c20c0c;
  border-radius: 4px;
}
#vbtn{
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