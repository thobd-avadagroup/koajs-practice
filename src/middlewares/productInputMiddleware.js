const yup = require('yup');

module.exports = async (ctx, next) => {
    try {
        const postData = ctx.request.body;
        const schema = yup.object().shape({
            id: yup.number().positive().integer().required(),
            price: yup.string().required(),
            description: yup.string().required(),
            product: yup.string().required(),
            color: yup.string().required(),
            image: yup.string().required(),
        })

        await schema.validate(postData);
        next();
    } catch (e) {
        ctx.status = 400;
        ctx.body = {
            success: false,
            error: e.errors,
            errorName: e.name
        }
    }
}