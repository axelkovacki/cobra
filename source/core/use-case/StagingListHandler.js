export default class BlackListFilter {
    constructor(blackListRepository) {
        this.blackListRepository = blackListRepository;
    }

    async execute(ip) {
        const inBlackList = this.blackListRepository.findByIp(ip);

        if (!inBlackList) {
            throw new Error('Ip blocked!')
        }

        return true;
    }
}