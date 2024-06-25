const { withTamagui } = require('@tamagui/next-plugin')
const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})

const boolVals = {
  true: true,
  false: false,
}

const disableExtraction =
  boolVals[process.env.DISABLE_EXTRACTION] ?? process.env.NODE_ENV === 'development'

const plugins = [
  withTamagui({
    config: './tamagui.config.ts',
    components: ['tamagui'],
    appDir: true,
    disableExtraction,
    importsWhitelist: ['constants.js', 'colors.js'],
    outputCSS: process.env.NODE_ENV === 'production' ? './public/tamagui.css' : null,
    logTimings: true,
    excludeReactNativeWebExports: ['Switch', 'ProgressBar', 'Picker', 'CheckBox', 'Touchable'],
  }),
  withPWA,
]

/** @type {import('next').NextConfig} */
let nextConfig = {
  // See https://nextjs.org/docs/pages/building-your-application/deploying/static-exports#configuration
  output: 'standalone',
  distDir: './dist', // Changes the build output directory to `./dist/`.

  typescript: {
    ignoreBuildErrors: true,
  },
  modularizeImports: {
    '@tamagui/lucide-icons': {
      transform: '@tamagui/lucide-icons/dist/esm/icons/{{kebabCase member}}',
      skipDefaultConversion: true,
    },
  },
  transpilePackages: [],
  experimental: {
    // optimizeCss: true,
    scrollRestoration: true,
    serverComponentsExternalPackages: ['sharp', 'onnxruntime-web'], // Indicate that these packages should not be bundled by webpack
  },
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  // Override the default webpack configuration
  webpack: (config) => {
    // See https://webpack.js.org/configuration/resolve/#resolvealias
    config.resolve.alias = {
      ...config.resolve.alias,
      sharp$: false,
      'onnxruntime-node$': false,
    }
    return config
  },
}

for (const plugin of plugins) {
  nextConfig = {
    ...nextConfig,
    ...plugin(nextConfig),
  }
}

module.exports = nextConfig
