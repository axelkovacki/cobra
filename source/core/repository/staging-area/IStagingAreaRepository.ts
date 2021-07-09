import ClientRequest from '../../entity/ClientRequest';

export default interface IStagingAreaRepository {
    insert(clientRequest: ClientRequest): void;
    countByIp(ip: string): number;
    getLast(ip: string): ClientRequest;
}
