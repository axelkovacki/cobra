export default class Staging {
    ip: string;
    method: string;
    url: string;
    headers: string;

    constructor(ip, method, url, headers) {
        this.ip = ip;
        this.method = method;
        this.url = url;
        this.headers = headers;
    }
}