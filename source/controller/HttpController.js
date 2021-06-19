import BlackListFilter from '../core/use-case/BlackListFilter.js';
import BlackListRepository from '../core/repository/BlackListRepository.js';

export default class HttpController {
    static async get(req, res) {
        try {
            const { socket, method, url, headers } = req;

            const blackListRepository = new BlackListRepository();
            const blackListFilter = new BlackListFilter(blackListRepository);

            await blackListFilter.execute(
                socket.remoteAddress,
                req.method,
                req.url,
                req.headers
            );

            return res.send({
                data: 'boa'
            }, 200);
        } catch (err) {
            return res.send({
                error: err.message
            }, 500);
        }
    }

    static post(req, res) {}

    static put(req, res) {}

    static delete(req, res) {}
}
