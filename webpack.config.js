const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const copydir = require('copy-dir');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const mode = process.argv[3];

const DIST_DIR = path.resolve(__dirname, 'public/dist');
const APP_DIR = path.resolve(__dirname, 'src/js');
const BUILD_DIR = path.resolve(__dirname, 'public/dist/js/');
const ASSETS_PATH = path.resolve(__dirname, 'public/dist/assets/');


const CSS_DIR = path.resolve(__dirname, 'src/css');
const CSS_DIR_PUBLIC = path.resolve(__dirname, 'public/dist/css');

const getFileList = function (objectKey, filePath, ignoreFileName = [], matchExt = []) {
    let storage = {};
    fs.readdirSync(filePath).forEach(function (fileName) {
        if (fs.statSync(filePath + "/" + fileName).isDirectory()) {
            if (ignoreFileName.indexOf(fileName) == -1) {
                storage = Object.assign({},
                    storage,
                    getFileList(objectKey + "/" + fileName,
                        filePath + "/" + fileName,
                        ignoreFileName,
                        matchExt)
                );
            }
        } else {
            let matchFlag = false;

            if (matchExt.length == 0) {
                matchFlag = true;
            } else {
                let ext = fileName.split(".").pop();
                if (matchExt.indexOf(ext) !== -1) {
                    matchFlag = true;
                }
            }

            if (matchFlag) {
                if (ignoreFileName.indexOf(fileName) !== -1) {
                    matchFlag = false;
                }
            }

            if (matchFlag) {
                let tmpFile = fileName.split(".").slice(0, -1).join(".");
                storage[objectKey + "/" + tmpFile] = ["babel-polyfill", filePath + "/" + fileName];
            }
        }
    });
    return storage;
};

const deleteFolder = function (path) {

    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolder(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

deleteFolder(DIST_DIR);

/* 在 public 中建立 js css img */
var public_defaul_folder = ['', 'js', 'css', 'img'];
public_defaul_folder.map(function (keyName) {
    const dir = path.resolve(__dirname, 'public/dist/' + keyName)
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
});


var jsEntry = {};
/* JS entry*/
if (1) {
    const jsFolder = {
        app: APP_DIR + "/" + "app",
    }
    let JS_Entry = {};

    Object.keys(jsFolder).map(function (objectKey, index) {
        let filePath = jsFolder[objectKey];
        JS_Entry = Object.assign(JS_Entry, getFileList(objectKey, filePath, ['component', 'components']));
    });

    jsEntry = Object.assign({}, jsEntry, JS_Entry);
}

/* CSS entry*/
let cssEntry = {};
if (1) {
    const cssFolder = {
        page: CSS_DIR + "/" + "page",
        // vendor: CSS_DIR + "/" + "vendor",
    }

    let CSS_Entry = {};
    Object.keys(cssFolder).map(function (objectKey, index) {
        let filePath = cssFolder[objectKey];
        CSS_Entry = Object.assign(CSS_Entry, getFileList(objectKey, filePath, [], ["css", "scss", "less"]));
    });

    cssEntry = Object.assign({}, cssEntry, CSS_Entry);
}


/* Copy folder */
if (1) {
    const IMG_DIR = path.resolve(__dirname, 'src/img');
    const IMG_DIR_PUBLIC = path.resolve(__dirname, 'public/dist/img');

    const ICOMOON_FONT_DIR = path.resolve(__dirname, 'src/css/icomoon/');
    const ICOMOON_FONT_PUBLIC_DIR = path.resolve(__dirname, 'public/dist/css/icomoon/');

    const copyEntry = {};
    copyEntry[IMG_DIR] = IMG_DIR_PUBLIC;
    // copyEntry[ICOMOON_FONT_DIR] = ICOMOON_FONT_PUBLIC_DIR;

    for (var fromPath in copyEntry) {
        copydir.sync(fromPath, copyEntry[fromPath]);
    }
}

var jsConfig = {
    mode: mode,
    context: APP_DIR,
    entry: {
        ...jsEntry,
    },
    output: {
        filename: '[name].bundle.js',
        path: BUILD_DIR,
        publicPath: ASSETS_PATH
    },
    resolve: {
        alias: {
            vendor: path.join(__dirname, './src/js/vendor'),
            lib: path.join(__dirname, './src/js/lib'),
            vue: 'vue/dist/vue.js',


            "TweenLite": __dirname + '/node_modules/gsap/src/uncompressed/TweenLite.js',
            "TweenMax": __dirname + '/node_modules/gsap/src/uncompressed/TweenMax.js',
            "TimelineLite": __dirname + '/node_modules/gsap/src/uncompressed/TimelineLite.js',
            "TimelineMax": __dirname + '/node_modules/gsap/src/uncompressed/TimelineMax.js',
            "scrollmagic": __dirname + '/node_modules/scrollmagic/scrollmagic/uncompressed/ScrollMagic.js',
            "animation.gsap": __dirname + '/node_modules/scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js',
            "animation.velocity": __dirname + '/node_modules/scrollmagic/scrollmagic/uncompressed/plugins/animation.velocity.js',
            "debug.addIndicators": __dirname + '/node_modules/scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js'
            // TweenLite: path.resolve(__dirname, './src/js/vendor/greensock/TweenLite.min.js'),
            // TweenMax: path.resolve(__dirname, './src/js/vendor/greensock/TweenMax.min.js'),
            // TimelineLite: path.resolve(__dirname, './src/js/vendor/greensock/TimelineLite.min.js'),
            // TimelineMax: path.resolve(__dirname, './src/js/vendor/greensock/TimelineMax.min.js'),
            // EasePack: path.resolve(__dirname, './src/js/vendor/greensock/easing/EasePack.min.js'),
            // AttrPlugin: path.resolve(__dirname, './src/js/vendor/greensock/plugins/AttrPlugin.min.js'),
            // BezierPlugin: path.resolve(__dirname, './src/js/vendor/greensock/plugins/BezierPlugin.min.js'),
            // ColorPropsPlugin: path.resolve(__dirname, './src/js/vendor/greensock/plugins/ColorPropsPlugin.min.js'),
            // CSSPlugin: path.resolve(__dirname, './src/js/vendor/greensock/plugins/CSSPlugin.min.js'),
            // CSSRulePlugin: path.resolve(__dirname, './src/js/vendor/greensock/plugins/CSSRulePlugin.min.js'),
            // DirectionalRotationPlugin: path.resolve(__dirname, './src/js/vendor/greensock/plugins/DirectionalRotationPlugin.min.js'),
            // // DrawSVGPlugin: path.resolve(__dirname, './src/js/vendor/greensock/plugins/DrawSVGPlugin.js'),
            // EaselPlugin: path.resolve(__dirname, './src/js/vendor/greensock/plugins/EaselPlugin.min.js'),
            // EndArrayPlugin: path.resolve(__dirname, './src/js/vendor/greensock/plugins/EndArrayPlugin.min.js'),
            // ModifiersPlugin: path.resolve(__dirname, './src/js/vendor/greensock/plugins/ModifiersPlugin.min.js'),
            // // MorphSVGPlugin: path.resolve(__dirname, './src/js/vendor/greensock/plugins/MorphSVGPlugin.js'),
            // // Physics2DPlugin: path.resolve(__dirname, './src/js/vendor/greensock/plugins/Physics2DPlugin.js'),
            // // PhysicsPropsPlugin: path.resolve(__dirname, './src/js/vendor/greensock/plugins/PhysicsPropsPlugin.js'),
            // RaphaelPlugin: path.resolve(__dirname, './src/js/vendor/greensock/plugins/RaphaelPlugin.min.js'),
            // RoundPropsPlugin: path.resolve(__dirname, './src/js/vendor/greensock/plugins/RoundPropsPlugin.min.js'),
            // // ScrambleTextPlugin: path.resolve(__dirname, './src/js/vendor/greensock/plugins/ScrambleTextPlugin.js'),
            // ScrollToPlugin: path.resolve(__dirname, './src/js/vendor/greensock/plugins/ScrollToPlugin.min.js'),
            // // TEMPLATE_Plugin: path.resolve(__dirname, './src/js/vendor/greensock/plugins/TEMPLATE_Plugin.js'),
            // TextPlugin: path.resolve(__dirname, './src/js/vendor/greensock/plugins/TextPlugin.min.js'),
            // // ThrowPropsPlugin: path.resolve(__dirname, './src/js/vendor/greensock/plugins/ThrowPropsPlugin.js'),
            // ScrollMagic: path.resolve('node_modules', './src/js/vendor/scrollMagic/ScrollMagic.js'),
            // 'animation.gsap': path.resolve('node_modules', './src/js/vendor/scrollMagic/plugins/animation.gsap.js'),
            // 'debug.addIndicators': path.resolve('node_modules', './src/js/vendor/scrollMagic/plugins/debug.addIndicators.js'),
        },
        extensions: ['.vue', '.jsx', '.js', '.json'],

    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                include: [
                    APP_DIR,
                    require.resolve('bootstrap-vue')
                ],
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        // // make sure to include the plugin!
        new VueLoaderPlugin(),
        new ExtractTextPlugin('../css/[name].css'),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            jquery: 'jquery',
            'window.jQuery': 'jquery',
            moment: 'moment',
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                default: false,
                node_modules: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "chunk/node_modules",
                    chunks: "all",
                    minSize: 10,
                    // minChunks: 1
                },
                vendor: {
                    test: /[\\/]js[\\/]vendor[\\/]/,
                    name: "chunk/vendor",
                    chunks: "initial",
                    minSize: 10,
                },
            }
        }
    },
};

if (mode == "development") {
    jsConfig = {
        ...jsConfig,
        ...{
            performance: {
                hints: false // disable warning
            },
            devtool: 'source-map',

            watchOptions: {
                aggregateTimeout: 300,
            },
        }
    };
}


var cssConfigPlugin = [];
cssConfigPlugin.push(new ExtractTextPlugin('../css/[name].css'));
if (mode == "production") {
    cssConfigPlugin.push(
        new OptimizeCssAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true
                }
            },
            canPrint: false,
        })
    );
}


var cssConfig = {
    mode: mode,
    entry: {
        ...cssEntry,
    },
    output: {
        filename: './css_del/[name].bundle.css.js',
        path: BUILD_DIR,
    },
    resolve: {
        alias: {

        }
    },
    module: {
        rules: [{
                test: /\.(css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader', // 回滚
                    use: [{
                            loader: 'css-loader'
                        },
                        {
                            loader: 'postcss-loader'
                        },
                    ],
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({ //分离less编译后的css文件
                    fallback: 'style-loader',
                    use: [{
                            loader: 'css-loader',
                            options: {
                                url: false
                            }
                        },
                        {
                            loader: 'less-loader'
                        },
                        {
                            loader: 'postcss-loader'
                        },
                    ]
                })
            },
            {
                test: /\.(sass|scss)$/,
                use: ExtractTextPlugin.extract({ //分离less编译后的css文件
                    fallback: 'style-loader',
                    use: [{
                            loader: 'css-loader',
                            options: {
                                url: false
                            }
                        },
                        {
                            loader: 'sass-loader'
                        },
                        {
                            loader: 'postcss-loader'
                        },
                    ]
                })
            },
        ]
    },
    plugins: cssConfigPlugin,
};

if (mode == "development") {
    cssConfig = {
        ...cssConfig,
        ...{
            performance: {
                hints: false // disable warning
            },
            devtool: 'source-map',

            watchOptions: {
                aggregateTimeout: 300,
            },
        }
    };
}


module.exports = [jsConfig, cssConfig];

// module.exports = [jsConfig];