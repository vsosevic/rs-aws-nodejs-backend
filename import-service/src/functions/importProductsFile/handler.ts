import 'source-map-support/register';

import { S3 } from 'aws-sdk';
import { formatJSONResponse, responseBadRequest, responseInternalError } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

const BUCKET_PRODUCTS_PATH = 'uploaded';

const BUCKET = 'rs-aws-products-import-files';

const importProductsFile = async event => {
  const { name } = event?.queryStringParameters;
  if (!name) return responseBadRequest();

  const s3 = new S3({ region: 'eu-west-1' });
  let url;
  const params = {
    Bucket: BUCKET,
    Key: `${BUCKET_PRODUCTS_PATH}/${name}`,
    Expires: 60,
    ContentType: 'text/csv',
  };

  try {
    url = s3.getSignedUrl('putObject', params);
  } catch (e) {
    return responseInternalError();
  }

  return formatJSONResponse({
    url,
  });
};

export const main = middyfy(importProductsFile);
