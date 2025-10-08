import { Page, expect } from '@playwright/test';
import * as fs from 'fs';

export class loginPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(): Promise<void> {
        await this.page.goto('/trains?loginVisible=true');
        await this.page.waitForLoadState('networkidle');
    }

    async fillLoginDetails(mobileNumber: string, filePath: string): Promise<void> {
        await this.page.getByRole('button', { name: 'Log in/Sign up' }).nth(1).click();
        await expect(this.page.locator('#portal-root h5')).toContainText('Log in to ixigo');

        await this.page.getByPlaceholder('Enter Mobile Number').fill(`${mobileNumber}`);
        await this.page.getByRole('button', { name: 'Continue' }).click();
        await this.page.pause(); // Let user manually enter OTP

        // Save session after login
        const context = this.page.context();
        await context.storageState({ path: `${filePath}` })
        
        expect(this.page.getByText('Pradhuman')).toBeTruthy();
    }
}