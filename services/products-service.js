const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ProductsService {
  constructor() {
    this.products = [];
    this.generateProducts();
  }

  async generateProducts() {
    const limit = 30;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(10)),
        image: faker.image.urlPicsumPhotos(),
        isBlocked: faker.datatype.boolean()
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.string.uuid(),
      ...data,
    };

    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.products);
      }, 1000);
    });
    //return this.products
  }

  async findOne(id) {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      throw boom.notFound('Product not found: ' + id);
    } if( product.isBlocked ){
      throw boom.conflict('Product is blocked: ' + id);
    }
    return product;
  }
  //31103e7d-4e49-4e9c-a77a-d342f0c389d7

  async update(id, changes) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index == -1) {
      throw boom.notFound('Product not found: ' + id);
    }
    const product = this.products[index];

    this.products[index] = {
      ...product,
      ...changes,
    };

    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index == -1) {
      throw boom.notFound('Product not found: ' + id);
    } else {
      this.products.splice(index, 1);
      return { id: id, message: 'Product deleted' };
    }
  }
}

module.exports = ProductsService;
