const redis = require('redis')
const logger = require('../utils/logger')

let redisClient

const connectRedis = async () => {
  try {
    redisClient = redis.createClient({
      socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379
      },
      password: process.env.REDIS_PASSWORD || undefined
    })

    redisClient.on('error', err => {
      logger.error('Redis Client Error:', err)
    })

    redisClient.on('connect', () => {
      logger.info('Redis client connected')
    })

    // Automatic reconnect strategy
    redisClient.on('end', () => logger.warn('Redis client disconnected'))
    await redisClient.connect()
    return redisClient
  } catch (error) {
    logger.error('Redis connection error:', error)
    throw error
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
