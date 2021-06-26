import Staging from '../../entity/Staging';
import IStagingRepository from './IStagingRepository';

export default class StagingRepositoryMemory implements IStagingRepository {
    list: any = [];

    insert(staging: Staging): void {
        if (!this.list[staging.ip]) {
            this.list[staging.ip] = [];
        }

        this.list[staging.ip].push(staging);
    }

    countByIp(ip): number {
        return 1;
    }
}
