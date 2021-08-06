import DatabaseManager from '../../../infrastructure/database/Manager';
import IBlackListRepository from './IBlackListRepository';

export default class BlackListRepositoryMongoDB implements IBlackListRepository {
    manager: any;

    constructor() {
        this.manager = this.schema(DatabaseManager);
    }

    schema(manager) {
        const { Schema, Model, Models } = manager;

        const BlackListSchema = new Schema({
            ip: String,
            method: String,
            url: String,
            headers: Schema.Types.Mixed
        }, {
            strict: false,
            timestamps: true
        });

        return Models.BlackList || Model('BlackList', BlackListSchema);
    }

    async insert(ip: string): Promise<void> {
        await this.manager.create({ ip });
    }

    async hasIn(ip): Promise<boolean> {
        const data = await this.manager.findOne({ ip });

        if (!data) return false;

        return true;
    }
}
