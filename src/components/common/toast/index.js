import Toast from './Toast.vue'
const obj = {}

obj.install = function(Vue){
  console.log('audio 插件');
  const toastCor = Vue.extend(Toast)
  const Toast1 = new toastCor();
  Toast1.$mount(document.createElement('div'));
  
  document.body.appendChild(Toast1.$el)

  Vue.prototype.$toast = Toast1
}
export default obj