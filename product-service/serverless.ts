import type { AWS } from '@serverless/typescript';

import { getProductsList, getProductsById } from '@functions/index';

const serverlessConfiguration: AWS = {
  service: 'product-service',
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
      PG_HOST: 'rs-school-task-4-instance.c1f8ssvuzeip.eu-west-1.rds.amazonaws.com',
      PG_PORT: '5432',
      PG_DATABASE: '',
      PG_USERNAME: '',
      PG_PASSWORD: '',
    },
    lambdaHashingVersion: '20201221',
    httpApi: {
      cors: true
    },
  },
  // import the function via paths
  functions: { getProductsList, getProductsById },
};

module.exports = serverlessConfiguration;
