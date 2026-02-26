import { existsSync, readdirSync, statSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import 'zone.js';
import 'zone.js/testing';
import { ResourceLoader } from '@angular/compiler';
import { ɵresolveComponentResources as resolveComponentResources } from '@angular/core';
import { TestBed, getTestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';

console.log('Test setup loading...');

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'app');
let resourceIndex: Map<string, string> | null = null;

const buildResourceIndex = () => {
  if (resourceIndex) {
    return resourceIndex;
  }

  const index = new Map<string, string>();
  const stack = [appRoot];

  while (stack.length) {
    const current = stack.pop();
    if (!current) {
      continue;
    }

    const entries = readdirSync(current);
    for (const entry of entries) {
      const fullPath = path.join(current, entry);
      const stats = statSync(fullPath);

      if (stats.isDirectory()) {
        stack.push(fullPath);
        continue;
      }

      if (stats.isFile()) {
        const extension = path.extname(entry);
        if ((extension === '.html' || extension === '.css') && !index.has(entry)) {
          index.set(entry, fullPath);
        }
      }
    }
  }

  resourceIndex = index;
  return index;
};

class FsResourceLoader extends ResourceLoader {
  override get(url: string): Promise<string> {
    const cleanUrl = url.split('?')[0];
    const normalized = cleanUrl.replace(/^[./]+/, '');
    const directPath = path.join(appRoot, normalized);
    const index = buildResourceIndex();
    const resolvedPath = existsSync(directPath) ? directPath : index.get(path.basename(normalized));

    if (!resolvedPath) {
      console.error(`Missing template resource: ${url}`);
      return Promise.reject(new Error(`Missing template resource: ${url}`));
    }

    return readFile(resolvedPath, 'utf-8');
  }
}
const resourceLoader = new FsResourceLoader();

const originalFetch = globalThis.fetch;
globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  const url = typeof input === 'string' ? input : input?.toString();

  if (url?.startsWith('http://') || url?.startsWith('https://')) {
    return new Response('', { status: 200 });
  }

  if (originalFetch) {
    return originalFetch(input as any, init);
  }

  return new Response('', { status: 200 });
};

console.log('Initializing test environment...');
getTestBed().initTestEnvironment(
  BrowserTestingModule,
  platformBrowserTesting([{ provide: ResourceLoader, useClass: FsResourceLoader }]),
  { teardown: { destroyAfterEach: true } },
);
console.log('Test environment initialized.');

beforeEach(async () => {
  await resolveComponentResources((url) => resourceLoader.get(url));
});
