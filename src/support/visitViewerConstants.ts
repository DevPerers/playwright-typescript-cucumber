export const visitViewerPageMessages = {
  noSurveyMessage: 'No survey for this visit.',
} as const;

// Data Collection URL is not part of env.config.ts; supplied via env var (see report).
export const dataCollectionUrl =
  process.env.DATA_COLLECTION_URL || 'https://www.saucedemo.com/data-collection';
