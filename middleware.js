// middleware.js
const blockAdmin = (req, res, next) => {
    if (req.body?.Name?.toLowerCase() === 'admin') {
        return res.status(400).json({ message: "Cannot add entry with name 'admin'" });
    }
    next();
};

module.exports = { blockAdmin };
