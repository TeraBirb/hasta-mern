const RequestCount = require('../models/requestCount');

const RATE_LIMIT = 300; // per month
const RATE_LIMIT_WINDOW = 31 * 24 * 60 * 60 * 1000; // 31 days in milliseconds

const rateLimit = async (req, res, next) => {
    try {
        // Retrieve request count document from MongoDB
        const requestCountDoc = await RequestCount.findOne();
        const requestCount = requestCountDoc ? requestCountDoc.count : 0;
        const lastResetTimestamp = requestCountDoc ? requestCountDoc.lastResetTimestamp : Date.now();
        
        // Check if the window has elapsed since the last reset
        const now = Date.now();
        const timeElapsedSinceReset = now - lastResetTimestamp;
        if (timeElapsedSinceReset >= RATE_LIMIT_WINDOW) {
            // Reset request count and update last reset timestamp
            await RequestCount.updateOne({}, { count: 1, lastResetTimestamp: now });
        } else {
            // Increment request count
            await RequestCount.updateOne({}, { $inc: { count: 1 } });
        }
        
        // Check if request count exceeds the monthly limit
        if (requestCount >= RATE_LIMIT) {
            return res.status(429).send('Too Many Requests');
        }
        
        next();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error, problem with rate limit middleware' });
    }
};

module.exports = rateLimit;