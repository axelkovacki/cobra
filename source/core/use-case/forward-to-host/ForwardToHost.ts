export default class ForwardToHost {
    constructor(private requestMaker: any) {}

    async execute(ip: string, method: string, url: string, headers: any) {
        return await this.requestMaker.get(url);
    }
}