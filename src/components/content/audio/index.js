import AudioBar from './AudioBar.vue'
const obj = {}

obj.install = function(Vue){
  console.log('audio 插件');
  const audioCor = Vue.extend(AudioBar)
  const Audio = new audioCor();
  Audio.$mount(document.createElement('div'));
  
  document.body.appendChild(Audio.$el)

  Vue.prototype.$audio = Audio
}
export default obj