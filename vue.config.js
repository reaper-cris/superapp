module.exports = {
  configureWebpack:{
    resolve:{
      alias:{
        'views':'@/views',
        'components':'@/components',
        'network':'@/network',
        'common':'@/common',
        'assets':'@/assets'
      //  说明：router和store文件夹中一般只需要引入一次，因此不需要取别名
      }
    }
  }
}
