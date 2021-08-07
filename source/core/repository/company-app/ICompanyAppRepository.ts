import CompanyApp from '../../entity/CompanyApp';

export default interface ICompanyAppRepository {
    findByAuthorization(authorization: string): Promise<CompanyApp | boolean>;
}
