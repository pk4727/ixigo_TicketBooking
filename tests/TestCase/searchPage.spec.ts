import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/searchPage';

test('Search train between two cities', async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.navigate();
    await searchPage.fillJourneyDetails("Pune Jn (PUNE)", "Ranchi (RNC)", "tomorrow");
    await searchPage.clickSearch();
    await page.pause();
});