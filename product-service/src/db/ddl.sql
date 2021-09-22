CREATE TABLE public.products (
                                 id uuid NOT NULL DEFAULT uuid_generate_v4(),
                                 title text NOT NULL,
                                 description text NULL,
                                 price int4 NULL,
                                 image_id text NULL,
                                 CONSTRAINT products_pkey PRIMARY KEY (id)
);

insert into products (title, description, price, image_id) values
('Product title 1', 'Product 1 description', 20, ''),
('Product title 2', 'Product 2 description', 2, ''),
('Product title 3', 'Product 3 description', 45, ''),
('Product title 4', 'Product 4 description', 63, ''),
('Product title 5', 'Product 5 description', 0, ''),
('Product title 6', 'Product 6 description', 55, ''),
('Product title 7', 'Product 7 description', 115, ''),
('Product title 8', 'Product 8 description', 222, '')

CREATE TABLE public.stocks (
                               product_id uuid NULL,
                               count int4 NULL,
                               CONSTRAINT stocks_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id)
);

insert into stocks values
('8e393cf2-fd6a-4cc3-b650-bbc00c2fd7a3', 0),
('8c588690-7bc4-4e12-8daf-0b998c0fa506', 12),
('9831a5bd-40bd-4154-9172-97fa7f0487a8', 11),
('f8dc49ca-3d91-45a7-95e0-619fcc78d4fc', 44),
('aa16a5ee-bd02-4c98-b21f-63ea3840090e', 55),
('9a5c9e15-10b1-4aa7-a1ac-a761ed43406a', 55),
('b94319b7-2261-4d4a-b012-40dbaf6b1753', 66),
('d4f40712-59f7-4703-95a2-c07609a82183', 77)


create extension if not exists "uuid-ossp";