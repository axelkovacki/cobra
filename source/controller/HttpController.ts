import ForwardToHost from '../core/use-case/forward-to-host/ForwardToHost';
import BlackListRepositoryMongoDB from '../core/repository/black-list/BlackListRepositoryMongoDB';
import StagingRepositoryMemory from '../core/repository/staging-area/StagingAreaRepositoryMemory';

export default class HttpController {
    static async get(req, res) {
        try {
            const { socket, method, url, headers } = req;

            const blackListRepository = new BlackListRepositoryMongoDB();
            const stagingAreaRepository = new StagingRepositoryMemory();

            const forwardToHost = new ForwardToHost(
                blackListRepository,
                stagingAreaRepository
            );

            await forwardToHost.execute(
                socket.remoteAddress,
                method,
                url,
                headers
            );

            return res.send({
                data: 'test'
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
