import "dotenv/config"

export const cache_exp_city = 60 * 60 * 24 * 30
export const cache_exp_country = cache_exp_city * 2
export const cache_exp_ranking = 60 * 30

import { Redis } from "@upstash/redis"

export const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
})
