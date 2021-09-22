import type { AWS } from '@serverless/typescript';

import { getProductsList, getProductsById, postProducts } from '@functions/index';

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env

const serverlessConfiguration: AWS = {
  service: 'product-service',
  useDotenv: true,
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      PG_HOST: PG_HOST,
      PG_PORT: PG_PORT,
      PG_DATABASE: PG_DATABASE,
      PG_USERNAME: PG_USERNAME,
      PG_PASSWORD: PG_PASSWORD,
    },
    lambdaHashingVersion: '20201221',
    httpApi: {
      cors: true
    },
  },
  // import the function via paths
  functions: { getProductsList, getProductsById, postProducts },
};

module.exports = serverlessConfiguration;
