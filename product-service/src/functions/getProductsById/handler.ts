import 'source-map-support/register';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import products from '../../productList.json';

const getProductsById = async (event) => {
  const { productId } = event.pathParameters
  const product = products.find(product => product.id === productId)

  return formatJSONResponse(product ?? 'Product not found');
}

export const main = middyfy(getProductsById);
