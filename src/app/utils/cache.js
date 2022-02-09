const Redis = require("ioredis");
require("dotenv").config();

class cache {
  constructor() {
    this.redis = new Redis(process.env.REDIS_URL, {
      tls: {
        rejectUnauthorized: false
      }
    });
  }

  async get(key) {
    const value = await this.redis.get(key);
    if (!value) return null;
    
    return JSON.parse(value)
  }

  set(key, value, timeExp) {
    return this.redis.set(key, JSON.stringify(value), "EX", timeExp);
  }
  
  del(key) {
    return this.redis.del(key);
  }
}

module.exports = new cache();
