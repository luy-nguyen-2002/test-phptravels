import { Page } from '@playwright/test';

export default class Base {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async waitForPageLoad(state: 'domcontentloaded' | 'load' | 'networkidle' = 'load'): Promise<void> {
        await this.page.waitForLoadState(state);
    }
}
