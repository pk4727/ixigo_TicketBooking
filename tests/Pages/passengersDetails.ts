import { Page, Locator, expect } from '@playwright/test';

export class PassengersDetails {
    private page: Page;

    // Locators
    private membersList: Locator;
    private addMemberButton: Locator;
    private nameField: Locator;
    private ageField: Locator;

    private deleteMemberButton: Locator;
    private conformMemberDeleteButton: Locator;
    private updateMemberButton: Locator;
    private saveMemberButton: Locator;

    private freeCancellation: Locator;
    private reviewAndPayButton: Locator;
    private dilogBoxLocator: Locator;

    // Selector constants
    private readonly dilogBoxSelector = 'fc-popup-no' // 'div[role="dialog"] [data-testid="fc-popup"]';

    constructor(page: Page) {
        this.page = page;

        // Initialize static locators
        this.membersList = this.page.getByTestId('travellerDetails').locator('.py-10'); // '[data-testid="travellerDetails"] .py-10';
        this.addMemberButton = this.page.getByTestId('AddIcon'); // 'button [data-testid="AddIcon"]';
        this.nameField = this.page.getByPlaceholder('Full name as per Govt. ID');
        this.ageField = this.page.getByPlaceholder('Age');

        this.saveMemberButton = this.page.getByRole('button', { name: "Save Traveller" });
        this.updateMemberButton = this.page.getByRole('button', { name: "Update Details" });
        this.deleteMemberButton = this.page.getByRole('button', { name: "Delete Traveller" });
        this.conformMemberDeleteButton = page.getByRole('button', { name: "Yes, Delete" });

        this.freeCancellation = this.page.locator('label').filter({ hasText: "No, I don't want free Cancellation" });
        this.reviewAndPayButton = this.page.getByTestId('review-and-pay'); // 'button[data-testid="review-and-pay"]';
        this.dilogBoxLocator = this.page.getByTestId(this.dilogBoxSelector);
    }

    async navigate(): Promise<void> {
        await this.page.goto('/trains/booking/11077/PUNE/NDLS/10102025/SL/TQ');
    }

    async selectMemberFromList(memberName: string): Promise<void> {
        const member = this.membersList.filter({ hasText: memberName });
        await expect(member).toBeVisible();

        const isSelected = await member.locator('input[type="checkbox"]').isChecked();
        if (!isSelected) {
            await member.locator('input[type="checkbox"]').click();
        }
    }

    async addNewMemberDetails(name: string, age: string, gender: string): Promise<void> {
        await this.addMemberButton.click();

        await this.nameField.fill(name);
        await this.ageField.fill(age);
        const genderlocator = this.page.getByRole('radio', { name: gender, exact: true });
        // @ts-ignore
        if (!await genderlocator.isChecked()) {
            await genderlocator.click();
        }

        await this.saveMemberButton.click();
    }

    async editMemberDetails(memberName: string, name: string, age: string, gender: string): Promise<void> {
        const member = this.membersList.filter({ hasText: memberName });
        await member.getByRole('button', { name: "Edit" }).click();

        await this.nameField.fill(name);
        await this.ageField.fill(age);
        const genderRadio = this.page.getByRole('radio', { name: gender, exact: true });
        if (!(await genderRadio.isChecked())) {
            await genderRadio.click();
        }

        await this.updateMemberButton.click();
    }

    async deleteMemberDetails(memberName: string): Promise<void> {
        const member = this.membersList.filter({ hasText: memberName });
        await member.getByRole('button', { name: "Edit" }).click();

        await this.deleteMemberButton.click();
        await this.conformMemberDeleteButton.click();
    }

    async otherDetailsAndPay(): Promise<void> {
        const ischeckedFreeCancellation = await this.freeCancellation.isChecked();
        if (!ischeckedFreeCancellation) {
            await this.freeCancellation.click();
        }
        await this.reviewAndPayButton.click();

        await this.page.waitForTimeout(1000);
        const dilog = await this.dilogBoxLocator.isVisible();
        if (dilog) {
            await this.dilogBoxLocator.click();
        }
    }
}