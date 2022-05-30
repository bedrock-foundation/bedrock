const webpack = require('webpack');

module.exports = exports = {
  experimental: {
    esmExternals: false,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
        },
        {
          loader: 'file-loader',
        },
      ],
      type: 'javascript/auto',
      issuer: {
        and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
      },
    });

    return config;
  },
  images: {
    domains: ['storage.googleapis.com'],
  },
};
