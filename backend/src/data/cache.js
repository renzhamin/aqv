import NodeCache from "node-cache"

const cache_exp = 60 * 5

export const cached_data = new NodeCache({ stdTTL: cache_exp })
