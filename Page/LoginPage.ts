import { Page, Locator } from '@playwright/test';
import { BASE_URL } from './constants';
import { waitForPageLoad } from './utilites/utility';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[name="username"]');
    this.passwordInput = page.locator('[name="password"]');
    this.loginButton = page.locator('[type="submit"]');
  }

  async navigateToLoginPage(): Promise<void> {
    await this.page.goto(BASE_URL);
    await waitForPageLoad(this.page);
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.click();
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  async fillUsername(username: string): Promise<void> {
    await this.usernameInput.click();
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }
} 