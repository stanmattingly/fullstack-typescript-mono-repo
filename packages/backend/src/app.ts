import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { Server } from 'http';
import config from './config';
import apiRoutes from './routes/index';

const app = express();
const PORT = config.port;

// Enhanced error logging
const logErrors = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error('Error details:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    body: req.body,
  });
  next(err);
};

// Error handling middleware
const errorHandler = (err: Error, req: Request, res: Response): void => {
  if (!res.headersSent) {
    res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    });
  }
};

// Middleware
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction): void => {
  next();
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).send('Server is healthy');
});

// Register API routes
app.use('/', apiRoutes);

// Error handling (must be after routes)
app.use(logErrors);
app.use(errorHandler);

// 404 handler for unmatched routes
app.use((_req: Request, res: Response): void => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested resource was not found',
  });
});

// Server instances
let httpServer: Server | null = null;


// Graceful shutdown handling
const shutdown = async (signal: string) => {
  if (signal === 'SIGUSR2') {
    process.kill(process.pid, 'SIGUSR2');
    return;
  }

  console.log(`Shutting down servers... (${signal})`);

  if (httpServer) {
    httpServer.close(() => {
      console.log('HTTP server closed');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

// Register shutdown handlers based on environment
if (process.env.NODE_ENV === 'production') {
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
} else {
  process.once('SIGUSR2', () => shutdown('SIGUSR2'));
}

// Start servers
const startServers = () => {
  // Start HTTP server
  httpServer = app
    .listen(PORT, () => {
      console.log(`HTTP server is running on http://localhost:${PORT}`);
    })
    .on('error', (error) => {
      console.error('Failed to start HTTP server:', error);
    });

  // Configure server timeouts
  httpServer.timeout = 30000;
  httpServer.keepAliveTimeout = 65000;
  httpServer.headersTimeout = 66000;
};

startServers();

export { app, httpServer as server };
