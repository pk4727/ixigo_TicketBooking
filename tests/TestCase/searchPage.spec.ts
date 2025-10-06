import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/searchPage';

test('Search train between two cities', async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.navigate();
    await searchPage.fillJourneyDetails("Patna", "Ranchi", 10, 0, false);
    await searchPage.clickSearch();
    await page.pause();
});