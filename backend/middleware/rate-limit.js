const RATE_LIMIT = 300; // per month
const RATE_LIMIT_WINDOW = 31 * 24 * 60 * 60 * 1000; // 31 days in milliseconds

// In-memory storage for request count and timestamps
let requestCount = 0;
let lastResetTimestamp = new Date();

const rateLimit = (req, res, next) => {
    const now = new Date();

    // Reset request count if it's a new month
    if (now - lastResetTimestamp > RATE_LIMIT_WINDOW) {
        requestCount = 0;
        lastResetTimestamp = now;
    }

    // Check if request count exceeds the monthly limit
    if (requestCount >= RATE_LIMIT) {
        return res.status(429).send('Too Many Requests');
    }

    requestCount++;
    next();
};

module.exports = rateLimit;