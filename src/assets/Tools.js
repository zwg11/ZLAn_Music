export function formatSecond(s){
  s = parseInt(s)
  let minute = Math.floor(s/60);
  let second = s%60;
  let res = (minute < 10 ? '0' + minute:''+minute) + ':' + (second < 10 ? '0' + second:''+second);
  return res;
}
export function getStyle(el){
  return window.getComputedStyle(el)
}

export function debounce(fn, delay){
  let timer = null;
  return function(){
    let that = this, args = arguments
    if(timer !== null) clearTimeout(timer);
    timer = setTimeout(() => {
      fn && fn.apply(that,args)
    }, delay);
  }
}

export function throttle(fn, interval){
  let later = 0;
  return function(){
    let that = this, args = arguments;
    let now = new Date();
    if(now - later > interval){
      later = now;
      fn && fn.apply(that, args)
    }
  }
}