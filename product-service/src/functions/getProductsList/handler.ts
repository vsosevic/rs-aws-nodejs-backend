import 'source-map-support/register';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import products from '../../productList.json';

const getProductsList = async () => {
  return formatJSONResponse(products);
}

export const main = middyfy(getProductsList);
