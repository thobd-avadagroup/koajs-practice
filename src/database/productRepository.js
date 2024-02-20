const fs = require('fs');
const path = require('path');
const {data: products} = require('./products.json');
const DATABASE_FILE_PATH = path.join(__dirname, 'products.json');

let loadedProducts = [...products]

async function getAll(fields = undefined ,limit= undefined, order = '') {
    let sortedProducts = loadedProducts.sort((first, second) => {
        if (order === 'asc') {
            return Date.parse(first.createdAt) - Date.parse(second.createdAt);
        } else if (order === 'desc') {
            return Date.parse(second.createdAt) - Date.parse(first.createdAt);
        }
        return 0;
    });

    let selectedProducts = limit ? loadedProducts.slice(0, limit) : sortedProducts
    if (fields) {
        return selectedProducts.map(product => {
            return Object.keys(product).reduce((extractedProduct, key) => {
                if (fields.includes(key)) {
                    extractedProduct[key] = product[key];
                }
                return extractedProduct;
            }, {});
        })
    }

    return selectedProducts;
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