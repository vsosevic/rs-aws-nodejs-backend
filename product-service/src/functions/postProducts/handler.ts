import 'source-map-support/register';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { DBConnection } from "../../db/client";

const postProducts = async (event) => {
  console.log(event)
  const db = new DBConnection()
  const client = await db.connect()

  try {
    const { title, description, price, image_id, count } = event.body;

    await client.query('BEGIN');

    const productsResponse = await client.query(
      'INSERT INTO products(title, description, price, image_id) VALUES($1, $2, $3, $4) RETURNING id',
      [title, description, price, image_id]
    );
    const { id: dbProductId } = productsResponse.rows[0];

    await client.query(
      'INSERT INTO stocks(product_id, count) VALUES ($1, $2)',
      [dbProductId, count]
    );

    await client.query('COMMIT');

    return formatJSONResponse({ message: 'Product created', product: { dbProductId, title, description, price, image_id, count } }, 201);
  } catch (error) {
    await client.query('ROLLBACK');
    return formatJSONResponse({ message: error }, 500)
  } finally {
    await db.disconnect()
  }

}

export const main = middyfy(postProducts);
