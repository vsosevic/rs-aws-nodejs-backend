import 'source-map-support/register';

import { S3 } from 'aws-sdk';
import { S3Event } from 'aws-lambda';
import csv from 'csv-parser';

import { middyfy } from '@libs/lambda';
import { formatJSONResponse, responseInternalError } from '@libs/apiGateway';

const BUCKET = 'rs-aws-products-import-files';

const BUCKET_PRODUCTS_PATH_UPLOADED = 'uploaded';
const BUCKET_PRODUCTS_PATH_PARSED = 'parsed';

const importFileParser = async (event: S3Event) => {
  const s3 = new S3({ region: 'eu-west-1' });

  try {
    for (const record of event.Records) {
      const s3ReadStream = s3
        .getObject({
          Bucket: BUCKET,
          Key: record.s3.object.key,
        })
        .createReadStream();

      s3ReadStream
        .pipe(csv())
        .on('data', data => {
          console.log(data);
        })
        .on('error', () => {
          return responseInternalError();
        });

      await s3
        .copyObject({
          Bucket: BUCKET,
          CopySource: `${BUCKET}/${record.s3.object.key}`,
          Key: record.s3.object.key.replace(BUCKET_PRODUCTS_PATH_UPLOADED, BUCKET_PRODUCTS_PATH_PARSED),
        })
        .promise();

      await s3
        .deleteObject({
          Bucket: BUCKET,
          Key: record.s3.object.key,
        })
        .promise();
    }
  } catch (e) {
    return responseInternalError();
  }

  formatJSONResponse({
    message: 'OK',
  });
};

export const main = middyfy(importFileParser);
