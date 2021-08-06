import Company from '../entity/Company';
import ICompanyRepository from '../repository/company/ICompanyRepository';
import SHA256 from '../shared/SHA256';

export default class CreateCompany {
    constructor(
        private companyRepository: ICompanyRepository
    ) {}

    async execute(name: string, secretKey: string): Promise<Company> {
        const company = await this.companyRepository.insert(
            name,
            SHA256(secretKey)
        );

        return company;
    }
}