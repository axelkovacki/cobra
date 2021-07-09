import ClientRequest from '../../entity/ClientRequest';
import IStagingAreaRepository from './IStagingAreaRepository';

export default class StagingRepositoryMemory implements IStagingAreaRepository {
    list: any = [];

    insert(clientRequest: ClientRequest): void {
        if (!this.list[clientRequest.ip]) {
            this.list[clientRequest.ip] = [];
        }

        this.list[clientRequest.ip].push(clientRequest);
    }

    countByIp(ip): number {
        if (!this.list[ip]) {
            return 0;
        }

        return this.list[ip].length;
    }

    getLast(ip): ClientRequest {
        if (!this.list[ip]) {
            return undefined;
        }

        return this.list[ip][this.countByIp(ip) - 1];
    }
}
