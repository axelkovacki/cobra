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
            apps: Schema.Types.Mixed
        }, {
            strict: false,
            timestamps: true
        });

        return Models.Company || Model('Company', CompanySchema);
    }

    async insert(name: string, apps: Array<any>): Promise<Company> {
        const company = await this.manager.create({
            name,
            apps
        });

        return CompanyAdapter.create(
            company.name,
            company.apps
        );
    }

    async findByAuthorization(authorization: string): Promise<Company> {
        const company = await this.manager.create({
            name,
            apps
        });

        return CompanyAdapter.create(
            company.name,
            company.apps
        );
    }
}
