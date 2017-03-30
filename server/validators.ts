const { get } = require('lodash');
import { Request, Response, NextFunction, Handler } from 'express';

export function validateRequestBody(key: string): Handler {
    return (req: Request, res: Response, next: NextFunction) => {
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

export function validateQueryParam(key: string): Handler {
    return (req: Request, res: Response, next: NextFunction) => {
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
