const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);

console.log("process.env.NODE_ENV:" + process.env.NODE_ENV);
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css']
const resolve = dir => path.resolve(__dirname, dir)

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CompressionWebpackPlugin = require('compression-webpack-plugin');
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

module.exports = {
    publicPath: './', // 默认'/'，部署应用包时的基本 URL
    outputDir: 'dist', // 'dist', 生产环境构建文件的目录
    assetsDir: '', // 相对于outputDir的静态资源(js、css、img、fonts)目录
    lintOnSave: false,
    runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
    productionSourceMap: false, // 生产环境的 source map
    // CSS 相关选项
    css: {
        // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
        // 也可以是一个传递给 `extract-text-webpack-plugin` 的选项对象
        extract: true,

        // 是否开启 CSS source map？
        sourceMap: false,

        // 为预处理器的 loader 传递自定义选项。比如传递给
        // sass-loader 时，使用 `{ sass: { ... } }`。
        loaderOptions: {},

        // 为所有的 CSS 及其预处理文件开启 CSS Modules。
        // 这个选项不会影响 `*.vue` 文件。
        modules: false
    },

    // 在生产环境下为 Babel 和 TypeScript 使用 `thread-loader`
    // 在多核机器下会默认开启。
    parallel: require('os').cpus().length > 1,
    pwa: {},

    chainWebpack: config => {
        // 删除无用的插件，避免加载多余的资源（如果不删除的话，则会在 index.html 里面加载 无用的 js 文件）
        // 移除 prefetch 插件
        config.plugins.delete('prefetch');
        // 移除 preload 插件，避免加载多余的资源
        config.plugins.delete('preload');

        config.optimization.minimize(true);

        config.optimization.splitChunks({
            chunks: 'all'
        })

        // 展示图形化分析信息
        config
            .plugin('webpack-bundle-analyzer')
            .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)

        if (process.env.NODE_ENV !== 'development') {

            // 抽离 css 支持按需加载
            let miniCssExtractPlugin = new MiniCssExtractPlugin({
                filename: 'assets/[name].[hash:8].css',
                chunkFilename: 'assets/[name].[hash:8].css'
            })
            config.plugin('extract-css').use(miniCssExtractPlugin)
            config.plugin("loadshReplace").use(new LodashModuleReplacementPlugin());

            // 图片按需加载
            config.module.rule('images')
                .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
                .use('image-webpack-loader')
                .loader('image-webpack-loader')
                .options({
                    bypassOnDebug: true
                })
                .end()
                .use('url-loader')
                .loader('file-loader')
                .options({
                    name: 'assets/[name].[hash:8].[ext]'
                }).end()
            config.module.rule('svg')
                .test(/\.(svg)(\?.*)?$/)
                .use('file-loader')
                .loader('file-loader')
                .options({
                    name: 'assets/[name].[hash:8].[ext]'
                })
        }



        // 修复HMR
        config.resolve.symlinks(true);
        //修复 Lazy loading routes Error
        config.plugin('html').tap(args => {
            args[0].chunksSortMode = 'none';
            return args;
        });

        // 添加别名
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('components', resolve('src/components'))
            .set('layout', resolve('src/layout'))
            .set('base', resolve('src/base'))
            .set('static', resolve('src/static'));

        //压缩图片
        // config.module
        //     .rule("images")
        //     .use("image-webpack-loader")
        //     .loader("image-webpack-loader")
        //     .options({
        //         mozjpeg: {progressive: true, quality: 65},
        //         optipng: {enabled: false},
        //         pngquant: {quality: "65-90", speed: 4},
        //         gifsicle: {interlaced: false},
        //         webp: {quality: 75}
        //     });
    },
    configureWebpack: config => {

        // config.plugins.push(["equire"]);

        if (process.env.NODE_ENV !== 'development') {
            config.output.filename = 'assets/[name].[hash:8].js'
            config.output.chunkFilename = 'assets/[name].[hash:8].js'
        }
        // 公共代码抽离
        config.optimization = {
            // 分割代码块
            splitChunks: {
                cacheGroups: {
                    //公用模块抽离
                    common: {
                        chunks: 'initial',
                        minSize: 0, //大于0个字节
                        minChunks: 2, //抽离公共代码时，这个代码块最小被引用的次数
                    },
                    //第三方库抽离
                    vendor: {
                        priority: 1, //权重
                        test: /node_modules/,
                        chunks: 'initial',
                        minSize: 0, //大于0个字节
                        minChunks: 2, //在分割之前，这个代码块最小应该被引用的次数
                    },
                },
            }
        }
        // 开启gzip压缩
        config.plugins.push(
            new CompressionWebpackPlugin({
                filename: info => {
                    return `${info.path}.gz${info.query}`
                },
                algorithm: 'gzip',
                threshold: 10240, // 只有大小大于该值的资源会被处理 10240
                test: new RegExp('\\.(' + ['js'].join('|') + ')$'),
                minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
                deleteOriginalAssets: false // 删除原文件
            })
        )

        if (IS_PROD) {
            const plugins = []
            plugins.push(
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            warnings: true,
                            drop_console: true,
                            drop_debugger: true,
                            pure_funcs: ['console.log'] //移除console
                        },
                        mangle: false,
                        output: {
                            beautify: true, //压缩注释
                        }
                    },
                    sourceMap: false,
                    parallel: true,
                })
            )
            plugins.push(
                new CompressionWebpackPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: productionGzipExtensions,
                    threshold: 10240,
                    minRatio: 0.8
                })
            )

            //去掉 console.log
            plugins.push(
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            warnings: true,
                            drop_console: true,
                            drop_debugger: true,
                            pure_funcs: ['console.log'] //移除console
                        }
                    },
                    sourceMap: false,
                    parallel: true
                })
            );
            config.plugins = [...config.plugins, ...plugins]
        }

        // 打包分析
        if (process.env.IS_ANALYZ) {
            config.plugin('webpack-report')
                .use(BundleAnalyzerPlugin, [{
                    analyzerMode: 'static',
                }]);
        }

        // //配置 externals
        // //防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖
        // config.externals = {
        //     'vue': 'Vue',
        //     'element-ui': 'ELEMENT',
        //     'vue-router': 'VueRouter',
        //     'vuex': 'Vuex',
        //     'axios': 'axios'
        // }
    },
    devServer: {
        // overlay: {
        //   warnings: true,
        //   errors: true
        // },
        open: IS_PROD,
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: {
            '/api': {
                target: process.env.VUE_APP_BASE_API || 'http://127.0.0.1:8080',
                changeOrigin: true
            }
        }
    }
};