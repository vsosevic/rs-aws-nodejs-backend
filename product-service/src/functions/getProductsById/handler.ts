import 'source-map-support/register';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { DBConnection } from "../../db/client";

const getProductsById = async (event) => {
  const { productId } = event.pathParameters
  const db = new DBConnection()

  try {
    const client = await db.connect()

    const { rows: product } = await client.query(`
        select products.*, stocks.count 
        from products join stocks on products.id=stocks.product_id
        where products.id='${productId}'
        `)
    return formatJSONResponse(product ?? 'Product not found');
  } catch (error) {
    return formatJSONResponse({ message: error}, 500)
  } finally {
    await db.disconnect()
  }

}

export const main = middyfy(getProductsById);
