module.exports = {
    publicPath: process.env.DEPLOY_ENV === 'github' ? '/tree-vew/' : '/'
}