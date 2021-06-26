import IStagingRepository from "../repository/staging/IStagingRepository";

export default class BlackListFilter {
    stagingRepository: IStagingRepository;

    constructor(stagingRepository: IStagingRepository) {
        this.stagingRepository = stagingRepository;
    }

    async execute(ip) {
        const countIp = this.stagingRepository.countByIp(ip);

        if (!countIp) {
            throw new Error('Ip blocked!')
        }

        return true;
    }
}