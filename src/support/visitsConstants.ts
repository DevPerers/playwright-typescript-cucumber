export const visitsPageLabels = {
  fromDateField: 'From',
  visitId: 'Visit ID',
  visits: 'Visits',
} as const;

export const visitsPageColumnNames = {
  state: 'State',
  numberOfSurveys: 'Number of Surveys',
  status: 'Review Status',
} as const;

export const visitsExportsPageColumnNames = {
  resourceType: 'Resource Type',
  type: 'Type',
  status: 'Status',
  processedItems: 'Processed Items',
  uploadedFileUrls: 'Uploaded File Urls',
  taskId: 'Task Id',
  yourDownloads: 'Uploaded File Urls',
} as const;

export const visitsExportsConstants = {
  resourceTypeForVisits: 'Visits',
  firstRowIndex: 0,
} as const;

export const visitsExportAllowedStatuses = {
  statusForExportedScenesOne: 'Completed',
  statusForExportedScenesTwo: 'In Progress',
} as const;

export const visitsExportsOptions = {
  stitchedImageExportOption: 'Stitched Images',
  originalImageExportOption: 'Original Images',
} as const;
