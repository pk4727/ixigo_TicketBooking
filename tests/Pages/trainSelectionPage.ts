import { Page, Locator } from '@playwright/test';

export class TrainSelection {
    private page: Page;

    // Locators
    private tatkal: Locator;
    private selectedTrain: Locator;

    // Selector constants/Path
    private readonly quota = ".fltr-col-2 span div"
    private readonly trainLists = ".train-listing-rows .train-listing-row";

    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.tatkal = page.locator(this.quota).filter({ hasText: "Tatkal" })
        this.selectedTrain = page.locator(this.trainLists).first();
    }

    async selectTrainDetails(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
        await this.tatkal.click();
        await this.page.waitForLoadState('networkidle');
        console.log(await this.selectedTrain.innerText());
    }
}