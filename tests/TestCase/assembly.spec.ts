import { test, expect } from '@playwright/test';
import { loginPage } from '../Pages/loginPage';
import { SearchPage } from '../pages/searchPage';
import { TrainSelection } from '../Pages/trainSelectionPage';

let login: loginPage;
let searchPage: SearchPage;
let selectedTrain: TrainSelection;

test.use({'storageState': 'auth.json'});
test.only('Start to End process', async ({ page }) => {
    login = new loginPage(page);
    searchPage = new SearchPage(page);
    selectedTrain = new TrainSelection(page);
    

    await page.pause();

    // await login.navigate();
    // await login.fillLoginDetails("8409584727", 'auth.json');
    
    await searchPage.navigate();
    await searchPage.fillJourneyDetails("Pune Jn (PUNE)", "New Delhi (NDLS)", 'tomorrow');
    await searchPage.clickSearch();

    await selectedTrain.selectTrainDetails();
});