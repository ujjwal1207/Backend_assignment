const redis = require('redis')
const logger = require('../utils/logger')

let redisClient

const connectRedis = async () => {
  try {
    // Allow disabling Redis via env (e.g., on platforms without Redis or during incidents)
    const enabled = (process.env.REDIS_ENABLED || 'true').toLowerCase() === 'true'
    if (!enabled) {
      logger.info('Redis disabled via REDIS_ENABLED=false; skipping connection')
      return null
    }

    const useUrl = process.env.REDIS_URL
    const tlsEnabled =
      (process.env.REDIS_TLS || '').toLowerCase() === 'true' ||
      (useUrl ? useUrl.startsWith('rediss://') : false)

    const options = useUrl
      ? {
          url: useUrl,
          socket: { tls: tlsEnabled }
        }
      : {
          username: process.env.REDIS_USERNAME || undefined,
          password: process.env.REDIS_PASSWORD || undefined,
          socket: {
            host: process.env.REDIS_HOST || 'localhost',
            port: Number(process.env.REDIS_PORT || 6379),
            tls: tlsEnabled
          }
        }

    redisClient = redis.createClient(options)

    redisClient.on('error', err => {
      logger.error('Redis Client Error:', err)
    })

    redisClient.on('connect', () => {
      logger.info('Redis client connected')
    })

    // Log selected connection method (hide secrets)
    if (useUrl) {
      const safeUrl = useUrl.replace(/:\w+@/, '://****@')
      logger.info(`Connecting to Redis via URL (TLS=${tlsEnabled}) -> ${safeUrl}`)
    } else {
      logger.info(
        `Connecting to Redis host ${options.socket.host}:${options.socket.port} (TLS=${tlsEnabled})`
      )
    }

    // Automatic reconnect strategy
    redisClient.on('end', () => logger.warn('Redis client disconnected'))
    await redisClient.connect()
    return redisClient
  } catch (error) {
    logger.error('Redis connection error:', error)
    // Do not crash the app; allow running without Redis
    return null
  }
}

// Cache helpers
const getCache = async key => {
  try {
    const data = await redisClient.get(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    logger.error('Redis GET error:', error)
    return null
  }
}

const setCache = async (key, value, expireTime = 3600) => {
  try {
    await redisClient.setEx(key, expireTime, JSON.stringify(value))
    return true
  } catch (error) {
    logger.error('Redis SET error:', error)
    return false
  }
}

const deleteCache = async key => {
  try {
    await redisClient.del(key)
    return true
  } catch (error) {
    logger.error('Redis DELETE error:', error)
    return false
  }
}

const deleteCachePattern = async pattern => {
  try {
    const keys = await redisClient.keys(pattern)
    if (keys.length > 0) {
      await redisClient.del(keys)
    }
    return true
  } catch (error) {
    logger.error('Redis DELETE PATTERN error:', error)
    return false
  }
}

module.exports = {
  connectRedis,
  getRedisClient: () => redisClient,
  getCache,
  setCache,
  deleteCache,
  deleteCachePattern
}
