const Router = require('koa-router');
const productHandler = require('../handlers/productHandler');
const productInputMiddleware = require('../middlewares/productInputMiddleware');

const router = new Router({
    prefix: '/api'
});

router.get('/products', productHandler.getProducts)

router.post('/products', productInputMiddleware, productHandler.create);

router.get('/product/:id', productHandler.getProduct)

router.put('/product/:id', productHandler.update);

router.delete('/product/:id', productHandler.remove);

module.exports = router;
