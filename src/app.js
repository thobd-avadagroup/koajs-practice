const Koa = require('koa');
const bodyParser = require('koa-body-parser');
const productRepository = require('./database/productRepository')
const productSeeder = require('./database/productSeeder')

const routes = require('./routes/routes');

const app = new Koa();
app.use(bodyParser())
app.use(routes.routes());
app.use(routes.allowedMethods());

// default route
app.use(ctx => {
  ctx.status = 404;
  ctx.body = '404 Not Found!';
});

productRepository.getAll().then(products => {
  if (products.length === 0) {
    console.log('Sample data is being created...');
    productSeeder.up(1000).then(() => {
      console.log('Sample data is created!');
    });
  }
});

console.log('Server is running.');
app.listen(3000);

