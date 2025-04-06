import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

export interface EddieConfig {
  application: string;
  environment: string;
  service: string;
}

export function loadEddieConfig(): EddieConfig {
  const configPath = path.resolve(__dirname, '../eddie.config.json');

  if (fs.existsSync(configPath)) {
    const raw = fs.readFileSync(configPath, 'utf-8');
    return JSON.parse(raw);
  } else {
    // Fallback to .env
    dotenv.config({ path: path.resolve(__dirname, '../.env') });

    return {
      application: process.env.EDDIE_APPLICATION || 'UnknownApp',
      environment: process.env.EDDIE_ENVIRONMENT || 'Dev',
      service: process.env.EDDIE_SERVICE || 'unknown-service'
    };
  }
}