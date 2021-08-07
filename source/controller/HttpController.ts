import HandleBlackList from '../core/use-case/handle-black-list/HandleBlackList';
import ForwardToHost from '../core/use-case/forward-to-host/ForwardToHost';
import BlackListRepositoryMongoDB from '../core/repository/black-list/BlackListRepositoryMongoDB';
import StagingAreaRepositoryMongoDB from '../core/repository/staging-area/StagingAreaRepositoryMongoDB';
import timestampFormatter from '../core/shared/TimestampFormatter';
import requestMaker from '../core/shared/RequestMaker';

export default class HttpController {
    static async get(req, res) {
        try {
            const { socket, method, url, headers } = req;
            const blackListRepository = new BlackListRepositoryMongoDB();
            const stagingAreaRepository = new StagingAreaRepositoryMongoDB();

            const handleBlackList = new HandleBlackList(
                blackListRepository,
                stagingAreaRepository,
                timestampFormatter
            );

            await handleBlackList.execute(
                socket.remoteAddress,
                method,
                url,
                headers
            );

            const forwardToHost = new ForwardToHost(requestMaker);

            // const response = await forwardToHost.execute(
            //     socket.remoteAddress,
            //     method,
            //     url,
            //     headers
            // );

            return res
                .status(200)
                .send('response');
        } catch (err) {
            return res
                .status(500)
                .send({
                    error: err.message
                });
        }
    }

    static post(req, res) {}

    static put(req, res) {}

    static delete(req, res) {}
}
