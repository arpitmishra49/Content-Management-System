import rateLimit from 'express-rate-limit';

export const apiLimiter= rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 2, // Limit each IP to 2 requests per windowMs
    message: {
        success: false,
        message: "Too many requests from this IP, please try again after 15 minutes"
    },
    standardHeaders:true,
    legacyHeaders:false
});

