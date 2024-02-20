const productRepository = require('../database/productRepository');

async function getProducts(ctx) {
    try {
        let limit = ctx.query.limit?.toString();
        let order = ctx.query.order?.toString().toLowerCase();
        let fieldsQueryPram = ctx.query.fields?.toString();
        let fieldsToFilter = fieldsQueryPram?.split(',');

        let selectedProducts = await productRepository.getAll(fieldsToFilter, limit, order);

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