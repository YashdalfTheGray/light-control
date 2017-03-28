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

module.exports = {
    getStatus
};
