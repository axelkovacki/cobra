import ExpressAdapter from '../../adapter/ExpressAdapter';
import AuthenticationMiddleware from '../../middleware/AuthenticationMiddleware';
import HttpController from '../../controller/HttpController';

export default class Router {
    static handle(req, res, next) {
        req.authentication = AuthenticationMiddleware.handle(req, res);

        if (req.method === 'GET') {
            return HttpController.get(req, res);
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
    }
}