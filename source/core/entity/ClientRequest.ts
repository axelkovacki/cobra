export default class ClientRequest {
    ip: string;
    method: string;
    url: string;
    headers: string;
    timestamp: number;

    constructor(ip, method, url, headers) {
        this.ip = ip;
        this.method = method;
        this.url = url;
        this.headers = headers;
        this.timestamp = Date.now();
    }
}