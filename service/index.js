/**
 * Cineby TizenBrew Service
 * Optional Node.js backend for caching, API proxy, etc.
 */

const http = require('http');
const url = require('url');

const PORT = process.env.PORT || 8085;

// Simple in-memory cache
const cache = new Map();

// Configuration
const config = {
  cacheTTL: 3600000, // 1 hour in milliseconds
  maxCacheSize: 100
};

// Helper functions
function sendJSON(res, data, statusCode = 200) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
}

function sendError(res, message, statusCode = 500) {
  sendJSON(res, { error: message }, statusCode);
}

// Cache management
function getCached(key) {
  const item = cache.get(key);
  if (!item) return null;
  
  const now = Date.now();
  if (now - item.timestamp > config.cacheTTL) {
    cache.delete(key);
    return null;
  }
  
  return item.data;
}

function setCache(key, data) {
  // Limit cache size
  if (cache.size >= config.maxCacheSize) {
    const firstKey = cache.keys().next().value;
    cache.delete(firstKey);
  }
  
  cache.set(key, {
    data: data,
    timestamp: Date.now()
  });
}

// Request handlers
const handlers = {
  // Health check
  '/health': (req, res) => {
    sendJSON(res, {
      status: 'healthy',
      service: 'cineby-tizen',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    });
  },
  
  // Service status
  '/status': (req, res) => {
    sendJSON(res, {
      status: 'running',
      service: 'cineby-tizen',
      version: '1.0.0',
      cacheSize: cache.size,
      cacheLimit: config.maxCacheSize
    });
  },
  
  // Clear cache
  '/cache/clear': (req, res) => {
    const size = cache.size;
    cache.clear();
    sendJSON(res, {
      message: 'Cache cleared',
      itemsRemoved: size
    });
  },
  
  // Get cache stats
  '/cache/stats': (req, res) => {
    const stats = {
      size: cache.size,
      maxSize: config.maxCacheSize,
      ttl: config.cacheTTL,
      keys: Array.from(cache.keys())
    };
    sendJSON(res, stats);
  },
  
  // Proxy endpoint (example)
  '/proxy': async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const targetUrl = parsedUrl.query.url;
    
    if (!targetUrl) {
      return sendError(res, 'Missing url parameter', 400);
    }
    
    // Check cache first
    const cached = getCached(targetUrl);
    if (cached) {
      console.log(`Cache hit for: ${targetUrl}`);
      return sendJSON(res, { data: cached, cached: true });
    }
    
    // Fetch from target URL
    try {
      const https = require('https');
      const urlModule = require('url');
      const parsedTarget = urlModule.parse(targetUrl);
      
      const options = {
        hostname: parsedTarget.hostname,
        path: parsedTarget.path,
        method: 'GET',
        headers: {
          'User-Agent': 'Cineby-Tizen/1.0'
        }
      };
      
      const proxyReq = https.request(options, (proxyRes) => {
        let data = '';
        
        proxyRes.on('data', (chunk) => {
          data += chunk;
        });
        
        proxyRes.on('end', () => {
          setCache(targetUrl, data);
          sendJSON(res, { data: data, cached: false });
        });
      });
      
      proxyReq.on('error', (error) => {
        sendError(res, `Proxy error: ${error.message}`);
      });
      
      proxyReq.end();
    } catch (error) {
      sendError(res, `Error: ${error.message}`);
    }
  },
  
  // User preferences storage (example)
  '/preferences': (req, res) => {
    if (req.method === 'GET') {
      const prefs = getCached('user_preferences') || {
        theme: 'dark',
        autoplay: true,
        quality: 'auto'
      };
      sendJSON(res, prefs);
    } else if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        try {
          const prefs = JSON.parse(body);
          setCache('user_preferences', prefs);
          sendJSON(res, { message: 'Preferences saved', preferences: prefs });
        } catch (error) {
          sendError(res, 'Invalid JSON', 400);
        }
      });
    } else {
      sendError(res, 'Method not allowed', 405);
    }
  }
};

// Create HTTP server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  
  console.log(`${req.method} ${pathname}`);
  
  // Handle OPTIONS for CORS
  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }
  
  // Route to handler
  const handler = handlers[pathname];
  if (handler) {
    try {
      handler(req, res);
    } catch (error) {
      console.error('Handler error:', error);
      sendError(res, 'Internal server error');
    }
  } else {
    sendJSON(res, {
      message: 'Cineby TizenBrew Service',
      version: '1.0.0',
      endpoints: Object.keys(handlers)
    });
  }
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Cineby TizenBrew Service running on port ${PORT}`);
  console.log(`📡 Available endpoints:`);
  Object.keys(handlers).forEach(endpoint => {
    console.log(`   - http://localhost:${PORT}${endpoint}`);
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\nSIGINT received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});