import { Page, Locator } from '@playwright/test';
import { time } from 'console';

export class SearchPage {
    private page: Page;

    // Locators
    private bookingForTrain: Locator;
    private typeLocationFrom: Locator;
    private typeLocationTo: Locator;
    private selectStation: Locator;
    private tomorrow: Locator;
    private dayAfterTomorrow: Locator;
    private search: Locator;

    // Selector constants/Path
    private readonly bookingForSelector = "div[class='px-20 z-20 flex justify-between items-center relative'] li";
    private readonly suggestedLocationDropdown = '.bg-subbrand [role="listitem"]';
    private readonly tomorrowLocator = '[data-testid="tomorrow"]';
    private readonly dayAfterTomorrowLocator = '[data-testid="day-after-tomorrow"]';
    private readonly searchSelector = '[data-testid="book-train-tickets"]';

    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.bookingForTrain = page.locator(this.bookingForSelector).filter({ hasText: "Trains" });
        this.typeLocationFrom = page.getByPlaceholder("Enter Origin");
        this.typeLocationTo = page.getByPlaceholder("Enter Destination");
        this.selectStation = page.locator(this.suggestedLocationDropdown).first();
        this.tomorrow = page.locator(this.tomorrowLocator);
        this.dayAfterTomorrow = page.locator(this.dayAfterTomorrowLocator);
        this.search = page.locator(this.searchSelector);
    }

    /**
     * Navigates to the homepage and selects the train booking option.
     */
    async navigate(): Promise<void> {
        await this.page.goto('/');
        await this.bookingForTrain.click();
    }

    /**
     * Fills journey details including origin, destination, and travel date.
     * @param from - Origin station
     * @param to - Destination station
     * @param travelDate - 'tomorrow' or 'dayAfterTomorrow'
     */
    async fillJourneyDetails(from: string, to: string, travelDate: 'tomorrow' | 'dayAfterTomorrow' = 'dayAfterTomorrow'): Promise<void> {
        await this.typeLocationFrom.click();
        await this.typeLocationFrom.fill(from);
        await this.selectStation.click();

        // await this.typeLocationTo.click();
        await this.typeLocationTo.fill(to);
        await this.selectStation.click();

        if (travelDate === 'tomorrow') {
            await this.tomorrow.click();
        } else {
            await this.dayAfterTomorrow.click();
        }
    }

    /**
     * Clicks the search button to initiate train search.
     */
    async clickSearch(): Promise<void> {
        await this.search.click();
    }
}