import path from 'path';
import webpack from 'webpack';

const src = './src';
const dist = './dist';
const script = {
    src: src + '/script',
    dist: dist + '/js'
};

export default {
    entry: {
        'index': 'js/draftjs-editor/index.js',
        'draftjs-editor': 'js/test/index.js'
    },

    output: {
        path: path.resolve(__dirname, script.dist),
        publicPath: '/js',
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            }
        ]
    },

    resolve: {
        alias: {
            'js': path.resolve(__dirname, script.src)
        }
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    }
};