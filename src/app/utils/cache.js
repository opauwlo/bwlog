const Redis = require("ioredis");
require("dotenv").config();

class cache {
  constructor() {
    this.redis = new Redis(process.env.REDIS_URL);
  }

  async get(key) {
    const value = await this.redis.get(key);
    if (!value) return null;
    
    return JSON.parse(value)
  }

  set(key, value, timeExp) {
    return this.redis.set(key, JSON.stringify(value), "EX", timeExp);
  }
}

module.exports = new cache();
