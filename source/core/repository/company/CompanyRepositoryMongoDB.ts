import Company from '../../entity/Company';
import DatabaseManager from '../../../infrastructure/database/Manager';
import ICompanyRepository from './ICompanyRepository';
import CompanyAdapter from '../../adapter/CompanyAdapter';

export default class CompanyRepositoryMongoDB implements ICompanyRepository {
    manager: any;

    constructor() {
        this.manager = this.schema(DatabaseManager);
    }

    schema(manager) {
        const { Schema, Model, Models } = manager;

        const CompanySchema = new Schema({
            name: String,
            token: String
        }, {
            strict: false,
            timestamps: true
        });

        return Models.Company || Model('Company', CompanySchema);
    }

    async insert(name: string, token: string): Promise<Company> {
        const company = await this.manager.create({
            name,
            token
        });

        return CompanyAdapter.create(
            company._id,
            company.name,
            company.token
        )
    }
}
