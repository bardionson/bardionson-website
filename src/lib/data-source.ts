import fs from 'fs';
import path from 'path';
import { CollectionGroup } from '@/lib/types';
import { getBardIonsonArt as fetchFromOpenSea } from '@/lib/opensea';

export async function getBardIonsonArt(): Promise<Record<string, CollectionGroup>> {
  const dataDir = path.join(process.cwd(), 'src', 'data');
  const filePath = path.join(dataDir, 'nfts.json');

  if (fs.existsSync(filePath)) {
    console.log('Reading NFT data from local file...');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
  }

  // Fallback to live fetch if file is missing (e.g. first run locally without script)
  // Wrapped in try-catch so the build succeeds even without API keys configured.
  // The gallery will be empty initially and populate via ISR once keys are set.
  try {
    console.log('Local data file not found. Fetching from OpenSea...');
    return await fetchFromOpenSea();
  } catch (err) {
    console.warn('OpenSea fetch failed (API key may not be configured). Returning empty gallery data.');
    return {};
  }
}
