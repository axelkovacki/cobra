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
        const apps = await this.manager.find();

        if (!apps.length) {
            const model = new this.manager({
                name: 'Test',
                domain: 'https://google.com.br',
                token: '123456'
            });

            model.save();
        }

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
