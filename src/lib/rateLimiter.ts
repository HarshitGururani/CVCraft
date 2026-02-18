interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class SimpleRateLimiter {
  private requests = new Map<string, RateLimitEntry>();
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor(maxRequests: number = 5, windowMinutes: number = 60) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMinutes * 60 * 1000;
  }

  check(identifier: string): {
    allowed: boolean;
    remaining: number;
    resetTime: number;
    message?: string;
  } {
    const now = Date.now();
    const entry = this.requests.get(identifier);

    // No previous requests or window expired
    if (!entry || now > entry.resetTime) {
      const resetTime = now + this.windowMs;
      this.requests.set(identifier, { count: 1, resetTime });
      return {
        allowed: true,
        remaining: this.maxRequests - 1,
        resetTime,
      };
    }

    // Within window, check if limit exceeded
    if (entry.count >= this.maxRequests) {
      const waitMinutes = Math.ceil((entry.resetTime - now) / 60000);
      return {
        allowed: false,
        remaining: 0,
        resetTime: entry.resetTime,
        message: `Rate limit exceeded. Try again in ${waitMinutes} minute${waitMinutes > 1 ? "s" : ""}.`,
      };
    }

    // Increment count
    entry.count++;
    this.requests.set(identifier, entry);

    return {
      allowed: true,
      remaining: this.maxRequests - entry.count,
      resetTime: entry.resetTime,
    };
  }

  // Cleanup old entries every 10 minutes
  cleanup() {
    const now = Date.now();
    let cleaned = 0;

    for (const [key, entry] of this.requests.entries()) {
      if (now > entry.resetTime) {
        this.requests.delete(key);
        cleaned++;
      }
    }

    if (cleaned > 0) {
      console.log(`🧹 Cleaned ${cleaned} expired rate limit entries`);
    }
  }

  // Get current stats (for monitoring)
  getStats() {
    return {
      totalEntries: this.requests.size,
      maxRequests: this.maxRequests,
      windowMinutes: this.windowMs / 60000,
    };
  }
}

// Save rate limiter: 60 saves per hour (generous for active editing)
export const userRateLimiter = new SimpleRateLimiter(60, 60);

// Stricter limiter for AI parsing / uploads: 10 per hour
export const uploadRateLimiter = new SimpleRateLimiter(10, 60);

// Auto-cleanup every 10 minutes
setInterval(() => userRateLimiter.cleanup(), 10 * 60 * 1000);
setInterval(() => uploadRateLimiter.cleanup(), 10 * 60 * 1000);
