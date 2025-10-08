
import { Page, expect } from '@playwright/test';

export class PaymentPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async chooseAndVerifyPaymentDetails(): Promise<void> {

    }
}