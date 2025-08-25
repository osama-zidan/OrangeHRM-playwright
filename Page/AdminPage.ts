import { Page, Locator } from '@playwright/test';
import { waitForPageLoad, waitForElement, waitForDropDownOptions } from './utilites/utility';

export class AdminPage {
  readonly page: Page;
  readonly adminTab: Locator;
  readonly recordsCount: Locator;
  readonly loginButton: Locator;
  readonly addButton: Locator;
  readonly userRoleDropdown: Locator;
  readonly adminRole: Locator;
  readonly statusDropdown: Locator;
  readonly statusEnabled: Locator;
  readonly employeeNameInput: Locator;
  readonly employeeNameOptions: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly saveButton: Locator;
  readonly searchUsernameInput: Locator;
  readonly searchButton: Locator;
  readonly deleteButton: Locator;
  readonly confirmDeleteButton: Locator;
  readonly resetButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.adminTab = page.locator('a[href="/web/index.php/admin/viewAdminModule"]');
    this.recordsCount = page.locator('.orangehrm-horizontal-padding');
    this.loginButton = page.getByLabel('Login');
    this.addButton = page.locator('button:has-text("Add")');
    this.userRoleDropdown = page.locator('.oxd-select-text').first();
    this.adminRole = page.locator('.oxd-select-option:has-text("Admin")');
    this.statusDropdown = page.locator('.oxd-select-text').nth(1);
    this.statusEnabled = page.locator('.oxd-select-option:has-text("Enabled")');
    this.employeeNameInput = page.locator('input[placeholder="Type for hints..."]').first();
    this.employeeNameOptions = page.locator('.oxd-autocomplete-option');
    this.usernameInput = page.locator('input[data-v-1f99f73c]').nth(1);
    this.passwordInput = page.locator('input[type="password"]').first();
    this.confirmPasswordInput = page.locator('input[type="password"]').nth(1);
    this.saveButton = page.locator('button[type="submit"]');
    this.searchUsernameInput = page.getByRole('textbox').nth(1);
    this.searchButton = page.getByText('Search');
    this.deleteButton = page.locator('i.bi-trash').first();
    this.confirmDeleteButton = page.getByText('Yes, Delete');
    this.resetButton = page.getByRole('button', { name: 'Reset' });

  }

  async navigateToAdminTab(): Promise<void> {
    await this.adminTab.click();
    await waitForPageLoad(this.page);
  }

  async getRecordsCount(): Promise<number> {
    await waitForPageLoad(this.page);
    await waitForElement(this.recordsCount);
    const countText = await this.recordsCount.textContent()
    console.log(`Records count: ${countText}`);
    const match = countText?.match(/\((\d+)\)/);
    return match ? parseInt(match[1], 10) : 0;
  }

  async clickAddButton(): Promise<void> {
    await this.addButton.click();
    await waitForPageLoad(this.page);
  }

  async addNewUser(username: string): Promise<void> {
    await waitForPageLoad(this.page);

    await this.userRoleDropdown.click();
    await this.adminRole.click();

    await this.statusDropdown.click();
    await this.statusEnabled.click();
    
    await this.employeeNameInput.click();
    await this.employeeNameInput.fill('a');
    await waitForDropDownOptions(this.employeeNameOptions, 5);
    await this.employeeNameOptions.first().click();

    await this.usernameInput.fill(username);
    await this.passwordInput.fill('TestP@ssword123');
    await this.confirmPasswordInput.fill('TestP@ssword123');
    await this.saveButton.click();
    await waitForPageLoad(this.page);
  }

  async searchUser(username: string): Promise<void> {
    await this.searchUsernameInput.click();
    await this.searchUsernameInput.fill(username);
    await this.searchButton.click();
    await waitForPageLoad(this.page);
  }

  async deleteUser(): Promise<void> {
    await this.deleteButton.click();
    await this.confirmDeleteButton.click();
    await waitForPageLoad(this.page);
  }
} 