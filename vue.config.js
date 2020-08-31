module.exports = {
  // css相关配置
  css: {
    /* 为预处理器loader传递自定义选项 */
    loaderOptions: {
      scss: {
        additionalData: `@import "assets/css/config.scss";`
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        'components' : '@/components',
        'content' : '@/components/content',
        'common' : '@/components/common',
        'assets' : '@/assets',
        'network' : '@/network',
        'views' : '@/views',
      }
    }
  },
  lintOnSave:false
  
}