import { copyFile, open } from 'node:fs/promises';
import { resolve } from 'node:path';

const outputDir = resolve('dist/treasured-doll-creations');
const indexPath = resolve(outputDir, 'index.html');
const notFoundPath = resolve(outputDir, '404.html');
const noJekyllPath = resolve(outputDir, '.nojekyll');

try {
  await copyFile(indexPath, notFoundPath);

  const noJekyllHandle = await open(noJekyllPath, 'w');
  await noJekyllHandle.close();
} catch (error) {
  console.error(
    error instanceof Error
      ? error.message
      : 'Unable to prepare the GitHub Pages deployment output.'
  );
  process.exit(1);
}
