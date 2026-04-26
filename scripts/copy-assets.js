import { copyFileSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

function copyDir(src, dest) {
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src)) {
    const srcPath = join(src, entry);
    const destPath = join(dest, entry);
    statSync(srcPath).isDirectory() ? copyDir(srcPath, destPath) : copyFileSync(srcPath, destPath);
  }
}

copyFileSync('manifest.json', 'dist/manifest.json');
console.log('Copied manifest.json');

copyDir('images', 'dist/images');
console.log('Copied images/');
