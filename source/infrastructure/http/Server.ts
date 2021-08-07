import Express from 'express';
import Cors from 'cors';
import Router from './Router';

export default class Server {
    server: any;
    cors: any;
    parser: any;
    router: any;
    port: string;

    constructor() {
        this.server = new Express();
        this.cors = Cors();
        this.parser = Express.json();
        this.router = Router.handle;
        this.port = process.env.HTTP_PORT || '8080';
    }

    async init() {
        try {
            this.server.use(this.cors);
            this.server.use(this.parser);
            this.server.use(this.router);

            this.server.listen(this.port);
            console.log(this.getListeningMessage());
        } catch (err) {
            console.log(err);
            process.exit(1);
        }
    }

    getListeningMessage() {
        return `
            >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
                    COBRA on in ${this.port}
            <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        `;
    }
}