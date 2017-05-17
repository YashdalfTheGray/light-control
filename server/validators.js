const { get } = require('lodash');

function validate(location, message, key) {
    return (req, res, next) => {
        if (!get(req[location], key)) {
            res.status(400).json({
                status: 'error',
                message: message
            });
        }
        else {
            next();
        }
    };
}

const validateRequestBody = validate.bind(null, 'body', 'malformed request body');
const validateQueryParam = validate.bind(null, 'query', 'request missing query parameters');

module.exports = {
    validateRequestBody,
    validateQueryParam
};
