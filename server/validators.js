const { get } = require('lodash');

function validateRequestBody(key) {
    return (req, res, next) => {
        if (!get(req.body, key)) {
            res.status(400).json({
                status: 'error',
                message: 'malformed request body'
            });
        }
        else {
            next();
        }
    };
}

function validateQueryParam(key) {
    return (req, res, next) => {
        if (!get(req.query, key)) {
            res.status(400).json({
                status: 'error',
                message: 'request missing query parameters'
            });
        }
        else {
            next();
        }
    };
}

module.exports = {
    validateRequestBody,
    validateQueryParam
};
