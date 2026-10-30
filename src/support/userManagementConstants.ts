export const appName = 'userManagement';

export const explorerRoleGrid = {
  indexEnableShowRealTimeData: 7,
  indexDisableShowRealTimeData: 6,
  indexEnablePic2Pog: 9,
  indexDisablePic2Pog: 6,
  indexEnableConsensusPlanogram: 10,
  indexDisableConsensusPlanogram: 6,
} as const;

export const userManagementRolePermissionOptions = {
  viewPermission: 'View',
  allowedRealTimeData: 'Allowed Real Time Data',
} as const;

export const userPermissionTestData = {
  fromDateMay: 'August 1, 2025',
  toDate: 'September 22, 2025',
  visitIdForPic2Pog: '1427891',
  visitIdForConsensusPlanogram: '1427891',
} as const;

export const viewerPageExportPlanogramOptions = {
  consensusPlanogram: 'CONSENSUS PLANOGRAM',
} as const;
