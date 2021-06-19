import DatabaseManager from '../../infrastructure/database/Manager.js';

export default class BlackListRepository {
    constructor() {
        this.repository = this.schema(DatabaseManager);
    }

    schema(manager) {
        const { Schema, Model } = manager;

        const BlackListSchema = new Schema({
            ip: String,
            method: String,
            url: String,
            headers: Schema.Types.Mixed
        }, {
            strict: false,
            timestamps: true
        });

        return Model('BlackList', BlackListSchema);
    }

    async insert(blackList) {
        this.repository.insert(blackList);
    }

    async findByIp(ip) {
        const data = await this.repository.findOne({ ip });

        if (!data) {
            return null;
        }

        return data;
    }
}
