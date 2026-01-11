import Redis from "ioredis";

const redis = new Redis({
  host: "127.0.0.1",
  port: 6379,
  // password: "your_password", // if needed
  // db: 0,
  retryStrategy(times) {
    return Math.min(times * 50, 2000);
  },
});

redis.on("connect", () => {
  console.log("🟢 Redis connected");
});

redis.on("ready", () => {
  console.log("✅ Redis ready");
});

redis.on("error", (err) => {
  console.error("🔴 Redis error:", err);
});

redis.on("close", () => {
  console.log("🟡 Redis connection closed");
});

export default redis;
