import Crypto from 'crypto';

export default (secret: string) => {
    return Crypto.createHash('sha256').update(secret, 'utf8').digest('hex');
};
