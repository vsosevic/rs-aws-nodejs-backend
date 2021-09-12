import 'source-map-support/register';
import { DBConnection } from '../../db/client'

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

const getProductsList = async () => {
  const db = new DBConnection()

  try {
    const client = await db.connect()

    const { rows: products } = await client.query(`
        select products.*, stocks.count 
        from products join stocks on products.id=stocks.product_id
        `)
    return await formatJSONResponse(products);
  } catch (error) {
    return formatJSONResponse({ message: error}, 500)
  } finally {
    await db.disconnect()
  }
}

export const main = middyfy(getProductsList);
