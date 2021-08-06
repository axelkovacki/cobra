import ClientRequest from '../../entity/ClientRequest';
import IBlackListRepository from '../../repository/black-list/IBlackListRepository';
import IStagingAreaRepository from '../../repository/staging-area/IStagingAreaRepository';

export default class HandleBlackList {
    private REQUEST_LIMIT_PER_SECOND = 5;

    constructor(
        private blackListRepository: IBlackListRepository,
        private stagingAreaRepository: IStagingAreaRepository,
        private timestampFormatter: any
    ) {}

    private async isMaliciousClient(clientRequest: ClientRequest): Promise<boolean> {
        const inBlackList = await this.blackListRepository.hasIn(clientRequest.ip);
        if (inBlackList) {
            return true;
        }

        const inStagingArea = await this.stagingAreaRepository.findOne(clientRequest.ip);
        if (!inStagingArea ||
            !inStagingArea.payload.length ||
            inStagingArea.payload.length < this.REQUEST_LIMIT_PER_SECOND
        ) {
            return false;
        }

        const candidates = inStagingArea.payload.slice(-this.REQUEST_LIMIT_PER_SECOND)
            .map((el) => ({
                ...el,
                timestamp: this.timestampFormatter.toDate(el.timestamp)
            })
        );

        const currentDateClient = this.timestampFormatter.toDate(clientRequest.timestamp);
        const isMalicious = candidates.filter(({ timestamp }) => {
            if (currentDateClient.getSeconds() !== timestamp.getSeconds()) {
                return false;
            }

            if (currentDateClient.getMinutes() !== timestamp.getMinutes()) {
                return false;
            }

            if (currentDateClient.getHours() !== timestamp.getHours()) {
                return false;
            }

            if (currentDateClient.getDay() !== timestamp.getDay()) {
                return false;
            }

            if (currentDateClient.getMonth() !== timestamp.getMonth()) {
                return false;
            }

            if (currentDateClient.getYear() !== timestamp.getYear()) {
                return false;
            }

            return true;
        });

        return isMalicious.length === this.REQUEST_LIMIT_PER_SECOND;
    }

    async execute(ip: string, method: string, url: string, headers: any) {
        const clientRequest = new ClientRequest(ip, method, url, headers);

        if (await this.isMaliciousClient(clientRequest)) {
            await this.blackListRepository.insert(clientRequest.ip);
            throw new Error('Ip blocked!');
        }

        return await this.stagingAreaRepository.insert(clientRequest);
    }
}