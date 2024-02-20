const { faker } = require('@faker-js/faker');
const productRepository= require('./productRepository')

async function up(numberOfProducts) {
    for (let count = 1; count <= numberOfProducts; count++) {
        let newProduct = {
            "id": count,
            "name": faker.commerce.productName(),
            "price": faker.commerce.price({ min: 10, max: 1000, dec: 2}),
            "description": faker.lorem.lines(),
            "product": "Product type here",
            "color": faker.color.human(),
            "image": faker.image.url()
        }

        await productRepository.save(newProduct);
    }
}

module.exports = {
    up
}