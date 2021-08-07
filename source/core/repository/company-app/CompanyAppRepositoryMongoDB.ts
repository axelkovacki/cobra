import CompanyApp from '../../entity/CompanyApp';
import DatabaseManager from '../../../infrastructure/database/Manager';
import ICompanyAppRepository from './ICompanyAppRepository';
import CompanyAppAdapter from '../../adapter/CompanyAppAdapter';

export default class CompanyAppRepositoryMongoDB implements ICompanyAppRepository {
    manager: any;

    constructor() {
        this.manager = this.schema(DatabaseManager);
    }

    schema({ Schema, Model, Models }) {
        const CompanyAppSchema = new Schema({
            name: String,
            domain: String,
            token: String
        }, {
            strict: false,
            timestamps: true
        });

        return Models.CompanyApp || Model('CompanyApp', CompanyAppSchema);
    }

    async findByAuthorization(authorization: string): Promise<CompanyApp | boolean> {
        const companyApp = await this.manager.findOne({ token: authorization });

        if (!companyApp) {
            return false;
        }

        return CompanyAppAdapter.create(
            companyApp.name,
            companyApp.domain,
            companyApp.token
        );
    }
}
