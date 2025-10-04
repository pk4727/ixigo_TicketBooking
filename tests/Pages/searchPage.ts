import { Page, Locator } from '@playwright/test';

export class SearchPage {
    private page: Page;
    private bookingForTrain: Locator;
    private search: Locator;

    private typeLocationFrom: Locator;
    private typeLocationTo: Locator;
    private selectLocationFrom: Locator;
    private selectLocationTo: Locator;

    // Selector for the booking options list
    private readonly bookingForSelector = "div[class='px-20 z-20 flex justify-between items-center relative'] li";
    private readonly searchSelector = '[data-testid="book-train-tickets"]';

    private readonly fromDropdown = '[data-testid="popular-stations"] p'
    private readonly toDropdown = '[class="absolute z-20 top-[175px] left-[420px]"] p'

    constructor(page: Page) {
        this.page = page;
        this.bookingForTrain = this.page.locator(this.bookingForSelector).filter({ hasText: "Trains" });
        this.search = this.page.locator(this.searchSelector);

        this.typeLocationFrom = this.page.getByPlaceholder("Enter Origin");
        this.typeLocationTo = this.page.getByPlaceholder("Enter Destination");
        this.selectLocationFrom = this.page.locator(this.fromDropdown).first();
        this.selectLocationTo = this.page.locator(this.toDropdown).first();
    }

    async navigate(): Promise<void> {
        await this.page.goto('/');
        await this.bookingForTrain.click();
    }

    async fillJourneyDetails(from: string, to: string, date: string): Promise<void> {
        await this.typeLocationFrom.pressSequentially(from, { delay: 100 });
        await this.page.waitForSelector(this.fromDropdown);
        await this.selectLocationFrom.click();

        await this.typeLocationTo.fill(to);
        await this.selectLocationTo.click();
    }

    async clickSearch(): Promise<void> {
        await this.search.click();
    }
}