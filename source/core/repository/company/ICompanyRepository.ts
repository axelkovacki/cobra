import Company from '../../entity/Company';

export default interface ICompanyRepository {
    insert(name: string, token: string): Promise<Company>;
}
