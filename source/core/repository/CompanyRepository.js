import DatabaseManager from '../../infrastructure/database/Manager.js';

export default class CompanyRepository {
    constructor() {
        this.repository = this.schema(DatabaseManager);
    }

    schema(manager) {
        const { Schema, Model } = manager;

        const CompanySchema = new Schema({
            name: String,
            apps: [{
                name: String,
                host: String,
                maxRequestsPerSecond: Number,
            }],
            key: String
        }, {
            strict: false,
            timestamps: true
        });

        return Model('Company', CompanySchema);
    }

    async insert(company) {
        this.repository.insert(company);
    }

    async insertAppByCompany(company) {
        const result = await this.repository.find({ key: company.key });
        if (!result.length) {
            return [];
        }

        const schemaService = new DataSchemaService(
            userId,
            projectId,
            schema,
            result
        );

        const data = schemaService.undigest();

        return data;
    }
}
