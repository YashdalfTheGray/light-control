import * as request from 'request-promise';
import { Request, Response } from 'express';

export async function getStatus(req: Request, res: Response) {
    try {
        const { status } = await request({
            uri: `${process.env.HUE_REMOTE_URL}`,
            json: true
        });

        res.json({ status });
    }
    catch (e) {
        res.status(500).json(e);
    }
}

export async function getAllLights(req: Request, res: Response) {
    try {
        const response = await request({
            uri: `${process.env.HUE_REMOTE_URL}/api/groups`,
            json: true,
            headers: {
                Authorization: `Bearer ${process.env.HUE_REMOTE_TOKEN}`
            }
        });
        res.json(response);
    }
    catch (e) {
        res.status(500).json(e);
    }
}

export async function getRoomLights(req: Request, res: Response) {
    try {
        const response = await request({
            uri: `${process.env.HUE_REMOTE_URL}/api/groups/${req.params.id}`,
            json: true,
            headers: {
                Authorization: `Bearer ${process.env.HUE_REMOTE_TOKEN}`
            }
        });

        res.json(response);
    }
    catch (e) {
        res.status(500).json(e);
    }
}
