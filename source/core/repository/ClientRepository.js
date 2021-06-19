import DatabaseManager from '../../infrastructure/database/Manager.js';

export default class ClientRepository {
    constructor() {
        this.repository = this.schema(DatabaseManager);
    }

    schema(manager) {
        const { Schema, Model } = manager;

        const ClientSchema = new Schema({
            userId: String,
            projectId: String
        }, {
            strict: false,
            timestamps: true
        });

        return Model('Client', ClientSchema);
    }
}
