/**
 * Created by Administrator on 2016/5/28.
 */
var webpack = require("webpack");

module.exports = {
    /**入口js*/
    entry: {
        common: ["react", "react-dom"],
        cascade: "scripts/cascade/entry.js",
        checkbox: "scripts/checkbox/entry.js",
        router: "scripts/router/entry.js"
    },
    /**打包构建js*/
    output: {
        path: __dirname + "/app/build/js",//构建路径
        publicPath: "/react_flux/app/build/js/",//使用按需加载必须配置
        filename: "[name].bundle.js"//构建文件名
    },
    /**加载器*/
    module: {
        loaders: [
            {test: /\.js?$/, loaders: ["jsx?harmony"]}
        ]
    },
    /**插件配置*/
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({//踢出公共js
            name: "common",
            minChunks: Infinity
        }),
        //new webpack.optimize.UglifyJsPlugin({//压缩js
        //    compress: {
        //        warnings: false
        //    }
        //}),
        new webpack.BannerPlugin("this file is created by edison")
    ],
    /**路径解决*/
    resolve: {
        alias: {
            rootPath: __dirname,
            scripts: __dirname + "/app/src/js"
        },
        extensions: ["", ".js", ".jsx"]
    }
};