import ICompanyRepository from '../../repository/company/ICompanyRepository';

export default class Authenticate {
    constructor(
        private companyRepository: ICompanyRepository
    ) {}

    async execute(authorization: string) {
        const company = await this.companyRepository.findByAuthorization(authorization);

        if (!company) {
            throw new Error('Not Authenticated');
        }

        return company;
    }
}