import type { UUID } from './uuid.js';

// stolen from segment's types (since it wasn't exported)
export type IdentityOptions = { userId: string; anonymousId?: string } | { userId?: string; anonymousId: string };

// the below type is used by the frontend components whereas the
// AnalyticsContext type is used by the backend components
export type AnalyticsUser = {
  id: () => string;
  anonymousId: () => string;
  traits: () => Record<string, unknown>;
};

// this is a redacted version of the opts.ctx trpc uses
// if additional relevant properties are added to the trpc
// context that need routing into analytics they can be
// placed here as well as in trpc.ts
export type AnalyticsContext = {
  organisation?: {
    name: string;
    id: UUID;
  } | null;
} & (
  | { anonymousId: UUID; user: null }
  | {
      user: {
        id: UUID;
      };
    }
);

export type AnalyticsEventBase<N extends string, P extends Record<string, unknown>> = {
  name: N;
  properties?: P;
};

export interface IAnalyticsEvent {
  name: string;
  properties?: Record<string, unknown>;
}
