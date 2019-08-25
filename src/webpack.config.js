const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    resolve: {
        extensions: ['.less', '.ts'],
    },
    entry: {
        bundle:path.join(__dirname,'ts/index.ts'),
        style: path.join(__dirname,'less/style.less')
    },
    output:{
        filename: '[name].js',
        path: path.join(__dirname,'../www')
    },
    devtool: "source-map",
    plugins:[
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false
        })
    ],
    mode:"development",
    module:{
        rules: [
            {
                test:/\.ts$/,
                use:[{
                        loader:"babel-loader",
                        options:{
                            presets:["es2015"]
                        }
                    },
                    {
                        loader:"ts-loader",
                        options:{
                            configFile: path.resolve(__dirname,'./ts/tsconfig.json')
                        }
                    }
                ],
                exclude: /node_modules/,
            },
            {
                test:/\.(css|less)$/,
                use: [ {
                    loader: MiniCssExtractPlugin.loader,
                  }, 'css-loader', 'less-loader'],
            },

        ]
    }
}