// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
const path = require('path')

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development'

module.exports = {
    mode: env,
    entry: {
        app: path.join(__dirname, 'src/index.tsx')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.js',
        library: 'hrb-temaki',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            '~': path.resolve(__dirname, 'src/'),
            react: path.resolve(__dirname, './node_modules/react'),
            'styled-components': path.resolve(
                __dirname,
                './node_modules/styled-components'
            )
        }
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'eslint-loader'
                    }
                ]
            },
            {
                test: /\.tsx?$/,
                exclude: [/node_modules/, /\.stories\.tsx?$/, /\.spec\.tsx?$/],
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            },
            {
                test: /\.(svg)$/,
                use: [
                    {
                        loader: 'raw-loader'
                    }
                ]
            },
            {
                test: /\.gif$/,
                use: [
                    {
                        loader: 'url-loader'
                    }
                ]
            }
        ]
    },
    externals: {
        react: {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'React',
            root: 'React'
        },
        'styled-components': {
            commonjs: 'styled-components',
            commonjs2: 'styled-components',
            amd: 'StyledComponents',
            root: 'StyledComponents'
        },
        'react-router-dom': {
            root: 'ReactRouterDom',
            commonjs2: 'react-router-dom',
            commonjs: 'react-router-dom',
            amd: 'react-router-dom'
        }
    },
    cache: true,
    // TreeShakingオフ
    optimization: {
        usedExports: true,
        providedExports: true
    }
}
