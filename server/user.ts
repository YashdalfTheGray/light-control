import * as uuid from 'uuid';
import { sign } from 'jsonwebtoken';
import { Request, Response } from 'express';

import { getDb } from './db';

export class User {
    name: string;
    created: number;
    isVerified: boolean;
    accessToken: string;

    constructor(name: string) {
        this.name = name;
        this.created = Date.now();
        this.isVerified = false;
        this.accessToken = uuid();
    }
}

const jwtOptions = {
    issuer: process.env.JWT_ISSUER,
    expiresIn: process.env.JWT_TTL
};

export async function registerUser(req: Request, res: Response) {
    try {
        const db = await getDb(process.env.DB_URL);
        const collection = await db.collection('users');
        const users = await collection.find({ name: req.body.name }).toArray();

        if (users.length === 0) {
            const { result } = await collection.insertOne(new User(req.body.name));
            if (result.ok === 1) {
                res.sendStatus(201);
            }
            else {
                res.status(500).json({
                    status: 'error',
                    message: 'something went wrong'
                });
            }
        }
        else {
            res.status(400).json({
                status: 'error',
                message: 'user already exists'
            });
        }
    }
    catch (e) {
        res.status(500).json(e);
    }
}

export async function loginUser(req: Request, res: Response) {
    try {
        const db = await getDb(process.env.DB_URL);
        const collection = await db.collection('users');
        const [user, ...rest] = await collection.find({ name: req.query.name }).toArray();

        if (rest.length !== 0) {
            res.status(500).json({
                status: 'error',
                message: 'more than one user found'
            });
            return;
        }

        if (!user) {
            res.sendStatus(403);
        }
        else {
            res.json({
                token: sign({ usr: user.name, tkn: user.accessToken }, process.env.JWT_SECRET, jwtOptions)
            });
        }
    }
    catch (e) {
        res.status(500).json(e);
    }
}

export async function deleteUser(req: Request, res: Response) {
    try {
        const db = await getDb(process.env.DB_URL);
        const collection = await db.collection('users');
        res.json(await collection.remove({ name: req.params.name }));
    }
    catch (e) {
        res.status(500).json(e);
    }
}
