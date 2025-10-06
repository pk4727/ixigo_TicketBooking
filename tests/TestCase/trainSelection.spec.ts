import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/searchPage';
import { TrainSelection } from '../Pages/trainSelectionPage';

let searchPage: SearchPage;
let selectedTrain: TrainSelection;

test.only('Select train', async ({ page }) => {
    searchPage = new SearchPage(page);
    selectedTrain = new TrainSelection(page);

    await searchPage.navigate();
    await searchPage.fillJourneyDetails("Pune Jn (PUNE)", "New Delhi (NDLS)", "tomorrow");
    await searchPage.clickSearch();

    selectedTrain.selectTrainDetails();
});