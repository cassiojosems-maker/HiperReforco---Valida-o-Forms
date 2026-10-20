import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Path to compiled client build
const distPath = path.resolve(__dirname, 'dist');

// Serve static assets from dist
app.use(express.static(distPath));

// Health check endpoint for Cloud Run
app.get('/health', (_req, res) => {
  res.status(200).send('OK');
});

// SPA fallback: return index.html for any unmatched routes
app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`HiperReforço server running on http://0.0.0.0:${PORT}`);
});

// Graceful shutdown for Cloud Run container management
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
