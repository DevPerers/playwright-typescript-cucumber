import * as dotenv from 'dotenv';
import * as path from 'path';

// Load .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',
  explorerUrl: process.env.EXPLORER_URL || 'https://www.saucedemo.com/explorer',
  imageUrl: process.env.IMAGE_URL || 'https://www.saucedemo.com/image',
  sceneUrl: process.env.SCENE_URL || 'https://www.saucedemo.com/scene',
  storesUrl: process.env.STORES_URL || 'https://www.saucedemo.com/stores',
  visitsUrl: process.env.VISITS_URL || 'https://www.saucedemo.com/visits',
  userManagementUrl: process.env.USER_MANAGEMENT_URL || 'https://www.saucedemo.com/user-management',
  reportingConfigUrl: process.env.REPORTING_CONFIG_URL || 'https://www.saucedemo.com/reporting-config',
  credentials: {
    standardUser: {
      username: process.env.AUTOMATION_USER || 'standard_user',
      password: process.env.AUTOMATION_PASSWORD || 'secret_sauce',
      oktaPassword: process.env.AUTOMATION_OKTAPASSWORD || 'okta_password',
    },
  },
};
