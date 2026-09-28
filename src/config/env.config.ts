import * as dotenv from 'dotenv';
import * as path from 'path';

// Load .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',
  credentials: {
    standardUser: {
      username: process.env.AUTOMATION_USER || 'standard_user',
      password: process.env.AUTOMATION_PASSWORD || 'secret_sauce',
      oktaPassword: process.env.AUTOMATION_OKTAPASSWORD || 'okta_password',
    },
  },
};
