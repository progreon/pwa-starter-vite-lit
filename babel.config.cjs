module.exports = {
  plugins: [
    ['@babel/plugin-proposal-decorators', { version: '2023-05' }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-transform-class-static-block']
  ]
};
console.log('loading babel plugins')