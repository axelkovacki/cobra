import ClientRequest from '../../entity/ClientRequest';

export default interface IStagingAreaRepository {
    insert(clientRequest: ClientRequest): void;
    findOne(ip: string): Promise<any>;
}
