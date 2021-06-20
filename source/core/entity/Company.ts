export default class Company {
    name: string;
    apps: any;
    key: any;

    constructor(name, apps, key) {
        this.name = name;
        this.apps = apps;
        this.key = key;
    }
};