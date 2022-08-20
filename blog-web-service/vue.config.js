module.exports = {
    publicPath: "/",
    lintOnSave: process.env.NODE_ENV === "development",
    devServer: {
        port: 8080,
        proxy: {
            "/dev-api": {
                target: "http://localhost:70",
                //target: 'http://121.41.16.120:70',
                changeOrigin: true,
                pathRewrite: {
                    "^/dev-api": ""
                }
            }
        }
    }
};
