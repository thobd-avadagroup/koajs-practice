const fs = require('fs');
const path = require('path');
const {data: products} = require('./products.json');
const DATABASE_FILE_PATH = path.join(__dirname, 'products.json');

let loadedProducts = [...products]

async function getAll() {
    return loadedProducts;
}

async function getOne(id) {
    return loadedProducts.find(product => product.id === id);
}

async function save(data) {
    data.createdAt = new Date().toLocaleString()
    const updatedProducts = [...loadedProducts, data];
    loadedProducts = updatedProducts;

    fs.writeFileSync(
        DATABASE_FILE_PATH,
        JSON.stringify({data: updatedProducts}, null, 4)
    );
}

async function update(id, data) {
    loadedProducts.forEach((product, index) => {
        if (product.id === id) {
            product = {...product, ...data};
            loadedProducts[index] = product;
        }
    });

    fs.writeFileSync(
        DATABASE_FILE_PATH,
        JSON.stringify({data: loadedProducts}, null, 4)
    );
}

async function remove(id) {
    const updatedProducts = loadedProducts.filter((product) => {
        return product.id !== id;
    })
    loadedProducts = updatedProducts;

    fs.writeFileSync(
        DATABASE_FILE_PATH,
        JSON.stringify({data: updatedProducts}, null, 4)
    );
}

module.exports = {
    getAll,
    getOne,
    save,
    update,
    remove
}