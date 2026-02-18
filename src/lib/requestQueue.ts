/* eslint-disable @typescript-eslint/no-explicit-any */

interface QueueItem<T> {
  fn: () => Promise<T>;
  resolve: (value: T) => void;
  reject: (error: any) => void;
  addedAt: number;
}

class RequestQueue {
  private queue: QueueItem<any>[] = [];
  private processing = false;
  private requestTimestamps: number[] = [];
  private readonly maxPerMinute = 28; // Buffer under Groq's 30/min limit
  private readonly minuteMs = 60000;
  private processedCount = 0;

  async add<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      const item: QueueItem<T> = {
        fn,
        resolve,
        reject,
        addedAt: Date.now(),
      };

      this.queue.push(item);

      console.log(`📥 Added to queue. Position: ${this.queue.length}`);

      this.process();
    });
  }

  private async process() {
    if (this.processing || this.queue.length === 0) return;

    this.processing = true;
    console.log(`🔄 Processing queue (${this.queue.length} items)...`);

    while (this.queue.length > 0) {
      const now = Date.now();

      // Clean old timestamps (older than 1 minute)
      this.requestTimestamps = this.requestTimestamps.filter(
        (t) => now - t < this.minuteMs,
      );

      // If at rate limit, wait
      if (this.requestTimestamps.length >= this.maxPerMinute) {
        const oldestRequest = this.requestTimestamps[0];
        const waitTime = this.minuteMs - (now - oldestRequest) + 100;

        console.log(
          `⏳ Rate limit: ${this.requestTimestamps.length}/${this.maxPerMinute} requests. Waiting ${Math.ceil(waitTime / 1000)}s`,
        );
        await new Promise((resolve) => setTimeout(resolve, waitTime));
        continue;
      }

      // Process next request
      const item = this.queue.shift();
      if (!item) break;

      const waitTime = now - item.addedAt;
      console.log(`⚡ Processing request (waited ${waitTime}ms)`);

      try {
        this.requestTimestamps.push(now);
        const result = await item.fn();
        item.resolve(result);
        this.processedCount++;
        console.log(
          `✅ Request completed (${this.processedCount} total processed)`,
        );
      } catch (error) {
        console.error("❌ Request failed:", error);
        item.reject(error);
      }

      // Small delay between requests (be nice to API)
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    this.processing = false;
    console.log("✨ Queue empty");
  }

  getStats() {
    const now = Date.now();
    const recentRequests = this.requestTimestamps.filter(
      (t) => now - t < this.minuteMs,
    );

    return {
      queueLength: this.queue.length,
      requestsInLastMinute: recentRequests.length,
      totalProcessed: this.processedCount,
      maxPerMinute: this.maxPerMinute,
    };
  }
}

export const requestQueue = new RequestQueue();
