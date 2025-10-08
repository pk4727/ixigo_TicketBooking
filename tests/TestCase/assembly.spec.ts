import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/searchPage';
import { TrainSelection } from '../Pages/trainSelectionPage';
import { PassengersDetails } from '../Pages/passengersDetails';

let searchPage: SearchPage;
let selectedTrain: TrainSelection;
let passenger: PassengersDetails;

test('Start to End process', async ({ page }) => {
    searchPage = new SearchPage(page);
    selectedTrain = new TrainSelection(page);
    passenger = new PassengersDetails(page);

    await searchPage.navigate();
    await searchPage.fillJourneyDetails("Pune Jn (PUNE)", "New Delhi (NDLS)", 'tomorrow');
    await searchPage.clickSearch();

    await selectedTrain.selectTrainDetails();

    await passenger.selectMemberFromList("Pradhuman kumar");
    await passenger.addNewMemberDetails("Gaurav sharma", "24", "Male");
    await passenger.selectMemberFromList("Gaurav sharma");
});