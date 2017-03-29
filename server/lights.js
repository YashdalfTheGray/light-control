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

async function getRoomLights(req, res) {
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

module.exports = {
    getStatus,
    getRoomLights
};
