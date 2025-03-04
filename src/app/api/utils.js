const bcrypt = require('bcrypt');

export function hash(password) {
    return bcrypt.hashSync(password, 10);
}