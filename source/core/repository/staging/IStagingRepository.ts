import Staging from '../../entity/Staging';

export default interface IStagingRepository {
    insert(staging: Staging): void;
    countByIp(ip: string): number;
}
