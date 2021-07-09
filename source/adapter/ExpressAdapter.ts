export default class ExpressAdapter {
    static create(callback) {
        return async function(req, res) {
            return callback(req, res);
        }
    }
}