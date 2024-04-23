const rateLimiter = require('express-rate-limit')

const limiter = rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    message: 'Rate Limit exceed', // Response to return after limit is reached.
    /*
        standardHeaders: true, -- which specifies whether the appropriate headers should be added to the response showing 
        the enforced limit (X-RateLimit-Limit), current usage (X-RateLimit-Remaining), and time to wait before retrying (Retry-After)
        when the limit is reached
        draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header 
    */
	standardHeaders: 'draft-7', //Enable the Ratelimit header
	legacyHeaders: false, // Enable/Disable the `X-RateLimit-*` headers.
    keyGenerator: (req,res) => req.ip  //Identify users (defaults to IP address).


    /*
    Use a custom store to share hit counts across multiple nodes.

        memory-store	(default) Simple in-memory option. Does not share state when app has multiple processes or servers.
        rate-limit-redis	A Redis-backed store, more suitable for large or demanding deployments.
        
        // store: ... , // Redis, Memcached, etc. See below.
    */
})


/* 
    For Redis Store Rate Limiter
    const redisStor = require('rate-limit-redis')
    const redisClient = require('../../lib/redis')

    await redisClient.connect()
    const limiter = rateLimiter({
        .
        .
        // Redis store configuration
        store: new RedisStore({
            sendCommand: (...args: string[]) => client.sendCommand(args),
        }),
    })
*/

module.exports = limiter