import { Then, DataTable } from '@cucumber/cucumber';
import { CustomWorld } from '../utils/custom-world';
import { ExportsPage } from '../pages/exports.page';

Then('I see the {string} Title', async function (this: CustomWorld, title: string) {
  const exportsPage = new ExportsPage(this.page!);
  await exportsPage.verifyExportsTitle(title);
});

Then('I see the following columns', async function (this: CustomWorld, dataTable: DataTable) {
  const exportsPage = new ExportsPage(this.page!);

  const expectedColumnNames: string[] = dataTable.raw().flat();
  await exportsPage.verifyColumnNames(expectedColumnNames);
});