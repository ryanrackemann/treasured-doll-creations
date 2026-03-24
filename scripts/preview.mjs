import { createReadStream, existsSync } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, resolve } from 'node:path';

const host = '127.0.0.1';
const port = Number(process.env.PORT || 4173);
const rootDir = resolve('dist/treasured-doll-creations/browser');
const indexPath = join(rootDir, 'index.html');

if (!existsSync(indexPath)) {
  console.error('Build output not found. Run `npm run build` before `npm run preview`.');
  process.exit(1);
}

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

const server = createServer(async (request, response) => {
  try {
    const requestUrl = new URL(request.url || '/', `http://${host}:${port}`);
    const pathname = decodeURIComponent(requestUrl.pathname);
    const requestedPath = resolve(rootDir, `.${pathname}`);
    const canServeRequestedPath = requestedPath.startsWith(rootDir);

    if (!canServeRequestedPath) {
      response.statusCode = 403;
      response.setHeader('Content-Type', 'text/plain; charset=utf-8');
      response.end('Forbidden');
      return;
    }

    let filePath = pathname === '/' ? indexPath : requestedPath;
    let fileStats;

    try {
      fileStats = await stat(filePath);

      if (fileStats.isDirectory()) {
        filePath = join(filePath, 'index.html');
        fileStats = await stat(filePath);
      }
    } catch {
      if (extname(pathname)) {
        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/plain; charset=utf-8');
        response.end('Not found');
        return;
      }

      filePath = indexPath;
      fileStats = await stat(filePath);
    }

    response.statusCode = 200;
    response.setHeader(
      'Content-Type',
      contentTypes[extname(filePath)] || 'application/octet-stream'
    );
    response.setHeader('Cache-Control', 'no-cache');
    response.setHeader('Content-Length', fileStats.size);

    createReadStream(filePath).pipe(response);
  } catch (error) {
    response.statusCode = 500;
    response.setHeader('Content-Type', 'text/plain; charset=utf-8');
    response.end(
      error instanceof Error ? error.message : 'Unexpected error while serving the preview build.'
    );
  }
});

server.on('error', (error) => {
  console.error(
    error instanceof Error
      ? `Preview server failed to start: ${error.message}`
      : 'Preview server failed to start.'
  );
  process.exit(1);
});

server.listen(port, host, () => {
  console.log(`Preview server running at http://${host}:${port}`);
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    server.close(() => process.exit(0));
  });
}
