import IBlackListRepository from "../../repository/blacklist/IBlackListRepository";

export default class BlackListFilter {
    blackListRepository: IBlackListRepository;

    constructor(blackListRepository: IBlackListRepository) {
        this.blackListRepository = blackListRepository;
    }

    async execute(ip) {
        const inBlackList = this.blackListRepository.hasIn(ip);

        if (!inBlackList) {
            throw new Error('Ip blocked!')
        }

        return true;
    }
}