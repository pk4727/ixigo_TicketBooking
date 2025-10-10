import { Locator, Page, expect } from '@playwright/test';

export class PaymentPage {
    private page: Page;
    private choosePaymentWay: Locator;
    private fillUPI: Locator;
    private payPriceButton: Locator;

    // Selectors
    private readonly paymentWaySelector: string = '.body-lg.font-medium';
    private readonly upiPlaceholder: string = 'e.g. : name@bank';

    constructor(page: Page) {
        this.page = page;
        this.choosePaymentWay = this.page.locator(this.paymentWaySelector).filter({ hasText: "Pay via any UPI app" });
        this.fillUPI = this.page.getByPlaceholder(this.upiPlaceholder);
        this.payPriceButton = this.page.getByRole('button', { name: 'Pay ₹' });
    }

    async chooseAndVerifyPaymentDetails(upi: string): Promise<void> {
        await this.choosePaymentWay.click();
        await this.fillUPI.fill(upi);
        await expect(this.fillUPI).toHaveValue(upi);

        await this.page.waitForTimeout(4000);
        await expect(this.page.getByTestId('CheckCircleIcon').locator('..').locator('span')).toContainText(/upi id verified:/i);
        await this.payPriceButton.click();

        await this.page.waitForTimeout(1000);
        await expect(this.page.getByTestId('CloseIcon').locator('..')).toContainText("Payment Request Sent");
        console.log("Payment Request Sent");
    }
}