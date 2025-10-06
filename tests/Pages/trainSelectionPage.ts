import { Page, Locator, expect } from '@playwright/test';

export class TrainSelection {
    private page: Page;

    // Locators
    private selectTatkal: Locator;
    private trainList: Locator;
    private selectedTrain: Locator;
    private selectClass: Locator;
    private availabilty: Locator;
    private availabilityCountLocator: Locator;
    private availableTextLocator: Locator;
    private bookButtonLocator: Locator;

    // Selector constants
    private readonly tatkalRadioSelector = '[data-radioindex="1"]';
    private readonly trainRowSelector = '.train-listing-row';
    private readonly trainListContainer = '.train-listing-rows';
    private readonly trainSelector = this.trainListContainer + ' ' + this.trainRowSelector;
    private readonly classesItemSelector = '.train-class-item';
    private readonly availabilityTextSelector = this.classesItemSelector + ' .avail-text';
    private readonly trainStatusSelector = '.train-status-wrapper';
    private readonly availabilityCountSelector = '.avail-status';
    private readonly availableTextSelector = '.avail-text';
    private readonly bookButtonSelector = '.book-btn button';

    constructor(page: Page) {
        this.page = page;

        // Initialize static locators
        this.selectTatkal = page.locator(this.tatkalRadioSelector);
        this.trainList = page.locator(this.trainSelector);
        this.selectedTrain = this.trainList.nth(2); // third train
        this.selectClass = this.selectedTrain.locator(this.classesItemSelector).first();
        this.availabilty = this.selectedTrain.locator(this.availabilityTextSelector).first();
        this.availabilityCountLocator = this.selectedTrain.locator(`${this.trainStatusSelector} ${this.availabilityCountSelector}`);
        this.availableTextLocator = this.selectedTrain.locator(`${this.trainStatusSelector} ${this.availableTextSelector}`);
        this.bookButtonLocator = this.selectedTrain.locator(this.bookButtonSelector).first();
    }

    async navigate(): Promise<void> {
        await this.page.goto('/search/result/train/PUNE/NDLS/07102025//1/0/0/0/ALL');
        await this.page.waitForLoadState('networkidle')
    }

    async selectTrainDetails(): Promise<void> {
        await this.selectTatkal.waitFor();
        await this.selectTatkal.click();
        await this.page.waitForLoadState('networkidle');

        // await expect(this.availabilty).toContainText('Available'); // not use if watting list start
        await this.selectClass.waitFor({ state: 'visible' });
        await this.selectClass.click();

        await this.availabilityCountLocator.waitFor();
        expect(await this.availabilityCountLocator.count()).toBeGreaterThan(0);
        await this.bookButtonLocator.waitFor({ state: 'visible' });
        await this.bookButtonLocator.click();
    }
}