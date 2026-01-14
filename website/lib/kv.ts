/**
 * Storage Configuration
 * 
 * This module supports two storage backends:
 * 1. In-memory storage (default for local/development)
 * 2. Vercel Blob storage (for production)
 * 
 * Environment Variables:
 * - USE_BLOB_STORAGE: Set to "true" or "1" to enable blob storage, "false" or "0" to disable (default: "false")
 * - BLOB_READ_WRITE_TOKEN: Required if USE_BLOB_STORAGE is enabled
 * 
 * Usage:
 * - Local/Development: Set USE_BLOB_STORAGE=false (or leave unset) - uses in-memory storage
 * - Production: Set USE_BLOB_STORAGE=true and BLOB_READ_WRITE_TOKEN=your_token - uses blob storage
 * 
 * The system automatically falls back to in-memory storage if:
 * - USE_BLOB_STORAGE is not set or set to "false"
 * - BLOB_READ_WRITE_TOKEN is missing
 * - NODE_ENV is "development" or "test"
 */

// In-memory storage for local/development
const memoryStore = new Map<string, { data: any; expiresAt?: number }>();

// Check if we should use in-memory storage (local/dev environments)
const useMemoryStore = (): boolean => {
  // Use memory store if:
  // 1. USE_BLOB_STORAGE is explicitly set to "false" or "0"
  // 2. No BLOB_READ_WRITE_TOKEN is set
  // 3. NODE_ENV is development or test
  const useBlob = process.env.USE_BLOB_STORAGE;
  
  // If explicitly disabled, use memory store
  if (useBlob === "false" || useBlob === "0") {
    return true;
  }
  
  // If explicitly enabled and token exists, use blob
  if (useBlob === "true" || useBlob === "1") {
    return !process.env.BLOB_READ_WRITE_TOKEN;
  }
  
  // Default behavior: use memory store in development/test, blob in production
  return (
    !process.env.BLOB_READ_WRITE_TOKEN ||
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "test"
  );
};

// Dynamic import for blob storage (only in production with token)
let blobStorage: typeof import("@vercel/blob") | null = null;

async function getBlobStorage() {
  if (!blobStorage && !useMemoryStore()) {
    try {
      blobStorage = await import("@vercel/blob");
    } catch (error) {
      console.warn("Failed to import @vercel/blob, using memory store:", error);
    }
  }
  return blobStorage;
}

export interface SessionData {
  sessionId: string;
  email?: string;
  createdAt: number;
  lastActivity: number;
  userAgent?: string;
  expiresAt?: number; // For expiration handling
}

export interface SearchHistory {
  query: string;
  timestamp: number;
  page?: string;
}

export interface UserData {
  email?: string;
  searches: SearchHistory[];
  createdAt: number;
  lastActivity: number;
  expiresAt?: number;
}

export type MetricType = 
  | "page_view"
  | "component_view"
  | "component_interaction"
  | "button_click"
  | "link_click"
  | "form_submit"
  | "search"
  | "download"
  | "error"
  | "custom";

export interface Metric {
  id: string;
  type: MetricType;
  name: string;
  value?: string | number;
  metadata?: Record<string, any>;
  sessionId: string;
  email?: string;
  userAgent?: string;
  page?: string;
  timestamp: number;
  createdAt: number;
}

// Helper function to get blob path
function getBlobPath(key: string): string {
  return `data/${key}.json`;
}

// Helper function to read JSON from blob or memory
async function readBlob<T>(key: string): Promise<T | null> {
  try {
    // Use memory store in local/dev/test environments
    if (useMemoryStore()) {
      const stored = memoryStore.get(key);
      if (!stored) return null;

      // Check expiration
      if (stored.expiresAt && stored.expiresAt < Date.now()) {
        memoryStore.delete(key);
        return null;
      }

      const parsed = stored.data;

      // Extract data - handle wrapped arrays and primitives
      if (Array.isArray(parsed.data)) {
        return parsed.data as T;
      } else if (parsed.value !== undefined && Object.keys(parsed).length === (parsed.expiresAt ? 2 : 1)) {
        return parsed.value as T;
      } else {
        // Remove expiresAt from object before returning
        const { expiresAt, ...data } = parsed;
        return data as T;
      }
    }

    // Use blob storage in production
    const blob = await getBlobStorage();
    if (!blob) {
      console.warn("Blob storage not available, using memory store");
      return memoryStore.get(key)?.data || null;
    }

    const blobPath = getBlobPath(key);
    
    // List blobs with the exact path as prefix
    const { blobs } = await blob.list({
      prefix: blobPath,
      token: process.env.BLOB_READ_WRITE_TOKEN,
      limit: 1,
    });

    if (!blobs || blobs.length === 0) {
      return null;
    }

    const blobItem = blobs[0];
    if (!blobItem || !blobItem.url) {
      return null;
    }

    // Fetch the blob content
    const response = await fetch(blobItem.url);
    if (!response.ok) {
      return null;
    }

    const text = await response.text();
    if (!text) return null;

    const parsed = JSON.parse(text) as any;

    // Check expiration
    if (parsed.expiresAt && parsed.expiresAt < Date.now()) {
      // Delete expired blob
      try {
        await blob.del(blobItem.url, { token: process.env.BLOB_READ_WRITE_TOKEN });
      } catch (error) {
        // Ignore deletion errors
      }
      return null;
    }

    // Extract data - handle wrapped arrays and primitives
    if (Array.isArray(parsed.data)) {
      return parsed.data as T;
    } else if (parsed.value !== undefined && Object.keys(parsed).length === (parsed.expiresAt ? 2 : 1)) {
      return parsed.value as T;
    } else {
      // Remove expiresAt from object before returning
      const { expiresAt, ...data } = parsed;
      return data as T;
    }
  } catch (error: any) {
    // If blob doesn't exist, return null
    if (error?.status === 404 || error?.message?.includes("not found") || error?.message?.includes("No blobs found")) {
      return null;
    }
    console.error(`Error reading blob ${key}:`, error);
    return null;
  }
}

// Helper function to write JSON to blob or memory
async function writeBlob<T>(
  key: string,
  data: T,
  ttlSeconds?: number
): Promise<void> {
  try {
    // Handle arrays and objects differently
    let dataWithExpiry: any;
    if (Array.isArray(data)) {
      // For arrays, wrap in an object with expiresAt
      dataWithExpiry = {
        data: data,
        ...(ttlSeconds ? { expiresAt: Date.now() + ttlSeconds * 1000 } : {}),
      };
    } else if (typeof data === 'object' && data !== null) {
      // For objects, add expiresAt property
      dataWithExpiry = {
        ...data,
        ...(ttlSeconds ? { expiresAt: Date.now() + ttlSeconds * 1000 } : {}),
      };
    } else {
      // For primitives, wrap in an object
      dataWithExpiry = {
        value: data,
        ...(ttlSeconds ? { expiresAt: Date.now() + ttlSeconds * 1000 } : {}),
      };
    }

    // Use memory store in local/dev/test environments
    if (useMemoryStore()) {
      memoryStore.set(key, {
        data: dataWithExpiry,
        expiresAt: ttlSeconds ? Date.now() + ttlSeconds * 1000 : undefined,
      });
      return;
    }

    // Use blob storage in production
    const blob = await getBlobStorage();
    if (!blob) {
      console.warn("Blob storage not available, using memory store");
      memoryStore.set(key, {
        data: dataWithExpiry,
        expiresAt: ttlSeconds ? Date.now() + ttlSeconds * 1000 : undefined,
      });
      return;
    }

    const blobPath = getBlobPath(key);
    await blob.put(blobPath, JSON.stringify(dataWithExpiry), {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
      contentType: "application/json",
      addRandomSuffix: false, // Use exact path
    });
  } catch (error) {
    console.error(`Error writing blob ${key}:`, error);
    // Fallback to memory store on error
    if (!useMemoryStore()) {
      const dataWithExpiry = Array.isArray(data)
        ? { data: data, ...(ttlSeconds ? { expiresAt: Date.now() + ttlSeconds * 1000 } : {}) }
        : typeof data === 'object' && data !== null
        ? { ...data, ...(ttlSeconds ? { expiresAt: Date.now() + ttlSeconds * 1000 } : {}) }
        : { value: data, ...(ttlSeconds ? { expiresAt: Date.now() + ttlSeconds * 1000 } : {}) };
      
      memoryStore.set(key, {
        data: dataWithExpiry,
        expiresAt: ttlSeconds ? Date.now() + ttlSeconds * 1000 : undefined,
      });
    }
  }
}

// Helper function to read array from blob
async function readBlobArray<T>(key: string): Promise<T[]> {
  try {
    const parsed = await readBlob<{ data?: T[]; value?: T[] }>(key);
    if (!parsed) return [];
    
    // Handle different storage formats
    if (Array.isArray(parsed)) {
      return parsed;
    } else if (Array.isArray(parsed.data)) {
      return parsed.data;
    } else if (Array.isArray(parsed.value)) {
      return parsed.value;
    }
    
    return [];
  } catch (error) {
    console.error(`Error reading blob array ${key}:`, error);
    return [];
  }
}

// Helper function to append to blob array
async function appendToBlobArray<T>(
  key: string,
  item: T,
  maxItems?: number,
  ttlSeconds?: number
): Promise<void> {
  try {
    const existing = await readBlobArray<T>(key);
    const updated = [item, ...existing];
    const final = maxItems ? updated.slice(0, maxItems) : updated;
    await writeBlob(key, final, ttlSeconds);
  } catch (error) {
    console.error(`Error appending to blob array ${key}:`, error);
    throw error;
  }
}

/**
 * Get session data from Blob
 */
export async function getSession(sessionId: string): Promise<SessionData | null> {
  try {
    const session = await readBlob<SessionData>(`session:${sessionId}`);
    return session;
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
}

/**
 * Set session data in Blob
 */
export async function setSession(sessionId: string, data: Partial<SessionData>): Promise<void> {
  try {
    const existing = await getSession(sessionId);
    const sessionData: SessionData = {
      sessionId,
      ...existing,
      ...data,
      lastActivity: Date.now(),
      createdAt: existing?.createdAt || Date.now(),
    };
    // 30 days expiry
    await writeBlob(`session:${sessionId}`, sessionData, 60 * 60 * 24 * 30);
  } catch (error) {
    console.error("Error setting session:", error);
  }
}

/**
 * Get user data from Blob (by email)
 */
export async function getUserData(email: string): Promise<UserData | null> {
  try {
    const userData = await readBlob<UserData>(`user:${email}`);
    return userData;
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
}

/**
 * Set user data in Blob
 */
export async function setUserData(email: string, data: Partial<UserData>): Promise<void> {
  try {
    const existing = await getUserData(email);
    const userData: UserData = {
      email,
      searches: existing?.searches || [],
      createdAt: existing?.createdAt || Date.now(),
      lastActivity: Date.now(),
      ...data,
    };
    await writeBlob(`user:${email}`, userData);
  } catch (error) {
    console.error("Error setting user data:", error);
  }
}

/**
 * Add search to user's search history
 */
export async function addSearchToHistory(
  identifier: string,
  query: string,
  page?: string
): Promise<void> {
  try {
    const searchEntry: SearchHistory = {
      query,
      timestamp: Date.now(),
      page,
    };

    // Check if identifier is an email
    if (identifier.includes("@")) {
      const userData = await getUserData(identifier);
      const searches = userData?.searches || [];
      const updatedSearches = [searchEntry, ...searches].slice(0, 50); // Keep last 50 searches
      await setUserData(identifier, { searches: updatedSearches });
    } else {
      // Store in session
      const session = await getSession(identifier);
      if (session) {
        // Store searches in a separate key for sessions
        await appendToBlobArray(
          `session:${identifier}:searches`,
          searchEntry,
          50, // max 50 items
          60 * 60 * 24 * 30 // 30 days
        );
      }
    }
  } catch (error) {
    console.error("Error adding search to history:", error);
  }
}

/**
 * Get search history for a user or session
 */
export async function getSearchHistory(identifier: string): Promise<SearchHistory[]> {
  try {
    if (identifier.includes("@")) {
      const userData = await getUserData(identifier);
      return userData?.searches || [];
    } else {
      const searches = await readBlobArray<SearchHistory>(`session:${identifier}:searches`);
      return searches || [];
    }
  } catch (error) {
    console.error("Error getting search history:", error);
    return [];
  }
}

/**
 * Store a metric in Blob
 */
export async function storeMetric(metric: Omit<Metric, "id" | "timestamp" | "createdAt">): Promise<void> {
  try {
    const metricId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const fullMetric: Metric = {
      ...metric,
      id: metricId,
      timestamp: Date.now(),
      createdAt: Date.now(),
    };

    // Store metric with timestamp as key for time-series queries
    const timestamp = Date.now();
    const dateKey = new Date(timestamp).toISOString().split("T")[0]; // YYYY-MM-DD

    // Store in daily metrics list
    const dailyKey = `metrics:daily:${dateKey}`;
    await appendToBlobArray(dailyKey, fullMetric, undefined, 60 * 60 * 24 * 90); // 90 days

    // Store by metric type
    const typeKey = `metrics:type:${metric.type}:${dateKey}`;
    await appendToBlobArray(typeKey, fullMetric, undefined, 60 * 60 * 24 * 90);

    // Store by session
    const sessionKey = `metrics:session:${metric.sessionId}`;
    await appendToBlobArray(sessionKey, fullMetric, undefined, 60 * 60 * 24 * 30); // 30 days

    // If user has email, also store by user
    if (metric.email) {
      const userKey = `metrics:user:${metric.email}`;
      await appendToBlobArray(userKey, fullMetric, undefined, 60 * 60 * 24 * 90); // 90 days
    }

    // Store individual metric for detailed queries
    await writeBlob(`metric:${metricId}`, fullMetric, 60 * 60 * 24 * 90);
  } catch (error) {
    console.error("Error storing metric:", error);
  }
}

/**
 * Get metrics for a specific date
 */
export async function getMetricsByDate(date: string): Promise<Metric[]> {
  try {
    const dailyKey = `metrics:daily:${date}`;
    const metrics = await readBlobArray<Metric>(dailyKey);
    return metrics || [];
  } catch (error) {
    console.error("Error getting metrics by date:", error);
    return [];
  }
}

/**
 * Get metrics by type for a specific date
 */
export async function getMetricsByType(type: MetricType, date: string): Promise<Metric[]> {
  try {
    const typeKey = `metrics:type:${type}:${date}`;
    const metrics = await readBlobArray<Metric>(typeKey);
    return metrics || [];
  } catch (error) {
    console.error("Error getting metrics by type:", error);
    return [];
  }
}

/**
 * Get metrics for a session
 */
export async function getMetricsBySession(sessionId: string): Promise<Metric[]> {
  try {
    const sessionKey = `metrics:session:${sessionId}`;
    const metrics = await readBlobArray<Metric>(sessionKey);
    return metrics || [];
  } catch (error) {
    console.error("Error getting metrics by session:", error);
    return [];
  }
}

/**
 * Get metrics for a user (by email)
 */
export async function getMetricsByUser(email: string): Promise<Metric[]> {
  try {
    const userKey = `metrics:user:${email}`;
    const metrics = await readBlobArray<Metric>(userKey);
    return metrics || [];
  } catch (error) {
    console.error("Error getting metrics by user:", error);
    return [];
  }
}
