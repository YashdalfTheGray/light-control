const request = require('request-promise');

async function getStatus(req, res) {
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

async function getAllRooms(req, res) {
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

async function getRoomLights(req, res) {
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

async function setRoomLights(req, res) {
    try {
        const response = await request({
            method: 'POST',
            uri: `${process.env.HUE_REMOTE_URL}/api/groups/${req.params.id}/action`,
            json: true,
            headers: {
                Authorization: `Bearer ${process.env.HUE_REMOTE_TOKEN}`
            },
            body: req.body
        });

        res.json(response);
    }
    catch (e) {
        res.status(500).json(e);
    }
}

async function getOneLight(req, res) {
    try {
        const response = await request({
            uri: `${process.env.HUE_REMOTE_URL}/api/lights/${req.params.id}`,
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

async function setOneLight(req, res) {
    try {
        const response = await request({
            method: 'POST',
            uri: `${process.env.HUE_REMOTE_URL}/api/lights/${req.params.id}/state`,
            json: true,
            headers: {
                Authorization: `Bearer ${process.env.HUE_REMOTE_TOKEN}`
            },
            body: req.body
        });

        res.json(response);
    }
    catch (e) {
        res.status(500).json(e);
    }
}

module.exports = {
    getStatus,
    getAllRooms,
    getRoomLights,
    setRoomLights,
    getOneLight,
    setOneLight
};
