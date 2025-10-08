import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/searchPage';

test.skip('Search train between two cities', async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.navigate();
    await page.pause();

    await searchPage.fillJourneyDetails("Patna", "Ranchi");
    await searchPage.clickSearch();
});