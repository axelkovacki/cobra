import CompanyApp from '../../entity/CompanyApp';

export default class ForwardToHost {
    constructor(
        private requestMaker: any,
        private app: CompanyApp
    ) {}

    async execute(ip: string, method: string, url: string, headers: any) {
        return await this.requestMaker.get(
            `${this.app.domain}${url}`
        );
    }
}