import { test, expect } from '@playwright/test';
import { LoginPage } from '../Page/LoginPage';
import { AdminPage } from '../Page/AdminPage';

test.describe('OrangeHRM Admin Flow Tests', () => {
  test('should login, Add, Search, Delete, Reset successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const adminPage = new AdminPage(page);

    await loginPage.navigateToLoginPage();
    await expect(page).toHaveTitle(/OrangeHRM/);

    await loginPage.login('Admin', 'admin123');
    await expect(page).toHaveURL(/.*dashboard/);

    await adminPage.navigateToAdminTab();
    await expect(page).toHaveURL(/.*admin/);
    const initialRecordsCount = await adminPage.getRecordsCount();
    console.log(`Initial records count: ${initialRecordsCount}`);

    const randomNum = Math.floor(Math.random() * 10000);
    const username = `Osama${randomNum}`;

    await adminPage.clickAddButton();

    await adminPage.addNewUser(username);

    const AfterRecordsCount = await adminPage.getRecordsCount();
    console.log(`After records count: ${AfterRecordsCount}`);
    expect(AfterRecordsCount - initialRecordsCount).toBe(1);

    await adminPage.searchUser(username);
    await adminPage.deleteUser();
    await adminPage.resetButton.click();

    const AfterDeleteRecordsCount = await adminPage.getRecordsCount();
    console.log(`After delete records count: ${AfterDeleteRecordsCount}`);
    expect(AfterRecordsCount - AfterDeleteRecordsCount).toBe(1);
  });
});
