const productRepository = require('../database/productRepository');

async function getProducts(ctx) {
    try {
        let fieldsQueryPram = ctx.query.fields?.toString();

        let allProducts = await productRepository.getAll();
        let selectedProducts = ctx.query.limit ? allProducts.slice(0, ctx.query.limit) : allProducts
        if (fieldsQueryPram) {
            let fieldsToFilter = fieldsQueryPram.split(',');
            selectedProducts = selectedProducts.map((product) => {
                let extractedProduct = {}
                fieldsToFilter.forEach((field) => {
                    if (Object.hasOwn(product, field)) {
                        extractedProduct[field] = product[field];
                    }
                })
                return extractedProduct;
            })
        }

        ctx.body = {
            data: selectedProducts
        }
    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        };
    }
}

async function getProduct(ctx) {
    try {
        const {id} = ctx.params;
        const product = await productRepository.getOne(parseInt(id));
        if (product) {
            return ctx.body = {
                data: product
            }
        }

        throw new Error('Product Not Found!');
    } catch (e) {
        ctx.status = 404;
        return ctx.body = {
            success: false,
            error: e.message
        }
    }
}

async function create(ctx) {
    try {
        const postData = ctx.request.body;
        await productRepository.save(postData);

        ctx.status = 200;
        return ctx.body = {
            success: true
        };
    } catch (e) {
        return ctx.body = {
            success: false,
            error: e.message
        }
    }
}

async function update(ctx) {
    try {
        const {id} = ctx.params;
        const postData = ctx.request.body;
        await productRepository.update(parseInt(id), postData);

        ctx.status = 200;
        return ctx.body = {
            success: true
        };
    } catch (e) {
        return ctx.body = {
            success: false,
            error: e.message
        }
    }
}

async function remove(ctx) {
    try {
        const {id} = ctx.params;
        const product = productRepository.remove(parseInt(id));
        if (product) {
            return ctx.body = {
                success: true
            }
        }

        throw new Error('Product Not Found!');
    } catch (e) {
        ctx.status = 404;
        return ctx.body = {
            success: false,
            error: e.message
        }
    }
}

module.exports = {
    getProducts,
    getProduct,
    create,
    update,
    remove
}