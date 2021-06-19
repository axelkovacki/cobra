import Express from 'express';
import Cors from 'cors';

export default class Server {
    constructor() {
        this.server = new Express();
        this.cors = Cors();
        this.parser = Express.json();
        this.port = process.env.HTTP_PORT || 8080;
    }

    async init() {
        try {
            this.server.use(this.cors);
            this.server.use(this.parser);
            this.router();

            this.server.listen(this.port);
            console.log(this.getListeningMessage());
        } catch (err) {
            console.log(err);
            process.exit(1);
        }
    }

    router() {
        this.server.get('/', (req, res) => {
            return res.send('Cobra API is alive!');
        });
    }

    getListeningMessage() {
        return `
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        COBRA on in ${this.port}
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        `;
    }
}