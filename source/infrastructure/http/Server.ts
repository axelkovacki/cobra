import Express from 'express';
import Cors from 'cors';
import HttpController from '../../controller/HttpController';

export default class Server {
    server: any;
    cors: any;
    parser: any;
    port: string;

    constructor() {
        this.server = new Express();
        this.cors = Cors();
        this.parser = Express.json();
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

    router(req, res, next) {
        if (req.method === 'GET') {
            return HttpController.get(req, res);
        }

        if (req.method === 'POST') {
            return HttpController.post(req, res);
        }

        if (req.method === 'PUT') {
            return HttpController.put(req, res);
        }

        if (req.method === 'DELETE') {
            return HttpController.delete(req, res);
        }

        next();
    }

    getListeningMessage() {
        return `
            >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
                    COBRA on in ${this.port}
            <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        `;
    }
}