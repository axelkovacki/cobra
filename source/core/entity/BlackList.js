export default class BlackList {
    constructor(ip, method, url, headers, publicKey) {
        this.ip = ip;
        this.method = method;
        this.url = url;
        this.headers = headers;
    }
}