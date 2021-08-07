import ICompanyAppRepository from '../../repository/company-app/ICompanyAppRepository';

export default class Authenticate {
    constructor(
        private companyAppRepository: ICompanyAppRepository
    ) {}

    async execute(authorization: string) {
        const companyApp = await this.companyAppRepository.findByAuthorization(authorization);

        if (!companyApp) {
            throw new Error('Not Authenticated');
        }

        return companyApp;
    }
}