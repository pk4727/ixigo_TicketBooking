import { Page, Locator } from '@playwright/test';
import { time } from 'console';

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

    private readonly Dropdown = '[role="listitem"] p'
    

    constructor(page: Page) {
        this.page = page;
        this.bookingForTrain = this.page.locator(this.bookingForSelector).filter({ hasText: "Trains" });
        this.search = this.page.locator(this.searchSelector);

        this.typeLocationFrom = this.page.getByPlaceholder("Enter Origin");
        this.typeLocationTo = this.page.getByPlaceholder("Enter Destination");
        this.selectLocationFrom = this.page.locator(this.Dropdown).nth(3);
        this.selectLocationTo = this.page.locator(this.Dropdown).nth(3);
    }

    async navigate(): Promise<void> {
        await this.page.goto('/');
        await this.bookingForTrain.click();
    }

    async fillJourneyDetails(from: string, to: string, date: number, month: number, tatkal: boolean): Promise<void> {
        await this.typeLocationFrom.hover();
        await this.typeLocationFrom.click();
        await this.typeLocationFrom.pressSequentially(from, { delay: 100 });
        await this.page.waitForSelector(this.Dropdown);
        await this.selectLocationFrom.hover();
        await this.selectLocationFrom.click();

        await this.typeLocationTo.hover();
        await this.typeLocationTo.click();
        await this.typeLocationTo.fill(to);
        await this.selectLocationTo.click();
        //------------------------------------------------------------------------------
        // Wait for calendar and select date
        if(tatkal){
            await this.page.locator('[data-testid="tomorrow"]').click();
        }else{
            await this.page.waitForSelector('[data-testid="calendar"]');
            await this.page.getByRole('button',{name: `${date}`}).nth(month).click();
        }
        
    }

    async clickSearch(): Promise<void> {
        await this.search.click();
    }
}