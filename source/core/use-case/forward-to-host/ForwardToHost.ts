import ClientRequest from '../../entity/ClientRequest';
import IBlackListRepository from '../../repository/black-list/IBlackListRepository';
import IStagingAreaRepository from '../../repository/staging-area/IStagingAreaRepository';

export default class ForwardToHost {
    constructor(
        private blackListRepository: IBlackListRepository,
        private stagingAreaRepository: IStagingAreaRepository
    ) {}

    async execute(ip: string, method: string, url: string, headers: any) {
        const clientRequest = new ClientRequest(ip, method, url, headers);
        const inBlackList = this.blackListRepository.hasIn(clientRequest.ip);

        if (inBlackList) {
            throw new Error('Ip blocked!')
        }

        const timesInStagingArea = this.stagingAreaRepository.countByIp(clientRequest.ip);
        const lastInStagingArea = this.stagingAreaRepository.getLast(clientRequest.ip);

        if (
            timesInStagingArea > 5
            && clientRequest.timestamp === lastInStagingArea.timestamp
        ) {
            this.blackListRepository.insert(clientRequest.ip);
        }

        this.stagingAreaRepository.insert(clientRequest);

        return true;
    }
}