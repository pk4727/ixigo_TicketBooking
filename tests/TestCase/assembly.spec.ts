import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/searchPage';
import { TrainSelection } from '../Pages/trainSelectionPage';
import { PassengersDetails } from '../Pages/passengersDetails';

let searchPage: SearchPage;
let selectedTrain: TrainSelection;
let contact: PassengersDetails;

test('Start to End process', async ({ page }) => {
    searchPage = new SearchPage(page);
    selectedTrain = new TrainSelection(page);
    contact = new PassengersDetails(page);

    await searchPage.navigate();
    await searchPage.fillJourneyDetails("Pune Jn (PUNE)", "New Delhi (NDLS)", 'tomorrow');
    await searchPage.clickSearch();

    await selectedTrain.selectTrainDetails();

    await contact.selectMemberFromList("Pradhuman kumar");
    await contact.addNewMemberDetails("Gaurav sharma", "24", "Male");
    await contact.selectMemberFromList("Gaurav sharma");
});