import ClientRequest from '../../entity/ClientRequest';
import DatabaseManager from '../../../infrastructure/database/Manager';
import IStagingAreaRepository from './IStagingAreaRepository';

export default class StagingRepositoryMongoDB implements IStagingAreaRepository {
    manager: any;

    constructor() {
        this.manager = this.schema(DatabaseManager);
    }

    schema({ Schema, Model, Models }) {
        const StagingAreaSchema = new Schema({
            ip: String,
            payload: Schema.Types.Mixed
        }, {
            strict: false,
            timestamps: true
        });

        return Models.StagingArea || Model('StagingArea', StagingAreaSchema);
    }

    async insert(clientRequest: ClientRequest): Promise<void> {
        const inStagingArea = await this.manager.findOne({ ip: clientRequest.ip });

        if (!inStagingArea) {
            return await this.manager.create({ ip: clientRequest.ip, payload: [clientRequest] });
        }

        inStagingArea.set({
            payload: [...inStagingArea.payload, clientRequest]
        });

        await inStagingArea.save();
    }

    async findOne(ip: string): Promise<any> {
        return await this.manager.findOne({ ip });
    }
}
