const jwt = require('jsonwebtoken');
const jwtSecure = "Mynameiskpandyoutube!!!##";

function fetchDetails(req, res, next) {
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).json({ message: 'Authorization token is required.' });
    }

    try {
        const decoded = jwt.verify(authToken, jwtSecure);
        req.user = decoded; // Attach user information to the request object
        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        res.status(403).json({ message: 'Invalid token or token expired.' });
    }
}

module.exports =fetchDetails;