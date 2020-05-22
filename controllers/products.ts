import { v4 } from 'https://deno.land/std/uuid/mod.ts';
import { Product } from '../types.ts';

let products: Product[] = [
  {
    id: '1',
    name: 'haha',
    desc: 'voila',
    price: 10.0,
  },
  {
    id: '2',
    name: 'vanilla',
    desc: 'vanilla icecream',
    price: 34.0,
  },
  {
    id: '3',
    name: 'seokje',
    desc: 'it is my name',
    price: 10.32,
  },
];

// @desc  Get all products
// @route Get /api/v1/products
const getProducts = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: products,
  };
};

// @desc  Get single product
// @route Get /api/v1/products/:id
const getProduct = ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  // response.body = 'getProduct';
  const product: Product | undefined = products.find((p) => p.id === params.id);

  if (product) {
    response.status = 200;
    response.body = {
      success: true,
      data: product,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      message: 'No product found',
    };
  }
};

// @desc  Add product
// @route POST /api/v1/product
const addProduct = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  // response.body = 'addProduct';
  const body = await request.body();

  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      message: 'No Data',
    };
  } else {
    const product: Product = body.value;
    product.id = v4.generate();
    products.push(product);

    response.status = 200;
    response.body = {
      success: true,
      data: product,
    };
  }
};

// @desc  Update product
// @route PUT /api/v1/products/:id
const updateProduct = async ({
  params,
  request,
  response,
}: {
  params: { id: string };
  request: any;
  response: any;
}) => {
  // response.body = 'updateProduct';

  const product: Product | undefined = products.find((p) => p.id === params.id);

  if (product) {
    const body = await request.body();
    const updateData: { name?: string; description?: string; price?: number } =
      body.value;

    products = products.map((p) =>
      p.id === params.id ? { ...p, ...updateData } : p
    );

    response.status = 200;
    response.body = {
      success: true,
      data: products,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      message: 'No product found',
    };
  }
};

// @desc  Delete product
// @route DELETE /api/v1/products/:id
const deleteProduct = ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  // response.body = 'deleteProduct';
  products = products.filter((p) => p.id !== params.id);
  response.body = {
    success: true,
    message: "Product removed"
  };
};

export { getProducts, getProduct, addProduct, updateProduct, deleteProduct };
