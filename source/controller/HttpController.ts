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
            console.log(url)

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

            // const forwardToHost = new ForwardToHost(requestMaker);

            // const response = await forwardToHost.execute(
            //     socket.remoteAddress,
            //     method,
            //     url,
            //     headers
            // );

            return res.send({teste: 'response'}, 200);
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
