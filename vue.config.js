module.exports = {
    publicPath: process.env.DEPLOY_ENV === 'github' ? '/tree-view/' : '/',
    outputDir: process.env.DEPLOY_ENV === 'github' ? 'docs' : 'dist',
    configureWebpack: {
        devtool: 'source-map'
    }
}