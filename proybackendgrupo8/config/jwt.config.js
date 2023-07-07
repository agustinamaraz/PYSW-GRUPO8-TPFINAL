const jwt = require('jsonwebtoken');

const getToken = (payload) => {
    return jwt.sign({
        data: payload
    }, 'SECRET', { expiresIn: '1h' });
}
const getTokenPassword = (payload) => {
    return jwt.sign({
        data: payload
    }, 'SECRET', { expiresIn: '1h' });
}
const getTokenData = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, 'SECRET', (err, decoded) => {
            if (err) {
                console.log('Error al obtener data del token');
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
};

module.exports = {
    getToken,
    getTokenData,
    getTokenPassword
}