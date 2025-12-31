import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class DashboardPage extends BasePage {
    readonly inventoryTitle: Locator;

    constructor(page: Page) {
        super(page);
        this.inventoryTitle = page.locator('.title');
    }

    async getTitleText() {
        return await this.inventoryTitle.textContent();
    }
}
