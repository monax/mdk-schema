import * as z from 'zod';
import { ConfigSpec } from './environment.js';

export type PgConfig = ConfigSpec<typeof PgConfigSpec>;
export const PgConfigSpec = {
  POSTGRES_DB: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PORT: z.coerce.number().int(),
  POSTGRES_HOST: z.string(),
  POSTGRES_PASSWORD: z.string(),
} as const;

export type AnalyticsConfig = ConfigSpec<typeof AnalyticsConfigSpec>;
export const AnalyticsConfigSpec = {
  SEGMENT_ANALYTICS_API_KEY_FRONTEND: z.string().optional(),
  SEGMENT_ANALYTICS_API_KEY_BACKEND: z.string().optional(),
} as const;

export type StorageConfig = ConfigSpec<typeof StorageConfigSpec>;
export const StorageConfigSpec = {
  GCP_PROJECT_ID: z.string(),
  GCP_SERVICE_ACCOUNT: z.string(),
  GCP_KEY_FILE: z.string().optional(),
  GCS_HOST: z.string(),
  GCS_PUBLIC_FILES_BUCKET: z.string(),
  GCS_PRIVATE_FILES_BUCKET: z.string(),
} as const;

export type MetricsConfig = ConfigSpec<typeof MetricsConfigSpec>;
export const MetricsConfigSpec = {
  METRICS_PORT: z.coerce.number().int().optional(),
  METRICS_LISTEN_ADDRESS: z.string().optional(),
} as const;
