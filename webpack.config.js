/**
 * 不是真实的 webpack 配置，仅为兼容 webstorm 和 intellij idea 代码跳转
 * ref: https://github.com/umijs/umi/issues/1109#issuecomment-423380125
 */

module.exports = {
  rules:[{
    test:/\.less$/,
    use:[{
      loader:'style-loader',
    },{
      loader:'css-loader',
    },{
      loader:'less-loader',
      options:{
        modifyVars:{
          'primary-color':'#A11853',
          'link-color':'#A11853',
          'border-radius-base':'2px',
          //or
          'hack':'true; @import "./src/pages/pinjiu/theme.less";',
        },
        javascriptEnabled:true,
      },
    }],
  }],
  resolve: {
    alias: {
      '@': require('path').resolve(__dirname, 'src'),
    },
  },
   
  
};
