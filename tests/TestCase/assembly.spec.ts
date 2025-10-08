import { test, expect } from '@playwright/test';
import { loginPage } from '../Pages/loginPage';
import { SearchPage } from '../pages/searchPage';
import { TrainSelection } from '../Pages/trainSelectionPage';

let searchPage: SearchPage;
let selectedTrain: TrainSelection;

test('Start to End process', async ({ page }) => {
    searchPage = new SearchPage(page);
    selectedTrain = new TrainSelection(page);

    await page.pause();
    await searchPage.navigate();
    await searchPage.fillJourneyDetails("Pune Jn (PUNE)", "New Delhi (NDLS)", 'tomorrow');
    await searchPage.clickSearch();

    await selectedTrain.selectTrainDetails();
});