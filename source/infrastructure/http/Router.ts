import ExpressAdapter from '../../adapter/ExpressAdapter';
import AuthenticationMiddleware from '../../middleware/AuthenticationMiddleware';
import HttpController from '../../controller/HttpController';

export default class Router {
    static async handle(req, res, next) {
        try {
            req.app = await AuthenticationMiddleware.handle(req, res);

            if (req.method === 'GET') {
                return await HttpController.get(req, res);
            }

            if (req.method === 'POST') {
                return ExpressAdapter.create(HttpController.post);
            }

            if (req.method === 'PUT') {
                return ExpressAdapter.create(HttpController.put);
            }

            if (req.method === 'DELETE') {
                return ExpressAdapter.create(HttpController.delete);
            }

            next();
        } catch (err) {
            res.status(500).send({
                error: err.message
            });

            next();
        }
    }
}