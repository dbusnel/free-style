const bcrypt = require('bcrypt');

export function hash(password) {
    return bcrypt.hashSync(password, 10);
}

/**
 * Create a GUID for authentication cookie
 */
export function genGUID() {
    return crypto.randomUUID();
}