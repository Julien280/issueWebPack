const path  = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack  = require("webpack");
//const aliases  = require('./aliases.js');

const NodemonPlugin   = require('nodemon-webpack-plugin') ;

const NodePolyfillPlugin   = require("node-polyfill-webpack-plugin")
const nodeExternals  = require("webpack-node-externals");

const { fileURLToPath } = require('url');




const TsconfigPathsPlugin  = require('tsconfig-paths-webpack-plugin');

/*const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);*/

console.log("dirname : " + __dirname);
console.log("filename : " + __filename);


module.exports = {
    context: __dirname,
    mode : 'development',
    optimization: {minimize : false,},
    devtool: 'inline-source-map',
    
    entry : {
        bundle : path.resolve(__dirname , 'src/main.tsx') 
    },
    output : {
        filename : '[name][contenthash].js',
        path : path.resolve(__dirname, 'dist'),
        clean: true,
        publicPath: '/'
    },
    
    target: "async-node",
   // externalsPresets: { node: true },  
  externals: [nodeExternals(),],   

    devServer : {
        port : 5173,
        static: path.resolve(__dirname , 'dist') ,
        compress : true , 
        historyApiFallback : true,
        open : true,
        proxy: {
              '/api': {
                target: 'http://localhost:5172',
                changeOrigin: true,
                secure: false,
                ws: true,
                pathRewrite: {
                  '^/api': ''
                },
                onProxyReq: (proxyReq, req, res) => {
                  console.log('Sending Request to the Target:', req.method, req.url);
                },
                onProxyRes: (proxyRes, req, res) => {
                  console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
                },
                onError: (err, req, res) => {
                  console.log('Proxy Error:', err);
                }
              }
            }
    },

    module : {
        rules : [
          {
            test: /child_process|worker_threads|uglify-js|@swc\/core|node_modules|module|react\/jsx-runtime/,
            use: 'null-loader',
          },
            {
                test : /\.js$/,
                exclude : /node_modules/,
                use : {
                    loader : 'babel-loader',
                    options : {
                        presets : ['@babel/preset-env']
                    }
            }
        },
        {
            test : /\.css$/,
            use : ['style-loader', 'css-loader']

        },
        {
            test : /\.scss$/,
            use : ['style-loader', 'css-loader', 'sass-loader']
        },
            {
              test: /\.ts?$/,
              use: 'ts-loader',
              exclude: /node_modules/,
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
              }
    ]
    },
    resolve: {
      fallback: {
        "fs": false,
        "tls": false,
        "net": false,
        "path": false,
        "zlib": false,
        "http": false,
        "https": false,
        "stream": false,
        "crypto": false,
        "react": false,
      },
      
        extensions: ['.tsx', '.ts', '.js'],
        alias:  {
            "@": path.resolve(__dirname,"src"),
            "@linkedin": path.resolve(__dirname, "src/components/Linkedin"),
            "@test": path.resolve(__dirname,"test"),
            "@shared": path.resolve(__dirname,"shared"),
            "@styles": path.resolve(__dirname,"src/styles"),

        }
        , plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })]
      },
    plugins : [
        new HtmlWebpackPlugin({
            title : 'Webpack 5',
            template : path.resolve(__dirname, './src/template.html'),
            filename : 'index.html'
        }),
        new webpack.SourceMapDevToolPlugin({
          filename: "[file].map",
          fallbackModuleFilenameTemplate: '[absolute-resource-path]',
          moduleFilenameTemplate: '[absolute-resource-path]'
      }),
      //new NodePolyfillPlugin(),
        //new NodemonPlugin()
    ]

}; 