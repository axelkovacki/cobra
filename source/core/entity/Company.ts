export default class Company {
    constructor(
        public id: string,
        public name: string,
        public token: string
    ) {}

    isValidToken(token) {
        return (token === this.token);
    }
};