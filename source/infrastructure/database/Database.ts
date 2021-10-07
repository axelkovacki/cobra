import Mongoose from 'mongoose';

export default class Database {
    connector: any;

    constructor() {
        this.connector = Mongoose;
    }

    init() {
        try {
            const {
                MONGO_USERNAME,
                MONGO_PASSWORD,
                MONGO_HOSTNAME,
                MONGO_PORT,
                MONGO_DB
            } = process.env;

            const options = {
                useNewUrlParser: true,
                connectTimeoutMS: 10000,
                useUnifiedTopology: true
            };

            const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
            console.log(url);
            this.connector.connect(url, options);
        } catch (err) {
            console.log(err);
        }
    }
}
