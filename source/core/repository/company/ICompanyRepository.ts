import Company from '../../entity/Company';

export default interface ICompanyRepository {
    insert(name: string, apps: Array<any>): Promise<Company>;
    findByAuthorization(authorization: string): Promise<Company>;
}
