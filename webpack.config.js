const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const glob = require('glob');

module.exports = {
    entry: getEntry(),
    devtool: "inline-source-map",
    devServer: {
        contentBase: './dist'
    },
    output: {
        filename: 'js/[name].[hash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/"
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [ 'file-loader?name=img/[name].[hash:8].[ext]' ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader?name=font/[name].[hash:8].[ext]']
            },
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: require.resolve('jquery'),
                use: [
                    {
                        loader: 'expose-loader',
                        options: 'jQuery'
                    },
                    {
                        loader: 'expose-loader',
                        options: '$'
                    },
                    {
                        loader: 'expose-loader',
                        options: 'jquery'
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },

    plugins: getPlugins(),
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: "initial",
                    name: "commons",
                    minChunks: 2
                },
                ventors: {
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]/,
                    name: "ventors",
                    priority: 999,
                    minChunks: 1,
                    minSize: 0
                }
            }
        },
    }
};


/**
 * 获取指定pattern下的文件
 *
 * @param pattern
 * @returns {Array}
 */
function getFiles(pattern) {
    let myfiles = [];
    let files = glob.sync(pattern);
    for (let i = 0; i < files.length; i++) {

        let myfile = {};
        myfile.path = files[i]; // 全路径
        myfile.dirname = path.dirname(myfile.path) // 文件夹名称
        myfile.extname = path.extname(myfile.path); // 后缀名称
        myfile.basename = path.basename(myfile.path, myfile.extname); // 文件名称，不带后缀
        myfiles.push(myfile);
    }
    return myfiles;
}

/**
 * 获取入口点
 */
function getEntry() {
    let entry = {};
    let files = getFiles("./src/pages/*/*.js");
    for (let i = 0; i < files.length; i++) {
        entry[files[i].basename] = files[i].path;
    }
    return entry;

    /*    const entry = {
                login: './src/pages/login/login.js',
                index: './src/pages/index/index.js',
                product: './src/pages/product/product.js'
        }*/

}

/**
 * 装入模板插件
 *
 * @returns {Array}
 */
function getPlugins() {
    let plugins = [];
    plugins.push(new CleanWebpackPlugin(['dist']));

    let files = getFiles("./src/pages/*/*.html");
    let template = ['nav', 'footer', 'page'] // 数组中的文件是以模型形式引入到其他html中，不作为单独页面使用
    for (let i = 0; i < files.length; i++) {
        let plugin;
        if (template.indexOf(files[i].basename) >= 0) {
            plugin = new HtmlWebpackPlugin({
                filename: 'html/' + files[i].basename + '.html',
                template: files[i].path,
                inject: false
            })
        } else {
            plugin = new HtmlWebpackPlugin({
                filename: 'html/' + files[i].basename + '.html',
                template: files[i].path,
                inject: true,
                chunks: [files[i].basename, 'ventors', 'commons']
            });
        }
        plugins.push(plugin);
    }
    plugins.push(new VueLoaderPlugin())
    return plugins;

    /* [
         new CleanWebpackPlugin(['dist']),
         new HtmlWebpackPlugin({
             filename: 'html/index.html',
             template: './src/pages/index/index.html',
             inject: true,
             chunks: ['index', 'ventors', 'commons']
         }),
         new HtmlWebpackPlugin({
             filename: 'html/login.html',
             template: './src/pages/login/login.html',
             inject: true,
             chunks: ['login', 'ventors', 'commons']
         }),
         new HtmlWebpackPlugin({
             filename: 'html/nav.html',
             template: './src/pages/nav/nav.html',
             inject: false
         }),
         new HtmlWebpackPlugin({
             filename: 'html/footer.html',
             template: './src/pages/footer/footer.html',
             inject: false
         }),
         new HtmlWebpackPlugin({
             filename: 'html/page.html',
             template: './src/pages/page/page.html',
             inject: false
         }),
         new HtmlWebpackPlugin({
             filename: 'html/product.html',
             template: './src/pages/product/product.html',
             inject: 'head',
             chunks: ['product', 'ventors', 'commons']
         })

     ]*/
}