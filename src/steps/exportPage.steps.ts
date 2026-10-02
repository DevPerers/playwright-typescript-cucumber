import { Then, DataTable } from '@cucumber/cucumber';
import { CustomWorld } from '../utils/custom-world';
import { ExportsPage } from '../pages/export.page';

Then('I see the Export {string} Title', async function (this: CustomWorld, title: string) {
  const exportsPage = new ExportsPage(this.page!);
  await exportsPage.verifyExportsTitle(title);
});

Then('I see the following columns in Explorer Exports page', async function (this: CustomWorld, dataTable: DataTable) {
  const exportsPage = new ExportsPage(this.page!);

  const expectedColumnNames: string[] = dataTable.raw().flat();
  await exportsPage.verifyColumnNames(expectedColumnNames);
});